// src/components/CakeCanvas.tsx
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import CakeModel from './CakeModel'

const CakeCanvas = () => {
  return (
    <Canvas
      frameloop="always"
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, 600], fov: 50, near: 0.1, far: 1000 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1} position={[5, 5, 5]} castShadow />
      <Suspense fallback={null}>
        <OrbitControls enableZoom={false} autoRotate />
        <CakeModel />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}

export default CakeCanvas
