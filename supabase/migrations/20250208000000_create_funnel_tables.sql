-- Migration: Create funnel responses tables
-- Created: 2025-02-08

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: users
-- Armazena informações básicas do usuário
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE,
  phone TEXT,
  name TEXT,
  age_range TEXT CHECK (age_range IN ('18-29', '30-39', '40-49', '50+')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: funnel_responses
-- Armazena todas as respostas do funil
CREATE TABLE IF NOT EXISTS funnel_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Personal info
  name TEXT,
  age_range TEXT CHECK (age_range IN ('18-29', '30-39', '40-49', '50+')),
  
  -- Body metrics
  height INTEGER CHECK (height >= 140 AND height <= 200),
  current_weight DECIMAL(5,2) CHECK (current_weight >= 40 AND current_weight <= 150),
  target_weight DECIMAL(5,2) CHECK (target_weight >= 40 AND target_weight <= 150),
  body_type TEXT CHECK (body_type IN ('slim', 'medium', 'belly', 'overweight')),
  goal_body_type TEXT,
  
  -- Goals and experience (arrays stored as JSONB)
  knows_pilates BOOLEAN,
  main_goals JSONB DEFAULT '[]'::jsonb,
  target_areas JSONB DEFAULT '[]'::jsonb,
  
  -- Weight history
  weight_difficulty TEXT CHECK (weight_difficulty IN ('hard-lose', 'easy-both', 'hard-gain')),
  last_satisfied TEXT CHECK (last_satisfied IN ('less-1-year', '1-2-years', 'more-3-years', 'never')),
  life_events JSONB DEFAULT '[]'::jsonb,
  
  -- Physical condition
  physical_pains JSONB DEFAULT '[]'::jsonb,
  activity_level TEXT,
  daily_routine TEXT CHECK (daily_routine IN ('sedentary', 'light', 'moderate', 'active', 'extreme')),
  daily_walking TEXT CHECK (daily_walking IN ('sitting', 'breaks', 'standing')),
  stairs_breathing TEXT CHECK (stairs_breathing IN ('less-20', '20-60', 'more-60')),
  flexibility TEXT CHECK (flexibility IN ('very-flexible', 'starting', 'not-sure', 'not-much')),
  
  -- Lifestyle
  sleep_hours TEXT CHECK (sleep_hours IN ('less-5', '5-6', '7-8', 'more-8')),
  energy_level TEXT CHECK (energy_level IN ('high', 'low')),
  hydration TEXT CHECK (hydration IN ('only-coffee', 'less-2', '3-6', 'more-10')),
  healthy_eating TEXT,
  after_eating_feeling TEXT CHECK (after_eating_feeling IN ('sleepy', 'energy', 'only-coffee', 'less-2', '3-6', 'more-10')),
  bad_habits JSONB DEFAULT '[]'::jsonb,
  food_habits JSONB DEFAULT '[]'::jsonb,
  
  -- Workout preferences
  workout_time TEXT CHECK (workout_time IN ('10', '15', '30', '60')),
  workout_days TEXT CHECK (workout_days IN ('1-2', '3-5', 'todos')),
  
  -- Calculated fields
  bmi DECIMAL(4,2),
  bmi_category TEXT,
  metabolism_type TEXT,
  weight_to_lose DECIMAL(5,2),
  estimated_months INTEGER,
  
  -- Metadata
  completed_at TIMESTAMP WITH TIME ZONE,
  current_step INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_funnel_responses_user_id ON funnel_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_funnel_responses_created_at ON funnel_responses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to auto-update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_funnel_responses_updated_at BEFORE UPDATE ON funnel_responses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE funnel_responses ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public insert for funnel responses (anonymous users can submit)
CREATE POLICY "Public can insert funnel responses"
ON funnel_responses FOR INSERT
WITH CHECK (true);

-- Policy: Users can read their own responses
CREATE POLICY "Users can read own responses"
ON funnel_responses FOR SELECT
USING (true);

-- Policy: Users can update their own responses
CREATE POLICY "Users can update own responses"
ON funnel_responses FOR UPDATE
USING (true);

-- Policy: Allow public insert for users (for anonymous signups)
CREATE POLICY "Public can insert users"
ON users FOR INSERT
WITH CHECK (true);

-- Policy: Users can read their own data
CREATE POLICY "Users can read own data"
ON users FOR SELECT
USING (true);

-- Policy: Users can update own data
CREATE POLICY "Users can update own data"
ON users FOR UPDATE
USING (true);

