import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '../api/axios';


const IMAGENES = {
  // Proteinas
  'Protein Whey Coffee':    '/products/whey-coffee.png',
  'Protein Whey Chocolate': '/products/whey-chocolate.jpg',
  'Protein Whey Vanilla':   '/products/whey-vanilla.png',
  'Protein Cacahuetes':     '/products/cacahuetes.png',
  'Protein Avellanas':      '/products/avellanas.jpg',
  'Protein Stracciatella':  '/products/stracciatella.png',
  'Protein Coconut':        '/products/coconut.png',
  'Protein Pistacho':       '/products/pistacho.png',
  // Vitaminas
  'Vitamina Omega-3':    '/products/vitamina-omega3.jpg',
  'Vitamina Zinc':       '/products/vitamina-zinc.jpg',
  'Melatonina':          '/products/melatonina.jpg',
  'Vitamina Kidney':     '/products/vitamina-kidney.png',
  'Vitamina Magnesium':  '/products/vitamina-magnesium.png',
  'Protein Probiotic+':  '/products/protein-probiotic.jpg',
  // Barritas
  'Protein Whey Coffee Bar':   '/products/bar-whey-coffee.jpg',
  'Protein Cacahuetes Bar':    '/products/bar-cacahuetes.png',
  'Protein Avellanas Bar':     '/products/bar-avellanas.jpg',
  'Protein Stracciatella Bar': '/products/bar-stracciatella.jpg',
  'Protein Coconut Bar':       '/products/bar-coconut.png',
  'Protein Pistacho Bar':      '/products/bar-pistacho.png',
};


const CATEGORIAS = [
  { label: 'Proteinas', id: 5 },
  { label: 'Vitaminas', id: 6 },
  { label: 'Barritas',  id: 7 },
];

function ProductCard({ product }) {
  
  const [estrellas, setEstrellas] = useState(0);
  const imagen = product.imagen_url || IMAGENES[product.nombre_producto];
  const precio = parseFloat(product.precio).toFixed(2).replace('.', ',');
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/products/${product.id_producto}`)} className="rounded-2xl overflow-hidden cursor-pointer group bg-zinc-950" style={{ border: '1px solid #222' }}> 
      <div className="relative" style={{ height: '280px' }}>
        {imagen ? (
          <img
            src={imagen}
            alt={product.nombre_producto}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-gray-600 text-sm">
            Sin imagen
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      <div className="p-4 border-t" style={{ borderColor: '#222' }}>
        <p className="text-white font-bold mb-1">{product.nombre_producto}</p>
        <div className="flex gap-1 mb-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} onClick={() => setEstrellas(n)} className="cursor-pointer text-lg"
              style={{ color: n <= estrellas ? '#FBBF24' : '#4B5563' }}>&#9733;</span>
          ))}
        </div>
        <p className="text-white font-bold">&euro;{precio}</p>
      </div>
    </div>
  );
}

export default function Products() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [categoriaActiva, setCategoriaActiva] = useState(5);

  useEffect(() => {
    api.get('/api/products')
      .then((res) => setProductos(res.data.products || []))
      .catch(() => setError('No se pudieron cargar los productos.'))
      .finally(() => setCargando(false));
  }, []);

  const productosFiltrados = productos.filter((p) => p.id_categoria === categoriaActiva);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* COVER */}
      <div className="flex flex-col items-center justify-center py-14 gap-2">
        <h1 className="text-5xl font-black uppercase italic tracking-widest drop-shadow-lg">Productos</h1>
        <p className="text-white/60 text-sm tracking-wider uppercase">Suplementacion de elite</p>
      </div>

      { /* CATEGORIAS */}
      <div className="flex justify-center gap-3 pb-8">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoriaActiva(cat.id)}
            className="px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer"
            style={{
              background: categoriaActiva === cat.id ? '#fff' : 'transparent',
              color:      categoriaActiva === cat.id ? '#000' : '#fff',
              border:     '1px solid #fff',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        {cargando && <p className="text-center text-gray-400">Cargando productos...</p>}
        {error    && <p className="text-center text-red-400">{error}</p>}
        {!cargando && !error && productosFiltrados.length === 0 && (
          <p className="text-center text-white/40 tracking-widest uppercase text-sm py-20">Próximamente</p>
        )}
        {!cargando && !error && productosFiltrados.length > 0 && (
          <div className="grid grid-cols-3 gap-6">
            {productosFiltrados.map((producto) => (
              <ProductCard key={producto.id_producto} product={producto} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
