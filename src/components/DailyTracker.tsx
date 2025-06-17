
import { useState } from 'react';
import { Save, DollarSign, Cigarette, Wine, Clock, Dumbbell, Apple, Smartphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const DailyTracker = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    moneySaved: '',
    cigarettesSmoked: '',
    alcoholConsumed: '',
    sleepStart: '',
    sleepEnd: '',
    exerciseDone: '',
    dietQuality: '',
    heightSteps: '',
    screenTime: ''
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
    
    // Reset form
    setFormData({
      moneySaved: '',
      cigarettesSmoked: '',
      alcoholConsumed: '',
      sleepStart: '',
      sleepEnd: '',
      exerciseDone: '',
      dietQuality: '',
      heightSteps: '',
      screenTime: ''
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
        <CardContent className="space-y-6">
          {/* Money Saved */}
          <div className="space-y-2">
            <Label className="flex items-center space-x-2 text-gray-700 font-medium">
              <DollarSign className="w-4 h-4 text-green-500" />
              <span>Money Saved Today ($)</span>
            </Label>
            <Input
              type="number"
              placeholder="0.00"
              value={formData.moneySaved}
              onChange={(e) => handleInputChange('moneySaved', e.target.value)}
              className="bg-white/50 border-gray-200 focus:border-blue-400"
            />
          </div>

          {/* Cigarettes Smoked */}
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

          {/* Alcohol Consumed */}
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
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sleep Time */}
          <div className="grid grid-cols-2 gap-4">
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
          </div>

          {/* Exercise Done */}
          <div className="space-y-2">
            <Label className="flex items-center space-x-2 text-gray-700 font-medium">
              <Dumbbell className="w-4 h-4 text-orange-500" />
              <span>Exercise/Stretch Done</span>
            </Label>
            <Select value={formData.exerciseDone} onValueChange={(value) => handleInputChange('exerciseDone', value)}>
              <SelectTrigger className="bg-white/50 border-gray-200 focus:border-blue-400">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Diet Quality */}
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
                <SelectItem value="bad">Bad</SelectItem>
                <SelectItem value="okay">Okay</SelectItem>
                <SelectItem value="good">Good</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Height Improvement Steps */}
          <div className="space-y-2">
            <Label className="flex items-center space-x-2 text-gray-700 font-medium">
              <span>Height Improvement Steps Taken</span>
            </Label>
            <Input
              type="number"
              placeholder="0"
              value={formData.heightSteps}
              onChange={(e) => handleInputChange('heightSteps', e.target.value)}
              className="bg-white/50 border-gray-200 focus:border-blue-400"
            />
          </div>

          {/* Screen Time Before Sleep */}
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
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
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
