import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Torus, Cylinder, Cone, Octahedron } from '@react-three/drei';
import { TextureLoader } from 'three';
import './App.css'; // File C        <p className="footer-text">🌌 3D Galaxy Formation • Multiple shapes orbiting</p>S cơ bản để tùy chỉnh nền
import myImage from './assets/my-image.jpg';
import myImage2 from './assets/my-image2.jpg';

// Component hiển thị nhiều hình 3D với ảnh - Galaxy Animation
function GalaxyFormation({ imageUrl }) {
  const groupRef = useRef();
  const box1Ref = useRef();
  const box2Ref = useRef();
  const sphereRef = useRef();
  const cylinderRef = useRef();
  const coneRef = useRef();
  const octahedronRef = useRef();
  const [hovered, setHover] = useState(false);

  // Load ảnh làm texture
  const texture = useLoader(TextureLoader, imageUrl);

  // Galaxy formation animation - các hình quay quanh nhau như thiên hà
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
    }

    // Central rotating cubes
    if (box1Ref.current) {
      box1Ref.current.position.x = Math.cos(time) * 3;
      box1Ref.current.position.y = Math.sin(time * 1.5) * 2;
      box1Ref.current.position.z = Math.sin(time) * 1.5;
      box1Ref.current.rotation.x = time * 2;
      box1Ref.current.rotation.y = time * 1.5;
    }

    if (box2Ref.current) {
      box2Ref.current.position.x = Math.cos(time + Math.PI) * 3;
      box2Ref.current.position.y = Math.sin(time * 1.5 + Math.PI) * 2;
      box2Ref.current.position.z = Math.sin(time + Math.PI) * 1.5;
      box2Ref.current.rotation.x = time * -1.5;
      box2Ref.current.rotation.z = time * 2;
    }

    // Orbiting sphere
    if (sphereRef.current) {
      sphereRef.current.position.x = Math.cos(time * 2) * 5;
      sphereRef.current.position.y = Math.sin(time * 0.8) * 3;
      sphereRef.current.position.z = Math.sin(time * 1.2) * 2;
      sphereRef.current.rotation.y = time * 3;
    }

    // Cylinder orbit
    if (cylinderRef.current) {
      cylinderRef.current.position.x = Math.sin(time * 1.5) * 4;
      cylinderRef.current.position.y = Math.cos(time * 2) * 2.5;
      cylinderRef.current.position.z = Math.cos(time * 0.8) * 3;
      cylinderRef.current.rotation.x = time * 2;
      cylinderRef.current.rotation.z = time * 1.2;
    }

    // Cone spinning
    if (coneRef.current) {
      coneRef.current.position.x = Math.cos(time * 0.7) * 6;
      coneRef.current.position.y = Math.sin(time * 1.8) * 1.5;
      coneRef.current.position.z = Math.sin(time * 0.9) * 4;
      coneRef.current.rotation.y = time * 4;
      coneRef.current.rotation.x = time * 1.8;
    }

    // Octahedron complex movement
    if (octahedronRef.current) {
      octahedronRef.current.position.x = Math.sin(time * 1.3) * 7;
      octahedronRef.current.position.y = Math.cos(time * 1.1) * 4;
      octahedronRef.current.position.z = Math.cos(time * 1.6) * 2.5;
      octahedronRef.current.rotation.x = time * 1.5;
      octahedronRef.current.rotation.y = time * 2.2;
      octahedronRef.current.rotation.z = time * 0.8;
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* Central Cubes */}
      <Box args={[1.5, 1.5, 1.5]} ref={box1Ref}>
        <meshStandardMaterial 
          map={texture} 
          transparent={true}
          opacity={hovered ? 0.9 : 1}
          roughness={0.1}
          metalness={0.2}
        />
      </Box>
      
      <Box args={[1.2, 1.2, 1.2]} ref={box2Ref}>
        <meshStandardMaterial 
          map={texture} 
          transparent={true}
          opacity={0.9}
          roughness={0.2}
          metalness={0.1}
        />
      </Box>

      {/* Orbiting Sphere */}
      <Sphere args={[0.8]} ref={sphereRef}>
        <meshStandardMaterial 
          map={texture}
          transparent={true}
          opacity={0.9}
          roughness={0.1}
          metalness={0.1}
        />
      </Sphere>

      {/* Cylinder */}
      <Cylinder args={[0.6, 0.6, 1.5, 8]} ref={cylinderRef}>
        <meshStandardMaterial 
          map={texture}
          transparent={true}
          opacity={0.8}
          roughness={0.15}
          metalness={0.2}
        />
      </Cylinder>

      {/* Cone */}
      <Cone args={[0.7, 1.4, 6]} ref={coneRef}>
        <meshStandardMaterial 
          map={texture}
          transparent={true}
          opacity={0.85}
          roughness={0.1}
          metalness={0.15}
        />
      </Cone>

      {/* Octahedron */}
      <Octahedron args={[0.9]} ref={octahedronRef}>
        <meshStandardMaterial 
          map={texture}
          transparent={true}
          opacity={0.9}
          roughness={0.1}
          metalness={0.1}
        />
      </Octahedron>
    </group>
  );
}

// Component hiển thị khối 3D với ảnh - Animation Morphing + Teleport
function MorphingBox({ imageUrl }) {
  const meshRef = useRef();
  const sphereRef = useRef();
  const torusRef = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Load ảnh làm texture
  const texture = useLoader(TextureLoader, imageUrl);

  // Animation Morphing - biến hình liên tục với nhiều shapes
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (meshRef.current) {
      // Morphing shape - thay đổi kích thước từng trục
      const scaleX = 1 + Math.sin(time * 3) * 0.5;
      const scaleY = 1 + Math.cos(time * 2) * 0.8;
      const scaleZ = 1 + Math.sin(time * 2.5) * 0.6;
      meshRef.current.scale.set(scaleX, scaleY, scaleZ);
      
      // Teleport effect - nhảy vị trí ngẫu nhiên
      meshRef.current.position.x = Math.sin(time * 5) * 3;
      meshRef.current.position.y = Math.cos(time * 7) * 2;
      meshRef.current.position.z = Math.sin(time * 4) * 1.5;
      
      // Crazy rotation
      meshRef.current.rotation.x = time * 2;
      meshRef.current.rotation.y = time * -1.5;
      meshRef.current.rotation.z = time * 3;
    }

    // Animate sphere around the main box
    if (sphereRef.current) {
      sphereRef.current.position.x = Math.cos(time * 3) * 4;
      sphereRef.current.position.y = Math.sin(time * 2) * 3;
      sphereRef.current.position.z = Math.sin(time * 4) * 2;
      sphereRef.current.rotation.x = time * 4;
    }

    // Animate torus
    if (torusRef.current) {
      torusRef.current.position.x = Math.sin(time * 2.5) * 3.5;
      torusRef.current.position.y = Math.cos(time * 3.5) * 2.5;
      torusRef.current.rotation.x = time * 2;
      torusRef.current.rotation.y = time * 3;
    }
  });

  return (
    <group>
      {/* Main morphing box */}
      <Box
        args={[2, 2, 2]}
        ref={meshRef}
        onClick={() => setActive(!active)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <meshStandardMaterial 
          map={texture} 
          transparent={true}
          opacity={hovered ? 0.8 : 1}
          wireframe={active}
          roughness={0.2}
          metalness={0.1}
        />
      </Box>
      
      {/* Orbiting sphere */}
      <Sphere args={[0.5]} ref={sphereRef}>
        <meshStandardMaterial 
          map={texture}
          transparent={true}
          opacity={0.9}
          roughness={0.1}
          metalness={0.1}
        />
      </Sphere>
      
      {/* Orbiting torus */}
      <Torus args={[0.8, 0.3, 8, 16]} ref={torusRef}>
        <meshStandardMaterial 
          map={texture}
          transparent={true}
          opacity={0.9}
          roughness={0.2}
          metalness={0.1}
        />
      </Torus>
    </group>
  );
}

function App() {
  const imagePath = myImage; // Đường dẫn đến ảnh của bạn
  const imagePath2 = myImage2; // Đường dẫn đến ảnh thứ 2

  // Function để scroll xuống section thứ 2
  const scrollToSection2 = () => {
    const section2 = document.getElementById('section2');
    if (section2) {
      section2.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      {/* Section 1 - DNA Helix Animation */}
      <div className="section" id="section1">
        <h1 className="title">🌌 3D GALAXY FORMATION 🌌</h1>
        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          style={{ 
            background: 'radial-gradient(circle, rgba(30,60,114,0.8) 0%, rgba(42,82,152,0.9) 100%)',
            borderRadius: '15px',
            margin: '20px'
          }}
        >
          {/* Clean lighting setup */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#ffffff" />
          <spotLight position={[0, 15, 0]} intensity={1.5} color="#ffffff" angle={0.4} />

          {/* Suspense để xử lý việc tải ảnh */}
          <Suspense fallback={null}>
            <GalaxyFormation imageUrl={imagePath} />
          </Suspense>

          {/* OrbitControls */}
          <OrbitControls enableZoom={true} enablePan={false} />
        </Canvas>
        <p className="footer-text">� Interactive DNA Helix • Hover to change colors</p>
        
        {/* Nút scroll xuống với style mới */}
        <button className="scroll-button crazy-button" onClick={scrollToSection2}>
          🎯 View Shape Morphing
        </button>
      </div>

      {/* Section 2 - Morphing Chaos */}
      <div className="section" id="section2">
        <h1 className="title">🎨 MORPHING MASTERPIECE 🎨</h1>
        <Canvas
          camera={{ position: [0, 0, 12], fov: 75 }}
          style={{ 
            background: 'radial-gradient(circle, rgba(42,82,152,0.8) 0%, rgba(30,60,114,0.9) 100%)',
            borderRadius: '15px',
            margin: '20px'
          }}
        >
          {/* Simple clean lighting */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
          <directionalLight position={[-5, -5, -5]} intensity={1} color="#ffffff" />
          <spotLight position={[0, 0, 10]} intensity={2} color="#ffffff" />

          {/* Suspense để xử lý việc tải ảnh thứ 2 */}
          <Suspense fallback={null}>
            <MorphingBox imageUrl={imagePath2} />
          </Suspense>

          {/* OrbitControls */}
          <OrbitControls enableZoom={true} enablePan={true} />
        </Canvas>
        <p className="footer-text">� Multi-Object Morphing • Click for wireframe mode</p>
      </div>
    </div>
  );
}

export default App;