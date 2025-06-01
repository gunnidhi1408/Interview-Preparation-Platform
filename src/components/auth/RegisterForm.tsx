import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface RegisterFormProps {
  navigate: (path: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ navigate }) => {
  const { register, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill out all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    try {
      await register(name, email, password);
      navigate('/dashboard'); // Redirect on success
    } catch (err) {
      setError('Failed to create an account. Please try again.');
      console.error(err);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Create a new account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Or{' '}
          <button
            type="button"
            className="font-medium text-primary hover:text-primary-dark"
            onClick={() => navigate('/login')}
          >
            sign in to your existing account
          </button>
        </p>
      </div>
      {error && (
        <div className="bg-error/10 text-error px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <Input
          label="Full name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          required
        />
        <Input
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          helperText="Must be at least 8 characters"
          required
        />
        <Input
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          required
        />
        <div className="mb-6">
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{' '}
              <a href="/terms" className="font-medium text-primary hover:text-primary-dark">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="font-medium text-primary hover:text-primary-dark">
                Privacy Policy
              </a>
            </label>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
          leftIcon={<UserPlus size={16} />}
        >
          Create account
        </Button>
      </form>
    </Card>
  );
};

export default RegisterForm;
