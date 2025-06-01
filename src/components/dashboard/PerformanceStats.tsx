import React from 'react';
import { BarChart, RefreshCcw, TrendingUp, Clock } from 'lucide-react';
import Card from '../ui/Card';

const PerformanceStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="flex items-center">
        <div className="mr-4 p-3 rounded-md bg-primary/10">
          <BarChart size={24} className="text-primary" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Average Score</p>
          <p className="text-2xl font-bold">85%</p>
        </div>
      </Card>
      
      <Card className="flex items-center">
        <div className="mr-4 p-3 rounded-md bg-accent/10">
          <RefreshCcw size={24} className="text-accent" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold">12</p>
        </div>
      </Card>
      
      <Card className="flex items-center">
        <div className="mr-4 p-3 rounded-md bg-success/10">
          <TrendingUp size={24} className="text-success" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Improvement</p>
          <p className="text-2xl font-bold">+15%</p>
        </div>
      </Card>
      
      <Card className="flex items-center">
        <div className="mr-4 p-3 rounded-md bg-warning/10">
          <Clock size={24} className="text-warning" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Practice</p>
          <p className="text-2xl font-bold">5h 23m</p>
        </div>
      </Card>
    </div>
  );
};

export default PerformanceStats;