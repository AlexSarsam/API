import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function OAuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setTokenExternal } = useAuth();
  const processed = useRef(false);
  const token = searchParams.get('token');

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;

    if (!token) {
      setTimeout(() => navigate('/login', { replace: true }), 50);
      return;
    }

    localStorage.setItem('token', token);

    api.get('/auth/verify', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setTokenExternal(token, res.data.user);
        navigate('/', { replace: true });
      })
      .catch(() => {
        localStorage.removeItem('token');
        setTimeout(() => navigate('/login', { replace: true }), 50);
      });
  }, [token, navigate, setTokenExternal]);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <p className="text-red-400 text-lg">Token no encontrado. Redirigiendo...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white text-lg">Iniciando sesión...</p>
      </div>
    </div>
  );
}
