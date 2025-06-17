
import { useState } from 'react';
import { Save, IndianRupee, Cigarette, Wine, Clock, Dumbbell, Apple, Smartphone, Droplets, Coffee, Book, Heart, Car, Users, Smile } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const DailyTracker = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // Financial
    moneySaved: '',
    moneySpent: '',
    
    // Health & Habits
    cigarettesSmoked: '',
    alcoholConsumed: '',
    waterGlasses: '',
    coffeeCups: '',
    
    // Sleep & Rest
    sleepStart: '',
    sleepEnd: '',
    napTime: '',
    
    // Physical Activity
    exerciseDone: '',
    exerciseType: '',
    exerciseDuration: '',
    steps: '',
    
    // Diet & Nutrition
    dietQuality: '',
    mealsCooked: '',
    junkFoodItems: '',
    fruitsVeggies: '',
    
    // Personal Development
    booksRead: '',
    studyTime: '',
    skillPractice: '',
    
    // Social & Emotional
    socialTime: '',
    moodRating: '',
    stressLevel: '',
    gratitude: '',
    
    // Technology & Entertainment
    screenTime: '',
    socialMediaTime: '',
    tvTime: '',
    
    // Productivity & Work
    workHours: '',
    productiveHours: '',
    goals: '',
    
    // Health Metrics
    heightSteps: '',
    weight: '',
    
    // Daily Notes
    notes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Get existing data
    const existingData = JSON.parse(localStorage.getItem('lifeTrackerData') || '[]');
    
    // Add new entry with current date
    const newEntry = {
      ...formData,
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toISOString()
    };
    
    existingData.push(newEntry);
    localStorage.setItem('lifeTrackerData', JSON.stringify(existingData));
    
    console.log('Data saved to localStorage:', newEntry);
    
    // Reset form
    setFormData({
      moneySaved: '',
      moneySpent: '',
      cigarettesSmoked: '',
      alcoholConsumed: '',
      waterGlasses: '',
      coffeeCups: '',
      sleepStart: '',
      sleepEnd: '',
      napTime: '',
      exerciseDone: '',
      exerciseType: '',
      exerciseDuration: '',
      steps: '',
      dietQuality: '',
      mealsCooked: '',
      junkFoodItems: '',
      fruitsVeggies: '',
      booksRead: '',
      studyTime: '',
      skillPractice: '',
      socialTime: '',
      moodRating: '',
      stressLevel: '',
      gratitude: '',
      screenTime: '',
      socialMediaTime: '',
      tvTime: '',
      workHours: '',
      productiveHours: '',
      goals: '',
      heightSteps: '',
      weight: '',
      notes: ''
    });

    toast({
      title: "Entry Saved!",
      description: "Your daily tracking data has been saved successfully.",
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
                  value={formData.moneySaved}
                  onChange={(e) => handleInputChange('moneySaved', e.target.value)}
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
                  value={formData.moneySpent}
                  onChange={(e) => handleInputChange('moneySpent', e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Health & Habits Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">🏥 Health & Habits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center space-x-2 text-gray-700 font-medium">
                  <Cigarette className="w-4 h-4 text-red-500" />
                  <span>Cigarettes Smoked</span>
                </Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.cigarettesSmoked}
                  onChange={(e) => handleInputChange('cigarettesSmoked', e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center space-x-2 text-gray-700 font-medium">
                  <Wine className="w-4 h-4 text-purple-500" />
                  <span>Alcohol Consumed</span>
                </Label>
                <Select value={formData.alcoholConsumed} onValueChange={(value) => handleInputChange('alcoholConsumed', value)}>
                  <SelectTrigger className="bg-white/50 border-gray-200 focus:border-blue-400">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="light">Light (1-2 drinks)</SelectItem>
                    <SelectItem value="moderate">Moderate (3-4 drinks)</SelectItem>
                    <SelectItem value="heavy">Heavy (5+ drinks)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center space-x-2 text-gray-700 font-medium">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span>Water Glasses</span>
                </Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.waterGlasses}
                  onChange={(e) => handleInputChange('waterGlasses', e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center space-x-2 text-gray-700 font-medium">
                  <Coffee className="w-4 h-4 text-amber-600" />
                  <span>Coffee/Tea Cups</span>
                </Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.coffeeCups}
                  onChange={(e) => handleInputChange('coffeeCups', e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Sleep & Rest Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">😴 Sleep & Rest</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center space-x-2 text-gray-700 font-medium">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>Sleep Start</span>
                </Label>
                <Input
                  type="time"
                  value={formData.sleepStart}
                  onChange={(e) => handleInputChange('sleepStart', e.target.value)}
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
                  value={formData.sleepEnd}
                  onChange={(e) => handleInputChange('sleepEnd', e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center space-x-2 text-gray-700 font-medium">
                  <Clock className="w-4 h-4 text-purple-500" />
                  <span>Nap Time (minutes)</span>
                </Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.napTime}
                  onChange={(e) => handleInputChange('napTime', e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Physical Activity Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">💪 Physical Activity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center space-x-2 text-gray-700 font-medium">
                  <Dumbbell className="w-4 h-4 text-orange-500" />
                  <span>Exercise Done</span>
                </Label>
                <Select value={formData.exerciseDone} onValueChange={(value) => handleInputChange('exerciseDone', value)}>
                  <SelectTrigger className="bg-white/50 border-gray-200 focus:border-blue-400">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Exercise</SelectItem>
                    <SelectItem value="light">Light Exercise</SelectItem>
                    <SelectItem value="moderate">Moderate Exercise</SelectItem>
                    <SelectItem value="intense">Intense Exercise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Exercise Type</Label>
                <Input
                  placeholder="e.g., Running, Gym, Yoga"
                  value={formData.exerciseType}
                  onChange={(e) => handleInputChange('exerciseType', e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Exercise Duration (minutes)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.exerciseDuration}
                  onChange={(e) => handleInputChange('exerciseDuration', e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Steps Walked</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.steps}
                  onChange={(e) => handleInputChange('steps', e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Diet & Nutrition Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">🍎 Diet & Nutrition</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center space-x-2 text-gray-700 font-medium">
                  <Apple className="w-4 h-4 text-green-500" />
                  <span>Diet Quality</span>
                </Label>
                <Select value={formData.dietQuality} onValueChange={(value) => handleInputChange('dietQuality', value)}>
                  <SelectTrigger className="bg-white/50 border-gray-200 focus:border-blue-400">
                    <SelectValue placeholder="Rate your diet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="poor">Poor</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="excellent">Excellent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Home Cooked Meals</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.mealsCooked}
                  onChange={(e) => handleInputChange('mealsCooked', e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Junk Food Items</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.junkFoodItems}
                  onChange={(e) => handleInputChange('junkFoodItems', e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Fruits & Vegetables Servings</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.fruitsVeggies}
                  onChange={(e) => handleInputChange('fruitsVeggies', e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Mental Health & Mood Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">🧠 Mental Health & Mood</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center space-x-2 text-gray-700 font-medium">
                  <Smile className="w-4 h-4 text-yellow-500" />
                  <span>Mood Rating (1-10)</span>
                </Label>
                <Select value={formData.moodRating} onValueChange={(value) => handleInputChange('moodRating', value)}>
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
                <Label className="flex items-center space-x-2 text-gray-700 font-medium">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>Stress Level (1-10)</span>
                </Label>
                <Select value={formData.stressLevel} onValueChange={(value) => handleInputChange('stressLevel', value)}>
                  <SelectTrigger className="bg-white/50 border-gray-200 focus:border-blue-400">
                    <SelectValue placeholder="Rate your stress" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num} {num <= 3 ? '😌' : num <= 6 ? '😬' : '😰'}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Technology & Screen Time Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">📱 Technology & Screen Time</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center space-x-2 text-gray-700 font-medium">
                  <Smartphone className="w-4 h-4 text-gray-500" />
                  <span>Screen Time Before Sleep</span>
                </Label>
                <Select value={formData.screenTime} onValueChange={(value) => handleInputChange('screenTime', value)}>
                  <SelectTrigger className="bg-white/50 border-gray-200 focus:border-blue-400">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Screen Time</SelectItem>
                    <SelectItem value="light">Less than 30 mins</SelectItem>
                    <SelectItem value="moderate">30 mins - 1 hour</SelectItem>
                    <SelectItem value="heavy">More than 1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Social Media Time (hours)</Label>
                <Input
                  type="number"
                  step="0.5"
                  placeholder="0"
                  value={formData.socialMediaTime}
                  onChange={(e) => handleInputChange('socialMediaTime', e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Personal Development Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">📚 Personal Development</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center space-x-2 text-gray-700 font-medium">
                  <Book className="w-4 h-4 text-blue-500" />
                  <span>Reading Time (minutes)</span>
                </Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.booksRead}
                  onChange={(e) => handleInputChange('booksRead', e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Study Time (minutes)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.studyTime}
                  onChange={(e) => handleInputChange('studyTime', e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Health Metrics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">📏 Health Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Height Improvement Steps Taken</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.heightSteps}
                  onChange={(e) => handleInputChange('heightSteps', e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Weight (kg)</Label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="0"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="bg-white/50 border-gray-200 focus:border-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Daily Notes */}
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium">Daily Notes & Gratitude</Label>
            <Textarea
              placeholder="Write about your day, achievements, gratitude, or any observations..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
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
