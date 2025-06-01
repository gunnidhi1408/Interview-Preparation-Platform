import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Flag, Share2 } from 'lucide-react';
import Button from '../ui/Button';
import { formatDistanceToNow } from 'date-fns';

interface ForumPostProps {
  post: {
    id: string;
    title: string;
    content: string;
    author: {
      name: string;
      avatar?: string;
    };
    createdAt: string;
    likes: number;
    replies: number;
    tags: string[];
  };
}

const ForumPost: React.FC<ForumPostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {post.author.avatar ? (
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
              {post.author.name.charAt(0)}
            </div>
          )}
        </div>
        
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold hover:text-primary cursor-pointer">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500">
                Posted by {post.author.name} • {formatDistanceToNow(new Date(post.createdAt))} ago
              </p>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-700">{post.content}</p>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center space-x-4 text-gray-500">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 hover:text-primary ${
                isLiked ? 'text-primary' : ''
              }`}
            >
              <ThumbsUp size={18} />
              <span>{likesCount}</span>
            </button>
            
            <button className="flex items-center space-x-1 hover:text-primary">
              <MessageSquare size={18} />
              <span>{post.replies}</span>
            </button>
            
            <button className="flex items-center space-x-1 hover:text-primary">
              <Share2 size={18} />
              <span>Share</span>
            </button>
            
            <button className="flex items-center space-x-1 hover:text-error ml-auto">
              <Flag size={18} />
              <span>Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPost;