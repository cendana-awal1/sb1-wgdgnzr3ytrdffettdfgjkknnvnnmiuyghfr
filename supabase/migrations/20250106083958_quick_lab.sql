/*
  # Create candidates table

  1. New Tables
    - `candidates`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `votes` (integer, default 0)
      
  2. Security
    - Enable RLS on `candidates` table
    - Add policies for public access to read and update votes
*/

CREATE TABLE IF NOT EXISTS candidates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  votes integer DEFAULT 0
);

ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to candidates"
  ON candidates
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public update access to candidates"
  ON candidates
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);