
import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function Stethoscope({ position, rotation }) {
  const mesh = useRef<THREE.Mesh>(null);
  const [hover, setHover] = useState(false);
  const rotationDirection = useRef(rotation.direction === 'clockwise' ? 0.01 : -0.01);

  useRef<number>(0);

  const headSize = 0.3;
  const tubeRadius = 0.04;
  const tubeCurveRadius = 0.6;
  
  return (
    <group position={[position.x, position.y, position.z]} rotation={[rotation.x, rotation.y, rotation.z]}>
      {/* Stethoscope head */}
      <mesh 
        ref={mesh}
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
      <mesh position={[-0.6, 0.5, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#9b87f5" />
      </mesh>
      
      <mesh position={[0.6, 0.5, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#9b87f5" />
      </mesh>
    </group>
  );
}

function Caduceus({ position, rotation }) {
  const group = useRef<THREE.Group>(null);
  const rotationDirection = useRef(rotation.direction === 'clockwise' ? 0.01 : -0.01);
  
  return (
    <group ref={group} position={[position.x, position.y, position.z]} rotation={[rotation.x, rotation.y, rotation.z]}>
      {/* Staff */}
      <mesh>
        <cylinderGeometry args={[0.05, 0.05, 1.8, 32]} />
        <meshStandardMaterial color="gold" />
      </mesh>
      
      {/* Wings */}
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="gold" />
      </mesh>
      
      {/* First snake */}
      <mesh position={[0.15, 0.2, 0]}>
        <torusGeometry args={[0.2, 0.05, 16, 100, Math.PI * 1.5]} />
        <meshStandardMaterial color="#0EA5E9" />
      </mesh>
      
      <mesh position={[0.15, 0.5, 0]}>
        <torusGeometry args={[0.2, 0.05, 16, 100, Math.PI * 1.5]} />
        <meshStandardMaterial color="#0EA5E9" />
      </mesh>
      
      {/* Second snake */}
      <mesh position={[-0.15, 0.3, 0]}>
        <torusGeometry args={[0.2, 0.05, 16, 100, Math.PI * 1.5]} />
        <meshStandardMaterial color="#F97316" />
      </mesh>
      
      <mesh position={[-0.15, 0.6, 0]}>
        <torusGeometry args={[0.2, 0.05, 16, 100, Math.PI * 1.5]} />
        <meshStandardMaterial color="#F97316" />
      </mesh>
    </group>
  );
}

function Microscope({ position, rotation }) {
  const group = useRef<THREE.Group>(null);
  const rotationDirection = useRef(rotation.direction === 'clockwise' ? 0.01 : -0.01);
  
  return (
    <group ref={group} position={[position.x, position.y, position.z]} rotation={[rotation.x, rotation.y, rotation.z]}>
      {/* Base */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 0.1, 32]} />
        <meshStandardMaterial color="#64748b" metalness={0.7} />
      </mesh>
      
      {/* Stand */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
        <meshStandardMaterial color="#475569" metalness={0.6} />
      </mesh>
      
      {/* Arm */}
      <mesh position={[0, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
        <meshStandardMaterial color="#475569" metalness={0.6} />
      </mesh>
      
      {/* Body */}
      <mesh position={[0.2, 0.1, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.3, 16]} />
        <meshStandardMaterial color="#0284c7" metalness={0.5} />
      </mesh>
      
      {/* Stage */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.3]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      
      {/* Eyepiece */}
      <mesh position={[0.2, 0.3, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.1, 16]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
    </group>
  );
}

function Syringe({ position, rotation }) {
  const group = useRef<THREE.Group>(null);
  const rotationDirection = useRef(rotation.direction === 'clockwise' ? 0.01 : -0.01);
  
  return (
    <group ref={group} position={[position.x, position.y, position.z]} rotation={[rotation.x, rotation.y, rotation.z]}>
      {/* Barrel */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.7, 16]} />
        <meshStandardMaterial color="#e2e8f0" transparent opacity={0.8} />
      </mesh>
      
      {/* Plunger */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
      
      {/* Needle */}
      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.2, 8]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
      </mesh>
      
      {/* Liquid */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.3, 16]} />
        <meshStandardMaterial color="#ec4899" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

function MedicalScene() {
  const group = useRef<THREE.Group>(null);
  
  // Rotate all models
  useRef<THREE.Mesh>(null);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#D946EF" />
      
      <group ref={group}>
        {/* Multiple models at different positions and rotations */}
        <Stethoscope 
          position={{ x: -1.5, y: 0, z: 0 }} 
          rotation={{ x: 0.3, y: 0.7, z: 0.1, direction: 'clockwise' }} 
        />
        <Caduceus 
          position={{ x: 1.5, y: 0.2, z: 0 }} 
          rotation={{ x: -0.2, y: -0.5, z: 0.1, direction: 'anticlockwise' }} 
        />
        <Microscope 
          position={{ x: 0, y: 0, z: -1 }} 
          rotation={{ x: 0.1, y: 0.8, z: 0.2, direction: 'clockwise' }} 
        />
        <Syringe 
          position={{ x: 0.8, y: -0.5, z: 0.5 }} 
          rotation={{ x: 0.5, y: 0.3, z: -0.2, direction: 'anticlockwise' }} 
        />
      </group>
      
      <OrbitControls enableZoom={false} />
    </>
  );
}

const Medical3DModel = () => {
  return (
    <motion.div 
      className="w-full h-64 md:h-80 rounded-xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <MedicalScene />
      </Canvas>
    </motion.div>
  );
};

export default Medical3DModel;
