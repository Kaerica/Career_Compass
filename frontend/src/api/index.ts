import apiClient from './client';
import {
  AssessmentResults,
  AuthResponse,
  CreateGoalPayload,
  CreateResourcePayload,
  CreateSessionPayload,
  Goal,
  LoginPayload,
  PlatformStats,
  Recommendation,
  RegisterPayload,
  Resource,
  Session,
  StudentProfile,
  Counselor,
  UpdateSessionPayload,
  UserProfile,
  UserSummary,
} from '../types/api';

export const loginRequest = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>('/api/auth/login', payload);
  return data;
};

export const registerRequest = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>('/api/auth/register', payload);
  return data;
};

export const getProfile = async (): Promise<UserProfile> => {
  const { data } = await apiClient.get<{ user: UserProfile }>('/api/auth/profile');
  return data.user;
};

export const fetchSessions = async (): Promise<Session[]> => {
  const { data } = await apiClient.get<{ sessions: Session[] }>('/api/sessions');
  return data.sessions;
};

export const createSessionRequest = async (payload: CreateSessionPayload) => {
  const { data } = await apiClient.post('/api/sessions', payload);
  return data;
};

export const updateSessionRequest = async (sessionId: number, payload: UpdateSessionPayload) => {
  const { data } = await apiClient.patch(`/api/sessions/${sessionId}`, payload);
  return data;
};

export const fetchCounselors = async (): Promise<Counselor[]> => {
  const { data } = await apiClient.get<{ counselors: Counselor[] }>('/api/counselors');
  return data.counselors;
};

export const fetchCounselorStudents = async (): Promise<StudentProfile[]> => {
  const { data } = await apiClient.get<{ students: StudentProfile[] }>('/api/counselors/students');
  return data.students;
};

export const updateCounselorProfileRequest = async (payload: Partial<Counselor>) => {
  const { data } = await apiClient.patch('/api/counselors/profile', payload);
  return data;
};

export const fetchResources = async (params?: { category?: string; type?: string }) => {
  const { data } = await apiClient.get<{ resources: Resource[] }>('/api/resources', {
    params: {
      category: params?.category,
      type: params?.type,
    },
  });
  return data.resources;
};

export const createResourceRequest = async (payload: CreateResourcePayload) => {
  const { data } = await apiClient.post('/api/resources', payload);
  return data;
};

export const trackResourceAccessRequest = async (resourceId: number) => {
  const { data } = await apiClient.post(`/api/resources/${resourceId}/access`);
  return data;
};

export const submitAssessmentRequest = async (assessmentType: string, responses: Record<string, unknown>) => {
  const { data } = await apiClient.post<{ results: AssessmentResults }>(
    '/api/students/assessment',
    {
      assessmentType,
      responses,
    },
  );
  return data.results;
};

export const fetchRecommendations = async (): Promise<Recommendation[]> => {
  const { data } = await apiClient.get<{ recommendations: Recommendation[] }>('/api/students/recommendations');
  return data.recommendations;
};

export const fetchGoals = async (): Promise<Goal[]> => {
  const { data } = await apiClient.get<{ goals: Goal[] }>('/api/students/goals');
  return data.goals;
};

export const createGoalRequest = async (payload: CreateGoalPayload) => {
  const { data } = await apiClient.post('/api/students/goals', payload);
  return data;
};

export const updateGoalRequest = async (goalId: number, payload: Partial<Goal>) => {
  const { data } = await apiClient.patch(`/api/students/goals/${goalId}`, payload);
  return data;
};

export const updateStudentProfileRequest = async (payload: {
  dateOfBirth?: string;
  gradeLevel?: string;
  interests?: string;
  careerGoals?: string;
}) => {
  const { data } = await apiClient.patch('/api/students/profile', payload);
  return data;
};

export const fetchAdminUsers = async (role?: string): Promise<UserSummary[]> => {
  const { data } = await apiClient.get<{ users: UserSummary[] }>('/api/admin/users', {
    params: { role },
  });
  return data.users;
};

export const fetchPlatformStats = async (): Promise<PlatformStats> => {
  const { data } = await apiClient.get<PlatformStats>('/api/admin/stats');
  return data;
};

export const verifyCounselorRequest = async (counselorId: number) => {
  const { data } = await apiClient.patch(`/api/admin/counselors/${counselorId}/verify`);
  return data;
};

export const updateUserStatusRequest = async (userId: number, isActive: boolean) => {
  const { data } = await apiClient.patch(`/api/admin/users/${userId}/status`, { isActive });
  return data;
};


