import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative h-screen w-full overflow-hidden">

      {/* ── Imagen de fondo del gimnasio ─────────────────────────────
          Cambia la ruta por la tuya, p.ej. src="/img/gym.jpg"       */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/fondogym.jpg')" }}
      />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/55" />

      {/* ── Contenido principal ──────────────────────────────────── */}
      <div className="relative z-10 h-full flex items-center px-16">
        <div className="max-w-lg">
          <h1 className="text-8xl sm:text-9xl font-black italic text-white uppercase leading-none mb-10 drop-shadow-lg">
            FITMEAL
          </h1>

          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="inline-block bg-red-700 hover:bg-red-800 text-white px-10 py-4 rounded-full text-lg font-semibold italic transition-colors shadow-lg"
            >
              Ir al Dashboard
            </Link>
          ) : (
            <Link
              to="/register"
              className="inline-block bg-red-700 hover:bg-red-800 text-white px-10 py-4 rounded-full text-lg font-semibold italic transition-colors shadow-lg"
            >
              Empieza tu recorrido
            </Link>
          )}
        </div>
      </div>

      {/* ── Imagen de la chica ────────────────────────────────────────
          Cambia la ruta por la tuya, p.ej. src="/img/woman.png"
          Usa una imagen recortada (sin fondo) para mejor resultado   */}
      <img
        src="/img/woman.png"
        alt=""
        className="absolute right-0 bottom-0 h-full object-contain object-bottom pointer-events-none select-none"
      />
    </div>
  );
}
