import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/glbs/cuerpoHumano2.glb');
  return <primitive object={scene} />;
}

export default function Workouts() {
  return (
    <div className="h-screen w-full bg-slate-900">
      <Canvas dpr={[1, 2]} camera={{ fov: 15 }}>
        <color attach="background" args={['#101010']} />
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.1}>
            <Model />
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
  );
}