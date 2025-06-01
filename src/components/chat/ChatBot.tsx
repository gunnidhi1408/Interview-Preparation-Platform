import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X } from 'lucide-react';
import Button from '../ui/Button';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your interview preparation assistant. I can help you with common interview questions and provide guidance on how to answer them effectively. Try asking me about:\n\n1. Tell me about yourself\n2. What are your strengths and weaknesses?\n3. Why do you want this job?\n4. Where do you see yourself in 5 years?\n5. Why should we hire you?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateResponse(input);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Common interview questions and answers
    if (input.includes('tell me about yourself') || input.includes('introduce yourself')) {
      return "Here's a structured way to answer 'Tell me about yourself':\n\n1. Present (2-3 sentences):\n- Start with your current role and responsibilities\n- Highlight key achievements\n\n2. Past (2-3 sentences):\n- Briefly mention relevant past experiences\n- Focus on growth and learning\n\n3. Future (1-2 sentences):\n- Express enthusiasm for this opportunity\n- Connect your background to the role\n\nExample:\n'I'm currently a senior software developer at Tech Corp, where I lead a team of five developers working on cloud-based solutions. In my three years there, I've successfully delivered projects that reduced system downtime by 40%. Previously, I worked at StartUp Inc., where I developed my full-stack skills and learned to work in fast-paced environments. I'm excited about this opportunity because it combines my technical expertise with the chance to solve complex scaling challenges.'";
    }
    
    if (input.includes('strengths') || input.includes('weaknesses')) {
      return "When discussing strengths and weaknesses, be honest but strategic:\n\nStrengths:\n1. Choose relevant strengths for the role\n2. Provide specific examples\n3. Focus on both technical and soft skills\n\nExample strength:\n'One of my key strengths is problem-solving. For instance, in my last role, I identified and fixed a critical performance bottleneck that improved application response time by 60%.'\n\nWeaknesses:\n1. Choose real but improvable weaknesses\n2. Focus on what you're doing to improve\n3. Avoid critical job requirements\n\nExample weakness:\n'I sometimes get too focused on details. To manage this, I've started using the Pomodoro Technique and setting specific timeboxes for tasks to maintain a better balance between perfectionism and productivity.'";
    }
    
    if (input.includes('why do you want this job') || input.includes('why are you interested')) {
      return "When answering why you want the job, focus on these key points:\n\n1. Company Research:\n- Show you've researched the company\n- Mention specific projects or values that appeal to you\n\n2. Role Alignment:\n- Connect your skills to the role\n- Express genuine interest in the responsibilities\n\n3. Growth Opportunity:\n- Discuss how the role fits your career goals\n- Show enthusiasm for learning and contributing\n\nExample:\n'I'm particularly excited about this role because your company is leading the way in cloud-native applications, and I've been specializing in cloud architecture. I'm impressed by your recent project implementing microservices at scale, and I believe my experience with similar architectures would allow me to contribute effectively while also growing my skills in new areas.'";
    }
    
    if (input.includes('5 years') || input.includes('five years')) {
      return "When discussing your 5-year plan, balance ambition with realism:\n\n1. Professional Growth:\n- Discuss developing expertise in your field\n- Mention leadership aspirations if relevant\n\n2. Company Contribution:\n- Show commitment to long-term impact\n- Align with company growth\n\n3. Personal Development:\n- Include continuous learning goals\n- Mention specific skills or certifications\n\nExample:\n'In five years, I aim to have deepened my technical expertise, particularly in cloud architecture and system design. I see myself taking on more technical leadership responsibilities, mentoring junior developers, and contributing to strategic technical decisions. I'm also interested in obtaining advanced certifications in cloud technologies and possibly speaking at technical conferences to share knowledge with the broader community.'";
    }
    
    if (input.includes('why should we hire you')) {
      return "Structure your answer to 'Why should we hire you?' around these points:\n\n1. Relevant Skills:\n- Match your skills to job requirements\n- Provide specific examples\n\n2. Unique Value:\n- Highlight what sets you apart\n- Mention unique combinations of skills\n\n3. Cultural Fit:\n- Show alignment with company values\n- Demonstrate enthusiasm\n\nExample:\n'You should hire me because I bring a unique combination of technical expertise and team leadership. In my current role, I've not only delivered complex projects on time but also mentored junior developers and improved team processes. My experience with similar scalability challenges you're facing, combined with my track record of reducing deployment times by 50%, shows I can make immediate contributions while also growing with the team.'";
    }

    if (input.includes('salary') || input.includes('compensation')) {
      return "When discussing salary expectations:\n\n1. Research First:\n- Know the market range for your role and experience\n- Consider the complete compensation package\n\n2. Response Strategy:\n- Be confident but flexible\n- Focus on finding a mutual fit\n\nExample:\n'Based on my research and experience, I'm looking for a salary in the range of [X-Y]. However, I'm open to discussing the complete compensation package, including benefits and growth opportunities.'";
    }

    if (input.includes('technical question') || input.includes('coding question')) {
      return "For technical interviews:\n\n1. Problem-Solving Approach:\n- Listen carefully to the question\n- Ask clarifying questions\n- Think aloud while solving\n- Discuss trade-offs\n\n2. Structure:\n- Understand requirements\n- Discuss possible approaches\n- Write clean, commented code\n- Test your solution\n\n3. Common Topics:\n- Data Structures\n- Algorithms\n- System Design\n- Time/Space Complexity\n\nWould you like a specific technical question to practice with?";
    }
    
    return "I can help you with:\n- Common interview questions\n- How to structure your answers\n- Technical interview preparation\n- Salary negotiation\n- Behavioral questions\n\nWhat specific aspect would you like to know more about?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Bot className="text-primary" size={24} />
          <div>
            <h3 className="font-semibold">Interview Assistant</h3>
            <p className="text-sm text-gray-500">Here to help with your preparation</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.text}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question..."
            className="flex-1 resize-none rounded-md border border-gray-300 p-2 focus:border-primary focus:ring-1 focus:ring-primary"
            rows={2}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim()}
            className="self-end"
            leftIcon={<Send size={16} />}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;