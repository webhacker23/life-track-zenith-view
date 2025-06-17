
import { useState } from 'react';
import { Save, IndianRupee, Cigarette, Wine, Clock, Dumbbell, Apple, Smartphone, Droplets, Coffee, Book, Heart, Car, Users, Smile } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useDailyData } from '@/hooks/useDailyData';

const DailyTracker = () => {
  const { saveData } = useDailyData();
  const [formData, setFormData] = useState({
    // Health & Wellness
    sleep_start: '',
    sleep_end: '',
    water_glasses: 0,
    exercise_minutes: 0,
    meditation_minutes: 0,
    steps_count: 0,
    
    // Food & Nutrition
    breakfast: '',
    lunch: '',
    dinner: '',
    snacks: '',
    fruits_servings: 0,
    vegetables_servings: 0,
    
    // Productivity & Learning
    work_hours: 0,
    study_hours: 0,
    reading_minutes: 0,
    skill_practice_minutes: 0,
    
    // Social & Emotional
    family_time_minutes: 0,
    friends_interaction: '',
    mood_rating: 5,
    gratitude_note: '',
    
    // Finance & Goals
    money_saved: 0,
    money_spent: 0,
    expense_category: '',
    daily_goal: '',
    goal_achieved: false,
    
    // Habits & Activities
    phone_screen_time_minutes: 0,
    social_media_minutes: 0,
    outdoor_time_minutes: 0,
    creative_activity: '',
    learning_new_skill: '',
    
    // Self Care & Wellness
    skincare_routine: false,
    vitamins_taken: false,
    posture_breaks: 0,
    
    // Reflection
    day_highlight: '',
    improvement_area: '',
    tomorrow_priority: ''
  });

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    await saveData(formData);
    
    // Reset form
    setFormData({
      sleep_start: '',
      sleep_end: '',
      water_glasses: 0,
      exercise_minutes: 0,
      meditation_minutes: 0,
      steps_count: 0,
      breakfast: '',
      lunch: '',
      dinner: '',
      snacks: '',
      fruits_servings: 0,
      vegetables_servings: 0,
      work_hours: 0,
      study_hours: 0,
      reading_minutes: 0,
      skill_practice_minutes: 0,
      family_time_minutes: 0,
      friends_interaction: '',
      mood_rating: 5,
      gratitude_note: '',
      money_saved: 0,
      money_spent: 0,
      expense_category: '',
      daily_goal: '',
      goal_achieved: false,
      phone_screen_time_minutes: 0,
      social_media_minutes: 0,
      outdoor_time_minutes: 0,
      creative_activity: '',
      learning_new_skill: '',
      skincare_routine: false,
      vitamins_taken: false,
      posture_breaks: 0,
      day_highlight: '',
      improvement_area: '',
      tomorrow_priority: ''
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Daily Life Tracker
          </CardTitle>
          <p className="text-gray-600">Record your daily habits and activities</p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Financial Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">💰 Financial</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center space-x-2 text-gray-700 font-medium">
                  <IndianRupee className="w-4 h-4 text-green-500" />
                  <span>Money Saved Today (₹)</span>
                </Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.money_saved}
                  onChange={(e) => handleInputChange('money_saved', Number(e.target.value))}
                  className="bg-white/50 border-gray-200 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center space-x-2 text-gray-700 font-medium">
                  <IndianRupee className="w-4 h-4 text-red-500" />
                  <span>Money Spent Today (₹)</span>
                </Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.money_spent}
                  onChange={(e) => handleInputChange('money_spent', Number(e.target.value))}
                  className="bg-white/50 border-gray-200 focus:border-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Health & Wellness Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">🏥 Health & Wellness</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center space-x-2 text-gray-700 font-medium">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span>Water Glasses</span>
                </Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.water_glasses}
                  onChange={(e) => handleInputChange('water_glasses', Number(e.target.value))}
                  className="bg-white/50 border-gray-200 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center space-x-2 text-gray-700 font-medium">
                  <Dumbbell className="w-4 h-4 text-orange-500" />
                  <span>Exercise Minutes</span>
                </Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.exercise_minutes}
                  onChange={(e) => handleInputChange('exercise_minutes', Number(e.target.value))}
                  className="bg-white/50 border-gray-200 focus:border-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Sleep Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">😴 Sleep</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center space-x-2 text-gray-700 font-medium">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>Sleep Start</span>
                </Label>
                <Input
                  type="time"
                  value={formData.sleep_start}
                  onChange={(e) => handleInputChange('sleep_start', e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center space-x-2 text-gray-700 font-medium">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>Sleep End</span>
                </Label>
                <Input
                  type="time"
                  value={formData.sleep_end}
                  onChange={(e) => handleInputChange('sleep_end', e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Mood & Mental Health */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">🧠 Mental Health & Mood</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center space-x-2 text-gray-700 font-medium">
                  <Smile className="w-4 h-4 text-yellow-500" />
                  <span>Mood Rating (1-10)</span>
                </Label>
                <Select value={formData.mood_rating.toString()} onValueChange={(value) => handleInputChange('mood_rating', Number(value))}>
                  <SelectTrigger className="bg-white/50 border-gray-200 focus:border-blue-400">
                    <SelectValue placeholder="Rate your mood" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num} {num <= 3 ? '😢' : num <= 6 ? '😐' : '😊'}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Steps Count</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.steps_count}
                  onChange={(e) => handleInputChange('steps_count', Number(e.target.value))}
                  className="bg-white/50 border-gray-200 focus:border-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Daily Reflection */}
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium">Daily Highlight & Gratitude</Label>
            <Textarea
              placeholder="What was the best part of your day? What are you grateful for?"
              value={formData.day_highlight}
              onChange={(e) => handleInputChange('day_highlight', e.target.value)}
              className="bg-white/50 border-gray-200 focus:border-blue-400 min-h-[100px]"
            />
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Daily Entry
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyTracker;
