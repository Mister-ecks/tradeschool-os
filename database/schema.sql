-- TradeSchool OS Database Schema
-- This file contains the complete database schema for the platform

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'instructor', 'admin');
CREATE TYPE trade_type AS ENUM ('hvac', 'electrical', 'plumbing', 'welding', 'construction', 'solar', 'robotics');
CREATE TYPE course_level AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE question_type AS ENUM ('multiple_choice', 'true_false', 'short_answer', 'matching');
CREATE TYPE kit_type AS ENUM ('starter', 'professional', 'advanced', 'specialty');

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role user_role DEFAULT 'student',
    trade_specializations trade_type[],
    location TEXT,
    phone TEXT,
    years_experience INTEGER,
    certification_level TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Courses table
CREATE TABLE courses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    trade_type trade_type NOT NULL,
    level course_level NOT NULL,
    duration_hours INTEGER NOT NULL,
    instructor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    thumbnail_url TEXT,
    is_published BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    prerequisites TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Lessons table
CREATE TABLE lessons (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT,
    video_duration_seconds INTEGER,
    content TEXT,
    order_index INTEGER NOT NULL,
    duration_minutes INTEGER NOT NULL,
    learning_objectives TEXT[],
    resources JSONB,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Quizzes table
CREATE TABLE quizzes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    time_limit_minutes INTEGER,
    passing_score INTEGER DEFAULT 70,
    max_attempts INTEGER,
    is_proctored BOOLEAN DEFAULT false,
    randomize_questions BOOLEAN DEFAULT true,
    show_results_immediately BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT quiz_belongs_to_course_or_lesson CHECK (
        (course_id IS NOT NULL AND lesson_id IS NULL) OR 
        (course_id IS NULL AND lesson_id IS NOT NULL)
    )
);

-- Questions table
CREATE TABLE questions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE NOT NULL,
    question_text TEXT NOT NULL,
    question_type question_type NOT NULL,
    options JSONB, -- For multiple choice: ["A", "B", "C", "D"]
    correct_answer JSONB NOT NULL, -- Flexible format based on question type
    explanation TEXT,
    points INTEGER DEFAULT 1,
    order_index INTEGER NOT NULL,
    media_url TEXT, -- For images, diagrams, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- User progress tracking
CREATE TABLE user_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    time_spent_minutes INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT false,
    last_accessed TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, course_id, lesson_id)
);

-- Quiz attempts
CREATE TABLE quiz_attempts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE NOT NULL,
    answers JSONB NOT NULL, -- Store user answers
    score INTEGER NOT NULL,
    passed BOOLEAN GENERATED ALWAYS AS (score >= (SELECT passing_score FROM quizzes WHERE id = quiz_id)) STORED,
    time_taken_minutes INTEGER,
    proctoring_data JSONB, -- Camera timestamps, keystroke data, etc.
    completed_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Equipment kits
CREATE TABLE equipment_kits (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    trade_type trade_type NOT NULL,
    kit_type kit_type NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    is_active BOOLEAN DEFAULT true,
    specifications JSONB,
    included_parts TEXT[],
    training_modules TEXT[], -- Associated course IDs
    qr_code TEXT UNIQUE,
    image_urls TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Individual parts catalog
CREATE TABLE parts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    kit_id UUID REFERENCES equipment_kits(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT,
    brand TEXT,
    model_number TEXT,
    price DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    is_available BOOLEAN DEFAULT true,
    stock_quantity INTEGER,
    specifications JSONB,
    compatibility TEXT[], -- Compatible with which systems/kits
    image_urls TEXT[],
    supplier_info JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- User orders (for equipment purchases)
CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL NOT NULL,
    order_number TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, paid, shipped, delivered, cancelled
    total_amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    shipping_address JSONB,
    payment_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Order items
CREATE TABLE order_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
    kit_id UUID REFERENCES equipment_kits(id) ON DELETE SET NULL,
    part_id UUID REFERENCES parts(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT order_item_type CHECK (
        (kit_id IS NOT NULL AND part_id IS NULL) OR 
        (kit_id IS NULL AND part_id IS NOT NULL)
    )
);

-- Certificates
CREATE TABLE certificates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
    certificate_number TEXT UNIQUE NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE,
    verification_url TEXT,
    certificate_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Apprenticeship tracking
CREATE TABLE apprenticeship_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    supervisor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    hours_logged DECIMAL(4,2) NOT NULL,
    activity_description TEXT NOT NULL,
    skills_practiced TEXT[],
    work_date DATE NOT NULL,
    verified_by_supervisor BOOLEAN DEFAULT false,
    verification_date TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Deployment sites (for train-where-deployed model)
CREATE TABLE deployment_sites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    site_type TEXT NOT NULL, -- cold_room, hvac_installation, etc.
    equipment_installed JSONB,
    qr_code TEXT UNIQUE,
    training_videos TEXT[], -- URLs to training videos recorded here
    active BOOLEAN DEFAULT true,
    coordinates POINT, -- For mapping
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Training sessions at deployment sites
CREATE TABLE site_training_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    site_id UUID REFERENCES deployment_sites(id) ON DELETE CASCADE NOT NULL,
    instructor_id UUID REFERENCES profiles(id) ON DELETE SET NULL NOT NULL,
    course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
    session_date DATE NOT NULL,
    duration_hours DECIMAL(4,2) NOT NULL,
    participants TEXT[], -- User IDs of attendees
    skills_covered TEXT[],
    session_notes TEXT,
    photos TEXT[], -- URLs to photos from session
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create leaderboard view
CREATE VIEW leaderboard_view AS
SELECT 
    p.id as user_id,
    p.full_name,
    p.trade_specializations,
    COALESCE(SUM(qa.score), 0) as total_score,
    COUNT(DISTINCT up.course_id) FILTER (WHERE up.completed = true) as completed_courses,
    COUNT(DISTINCT c.id) as badges_earned,
    ROW_NUMBER() OVER (ORDER BY COALESCE(SUM(qa.score), 0) DESC) as rank
FROM profiles p
LEFT JOIN quiz_attempts qa ON p.id = qa.user_id AND qa.passed = true
LEFT JOIN user_progress up ON p.id = up.user_id
LEFT JOIN certificates c ON p.id = c.user_id
WHERE p.role = 'student'
GROUP BY p.id, p.full_name, p.trade_specializations;

-- Row Level Security (RLS) policies

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_kits ENABLE ROW LEVEL SECURITY;
ALTER TABLE parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE apprenticeship_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE deployment_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_training_sessions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Courses policies
CREATE POLICY "Anyone can view published courses" ON courses FOR SELECT USING (is_published = true);
CREATE POLICY "Instructors can manage their courses" ON courses FOR ALL USING (auth.uid() = instructor_id);

-- Lessons policies
CREATE POLICY "Anyone can view published lessons" ON lessons FOR SELECT USING (
    is_published = true AND 
    course_id IN (SELECT id FROM courses WHERE is_published = true)
);

-- User progress policies
CREATE POLICY "Users can view own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress FOR UPDATE USING (auth.uid() = user_id);

-- Quiz attempts policies
CREATE POLICY "Users can view own quiz attempts" ON quiz_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own quiz attempts" ON quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Equipment and parts policies
CREATE POLICY "Anyone can view active equipment" ON equipment_kits FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view available parts" ON parts FOR SELECT USING (is_available = true);

-- Orders policies
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to all relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quizzes_updated_at BEFORE UPDATE ON quizzes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON questions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON user_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_equipment_kits_updated_at BEFORE UPDATE ON equipment_kits FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_parts_updated_at BEFORE UPDATE ON parts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_apprenticeship_logs_updated_at BEFORE UPDATE ON apprenticeship_logs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_deployment_sites_updated_at BEFORE UPDATE ON deployment_sites FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data

-- Sample instructor profile (will be created after user signs up)
-- INSERT INTO profiles (id, email, full_name, role, trade_specializations) VALUES 
-- ('00000000-0000-0000-0000-000000000001', 'instructor@tradeschool.com', 'John Smith', 'instructor', ARRAY['hvac']);

-- Sample HVAC course
INSERT INTO courses (id, title, description, trade_type, level, duration_hours, order_index, is_published) VALUES 
(
    '00000000-0000-0000-0000-000000000001',
    'HVAC Fundamentals',
    'Learn the basics of heating, ventilation, and air conditioning systems. Perfect for beginners entering the HVAC field.',
    'hvac',
    'beginner',
    40,
    1,
    true
);

-- Sample lessons for HVAC course
INSERT INTO lessons (course_id, title, description, order_index, duration_minutes, is_published, learning_objectives) VALUES
(
    '00000000-0000-0000-0000-000000000001',
    'Introduction to HVAC Systems',
    'Overview of HVAC systems and their components',
    1,
    45,
    true,
    ARRAY['Understand HVAC system types', 'Identify major components', 'Recognize safety protocols']
),
(
    '00000000-0000-0000-0000-000000000001',
    'Refrigeration Cycle Basics',
    'Understanding the refrigeration cycle and its four main components',
    2,
    50,
    true,
    ARRAY['Explain the refrigeration cycle', 'Identify cycle components', 'Understand pressure-temperature relationships']
),
(
    '00000000-0000-0000-0000-000000000001',
    'Tools and Safety Equipment',
    'Essential tools for HVAC work and safety protocols',
    3,
    35,
    true,
    ARRAY['Identify HVAC tools', 'Understand safety protocols', 'Proper PPE usage']
);

-- Sample equipment kit
INSERT INTO equipment_kits (name, description, trade_type, kit_type, price, specifications, included_parts, qr_code) VALUES
(
    'HVAC Starter Kit',
    'Complete starter kit for HVAC training with essential tools and components',
    'hvac',
    'starter',
    299.99,
    '{"voltage": "110-240V", "temperature_range": "-40 to 120°C", "weight": "15kg"}',
    ARRAY['Digital Manifold Gauge', 'Vacuum Pump', 'Refrigerant Recovery Tank', 'Copper Tubing', 'Basic Hand Tools'],
    'hvac-starter-001'
);

-- Sample parts
INSERT INTO parts (name, description, brand, price, specifications, compatibility) VALUES
(
    'Digital Manifold Gauge Set',
    'Professional digital manifold gauge for refrigerant systems',
    'TradePro',
    89.99,
    '{"accuracy": "±1%", "pressure_range": "0-800 PSI", "display": "LCD"}',
    ARRAY['R-22', 'R-410A', 'R-134A']
),
(
    'Vacuum Pump 4CFM',
    'Single stage rotary vane vacuum pump',
    'Robinair',
    149.99,
    '{"cfm": "4", "ultimate_vacuum": "50 microns", "oil_capacity": "10oz"}',
    ARRAY['All HVAC systems']
);

-- Sample quiz
INSERT INTO quizzes (course_id, title, description, time_limit_minutes, passing_score) VALUES
(
    '00000000-0000-0000-0000-000000000001',
    'HVAC Fundamentals Quiz',
    'Test your knowledge of basic HVAC concepts',
    30,
    80
);

-- Sample questions for the quiz
INSERT INTO questions (quiz_id, question_text, question_type, options, correct_answer, explanation, points, order_index) VALUES
(
    (SELECT id FROM quizzes WHERE title = 'HVAC Fundamentals Quiz'),
    'What are the four main components of the refrigeration cycle?',
    'multiple_choice',
    '["Compressor, Condenser, Expansion Valve, Evaporator", "Compressor, Condenser, Filter, Evaporator", "Pump, Condenser, Valve, Coil", "Motor, Heat Exchanger, Valve, Fan"]',
    '"Compressor, Condenser, Expansion Valve, Evaporator"',
    'The refrigeration cycle consists of four main components: compressor (compresses refrigerant), condenser (releases heat), expansion valve (reduces pressure), and evaporator (absorbs heat).',
    2,
    1
),
(
    (SELECT id FROM quizzes WHERE title = 'HVAC Fundamentals Quiz'),
    'What is the primary purpose of a vacuum pump in HVAC work?',
    'multiple_choice',
    '["To remove air and moisture from the system", "To pressurize the system", "To clean the coils", "To test electrical components"]',
    '"To remove air and moisture from the system"',
    'Vacuum pumps remove air and moisture from refrigeration systems before charging with refrigerant, preventing contamination and ensuring proper operation.',
    2,
    2
);

-- Create indexes for better performance
CREATE INDEX idx_courses_trade_type ON courses(trade_type);
CREATE INDEX idx_courses_published ON courses(is_published);
CREATE INDEX idx_lessons_course_id ON lessons(course_id);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX idx_quiz_attempts_quiz_id ON quiz_attempts(quiz_id);
CREATE INDEX idx_equipment_kits_trade_type ON equipment_kits(trade_type);
CREATE INDEX idx_parts_availability ON parts(is_available);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_apprenticeship_logs_user_id ON apprenticeship_logs(user_id);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;




