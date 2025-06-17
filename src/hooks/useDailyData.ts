
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface DailyLifeData {
  id?: string;
  date: string;
  sleep_start?: string;
  sleep_end?: string;
  water_glasses?: number;
  exercise_minutes?: number;
  meditation_minutes?: number;
  steps_count?: number;
  breakfast?: string;
  lunch?: string;
  dinner?: string;
  snacks?: string;
  fruits_servings?: number;
  vegetables_servings?: number;
  work_hours?: number;
  study_hours?: number;
  reading_minutes?: number;
  skill_practice_minutes?: number;
  family_time_minutes?: number;
  friends_interaction?: string;
  mood_rating?: number;
  gratitude_note?: string;
  money_saved?: number;
  money_spent?: number;
  expense_category?: string;
  daily_goal?: string;
  goal_achieved?: boolean;
  phone_screen_time_minutes?: number;
  social_media_minutes?: number;
  outdoor_time_minutes?: number;
  creative_activity?: string;
  learning_new_skill?: string;
  skincare_routine?: boolean;
  vitamins_taken?: boolean;
  posture_breaks?: number;
  day_highlight?: string;
  improvement_area?: string;
  tomorrow_priority?: string;
}

export const useDailyData = () => {
  const [data, setData] = useState<DailyLifeData[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const loadData = async () => {
    if (!user) return;
    
    try {
      const { data: dailyData, error } = await supabase
        .from('daily_life_data')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setData(dailyData || []);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error loading data",
        description: "Failed to load your daily tracking data.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const saveData = async (formData: DailyLifeData) => {
    if (!user) return;

    try {
      const dataToSave = {
        ...formData,
        user_id: user.id,
        date: new Date().toISOString().split('T')[0]
      };

      const { error } = await supabase
        .from('daily_life_data')
        .upsert(dataToSave, { 
          onConflict: 'user_id,date' 
        });

      if (error) throw error;

      toast({
        title: "Data saved successfully!",
        description: "Your daily tracking data has been saved.",
      });

      loadData(); // Refresh data
    } catch (error) {
      console.error('Error saving data:', error);
      toast({
        title: "Error saving data",
        description: "Failed to save your daily tracking data.",
        variant: "destructive"
      });
    }
  };

  const clearAllData = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('daily_life_data')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setData([]);
      toast({
        title: "Data cleared!",
        description: "All your tracking data has been deleted.",
      });
    } catch (error) {
      console.error('Error clearing data:', error);
      toast({
        title: "Error clearing data",
        description: "Failed to clear your tracking data.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  return {
    data,
    loading,
    saveData,
    clearAllData,
    loadData
  };
};
