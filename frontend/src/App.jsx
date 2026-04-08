import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Workouts from './pages/Workouts';
import Login from './pages/Login';
import Register from './pages/Register';
import OAuthSuccess from './pages/OAuthSuccess';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/success" element={<OAuthSuccess />} />
          <Route path="/workouts" element={
            <ProtectedRoute>
              <Workouts />
            </ProtectedRoute>
          } />
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-950">
              <div className="text-center text-white">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <p className="text-xl mb-6">Página no encontrada</p>
                <a href="/" className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition-colors">
                  Volver al inicio
                </a>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
