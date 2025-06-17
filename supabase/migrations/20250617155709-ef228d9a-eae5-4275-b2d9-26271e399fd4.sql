
-- Create a table for daily life tracking data with user association
CREATE TABLE public.daily_life_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  date DATE NOT NULL,
  
  -- Health & Wellness
  sleep_start TIME,
  sleep_end TIME,
  water_glasses INTEGER DEFAULT 0,
  exercise_minutes INTEGER DEFAULT 0,
  meditation_minutes INTEGER DEFAULT 0,
  steps_count INTEGER DEFAULT 0,
  
  -- Food & Nutrition
  breakfast TEXT,
  lunch TEXT,
  dinner TEXT,
  snacks TEXT,
  fruits_servings INTEGER DEFAULT 0,
  vegetables_servings INTEGER DEFAULT 0,
  
  -- Productivity & Learning
  work_hours DECIMAL(3,1) DEFAULT 0,
  study_hours DECIMAL(3,1) DEFAULT 0,
  reading_minutes INTEGER DEFAULT 0,
  skill_practice_minutes INTEGER DEFAULT 0,
  
  -- Social & Emotional
  family_time_minutes INTEGER DEFAULT 0,
  friends_interaction TEXT,
  mood_rating INTEGER CHECK (mood_rating >= 1 AND mood_rating <= 10),
  gratitude_note TEXT,
  
  -- Finance & Goals
  money_saved DECIMAL(10,2) DEFAULT 0,
  money_spent DECIMAL(10,2) DEFAULT 0,
  expense_category TEXT,
  daily_goal TEXT,
  goal_achieved BOOLEAN DEFAULT false,
  
  -- Habits & Activities
  phone_screen_time_minutes INTEGER DEFAULT 0,
  social_media_minutes INTEGER DEFAULT 0,
  outdoor_time_minutes INTEGER DEFAULT 0,
  creative_activity TEXT,
  learning_new_skill TEXT,
  
  -- Self Care & Wellness
  skincare_routine BOOLEAN DEFAULT false,
  vitamins_taken BOOLEAN DEFAULT false,
  posture_breaks INTEGER DEFAULT 0,
  
  -- Reflection
  day_highlight TEXT,
  improvement_area TEXT,
  tomorrow_priority TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Ensure one entry per user per day
  UNIQUE(user_id, date)
);

-- Add Row Level Security (RLS)
ALTER TABLE public.daily_life_data ENABLE ROW LEVEL SECURITY;

-- Create policies for daily_life_data
CREATE POLICY "Users can view their own daily data" 
  ON public.daily_life_data 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own daily data" 
  ON public.daily_life_data 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own daily data" 
  ON public.daily_life_data 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own daily data" 
  ON public.daily_life_data 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_daily_life_data_updated_at 
    BEFORE UPDATE ON public.daily_life_data 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
