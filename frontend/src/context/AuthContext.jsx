import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Al montar, verificar sesión via cookie httpOnly
  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await api.get('/auth/verify');
        const verifiedUser = response.data.user;
        setUser(verifiedUser);
        localStorage.setItem('user', JSON.stringify(verifiedUser));
      } catch {
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignorar errores de red — limpiar estado igualmente
    } finally {
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login');
    }
  }, [navigate]);

  // Escuchar el evento auth:logout despachado por el interceptor 401 de axios
  useEffect(() => {
    const handleAuthLogout = () => logout();
    window.addEventListener('auth:logout', handleAuthLogout);
    return () => window.removeEventListener('auth:logout', handleAuthLogout);
  }, [logout]);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { user: userData } = response.data;

    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);

    return response.data;
  };

  const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    const { user: newUser } = response.data;

    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);

    return response.data;
  };

  // Usado por OAuthSuccess para inyectar user tras el callback externo
  const setTokenExternal = (_, userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const value = {
    user,
    token: null,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    setTokenExternal,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
