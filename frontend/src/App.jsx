import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Workouts from "./pages/workouts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/products";
import OAuthSuccess from "./pages/OAuthSuccess";
import ProductDetail from "./pages/ProductDetail";
import Ejercicios from "./pages/ejercicios/Ejercicios";
import Recetas from "./pages/Recetas";
import RecetaDetalle from "./pages/RecetaDetalle";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/success" element={<OAuthSuccess />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/ejercicios/:id" element={<Ejercicios />} />
            <Route path="/recetas" element={<Recetas />} />
            <Route path="/recetas/:id" element={<RecetaDetalle />} />
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center bg-gray-950">
                  <div className="text-center text-white">
                    <h1 className="text-6xl font-bold mb-4">404</h1>
                    <p className="text-xl mb-6">Página no encontrada</p>
                    <a
                      href="/"
                      className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition-colors"
                    >
                      Volver al inicio
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
