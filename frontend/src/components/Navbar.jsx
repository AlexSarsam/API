import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const hideNav = ['/login', '/register', '/auth/success'].includes(location.pathname);

  if (hideNav) return null;

  return (
    <nav
      className={`${
        isHome
          ? 'absolute top-0 left-0 w-full z-20'
          : 'relative bg-gray-900 border-b border-gray-800'
      } px-8 py-5`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/FitMeal_logoblanco.png"
            alt="FitMeal"
            className="h-12 w-12 object-contain"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/products" className="text-white/80 hover:text-white text-sm font-medium italic transition-colors">
            Products
          </Link>
          <Link to="/dashboard" className="text-white/80 hover:text-white text-sm font-medium italic transition-colors">
            Dashboard
          </Link>
          <Link to="/plans" className="text-white/80 hover:text-white text-sm font-medium italic transition-colors">
            Plans
          </Link>
          <Link to="/recipes" className="text-white/80 hover:text-white text-sm font-medium italic transition-colors">
            Recipes
          </Link>
          <Link to="/workouts" className="text-white/80 hover:text-white text-sm font-medium italic transition-colors">
            Workouts
          </Link>
        </div>

        {/* Right side */}
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span className="text-white/80 text-sm italic">
              {user?.nombre || user?.email}
            </span>
            <button
              onClick={logout}
              className="border border-white text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="border border-white text-white px-8 py-2.5 rounded-full text-lg font-medium hover:bg-white hover:text-black transition-colors"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
