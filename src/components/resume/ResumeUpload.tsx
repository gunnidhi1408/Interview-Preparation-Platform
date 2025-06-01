import React, { useState } from 'react';
import { Upload, FileText, Check, X, Wand2 } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { supabase } from '../../lib/supabase';

const ResumeUpload: React.FC = () => {
  const [fileSelected, setFileSelected] = useState(false);
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [generatingQuestions, setGeneratingQuestions] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileSelected(true);
      setFileName(files[0].name);
      setUploadError(null);
    } else {
      setFileSelected(false);
      setFileName('');
    }
  };

  const handleUpload = () => {
    if (!fileSelected) return;
    
    setUploading(true);
    setUploadSuccess(false);
    setUploadError(null);
    
    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      setUploadSuccess(true);
      // In a real app, we would handle potential errors here
    }, 2000);
  };

  const generateQuestions = async () => {
    try {
      setGeneratingQuestions(true);
      
      // Call the edge function to generate questions
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-questions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jobRole: 'software-engineer', // This would come from the resume analysis
          difficulty: 'intermediate'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate questions');
      }

      const data = await response.json();
      console.log('Generated questions:', data);

    } catch (error) {
      console.error('Error generating questions:', error);
      setUploadError('Failed to generate questions. Please try again.');
    } finally {
      setGeneratingQuestions(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Your Resume</h2>
      <p className="text-gray-600 mb-6">
        Upload your resume to receive personalized interview questions based on your experience and skills.
      </p>
      
      <div className="mb-6">
        <div className={`border-2 border-dashed rounded-lg p-6 text-center ${fileSelected ? 'border-primary bg-primary/5' : 'border-gray-300'}`}>
          <input
            type="file"
            id="resume-upload"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
          
          <label htmlFor="resume-upload" className="cursor-pointer block">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
              <FileText size={28} className={fileSelected ? 'text-primary' : 'text-gray-500'} />
            </div>
            
            {!fileSelected ? (
              <>
                <p className="text-base font-medium mb-1">Drag and drop your resume here or click to browse</p>
                <p className="text-sm text-gray-500">Supports PDF, DOC, DOCX (Max 5MB)</p>
              </>
            ) : (
              <>
                <p className="text-base font-medium mb-1">File selected:</p>
                <p className="text-sm text-primary">{fileName}</p>
              </>
            )}
          </label>
        </div>
      </div>
      
      {uploadSuccess && (
        <div className="mb-6 p-4 bg-success/10 text-success rounded-md flex items-start">
          <Check size={20} className="mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Resume uploaded successfully!</p>
            <p className="text-sm">Your resume has been processed and your interview questions will be customized based on your experience.</p>
          </div>
        </div>
      )}
      
      {uploadError && (
        <div className="mb-6 p-4 bg-error/10 text-error rounded-md flex items-start">
          <X size={20} className="mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Upload failed</p>
            <p className="text-sm">{uploadError}</p>
          </div>
        </div>
      )}
      
      <div className="flex justify-end space-x-4">
        <Button
          onClick={handleUpload}
          disabled={!fileSelected || uploading}
          isLoading={uploading}
          leftIcon={<Upload size={16} />}
        >
          {uploading ? 'Uploading...' : 'Upload Resume'}
        </Button>

        {uploadSuccess && (
          <Button
            onClick={generateQuestions}
            disabled={generatingQuestions}
            isLoading={generatingQuestions}
            leftIcon={<Wand2 size={16} />}
            variant="accent"
          >
            Generate Questions
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ResumeUpload;