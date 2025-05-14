import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

const CakeModel = () => {
  const tiltGroup = useRef<any>()
  const spinGroup = useRef<any>()
  const { scene } = useGLTF('/cake/scene.gltf')

  useFrame((_, delta) => {
    if (spinGroup.current) {
      spinGroup.current.rotation.y += delta * 0.5
    }
  })

  return (
    <group ref={tiltGroup} rotation={[Math.PI / 4, 0, 0]}>
      <group ref={spinGroup}>
        <primitive object={scene} scale={1.5} position={[0, 0.5, 0]} />
      </group>
    </group>
  )
}

useGLTF.preload('/cake/scene.gltf')
export default CakeModel
