import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Molecule = ({ position, color, size = 1 }) => {
  const mesh = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    mesh.current.rotation.y = Math.cos(t * 0.5) * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          speed={3}
          distort={0.3}
          radius={size}
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const Connection = ({ start, end }) => {
  const mesh = useRef();
  
  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ], [start, end]);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);

  return (
    <mesh ref={mesh}>
      <tubeGeometry args={[curve, 20, 0.05, 8, false]} />
      <meshStandardMaterial color="#00F2FF" transparent opacity={0.3} />
    </mesh>
  );
};

const HeroScene = () => {
  const group = useRef();

  useFrame((state) => {
    const { x, y } = state.mouse;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.2, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.2, 0.05);
  });

  const molecules = [
    { pos: [0, 0, 0], color: "#00F2FF", size: 0.8 },
    { pos: [2, 1.5, -1], color: "#00E5FF", size: 0.5 },
    { pos: [-2, -1, 1], color: "#3b82f6", size: 0.4 },
    { pos: [1, -2, -2], color: "#00F2FF", size: 0.3 },
    { pos: [-1.5, 2, 0], color: "#00E5FF", size: 0.4 },
  ];

  return (
    <group ref={group}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00F2FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      
      {molecules.map((m, i) => (
        <Molecule key={i} position={m.pos} color={m.color} size={m.size} />
      ))}
      
      <Connection start={[0, 0, 0]} end={[2, 1.5, -1]} />
      <Connection start={[0, 0, 0]} end={[-2, -1, 1]} />
      <Connection start={[0, 0, 0]} end={[1, -2, -2]} />
      <Connection start={[0, 0, 0]} end={[-1.5, 2, 0]} />
    </group>
  );
};

export default HeroScene;
