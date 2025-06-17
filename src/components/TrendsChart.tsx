
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DataEntry {
  date: string;
  moneySaved: string;
  cigarettesSmoked: string;
  alcoholConsumed: string;
  sleepStart: string;
  sleepEnd: string;
  exerciseDone: string;
  dietQuality: string;
  heightSteps: string;
  screenTime: string;
}

const TrendsChart = () => {
  const [data, setData] = useState<DataEntry[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState('7days');

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('lifeTrackerData') || '[]');
    setData(storedData);
    processChartData(storedData, timeRange);
  }, [timeRange]);

  const processChartData = (entries: DataEntry[], range: string) => {
    const now = new Date();
    const daysToShow = range === '7days' ? 7 : range === '30days' ? 30 : 90;
    
    const filteredEntries = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      const daysDiff = Math.floor((now.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
      return daysDiff <= daysToShow;
    });

    const processedData = filteredEntries.map(entry => {
      const sleepHours = entry.sleepStart && entry.sleepEnd ? (() => {
        const start = new Date(`2000-01-01 ${entry.sleepStart}`);
        const end = new Date(`2000-01-01 ${entry.sleepEnd}`);
        if (end < start) end.setDate(end.getDate() + 1);
        return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      })() : 0;

      return {
        date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        moneySaved: parseFloat(entry.moneySaved || '0'),
        cigarettes: parseFloat(entry.cigarettesSmoked || '0'),
        sleepHours: sleepHours,
        exercise: entry.exerciseDone === 'yes' ? 1 : 0,
        heightSteps: parseFloat(entry.heightSteps || '0'),
        alcohol: entry.alcoholConsumed === 'yes' ? 1 : 0,
        screenTime: entry.screenTime === 'yes' ? 1 : 0
      };
    });

    setChartData(processedData.reverse());
  };

  if (chartData.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No data available for trends. Start tracking your daily habits!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Trends & Progress
          </CardTitle>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 Days</SelectItem>
              <SelectItem value="30days">30 Days</SelectItem>
              <SelectItem value="90days">90 Days</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
      </Card>

      {/* Money Saved & Cigarettes Chart */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">Money Saved vs Cigarettes</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="moneySaved" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Money Saved ($)"
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="cigarettes" 
                stroke="#ef4444" 
                strokeWidth={3}
                name="Cigarettes"
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Sleep Hours Chart */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">Sleep Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="sleepHours" 
                fill="url(#sleepGradient)" 
                radius={[4, 4, 0, 0]}
                name="Sleep Hours"
              />
              <defs>
                <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Habits Overview */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">Daily Habits Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="exercise" 
                stroke="#f97316" 
                strokeWidth={2}
                name="Exercise Done"
                dot={{ fill: '#f97316', strokeWidth: 2, r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="alcohol" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                name="Alcohol Consumed"
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="screenTime" 
                stroke="#6b7280" 
                strokeWidth={2}
                name="Screen Time Before Sleep"
                dot={{ fill: '#6b7280', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendsChart;
