import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function RecetaDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [receta, setReceta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`http://localhost:3000/api/recipes/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Receta no encontrada');
        return res.json();
      })
      .then(data => {
        setReceta(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="h-screen bg-[#0a0a0a] flex items-center justify-center text-primary font-black uppercase text-2xl tracking-widest animate-pulse">CARGANDO...</div>;
  if (!receta) return <div className="h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white text-4xl font-black italic uppercase">Receta no encontrada <button onClick={() => navigate(-1)} className="mt-8 text-[12px] bg-primary text-black px-6 py-2 rounded-full not-italic">Volver</button></div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans pt-32 pb-20 px-6 selection:bg-primary selection:text-black">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate(-1)} className="group flex items-center gap-2 text-white/40 hover:text-primary font-black uppercase text-[10px] tracking-widest mb-10 transition-colors">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Volver a Recetas
        </button>
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* COLUMNA IZQUIERDA: IMAGEN */}
          <div className="sticky top-32 rounded-[40px] overflow-hidden border border-white/10 bg-[#121212] aspect-square relative group">
            <img 
               src={receta.imagen_url || 'https://via.placeholder.com/800'} 
               alt={receta.titulo} 
               className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700 hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80"></div>
            <span className="absolute top-6 right-6 bg-black/80 backdrop-blur-md px-5 py-2.5 rounded-full text-primary font-black uppercase tracking-widest text-[10px] shadow-lg border border-white/10">
              {receta.tiempo} MINUTOS
            </span>
          </div>

          {/* COLUMNA DERECHA: INFO Y MACROS */}
          <div className="space-y-12">
            <div>
              <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-[0.8] tracking-tighter mb-4">{receta.titulo}</h1>
              <div className="h-1.5 w-32 bg-primary shadow-[0_0_20px_rgba(211,15,21,0.4)] mb-3"></div>
              <p className="text-white/40 font-black tracking-widest uppercase text-sm">{receta.tipo}</p>
            </div>

            {/* SECCIÓN MACROS PENSADA AL DETALLE */}
            <div>
              <h3 className="text-white/30 font-black uppercase text-[10px] tracking-[0.3em] mb-4">Panel Nutricional</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/10 p-5 rounded-[20px] text-center hover:border-yellow-500/50 transition-colors">
                  <p className="text-white/30 text-[9px] uppercase font-black tracking-widest mb-1.5">Calorías</p>
                  <p className="text-yellow-500 font-black text-3xl italic">{receta.calorias}</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-[20px] text-center hover:border-primary/50 transition-colors">
                  <p className="text-white/30 text-[9px] uppercase font-black tracking-widest mb-1.5">Proteína</p>
                  <p className="text-primary font-black text-3xl italic">{receta.proteina}g</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-[20px] text-center hover:border-blue-400/50 transition-colors">
                  <p className="text-white/30 text-[9px] uppercase font-black tracking-widest mb-1.5">Carbos</p>
                  <p className="text-blue-400 font-black text-3xl italic">{receta.carbohidratos || '-'}g</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-[20px] text-center hover:border-green-400/50 transition-colors">
                  <p className="text-white/30 text-[9px] uppercase font-black tracking-widest mb-1.5">Grasas</p>
                  <p className="text-green-400 font-black text-3xl italic">{receta.grasas || '-'}g</p>
                </div>
              </div>
            </div>

            {/* SECCIÓN INGREDIENTES */}
            <div>
              <h3 className="text-white/30 font-black uppercase text-[10px] tracking-[0.3em] mb-4">Ingredientes Necesarios</h3>
              <ul className="grid gap-3">
                {(receta.ingredientes ? receta.ingredientes.split(',') : ['Ingredientes no definidos']).map((ing, i) => (
                  <li key={i} className="flex items-center gap-4 bg-[#121212] p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                    <span className="font-bold text-sm tracking-wide text-white/90">{ing.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* INSTRUCCIONES */}
            <div>
               <h3 className="text-white/30 font-black uppercase text-[10px] tracking-[0.3em] mb-4">Instrucciones de Preparación</h3>
               <div className="bg-[#121212] p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group hover:border-primary/20 transition-all">
                  <div className="absolute -top-10 -right-10 opacity-5 text-primary text-9xl font-black italic">!</div>
                  <p className="text-white/70 font-medium leading-relaxed relative z-10">
                     {receta.instrucciones || "Simplemente mezcla todos los ingredientes y cocínalos a tu gusto. ¡Buen provecho!"}
                  </p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
