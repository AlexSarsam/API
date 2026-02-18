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

    // Validar passwords
    if (formData.password !== formData.confirmPassword) {
      setError('Las contrasenas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contrasena debe tener al menos 6 caracteres');
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

  const inputClass = "w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors";

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-950 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Crear cuenta</h1>
            <p className="text-gray-400">Unete a FitMeal</p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-gray-800 border border-gray-700 text-gray-300 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre y Apellidos */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-300 mb-1">
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
                <label htmlFor="apellidos" className="block text-sm font-medium text-gray-300 mb-1">
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="tu@email.com"
              />
            </div>

            {/* Password y Confirmar */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Contrasena *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Min. 6 caracteres"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
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
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-300 mb-1">
                  Telefono
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
                <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-gray-300 mb-1">
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
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors mt-2 cursor-pointer"
            >
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-gray-400 mt-6 text-sm">
            Ya tienes cuenta?{' '}
            <Link to="/login" className="text-red-500 hover:text-red-400 font-medium">
              Inicia sesion
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
