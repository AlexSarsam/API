import React, { Suspense, useState, useLayoutEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage } from "@react-three/drei";
import { EXERCISES_DB } from "../data/exercises.js";
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

  const muscleData = seleccionado ? EXERCISES_DB[seleccionado] : null;
  const rutaModelo =
    genero === "masculino" ? "/glbs/hombre3D.glb" : "/glbs/mujer3D.glb";

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
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
              makeDefault
            />
          </Canvas>
        </div>

        <div
          className={`bg-[#0d0d0d] border-l border-white/5 transition-all duration-700 overflow-y-auto shadow-2xl ${seleccionado ? "w-1/2" : "w-0"}`}
        >
          {muscleData && (
            <div className="p-12 min-w-[450px]">
              <button
                onClick={() => setSeleccionado(null)}
                className="group flex items-center gap-2 text-white/30 hover:text-primary text-[10px] font-black mb-10 uppercase tracking-[0.2em] transition-all"
              >
                <span className="text-sm  transition-transform">←</span>
                Back to Model
              </button>

              <div className="mb-12">
                <h2 className="text-6xl font-black italic uppercase leading-none tracking-tighter">
                  {muscleData.name}
                </h2>
                <div className="h-1 w-80 bg-primary mt-4 mb-2"></div>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">
                  {muscleData.muscleGroup}
                </p>
              </div>

              <div className="grid gap-8 pb-10">
                {muscleData.list.map((ex) => (
                  <Link
                    to={`/ejercicios/${ex.id}`}
                    key={ex.id}
                    className="group block bg-[#141414] rounded-2xl overflow-hidden border border-white/5 hover:border-primary/40 transition-all duration-500 cursor-pointer shadow-lg"
                  >
                    <div className="h-44 bg-zinc-900 relative">
                      <img
                        src={
                          ex.image ||
                          `https://via.placeholder.com/500x300/141414/ffffff?text=${ex.title}`
                        }
                        className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                        alt={ex.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent opacity-60"></div>
                      <span className="absolute top-4 right-4 bg-black/80 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border border-white/10 italic">
                        {ex.difficulty}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-center">
                        <h3 className="font-black italic uppercase text-xl group-hover:text-primary transition-colors">
                          {ex.title}
                        </h3>
                        <span className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                          →
                        </span>
                      </div>
                      <p className="text-white/20 text-[10px] mt-1 font-bold uppercase tracking-widest leading-none">
                        Click para ver detalles técnicos
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
