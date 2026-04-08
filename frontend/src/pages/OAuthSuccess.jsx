import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyOAuthLogin = async () => {
      try {
        const response = await api.get('/auth/verify');
        // Cookie was set by the backend, verify confirms it's valid
        if (response.data.user) {
          // Store user in localStorage so AuthContext picks it up on next mount
          localStorage.setItem('user', JSON.stringify(response.data.user));
          navigate('/', { replace: true });
        } else {
          navigate('/login', { replace: true });
        }
      } catch {
        navigate('/login', { replace: true });
      }
    };

    verifyOAuthLogin();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="text-center text-white">
        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p>Completando inicio de sesión...</p>
      </div>
    </div>
  );
}
