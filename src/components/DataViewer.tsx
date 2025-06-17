
import { useState, useEffect } from 'react';
import { Eye, Download, Trash2, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const DataViewer = () => {
  const { toast } = useToast();
  const [data, setData] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const storedData = JSON.parse(localStorage.getItem('lifeTrackerData') || '[]');
    setData(storedData);
    console.log('Loaded data from localStorage:', storedData);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'life-tracker-data.json';
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Data Exported!",
      description: "Your tracking data has been downloaded as a JSON file.",
    });
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

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center space-x-2">
          <Eye className="w-5 h-5" />
          <span>Data Management</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-700 font-medium">Total Entries: {data.length}</p>
            <p className="text-sm text-gray-500">
              Data is automatically saved to your browser's local storage
            </p>
          </div>
          <Button
            onClick={() => setIsVisible(!isVisible)}
            variant="outline"
            size="sm"
          >
            {isVisible ? 'Hide' : 'Show'} Data
          </Button>
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={exportData}
            className="flex items-center space-x-2"
            disabled={data.length === 0}
          >
            <Download className="w-4 h-4" />
            <span>Export Data</span>
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
          <Button
            onClick={loadData}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Refresh</span>
          </Button>
        </div>

        {isVisible && (
          <div className="mt-4 max-h-96 overflow-y-auto bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Stored Data:</h4>
            {data.length === 0 ? (
              <p className="text-gray-500">No data saved yet. Start tracking to see your data here!</p>
            ) : (
              <div className="space-y-2">
                {data.map((entry, index) => (
                  <div key={index} className="bg-white p-3 rounded border">
                    <div className="font-medium text-sm text-blue-600">
                      Entry #{index + 1} - {new Date(entry.date).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {Object.keys(entry).length} fields tracked
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">How Your Data is Saved & Tracked:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Data is saved locally in your browser (localStorage)</li>
            <li>• Each daily entry is timestamped and stored permanently</li>
            <li>• You can export your data as a JSON file for backup</li>
            <li>• Data persists between browser sessions</li>
            <li>• Dashboard and trends automatically calculate from your saved data</li>
            <li>• Clear browser data will remove all tracked information</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataViewer;
