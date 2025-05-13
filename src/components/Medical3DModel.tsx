
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function Stethoscope() {
  const mesh = useRef<THREE.Mesh>(null);
  const [hover, setHover] = useState(false);

  useFrame(() => {
    if (!mesh.current) return;
    mesh.current.rotation.y += 0.01;
  });

  const headSize = 0.4;
  const tubeRadius = 0.05;
  const tubeCurveRadius = 0.8;
  
  return (
    <group>
      {/* Stethoscope head */}
      <mesh 
        ref={mesh}
        position={[0, 0, 0]} 
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <cylinderGeometry args={[headSize, headSize, 0.15, 32]} />
        <meshStandardMaterial 
          color={hover ? "#D946EF" : "#9b87f5"} 
          metalness={0.5} 
          roughness={0.3} 
        />
      </mesh>
      
      {/* Tubing */}
      <mesh position={[0, 0.1, 0]}>
        <torusGeometry args={[tubeCurveRadius, tubeRadius, 16, 100, Math.PI]} />
        <meshStandardMaterial 
          color="#9b87f5" 
          metalness={0.2} 
          roughness={0.8} 
        />
      </mesh>
      
      {/* Ear pieces */}
      <mesh position={[-0.8, 0.7, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#9b87f5" />
      </mesh>
      
      <mesh position={[0.8, 0.7, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#9b87f5" />
      </mesh>
    </group>
  );
}

function Caduceus() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
  });
  
  return (
    <group ref={group} position={[0, -0.5, 0]}>
      {/* Staff */}
      <mesh>
        <cylinderGeometry args={[0.05, 0.05, 2, 32]} />
        <meshStandardMaterial color="gold" />
      </mesh>
      
      {/* Wings */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="gold" />
      </mesh>
      
      {/* First snake */}
      <mesh position={[0.15, 0.2, 0]}>
        <torusGeometry args={[0.2, 0.05, 16, 100, Math.PI * 1.5]} />
        <meshStandardMaterial color="#0EA5E9" />
      </mesh>
      
      <mesh position={[0.15, 0.6, 0]}>
        <torusGeometry args={[0.2, 0.05, 16, 100, Math.PI * 1.5]} />
        <meshStandardMaterial color="#0EA5E9" />
      </mesh>
      
      {/* Second snake */}
      <mesh position={[-0.15, 0.4, 0]}>
        <torusGeometry args={[0.2, 0.05, 16, 100, Math.PI * 1.5]} />
        <meshStandardMaterial color="#F97316" />
      </mesh>
      
      <mesh position={[-0.15, 0.8, 0]}>
        <torusGeometry args={[0.2, 0.05, 16, 100, Math.PI * 1.5]} />
        <meshStandardMaterial color="#F97316" />
      </mesh>
    </group>
  );
}

const Medical3DModel = () => {
  const [model, setModel] = useState<'stethoscope' | 'caduceus'>('stethoscope');

  return (
    <motion.div 
      className="w-full h-64 md:h-80 rounded-xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#D946EF" />
        
        {model === 'stethoscope' ? <Stethoscope /> : <Caduceus />}
        
        <OrbitControls enableZoom={false} />
      </Canvas>
      
      <div className="flex justify-center mt-4 gap-4">
        <button 
          className={`px-4 py-2 rounded-full text-white ${model === 'stethoscope' ? 'bg-birthday-purple' : 'bg-gray-400'}`}
          onClick={() => setModel('stethoscope')}
        >
          Stethoscope
        </button>
        <button 
          className={`px-4 py-2 rounded-full text-white ${model === 'caduceus' ? 'bg-birthday-teal' : 'bg-gray-400'}`}
          onClick={() => setModel('caduceus')}
        >
          Caduceus
        </button>
      </div>
    </motion.div>
  );
};

export default Medical3DModel;
