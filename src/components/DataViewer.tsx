
import { useState, useEffect } from 'react';
import { Eye, Trash2, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const DataViewer = () => {
  const { toast } = useToast();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const storedData = JSON.parse(localStorage.getItem('lifeTrackerData') || '[]');
    setData(storedData);
    console.log('Loaded data from localStorage:', storedData);
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to delete all tracking data? This cannot be undone.')) {
      localStorage.removeItem('lifeTrackerData');
      setData([]);
      toast({
        title: "Data Cleared!",
        description: "All tracking data has been deleted.",
      });
    }
  };

  const formatFieldName = (key: string) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const formatValue = (key: string, value: string) => {
    if (key === 'moneySaved') return `₹${value}`;
    if (key === 'date') return new Date(value).toLocaleDateString('en-IN');
    if (key === 'sleepStart' || key === 'sleepEnd') return value;
    if (value === 'yes' || value === 'no') return value.charAt(0).toUpperCase() + value.slice(1);
    return value;
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center space-x-2">
          <Eye className="w-5 h-5" />
          <span>Your Daily Life Data</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-700 font-medium">Total Entries: {data.length}</p>
            <p className="text-sm text-gray-500">
              All your daily tracking data stored locally
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={loadData}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Refresh</span>
            </Button>
            <Button
              onClick={clearAllData}
              variant="destructive"
              className="flex items-center space-x-2"
              disabled={data.length === 0}
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </Button>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold mb-4 text-gray-800">Daily Life Tracking Records:</h4>
          {data.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No data tracked yet. Start adding your daily entries!</p>
          ) : (
            <div className="space-y-4">
              {data.map((entry, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="font-semibold text-blue-600 mb-3 text-lg">
                    📅 {new Date(entry.date).toLocaleDateString('en-IN', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(entry).map(([key, value]) => {
                      if (key === 'date') return null;
                      return (
                        <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm font-medium text-gray-600">
                            {formatFieldName(key)}:
                          </span>
                          <span className="text-sm text-gray-800 font-semibold">
                            {formatValue(key, value as string)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">📊 How Your Data Works:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Every daily entry is automatically saved to your device</li>
            <li>• Data persists between browser sessions</li>
            <li>• Dashboard calculates monthly progress from this data</li>
            <li>• Trends show your improvement over time</li>
            <li>• All data stays private on your device</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataViewer;
