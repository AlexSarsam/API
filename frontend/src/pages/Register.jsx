import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    fecha_nacimiento: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor introduce un email válido');
      return;
    }

    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...dataToSend } = formData;
      await register(dataToSend);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors";

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: "url('/fondologin2.jpg')" }}
    >
      {/* Card contenedor de 2 columnas — invertido respecto al Login */}
      <div className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex min-h-[600px]">

        {/* ── Panel izquierdo: formulario ── */}
        <div className="flex flex-col justify-center w-full md:w-1/2 bg-gray-950/85 backdrop-blur-sm p-10 overflow-y-auto">
          {/* Cabecera */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Crear cuenta</h1>
            <span className="text-gray-500 text-sm cursor-pointer hover:text-gray-300 transition-colors">¿Necesitas ayuda?</span>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-900/40 border border-red-700/60 text-red-300 px-4 py-3 rounded-xl mb-5 text-sm">
              {error}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Nombre y Apellidos */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="nombre" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                  Nombre *
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="apellidos" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                  Apellidos
                </label>
                <input
                  id="apellidos"
                  name="apellidos"
                  type="text"
                  value={formData.apellidos}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Tus apellidos"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                Correo electrónico *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="nombre@ejemplo.com"
              />
            </div>

            {/* Password y Confirmar */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                  Contraseña *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Mín. 8 caracteres"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                  Confirmar *
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Repetir"
                />
              </div>
            </div>

            {/* Telefono y Fecha nacimiento */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="telefono" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="612345678"
                />
              </div>
              <div>
                <label htmlFor="fecha_nacimiento" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                  Fecha nacimiento
                </label>
                <input
                  id="fecha_nacimiento"
                  name="fecha_nacimiento"
                  type="date"
                  value={formData.fecha_nacimiento}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white hover:bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 py-3 rounded-xl font-bold transition-colors cursor-pointer mt-2"
            >
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-gray-500 mt-6 text-sm">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-white font-bold hover:text-gray-300 transition-colors">
              Inicia sesión
            </Link>
          </p>
        </div>

        {/* ── Panel derecho: branding ── */}
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
              Únete a<br />FitMeal
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Crea tu cuenta y empieza hoy mismo tu camino hacia una vida más saludable.
              Planifica comidas, sigue tu nutrición y alcanza tus metas.
            </p>
          </div>

          {/* Footer legal */}
          <div className="flex gap-4 text-gray-500 text-xs">
            <span className="cursor-pointer hover:text-gray-300 transition-colors">Política de privacidad</span>
            <span>•</span>
            <span className="cursor-pointer hover:text-gray-300 transition-colors">Términos de uso</span>
          </div>
        </div>

      </div>
    </div>
  );
}
