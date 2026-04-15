import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { to: '/workouts', label: 'Workouts' },
  {to: '/recetas', label: 'Recetas'},
  {to: '/products', label: 'Products'},
];

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
      <div className="flex items-center justify-between relative w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/FitMeal_logoblanco.png"
            alt="FitMeal"
            className="h-12 w-12 object-contain"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(({ to, label }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className="relative text-sm font-medium italic transition-colors group flex flex-col items-center gap-1"
                style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.7)' }}
              >
                {label}
                <span
                  className="block h-[2px] rounded-full transition-all duration-300"
                  style={{
                    width: isActive ? '100%' : '0%',
                    backgroundColor: '#d30f15',
                    boxShadow: isActive ? '0 0 8px rgba(211,15,21,0.7)' : 'none',
                  }}
                />
                {/* hover bar for non-active */}
                {!isActive && (
                  <span className="block h-[2px] w-0 group-hover:w-full rounded-full bg-white/40 transition-all duration-300 absolute bottom-0" />
                )}
              </Link>
            );
          })}
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
