import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Ejercicios() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // 1. Cargar datos del ejercicio
    fetch(`http://localhost:3000/api/exercises/detail/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Ejercicio no encontrado');
        return res.json();
      })
      .then(data => {
        setExercise(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });

  }, [id]);

  if (loading) {
    return (
      <div className="h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white">
        <p className="text-primary font-black animate-pulse uppercase tracking-widest text-2xl">CARGANDO...</p>
      </div>
    );
  }

  if (error || !exercise) {
    return (
      <div className="h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-black italic mb-4 uppercase">Ejercicio no encontrado</h1>
        <button onClick={() => navigate(-1)} className="text-primary hover:underline font-black uppercase">Volver atrás</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-primary selection:text-black">
      {/* Botón Flotante para Volver */}
      <div className="fixed top-24 left-10 z-50">
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full hover:bg-primary hover:text-black transition-all duration-300"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span className="text-[10px] font-black uppercase tracking-widest">Volver</span>
        </button>
      </div>

      <main className="max-w-7xl mx-auto pt-40 pb-20 px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* COLUMNA IZQUIERDA: VISUAL */}
          <div className="sticky top-40 space-y-6">
            <div className="rounded-[40px] overflow-hidden border border-white/10 bg-[#121212] aspect-video relative group">
              <img 
                src={exercise.imagen || 'https://via.placeholder.com/800x600/121212/ffffff?text=Sin+Imagen'} 
                alt={exercise.titulo} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-1 bg-white/5 border border-white/5 p-6 rounded-3xl">
                <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-1">Dificultad</p>
                <p className="text-xl font-black italic uppercase text-primary">{exercise.dificultad}</p>
              </div>
              <div className="flex-1 bg-white/5 border border-white/5 p-6 rounded-3xl">
                <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-1">Tipo</p>
                <p className="text-xl font-black italic uppercase tracking-tighter">{exercise.tipo || "Fuerza / Hipertrofia"}</p>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: INFORMACIÓN */}
          <div className="space-y-12">
            <section>
              <h1 className="text-8xl font-black italic uppercase leading-[0.8] tracking-tighter mb-6">
                {exercise.titulo}
              </h1>
              <div className="h-1.5 w-40 bg-primary shadow-[0_0_30px_rgba(211,15,21,0.4)]"></div>
            </section>

            <section className="space-y-8">
              <div>
                <h3 className="text-primary font-black uppercase text-xs tracking-[0.3em] mb-4">Descripción Técnica</h3>
                <p className="text-white/50 text-xl leading-relaxed font-medium italic">
                  {exercise.descripcion || "Realiza el movimiento de forma controlada, manteniendo la tensión muscular durante todo el rango de movimiento. Enfócate en la conexión mente-músculo."}
                </p>
              </div>

              <div className="grid gap-4">
                <h3 className="text-primary font-black uppercase text-xs tracking-[0.3em] mb-2">Puntos Clave</h3>
                {(exercise.puntos_clave ? exercise.puntos_clave.split('|') : [
                  "Controlar la fase excéntrica (bajada).",
                  "Mantener el core estable en todo momento.",
                  "Evitar el uso de inercias o balanceos."
                ]).map((tip, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                    <span className="text-primary font-black italic">0{i+1}</span>
                    <p className="text-sm font-bold uppercase tracking-wide">{tip}</p>
                  </div>
                ))}
              </div>


            </section>
          </div>
        </div>
      </main>
    </div>
  );
}