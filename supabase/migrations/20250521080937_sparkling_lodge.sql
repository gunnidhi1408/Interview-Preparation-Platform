/*
  # Create questions table for storing interview questions

  1. New Tables
    - `questions`
      - `id` (uuid, primary key)
      - `job_role` (text)
      - `difficulty` (text)
      - `question` (text)
      - `category` (text)
      - `created_at` (timestamp)
      - `is_ai_generated` (boolean)

  2. Security
    - Enable RLS on `questions` table
    - Add policy for authenticated users to read questions
*/

CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_role text NOT NULL,
  difficulty text NOT NULL,
  question text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  is_ai_generated boolean DEFAULT false
);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read questions"
  ON questions
  FOR SELECT
  TO authenticated
  USING (true);