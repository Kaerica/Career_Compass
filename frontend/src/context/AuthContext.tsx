import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  UserProfile,
} from '../types/api';
import {
  getProfile,
  loginRequest,
  registerRequest,
} from '../api';

type AuthContextState = {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextState | null>(null);

const mapUser = (authResponse: AuthResponse | { user: UserProfile }) => ({
  ...authResponse.user,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('career_compass_token'));
  const [isLoading, setIsLoading] = useState(true);

  const persistToken = useCallback((value: string | null) => {
    setToken(value);
    if (value) {
      localStorage.setItem('career_compass_token', value);
    } else {
      localStorage.removeItem('career_compass_token');
    }
  }, []);

  const handleAuthSuccess = useCallback((response: AuthResponse) => {
    persistToken(response.token);
    setUser(mapUser(response));
  }, [persistToken]);

  const login = useCallback(async (payload: LoginPayload) => {
    const response = await loginRequest(payload);
    handleAuthSuccess(response);
  }, [handleAuthSuccess]);

  const register = useCallback(async (payload: RegisterPayload) => {
    const response = await registerRequest(payload);
    handleAuthSuccess(response);
  }, [handleAuthSuccess]);

  const refreshProfile = useCallback(async () => {
    if (!token) return;
    try {
      const profile = await getProfile();
      setUser(profile);
    } catch (error) {
      console.error('Unable to refresh profile', error);
      persistToken(null);
      setUser(null);
    }
  }, [token, persistToken]);

  const logout = useCallback(() => {
    persistToken(null);
    setUser(null);
  }, [persistToken]);

  useEffect(() => {
    const hydrate = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (error) {
        console.error('Session expired', error);
        persistToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    hydrate();
  }, [token, persistToken]);

  const value = useMemo(() => ({
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    refreshProfile,
  }), [user, token, isLoading, login, register, logout, refreshProfile]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return ctx;
};


