import React, { useEffect, useState } from "react";
import { getBucketCounts } from "../services/task";

interface BucketCounts {
  upcoming: number;
  missed: number;
  completed: number;
  completed_late: number;
  total: number;
}

const AutoBucketSummary: React.FC = () => {
  const [counts, setCounts] = useState<BucketCounts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const data = await getBucketCounts();
        setCounts(data);
      } catch {
        setError("Failed to fetch bucket counts");
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
          <p className="text-gray-600">Loading bucket summary...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
        <p className="text-center text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  if (!counts) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-2xl">📊</div>
        <h3 className="text-2xl font-bold text-gray-800">
          Auto-Bucket Summary
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Upcoming Tasks */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 hover:shadow-md transition duration-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-bold text-blue-800 mb-1">Upcoming</h4>
              <p className="text-3xl font-bold text-blue-600">{counts.upcoming}</p>
            </div>
            <div className="text-4xl">⏰</div>
          </div>
          <p className="text-sm text-blue-700 font-medium">
            Tasks with future deadlines
          </p>
        </div>

        {/* Missed Tasks */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6 hover:shadow-md transition duration-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-bold text-red-800 mb-1">Missed</h4>
              <p className="text-3xl font-bold text-red-600">{counts.missed}</p>
            </div>
            <div className="text-4xl">⚠️</div>
          </div>
          <p className="text-sm text-red-700 font-medium">
            Past deadline, not completed
          </p>
        </div>

        {/* Completed Tasks */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 hover:shadow-md transition duration-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-bold text-green-800 mb-1">Completed</h4>
              <p className="text-3xl font-bold text-green-600">{counts.completed}</p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
          <p className="text-sm text-green-700 font-medium">
            Completed on time
          </p>
        </div>

        {/* Completed Late Tasks */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6 hover:shadow-md transition duration-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-bold text-orange-800 mb-1">Completed Late</h4>
              <p className="text-3xl font-bold text-orange-600">{counts.completed_late}</p>
            </div>
            <div className="text-4xl">⏰✅</div>
          </div>
          <p className="text-sm text-orange-700 font-medium">
            Completed after deadline
          </p>
        </div>
      </div>

      {/* Total Summary */}
      <div className="mt-8 pt-6 border-t-2 border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-gray-700">Total Tasks:</span>
          <span className="text-3xl font-bold text-gray-800">{counts.total}</span>
        </div>
        
        {counts.total > 0 && (
          <div className="space-y-3">
            <div className="flex space-x-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="bg-blue-500 transition-all duration-500" 
                style={{ width: `${(counts.upcoming / counts.total) * 100}%` }}
              ></div>
              <div 
                className="bg-red-500 transition-all duration-500" 
                style={{ width: `${(counts.missed / counts.total) * 100}%` }}
              ></div>
              <div 
                className="bg-green-500 transition-all duration-500" 
                style={{ width: `${(counts.completed / counts.total) * 100}%` }}
              ></div>
              <div 
                className="bg-orange-500 transition-all duration-500" 
                style={{ width: `${(counts.completed_late / counts.total) * 100}%` }}
              ></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
              <span>Upcoming: {counts.upcoming}</span>
              <span>Missed: {counts.missed}</span>
              <span>Completed: {counts.completed}</span>
              <span>Late: {counts.completed_late}</span>
            </div>
            
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700">
                Progress: {Math.round(((counts.completed + counts.completed_late) / counts.total) * 100)}% completed
              </p>
              <p className="text-sm text-gray-500">
                On time: {Math.round((counts.completed / (counts.completed + counts.completed_late || 1)) * 100)}% of completed tasks
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoBucketSummary; 