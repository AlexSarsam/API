import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('error') === 'oauth_failed') {
      setError('Error al iniciar sesión con proveedor externo. Inténtalo de nuevo.');
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: "url('/fondologin2.jpg')" }}
    >
      {/* Card contenedor de 2 columnas */}
      <div className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex min-h-[560px]">

        {/* ── Panel izquierdo: branding ── */}
        <div className="hidden md:flex flex-col justify-between w-1/2 bg-gray-900/70 backdrop-blur-sm p-10">
          {/* Atrás + Logo */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium w-fit"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Atrás
            </button>
            <img
              src="/FitMeal_logoblanco.png"
              alt="FitMeal"
              className="h-14 w-14 object-contain"
            />
          </div>

          {/* Texto central */}
          <div>
            <h2 className="text-5xl font-black text-white uppercase leading-tight tracking-tight mb-4">
              Bienvenido<br />a FitMeal
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Tu viaje personalizado hacia una alimentación saludable empieza aquí.
              Planifica comidas, sigue tu nutrición y vive mejor.
            </p>
          </div>

          {/* Footer legal */}
          <div className="flex gap-4 text-gray-500 text-xs">
            <span className="cursor-pointer hover:text-gray-300 transition-colors">Política de privacidad</span>
            <span>•</span>
            <span className="cursor-pointer hover:text-gray-300 transition-colors">Términos de uso</span>
          </div>
        </div>

        {/* ── Panel derecho: formulario ── */}
        <div className="flex flex-col justify-center w-full md:w-1/2 bg-gray-950/85 backdrop-blur-sm p-10">
          {/* Cabecera */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-white">Iniciar sesion</h1>
            <span className="text-gray-500 text-sm cursor-pointer hover:text-gray-300 transition-colors">¿Necesitas ayuda?</span>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-900/40 border border-red-700/60 text-red-300 px-4 py-3 rounded-xl mb-5 text-sm">
              {error}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                placeholder="nombre@ejemplo.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  Contraseña
                </label>
                <span className="text-xs text-gray-500 hover:text-gray-300 cursor-pointer transition-colors">¿Olvidaste?</span>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white hover:bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 py-3 rounded-xl font-bold transition-colors cursor-pointer mt-2"
            >
              {loading ? 'Iniciando sesion...' : 'Iniciar sesion'}
            </button>
          </form>

          {/* Separador */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-4 text-gray-600 text-xs uppercase tracking-widest">O</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3">
            <a
              href={`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/google`}
              className="flex items-center justify-center gap-3 w-full bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700 text-white py-3 rounded-xl font-medium transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuar con Google
            </a>
            <a
              href={`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/github`}
              className="flex items-center justify-center gap-3 w-full bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700 text-white py-3 rounded-xl font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Continuar con GitHub
            </a>
          </div>

          {/* Register link */}
          <p className="text-center text-gray-500 mt-6 text-sm">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-white font-bold hover:text-gray-300 transition-colors">
              Registrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
