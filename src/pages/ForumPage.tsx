import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ForumPost from '../components/forum/ForumPost';
import CreatePostModal from '../components/forum/CreatePostModal';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const mockPosts = [
  {
    id: '1',
    title: 'How to handle tricky behavioral questions?',
    content: 'I have an upcoming interview and I\'m struggling with behavioral questions, especially the "Tell me about a time you failed" type. Any tips on how to structure these responses?',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    createdAt: '2025-03-15T10:00:00Z',
    likes: 24,
    replies: 8,
    tags: ['behavioral', 'interview-tips', 'preparation']
  },
  {
    id: '2',
    title: 'System Design Interview Experience at Tech Corp',
    content: 'Just had a system design interview at Tech Corp. They asked me to design a real-time chat application. Here\'s my experience and the approach I took...',
    author: {
      name: 'Alex Kumar'
    },
    createdAt: '2025-03-14T15:30:00Z',
    likes: 156,
    replies: 42,
    tags: ['system-design', 'tech-corp', 'interview-experience']
  },
  {
    id: '3',
    title: 'Success Story: From 0 to FAANG',
    content: 'After 6 months of preparation and countless mock interviews, I finally got an offer from a FAANG company! Here\'s my preparation strategy and key learnings...',
    author: {
      name: 'Maria Rodriguez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    createdAt: '2025-03-13T09:15:00Z',
    likes: 342,
    replies: 67,
    tags: ['success-story', 'faang', 'preparation']
  }
];

const ForumPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [posts, setPosts] = useState(mockPosts);

  const popularTags = [
    'interview-tips',
    'technical',
    'behavioral',
    'system-design',
    'success-story',
    'preparation'
  ];

  const handleCreatePost = (newPost: { title: string; content: string; tags: string[] }) => {
    const post = {
      id: Date.now().toString(),
      ...newPost,
      author: {
        name: 'Current User', // In a real app, this would come from auth context
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: 0,
    };

    setPosts([post, ...posts]);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
              <p className="text-gray-600 mt-1">
                Share experiences and learn from the community
              </p>
            </div>
            <Button 
              leftIcon={<Plus size={16} />}
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create Post
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Search and Filter */}
              <div className="mb-6 flex gap-4">
                <div className="flex-grow relative">
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
                <Button variant="outline" leftIcon={<Filter size={16} />}>
                  Filter
                </Button>
              </div>
              
              {/* Posts List */}
              <div className="space-y-4">
                {posts.map((post) => (
                  <ForumPost key={post.id} post={post} />
                ))}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                        ${
                          tag === selectedTag
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </Card>
              
              <Card>
                <h3 className="text-lg font-semibold mb-4">Forum Guidelines</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Be respectful and supportive
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Share specific experiences
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    No confidential information
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Keep discussions professional
                  </li>
                </ul>
              </Card>
              
              <Card>
                <h3 className="text-lg font-semibold mb-4">Top Contributors</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Maria Rodriguez', posts: 156, avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600' },
                    { name: 'Alex Kumar', posts: 89 },
                    { name: 'Sarah Chen', posts: 67, avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600' }
                  ].map((user) => (
                    <div key={user.name} className="flex items-center space-x-3">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                          {user.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.posts} posts</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      {isCreateModalOpen && (
        <CreatePostModal
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreatePost}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default ForumPage;