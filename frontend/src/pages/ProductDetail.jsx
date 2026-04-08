import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

export default function ProductDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    api.get(`/api/products/${id}`)
      .then((res) => setProducto(res.data.product))
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Cargando...</div>;
  if (!producto) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Producto no encontrado</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      <p>Hola, soy el producto {producto.nombre_producto}</p>
    </div>
  );
}
