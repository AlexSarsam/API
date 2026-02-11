import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gray-950 px-4">
      {/* Hero Section */}
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
          Fit<span className="text-green-400">Meal</span>
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Tu plataforma de fitness personalizada. Ejercicios, comidas y planes adaptados a ti.
        </p>

        {isAuthenticated ? (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Bienvenido, <span className="text-green-400">{user?.nombre}</span>
            </h2>
            <p className="text-gray-400 mb-6">Tu sesion esta activa</p>
            <div className="grid gap-3">
              <div className="bg-gray-800 rounded-lg p-4 text-left">
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white">{user?.email}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 text-left">
                <p className="text-gray-400 text-sm">Rol</p>
                <p className="text-white">{user?.rol === 1 ? 'Administrador' : 'Usuario'}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl text-lg font-medium transition-colors"
            >
              Empezar ahora
            </Link>
            <Link
              to="/login"
              className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white px-8 py-3 rounded-xl text-lg font-medium transition-colors"
            >
              Ya tengo cuenta
            </Link>
          </div>
        )}
      </div>

      {/* Features */}
      {!isAuthenticated && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mt-16">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">&#128170;</div>
            <h3 className="text-white font-semibold mb-2">Ejercicios personalizados</h3>
            <p className="text-gray-400 text-sm">Rutinas adaptadas a tu nivel y objetivos</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">&#127858;</div>
            <h3 className="text-white font-semibold mb-2">Planes de comida</h3>
            <p className="text-gray-400 text-sm">Nutricion optimizada para tus metas</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">&#127942;</div>
            <h3 className="text-white font-semibold mb-2">Productos fitness</h3>
            <p className="text-gray-400 text-sm">Suplementos y proteinas de calidad</p>
          </div>
        </div>
      )}
    </div>
  );
}
