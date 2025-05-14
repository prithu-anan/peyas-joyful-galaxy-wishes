// src/components/Medical3DModel.tsx
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const Tool = ({
  path,
  clockwise = true,
  rotation = [0, 0, 0],
  scale = 1
}: {
  path: string
  clockwise?: boolean
  rotation?: [number, number, number]
  scale?: number
}) => {
  const ref = useRef<any>()
  const { scene } = useGLTF(path)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * (clockwise ? 0.3 : -0.3)
    }
  })

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={scale}
      position={[0, -1, 0]}
      rotation={rotation}
    />
  )
}

const tools = [
  { path: '/rigged_stethoscope/scene.gltf', clockwise: true, rotation: [20, 0, 0], scale: 9, offset: [-1.5, 0] },
  { path: '/vintage_injection_syringe/scene.gltf', clockwise: false, rotation: [-0.2, 0.3, 0.1], scale: 5, offset: [1, -0.2] },
  { path: '/heart/scene.gltf', clockwise: true, rotation: [0.1, -0.3, 0], scale: 0.3, offset: [-0.5, 2.0] },
  { path: '/human_skull/scene.gltf', clockwise: false, rotation: [0, 0, 0], scale: 1.0, offset: [1.3, 1.2] },
  { path: '/surgical_mask/scene.gltf', clockwise: true, rotation: [0.25, -0.15, 0], scale: 0.8, offset: [0.3, -1.2] }
]

const Medical3DModel = () => {
  return (
<div className="relative h-[350px] w-full">
  {tools.map((tool, i) => (
    <div
      key={i}
      className="absolute"
      style={{
        left: `${50 + tool.offset[0] * 20}%`,
        top: `${30 + tool.offset[1] * 20}%`,
        transform: 'translate(-50%, -50%)',
        width: '220px',
        height: '250px',
      }}
    >
      <Canvas camera={{ position: [0, 0.8, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <Suspense fallback={null}>
          <Tool
            path={tool.path}
            clockwise={tool.clockwise}
            rotation={[tool.rotation[0], tool.rotation[1], tool.rotation[2]]}
            scale={tool.scale}
          />
        </Suspense>
      </Canvas>
    </div>
  ))}
</div>

  )
}

export default Medical3DModel
