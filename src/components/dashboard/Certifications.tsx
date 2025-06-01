import React from 'react';
import { Award, Download, Share2 } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'certificate' | 'badge';
  imageUrl?: string;
  link?: string;
}

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Technical Interview Master',
    description: 'Completed 10 technical interviews with an average score of 85%',
    date: '2025-03-15',
    type: 'certificate',
    imageUrl: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: '/certificates/technical-master'
  },
  {
    id: '2',
    title: 'Communication Excellence',
    description: 'Achieved top scores in communication skills across 5 interviews',
    date: '2025-03-10',
    type: 'badge',
    imageUrl: 'https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: '/badges/communication-excellence'
  },
  {
    id: '3',
    title: 'Problem-Solving Pro',
    description: 'Successfully completed advanced problem-solving scenarios',
    date: '2025-03-05',
    type: 'badge',
    imageUrl: 'https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: '/badges/problem-solving-pro'
  },
];

const Certifications: React.FC = () => {
  const downloadCertificate = (id: string) => {
    // In a real app, this would trigger a backend call to generate and download the PDF
    console.log('Downloading certificate:', id);
  };

  const shareCertificate = (id: string) => {
    // In a real app, this would open a share dialog
    console.log('Sharing certificate:', id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Certifications & Achievements</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Total Earned: {mockAchievements.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAchievements.map((achievement) => (
          <Card key={achievement.id} className="relative overflow-hidden group">
            <a 
              href={achievement.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block"
            >
              {achievement.type === 'certificate' || achievement.imageUrl ? (
                <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                  <img
                    src={achievement.imageUrl}
                    alt={achievement.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="aspect-square mb-4 flex items-center justify-center bg-primary/5 rounded-lg">
                  <Award size={64} className="text-primary" />
                </div>
              )}

              <div className="absolute top-4 right-4">
                <div className={`px-3 py-1 rounded-full text-xs font-medium
                  ${achievement.type === 'certificate' 
                    ? 'bg-primary/10 text-primary'
                    : 'bg-accent/10 text-accent'
                  }`}
                >
                  {achievement.type === 'certificate' ? 'Certificate' : 'Badge'}
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {achievement.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{achievement.description}</p>
            </a>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Earned {new Date(achievement.date).toLocaleDateString()}
              </span>
              
              {achievement.type === 'certificate' && (
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => downloadCertificate(achievement.id)}
                    leftIcon={<Download size={14} />}
                  >
                    Download
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => shareCertificate(achievement.id)}
                    leftIcon={<Share2 size={14} />}
                  >
                    Share
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Certifications;