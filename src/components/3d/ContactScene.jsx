import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

const ContactScene = () => {
  const mesh = useRef();
  const wireframe = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.2;
      mesh.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05);
    }
    if (wireframe.current) {
      wireframe.current.rotation.y = -t * 0.1;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00F2FF" />
      
      <Float speed={3} rotationIntensity={1} floatIntensity={1}>
        <Icosahedron ref={mesh} args={[1, 15]}>
          <MeshDistortMaterial
            color="#00F2FF"
            speed={2}
            distort={0.4}
            radius={1}
            emissive="#00F2FF"
            emissiveIntensity={0.2}
            roughness={0.1}
            metalness={0.9}
          />
        </Icosahedron>
        
        <Icosahedron ref={wireframe} args={[1.2, 2]}>
          <meshStandardMaterial
            color="#00F2FF"
            wireframe
            transparent
            opacity={0.1}
          />
        </Icosahedron>
      </Float>
    </group>
  );
};

export default ContactScene;
