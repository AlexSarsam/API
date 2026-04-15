import React, { Suspense, useState, useLayoutEffect, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage } from "@react-three/drei";
import { Link } from "react-router-dom";

const CONFIG_CALIBRACION = {
  masculino: {
    brazoX: 0.22, // Pecho termina en 0.20-0.22
    hombroY: 0.43, // Corte entre hombro (0.46) y bíceps (0.37)
    pechoY: 0.37, // Base del pecho
    cinturaY: 0.05, // Entre abdomen (0.09) y cuádriceps (-0.03)
    rodillaY: -0.42, // Para separar cuádriceps de gemelos
  },
  femenino: {
    brazoX: 0.17, // Ella es más estrecha (pecho lateral 0.16)
    hombroY: 0.47, // Corte entre hombro (0.48) y bíceps (0.42)
    pechoY: 0.36, // Base del pecho
    cinturaY: 0.09, // Entre abdomen (0.12) y cuádriceps (0.06)
    rodillaY: -0.45, // Para separar cuádriceps de gemelos
  },
};

function Model({ url, onSelect, genero }) {
  const { scene } = useGLTF(url);

  const limites = CONFIG_CALIBRACION[genero];

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.material.color.set("#E8BEAC");

        obj.material.roughness = 0.6;
      }
    });
  }, [scene, url]);

  return (
    <primitive
      object={scene}
      onClick={(e) => {
        e.stopPropagation();
        const { x, y, z } = e.point;
        const absX = Math.abs(x);
        let nombreParte = "CUERPO_GENERAL";
        const esFrontal = z > -0.05;

        if (absX > limites.brazoX) {
          if (y > limites.hombroY) {
            nombreParte = "HOMBROS";
          } else if (y > 0.28) {
            nombreParte = esFrontal ? "BICEPS" : "TRICEPS";
          } else {
            nombreParte = "ANTEBRAZO";
          }
        } else {
          if (esFrontal) {
            if (y > limites.pechoY) nombreParte = "PECHO";
            else if (y > limites.cinturaY) nombreParte = "ABDOMEN";
            else if (y > limites.rodillaY) nombreParte = "CUADRICEPS";
            else nombreParte = "GEMELOS";
          } else {
            if (y > 0.18) nombreParte = "ESPALDA";
            else if (y > 0.1) nombreParte = "LUMBARES";
            else if (y > -0.1) nombreParte = "GLUTEOS";
            else if (y > limites.rodillaY) nombreParte = "FEMORAL";
            else nombreParte = "GEMELOS";
          }
        }

        console.log(`Parte del cuerpo: ${nombreParte} (Y: ${y.toFixed(2)})`);

        onSelect(nombreParte);
      }}
    />
  );
}

export default function Workouts() {
  const [seleccionado, setSeleccionado] = useState(null);
  const [genero, setGenero] = useState("masculino");

  const [ejercicios, setEjercicios] = useState([]);
  const [cargando, setCargando] = useState(false);

  const rutaModelo =
    genero === "masculino" ? "/glbs/hombre3D.glb" : "/glbs/mujer3D.glb";

  useEffect(() => {
    if (seleccionado) {
      setCargando(true);
      fetch(`http://localhost:3000/api/exercises/${seleccionado}`)
        .then((res) => res.json())
        .then((data) => {
          setEjercicios(data);
          setCargando(false);
        })
        .catch((err) => {
          console.error("Error en el fetch:", err);
          setCargando(false);
        });
    }
  }, [seleccionado]);

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] text-white font-sans overflow-hidden relative">
      <div className="absolute top-6 left-6 z-50 flex gap-2 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-xl">
        <button
          onClick={() => {
            setGenero("masculino");

            setSeleccionado(null);
          }}
          className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
            genero === "masculino"
              ? "bg-primary text-black shadow-lg shadow-primary/20"
              : "text-white/40 hover:text-white"
          }`}
        >
          MALE
        </button>

        <button
          onClick={() => {
            setGenero("femenino");

            setSeleccionado(null);
          }}
          className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
            genero === "femenino"
              ? "bg-primary text-black shadow-lg shadow-primary/20"
              : "text-white/40 hover:text-white"
          }`}
        >
          FEMALE
        </button>
      </div>

      <main className="flex flex-1 overflow-hidden relative w-full h-full">
        <div
          className={`relative transition-all duration-700 h-full ${seleccionado ? "w-1/2" : "w-full"}`}
        >
          <Canvas dpr={[1, 2]} camera={{ fov: 15 }}>
            <Suspense fallback={null}>
              <Stage environment="city" intensity={0.1} adjustCamera={true}>
                <Model
                  key={rutaModelo}
                  url={rutaModelo}
                  onSelect={setSeleccionado}
                  genero={genero}
                />
              </Stage>
            </Suspense>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              makeDefault
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
              enableDamping={true} // Activa la inercia
              dampingFactor={0.05} // Ajusta la suavidad (menor es más suave)
            />
          </Canvas>
        </div>

        {/* PANEL DERECHO CON DATOS DE LA DB */}
        <div
          className={`bg-[#0d0d0d] border-l border-white/5 transition-all duration-700 overflow-y-auto shadow-2xl ${seleccionado ? "w-1/2" : "w-0"}`}
        >
          {seleccionado && (
            <div className="p-12 min-w-[450px]">
              <button
                onClick={() => setSeleccionado(null)}
                className="text-white/30 hover:text-primary text-[10px] font-black mb-10 uppercase tracking-[0.2em]"
              >
                ← Back to Model
              </button>

              <div className="mb-12">
                <h2 className="text-6xl font-black italic uppercase leading-none tracking-tighter">
                  {seleccionado}
                </h2>
                <div className="h-1 w-80 bg-primary mt-4 mb-2"></div>
              </div>

              {cargando ? (
                <p className="animate-pulse text-primary font-black">
                  CARGANDO...
                </p>
              ) : (
                <div className="grid gap-8 pb-10">
                  {ejercicios.length > 0 ? (
                    ejercicios.map((ex) => (
                      <Link
                        to={`/ejercicios/${ex.id}`}
                        key={ex.id}
                        className="group block bg-[#141414] rounded-2xl overflow-hidden border border-white/5 hover:border-primary/40 transition-all duration-500"
                      >
                        <div className="h-44 bg-zinc-900 relative">
                          {/* CAMBIO: Usamos ex.imagen (nombre de tu columna en DB) */}
                          <img
                            src={
                              ex.imagen ||
                              `https://via.placeholder.com/500x300?text=${ex.titulo}`
                            }
                            className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all"
                            alt={ex.titulo}
                          />
                          <span className="absolute top-4 right-4 bg-black/80 px-3 py-1 rounded-full text-[9px] font-black uppercase italic">
                            {ex.dificultad}
                          </span>
                        </div>

                        <div className="p-6">
                          <h3 className="font-black italic uppercase text-xl group-hover:text-primary transition-colors">
                            {ex.titulo}
                          </h3>
                          <p className="text-white/20 text-[10px] mt-1 font-bold uppercase tracking-widest">
                            Ver detalles técnicos →
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-white/20 italic">
                      No hay ejercicios para este músculo todavía.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
