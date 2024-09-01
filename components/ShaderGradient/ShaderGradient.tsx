'use client';

import { Canvas } from '@react-three/fiber';
import { ShaderGradient } from 'shadergradient';

export default function ClientShaderGradient() {
  return (
    <Canvas
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
      camera={{ position: [0, 0, 5] }}
    >
      <ShaderGradient
        color1="#26ff2d"
        color2="#029100"
        color3="#06a700"
        animate="on"
        uSpeed={0.2}
        uDensity={2.5}
        uStrength={3}
        uFrequency={3.5}
        uAmplitude={2}
        cAzimuthAngle={180}
        cPolarAngle={90}
        cDistance={1.5}
        cameraZoom={1}
        lightType="3d"
        brightness={1.2}
        zoomOut={false}
      />
    </Canvas>
  );
}
