import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; //
import api from '../api/axios';


const IMAGENES = {
  'Protein Whey Coffee':       '/products/whey-coffee.png',
  'Protein Whey Chocolate':    '/products/whey-chocolate.jpg',
  'Protein Whey Vanilla':      '/products/whey-vanilla.png',
  'Protein Cacahuetes':        '/products/cacahuetes.png',
  'Protein Avellanas':         '/products/avellanas.jpg',
  'Protein Stracciatella':     '/products/stracciatella.png',
  'Protein Coconut':           '/products/coconut.png',
  'Protein Pistacho':          '/products/pistacho.png',
  'Vitamina Omega-3':          '/products/vitamina-omega3.jpg',
  'Vitamina Zinc':             '/products/vitamina-zinc.jpg',
  'Melatonina':                '/products/melatonina.jpg',
  'Vitamina Kidney':           '/products/vitamina-kidney.png',
  'Vitamina Magnesium':        '/products/vitamina-magnesium.png',
  'Protein Probiotic+':        '/products/protein-probiotic.jpg',
  'Protein Whey Coffee Bar':   '/products/bar-whey-coffee.jpg',
  'Protein Cacahuetes Bar':    '/products/bar-cacahuetes.png',
  'Protein Avellanas Bar':     '/products/bar-avellanas.jpg',
  'Protein Stracciatella Bar': '/products/bar-stracciatella.jpg',
  'Protein Coconut Bar':       '/products/bar-coconut.png',
  'Protein Pistacho Bar':      '/products/bar-pistacho.png',
};


const OPCIONES_CATEGORIA = {
  5: {
    tieneSabor:  true,
    sabores:     ['Chocolate', 'Vainilla', 'Fresa', 'Cookies & Cream', 'Natural', 'Caramelo'],
    tallas:      ['500g', '1kg', '2kg', '5kg'],
    labelTallas: 'Cantidad',
  },
  6: {
    tieneSabor:  false,
    sabores:     [],
    tallas:      ['30 cáps', '60 cáps', '90 cáps', '180 cáps'],
    labelTallas: 'Unidades',
  },
  7: {
    tieneSabor:  true,
    sabores:     ['Chocolate', 'Vainilla', 'Caramelo', 'Stracciatella', 'Coco'],
    tallas:      ['1 ud', 'Caja 6', 'Caja 12', 'Caja 24'],
    labelTallas: 'Formato',
  },
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto]   = useState(null);
  const [cargando, setCargando]   = useState(true);
  const [estrellas, setEstrellas] = useState(4);
  const [talla, setTalla]         = useState('');

  // Cuando carga la página, pedimos el producto a la API por su ID
  useEffect(() => {
    api.get(`/api/products/${id}`)
      .then((res) => {
        const p = res.data.product;
        setProducto(p);
        const opciones = OPCIONES_CATEGORIA[p.id_categoria] || OPCIONES_CATEGORIA[5];
        setTalla(opciones.tallas[1] || opciones.tallas[0]);
      })
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center text-sm uppercase tracking-widest">
      Cargando...
    </div>
  );

  if (!producto) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center text-sm uppercase tracking-widest">
      Producto no encontrado
    </div>
  );

  const opciones = OPCIONES_CATEGORIA[producto.id_categoria] || OPCIONES_CATEGORIA[5];
  const imagen = producto.imagen_url || IMAGENES[producto.nombre_producto];
  const precio   = parseFloat(producto.precio).toFixed(2);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Botón volver */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <button
          onClick={() => navigate('/products')}
          className="text-white/40 hover:text-white text-xs uppercase tracking-widest transition-colors cursor-pointer"
        >
          ← Volver
        </button>
      </div>

      {/* Página: imagen izquierda + panel derecho */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 gap-16 items-start">

        {/* Imagen del producto */}
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #222', height: '520px' }}>
          {imagen ? (
            <img src={imagen} alt={producto.nombre_producto} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-gray-600 text-sm">
              Sin imagen
            </div>
          )}
        </div>

        {/* Panel de compra */}
        <div className="flex flex-col gap-7">

          {/* Nombre y descripción */}
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-wide leading-tight">
              {producto.nombre_producto}
            </h1>
            {producto.descripcion && (
              <p className="text-white/50 text-sm mt-3 leading-relaxed">{producto.descripcion}</p>
            )}
          </div>

          {/* Valoración con estrellas */}
          <div className="flex gap-1 items-center">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                onClick={() => setEstrellas(n)}
                className="cursor-pointer text-xl"
                style={{ color: n <= estrellas ? '#FBBF24' : '#374151' }}
              >
                &#9733;
              </span>
            ))}
            <span className="text-white/30 text-xs ml-2 uppercase tracking-widest">{estrellas}/5</span>
          </div>


          {/* Selector de cantidad */}
          <div>
            <p className="text-xs uppercase tracking-widest text-white/40 mb-3">{opciones.labelTallas}</p>
            <div className="flex gap-3">
              {opciones.tallas.map((t) => (
                <button
                  key={t}
                  onClick={() => setTalla(t)}
                  className="flex-1 py-2 rounded-xl text-sm font-bold uppercase tracking-widest transition-all cursor-pointer"
                  style={{
                    background: talla === t ? '#fff' : 'transparent',
                    color:      talla === t ? '#000' : '#fff',
                    border:     '1px solid ' + (talla === t ? '#fff' : '#333'),
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Precio y botón de compra */}
          <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #222' }}>
            <p className="text-4xl font-black">{precio} €</p>
            <button
              className="px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm cursor-pointer hover:opacity-90 transition-all"
              style={{ background: '#fff', color: '#000' }}
            >
              Añadir al carrito
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
