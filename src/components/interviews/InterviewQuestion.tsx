import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Camera, CameraOff, Clock, ArrowRight, Send, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { InterviewQuestion as IInterviewQuestion, InterviewMode } from '../../types';

interface InterviewQuestionProps {
  question: IInterviewQuestion;
  mode: InterviewMode;
  onComplete: (response: { text?: string; duration: number }) => void;
  isLast: boolean;
}

const InterviewQuestion: React.FC<InterviewQuestionProps> = ({
  question,
  mode,
  onComplete,
  isLast,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [response, setResponse] = useState('');
  const [isThinking, setIsThinking] = useState(true);
  const [transcription, setTranscription] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Simulate thinking time before showing the question
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsThinking(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Timer for recording
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  // Cleanup media streams on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const startSpeechRecognition = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join(' ');
        setTranscription(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError('Error with speech recognition. Please try again.');
        stopRecording();
      };

      recognitionRef.current.start();
    } else {
      setError('Speech recognition is not supported in your browser.');
    }
  };

  const startVideoRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.start();
      setIsRecording(true);
      startSpeechRecognition();
    } catch (err) {
      console.error('Error accessing media devices:', err);
      setError('Unable to access camera or microphone. Please check permissions.');
    }
  };

  const startAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.start();
      setIsRecording(true);
      startSpeechRecognition();
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setError('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    setIsRecording(false);
    setIsTranscribing(true);

    // Simulate processing delay
    setTimeout(() => {
      setIsTranscribing(false);
      handleSubmit();
    }, 1000);
  };

  const toggleRecording = async () => {
    if (!isRecording) {
      setError(null);
      if (mode === 'video') {
        await startVideoRecording();
      } else if (mode === 'audio') {
        await startAudioRecording();
      }
    } else {
      stopRecording();
    }
  };

  const handleSubmit = () => {
    onComplete({
      text: mode === 'text' ? response : transcription,
      duration: elapsedTime,
    });
  };

  const expectedDuration = question.expectedDuration || 120;

  const renderControls = () => {
    switch (mode) {
      case 'video':
        return (
          <div className="mt-6">
            <div className="mb-6 relative rounded-lg overflow-hidden bg-black aspect-video">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              {!isRecording && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                  <Camera size={48} className="text-white opacity-50" />
                </div>
              )}
            </div>

            {error && (
              <div className="mb-4 p-3 bg-error/10 text-error rounded-lg flex items-center">
                <AlertCircle size={20} className="mr-2" />
                {error}
              </div>
            )}

            <div className="flex flex-col items-center">
              <Button
                onClick={toggleRecording}
                variant={isRecording ? 'outline' : 'accent'}
                className={isRecording ? 'border-accent text-accent' : ''}
                leftIcon={isRecording ? <CameraOff size={16} /> : <Camera size={16} />}
              >
                {isRecording ? 'Stop Recording' : 'Start Video Response'}
              </Button>

              {isRecording && (
                <div className="mt-4 flex items-center">
                  <Clock size={16} className="text-error mr-2" />
                  <span className="text-error font-medium">{formatTime(elapsedTime)}</span>
                </div>
              )}

              {isTranscribing && (
                <div className="mt-4 text-accent">
                  Processing your response...
                </div>
              )}

              {transcription && !isRecording && !isTranscribing && (
                <div className="mt-4 w-full">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Transcription:</h4>
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-700">
                    {transcription}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'audio':
        return (
          <div className="mt-6">
            {error && (
              <div className="mb-4 p-3 bg-error/10 text-error rounded-lg flex items-center">
                <AlertCircle size={20} className="mr-2" />
                {error}
              </div>
            )}

            <div className="flex flex-col items-center">
              <div className="mb-4 h-16 w-16 flex items-center justify-center rounded-full bg-accent/10 text-accent">
                {isRecording ? <Mic size={32} /> : <MicOff size={32} />}
              </div>

              <Button
                onClick={toggleRecording}
                variant={isRecording ? 'outline' : 'accent'}
                className={isRecording ? 'border-accent text-accent' : ''}
                leftIcon={isRecording ? <MicOff size={16} /> : <Mic size={16} />}
              >
                {isRecording ? 'Stop Recording' : 'Start Audio Response'}
              </Button>

              {isRecording && (
                <div className="mt-4 flex items-center">
                  <Clock size={16} className="text-error mr-2" />
                  <span className="text-error font-medium">{formatTime(elapsedTime)}</span>
                </div>
              )}

              {isTranscribing && (
                <div className="mt-4 text-accent">
                  Processing your response...
                </div>
              )}

              {transcription && !isRecording && !isTranscribing && (
                <div className="mt-4 w-full">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Transcription:</h4>
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-700">
                    {transcription}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="mt-6 w-full">
            <textarea
              className="w-full h-32 p-3 border border-gray-300 rounded-md focus:border-primary focus:ring-1 focus:ring-primary resize-none"
              placeholder="Type your response here..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
            ></textarea>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Suggested length: {Math.floor(expectedDuration / 60)} minutes
              </div>
              <Button
                onClick={handleSubmit}
                disabled={!response.trim()}
                rightIcon={isLast ? <ArrowRight size={16} /> : <Send size={16} />}
              >
                {isLast ? 'Finish Interview' : 'Next Question'}
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      {isThinking ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-pulse-slow text-primary text-opacity-70">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <p className="mt-4 text-lg font-medium text-gray-600">Preparing your question...</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Category: {question.category}</div>
            <h3 className="text-xl font-bold">{question.question}</h3>
          </div>

          {renderControls()}
        </>
      )}
    </Card>
  );
};

export default InterviewQuestion;