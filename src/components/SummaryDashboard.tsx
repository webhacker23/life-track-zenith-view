import { useEffect, useState } from 'react';
import { DollarSign, Cigarette, Wine, Clock, Dumbbell, Apple, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

const SummaryDashboard = () => {
  const [data, setData] = useState<DataEntry[]>([]);
  const [monthlyStats, setMonthlyStats] = useState<any>({});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('lifeTrackerData') || '[]');
    setData(storedData);
    calculateMonthlyStats(storedData);
  }, []);

  const calculateMonthlyStats = (entries: DataEntry[]) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const thisMonthEntries = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
    });

    const lastMonthEntries = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      return entryDate.getMonth() === lastMonth && entryDate.getFullYear() === lastMonthYear;
    });

    const calculateAverage = (entries: DataEntry[], field: string) => {
      if (entries.length === 0) return 0;
      const sum = entries.reduce((acc, entry) => acc + parseFloat(entry[field as keyof DataEntry] || '0'), 0);
      return sum / entries.length;
    };

    const calculatePercentage = (entries: DataEntry[], field: string, value: string) => {
      if (entries.length === 0) return 0;
      const count = entries.filter(entry => entry[field as keyof DataEntry] === value).length;
      return (count / entries.length) * 100;
    };

    const getSleepHours = (entries: DataEntry[]) => {
      if (entries.length === 0) return 0;
      const totalHours = entries.reduce((acc, entry) => {
        if (!entry.sleepStart || !entry.sleepEnd) return acc;
        const start = new Date(`2000-01-01 ${entry.sleepStart}`);
        const end = new Date(`2000-01-01 ${entry.sleepEnd}`);
        if (end < start) end.setDate(end.getDate() + 1);
        return acc + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      }, 0);
      return totalHours / entries.length;
    };

    const currentStats = {
      totalMoneySaved: thisMonthEntries.reduce((acc, entry) => acc + parseFloat(entry.moneySaved || '0'), 0),
      avgCigarettes: calculateAverage(thisMonthEntries, 'cigarettesSmoked'),
      alcoholFreeDays: calculatePercentage(thisMonthEntries, 'alcoholConsumed', 'no'),
      avgSleepHours: getSleepHours(thisMonthEntries),
      exerciseRate: calculatePercentage(thisMonthEntries, 'exerciseDone', 'yes'),
      goodDietDays: calculatePercentage(thisMonthEntries, 'dietQuality', 'good'),
      avgHeightSteps: calculateAverage(thisMonthEntries, 'heightSteps'),
      screenFreeNights: calculatePercentage(thisMonthEntries, 'screenTime', 'no')
    };

    const lastStats = {
      totalMoneySaved: lastMonthEntries.reduce((acc, entry) => acc + parseFloat(entry.moneySaved || '0'), 0),
      avgCigarettes: calculateAverage(lastMonthEntries, 'cigarettesSmoked'),
      alcoholFreeDays: calculatePercentage(lastMonthEntries, 'alcoholConsumed', 'no'),
      avgSleepHours: getSleepHours(lastMonthEntries),
      exerciseRate: calculatePercentage(lastMonthEntries, 'exerciseDone', 'yes'),
      goodDietDays: calculatePercentage(lastMonthEntries, 'dietQuality', 'good'),
      avgHeightSteps: calculateAverage(lastMonthEntries, 'heightSteps'),
      screenFreeNights: calculatePercentage(lastMonthEntries, 'screenTime', 'no')
    };

    setMonthlyStats({ current: currentStats, last: lastStats, entriesCount: thisMonthEntries.length });
  };

  const getImprovement = (current: number, last: number, isLowerBetter = false) => {
    if (last === 0) return { percentage: 0, isImproved: false };
    const change = current - last;
    const percentage = Math.abs((change / last) * 100);
    const isImproved = isLowerBetter ? change < 0 : change > 0;
    return { percentage: Math.round(percentage), isImproved };
  };

  const StatCard = ({ 
    title, 
    value, 
    icon, 
    unit, 
    current, 
    last, 
    isLowerBetter = false,
    color = "blue" 
  }: any) => {
    const improvement = getImprovement(current, last, isLowerBetter);
    
    return (
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className={`p-3 rounded-full bg-${color}-100`}>
              {icon}
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{value}{unit}</p>
              <p className="text-sm text-gray-600">{title}</p>
              {improvement.percentage > 0 && (
                <div className={`flex items-center mt-1 ${improvement.isImproved ? 'text-green-600' : 'text-red-600'}`}>
                  {improvement.isImproved ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  <span className="text-xs font-medium">{improvement.percentage}%</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (!monthlyStats.current) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No data available. Start tracking your daily habits!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🇮🇳 Monthly Summary Dashboard
          </CardTitle>
          <p className="text-gray-600">
            {monthlyStats.entriesCount} entries this month • All amounts in Indian Rupees (₹)
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          title="Money Saved (₹)"
          value={monthlyStats.current.totalMoneySaved.toFixed(2)}
          unit=""
          current={monthlyStats.current.totalMoneySaved}
          last={monthlyStats.last.totalMoneySaved}
          icon={<DollarSign className="w-6 h-6 text-green-600" />}
          color="green"
        />

        <StatCard
          title="Avg Cigarettes/Day"
          value={monthlyStats.current.avgCigarettes.toFixed(1)}
          unit=""
          current={monthlyStats.current.avgCigarettes}
          last={monthlyStats.last.avgCigarettes}
          isLowerBetter={true}
          icon={<Cigarette className="w-6 h-6 text-red-600" />}
          color="red"
        />

        <StatCard
          title="Alcohol-Free Days"
          value={monthlyStats.current.alcoholFreeDays.toFixed(0)}
          unit="%"
          current={monthlyStats.current.alcoholFreeDays}
          last={monthlyStats.last.alcoholFreeDays}
          icon={<Wine className="w-6 h-6 text-purple-600" />}
          color="purple"
        />

        <StatCard
          title="Avg Sleep Hours"
          value={monthlyStats.current.avgSleepHours.toFixed(1)}
          unit="h"
          current={monthlyStats.current.avgSleepHours}
          last={monthlyStats.last.avgSleepHours}
          icon={<Clock className="w-6 h-6 text-blue-600" />}
          color="blue"
        />

        <StatCard
          title="Exercise Rate"
          value={monthlyStats.current.exerciseRate.toFixed(0)}
          unit="%"
          current={monthlyStats.current.exerciseRate}
          last={monthlyStats.last.exerciseRate}
          icon={<Dumbbell className="w-6 h-6 text-orange-600" />}
          color="orange"
        />

        <StatCard
          title="Good Diet Days"
          value={monthlyStats.current.goodDietDays.toFixed(0)}
          unit="%"
          current={monthlyStats.current.goodDietDays}
          last={monthlyStats.last.goodDietDays}
          icon={<Apple className="w-6 h-6 text-green-600" />}
          color="green"
        />
      </div>
    </div>
  );
};

export default SummaryDashboard;
