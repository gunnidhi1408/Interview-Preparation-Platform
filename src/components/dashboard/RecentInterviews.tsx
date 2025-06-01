import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { InterviewSession, JobRole } from '../../types';
import { jobRoles } from '../../data/mockData';

interface RecentInterviewsProps {
  sessions?: InterviewSession[];
}

const RecentInterviews: React.FC<RecentInterviewsProps> = ({ sessions = [] }) => {
  // If no sessions provided, use example data
  const hasData = sessions.length > 0;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getJobRoleLabel = (role: JobRole) => {
    return jobRoles.find(r => r.id === role)?.label || role;
  };

  return (
    <Card className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Recent Interviews</h3>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>

      {!hasData ? (
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <h4 className="text-lg font-medium text-gray-700 mb-2">No interviews yet</h4>
          <p className="text-gray-500 mb-4">
            Start practicing to see your interview history here.
          </p>
          <Button>Start New Interview</Button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Job Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Score
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Mode
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">View</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sessions.map((session) => (
                <tr key={session.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(session.startedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {getJobRoleLabel(session.jobRole)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {session.difficulty.charAt(0).toUpperCase() + session.difficulty.slice(1)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {session.overallScore ? (
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            session.overallScore.overall >= 80
                              ? 'bg-success/10 text-success'
                              : session.overallScore.overall >= 60
                              ? 'bg-accent/10 text-accent'
                              : 'bg-warning/10 text-warning'
                          }`}
                      >
                        {session.overallScore.overall}%
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="capitalize">{session.mode}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button size="sm" variant="outline" rightIcon={<ExternalLink size={14} />}>
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default RecentInterviews;