export type Role = 'student' | 'counselor' | 'admin';

export interface UserProfile {
  id: number;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
  phone?: string | null;
  createdAt?: string;
  [key: string]: unknown;
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
  message?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  firstName: string;
  lastName: string;
  phone?: string;
  role: Role;
}

export interface Session {
  id: number;
  student_id: number;
  counselor_id: number;
  scheduled_at: string;
  duration_minutes: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  meeting_link?: string | null;
  notes?: string | null;
  rating?: number | null;
  feedback?: string | null;
  first_name?: string;
  last_name?: string;
  email?: string;
  specialization?: string | null;
  bio?: string | null;
  student_first_name?: string;
  student_last_name?: string;
  counselor_first_name?: string;
  counselor_last_name?: string;
}

export interface Counselor {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  specialization?: string | null;
  qualifications?: string | null;
  experience_years?: number | null;
  bio?: string | null;
  is_verified?: number | boolean;
}

export interface StudentProfile {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  grade_level?: string | null;
  interests?: string | null;
  career_goals?: string | null;
}

export interface Resource {
  id: number;
  title: string;
  description?: string | null;
  resource_type: 'article' | 'video' | 'document' | 'course' | 'tool';
  file_url?: string | null;
  external_url?: string | null;
  uploaded_by?: number;
  category?: string | null;
  tags?: string | null;
  created_at?: string;
}

export interface Goal {
  id: number;
  goal_title: string;
  goal_description?: string | null;
  target_date?: string | null;
  status: 'not_started' | 'in_progress' | 'completed' | 'cancelled';
  progress_notes?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Recommendation {
  id: number;
  student_id: number;
  career_path: string;
  match_score: number;
  reasoning?: string | null;
}

export interface AssessmentResults {
  recommendedPaths: string[];
  matchScores: number[];
}

export interface UserSummary {
  id: number;
  email: string;
  role: Role;
  first_name: string;
  last_name: string;
  phone?: string | null;
  created_at?: string;
  is_active?: number | boolean;
}

export interface AdminStatsEntry {
  count: number;
  role?: Role;
  status?: string;
  resource_type?: Resource['resource_type'];
}

export interface PlatformStats {
  users: AdminStatsEntry[];
  sessions: AdminStatsEntry[];
  resources: AdminStatsEntry[];
}

export interface CreateSessionPayload {
  counselorId: number;
  scheduledAt: string;
  durationMinutes?: number;
}

export interface UpdateSessionPayload {
  status?: Session['status'];
  notes?: string;
  rating?: number;
  feedback?: string;
}

export interface CreateResourcePayload {
  title: string;
  description?: string;
  resourceType: Resource['resource_type'];
  fileUrl?: string;
  externalUrl?: string;
  category?: string;
  tags?: string[];
}

export interface CreateGoalPayload {
  goalTitle: string;
  goalDescription?: string;
  targetDate?: string;
}


