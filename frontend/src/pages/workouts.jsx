import React, { Suspense, useState, useLayoutEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage } from "@react-three/drei";
import { EXERCISES_DB } from "../data/exercises.js";

function Model({ url, onSelect }) {
  const { scene } = useGLTF(url);

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

  if (absX > 0.22) {
    if (y > 0.43) { 
      nombreParte = "HOMBROS";
    } else {
      nombreParte = z > -0.05 ? "BICEPS" : "TRICEPS";
    }
  } 
  else {
    const esFrontal = z > -0.02; 

    if (esFrontal) {
      if (y > 0.38) {
        nombreParte = "PECHO";
      } else if (y > 0.05) {
        nombreParte = "ABDOMEN";
      } else {
        nombreParte = "CUADRICEPS";
      }
    } else {
      if (y > 0.38) {
        nombreParte = "ESPALDA";
      } else if (y > 0.05) {
        nombreParte = "LUMBARES";
      } else {
        nombreParte = "GLUTEOS";
      }
    }
  }

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
          {" "}
          MALE{" "}
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
          {" "}
          FEMALE{" "}
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
                <span className="text-sm group-hover:-translate-x-1 transition-transform">
                  ←
                </span>{" "}
                Back to Model
              </button>

              <div className="mb-12">
                <h2 className="text-6xl font-black italic uppercase leading-none tracking-tighter">
                  {muscleData.name}
                </h2>
                <div className="h-1 w-90 bg-primary mt-4 mb-2"></div>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">
                  {muscleData.muscleGroup}
                </p>
              </div>

              <div className="grid gap-8">
                {muscleData.list.map((ex) => (
                  <div
                    key={ex.id}
                    className="group bg-[#141414] rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500"
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
                      <span className="absolute top-4 right-4 bg-black/80 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border border-white/10">
                        {ex.difficulty}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-black italic uppercase text-xl group-hover:text-primary transition-colors">
                        {ex.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #D30F15; }
      `,
        }}
      />
    </div>
  );
}
