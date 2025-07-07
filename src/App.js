import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Torus } from '@react-three/drei';
import { TextureLoader } from 'three';
import './App.css'; // File CSS cơ bản để tùy chỉnh nền
import myImage from './assets/my-image.jpg';
import myImage2 from './assets/my-image2.jpg';

// Component hiển thị khối 3D với ảnh - Animation DNA Helix (xoắn ốc)
function DNAHelixBox({ imageUrl }) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Load ảnh làm texture
  const texture = useLoader(TextureLoader, imageUrl);

  // Animation DNA Helix - xoắn ốc như chuỗi DNA
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      // Tạo chuyển động xoắn ốc
      meshRef.current.position.x = Math.sin(time * 2) * 2;
      meshRef.current.position.y = Math.cos(time * 3) * 1.5;
      meshRef.current.position.z = Math.sin(time * 1.5) * 1;
      
      // Xoay phức tạp theo 3 trục
      meshRef.current.rotation.x = time * 0.5;
      meshRef.current.rotation.y = time * 0.8;
      meshRef.current.rotation.z = time * 0.3;
      
      // Scale thay đổi theo thời gian
      const scaleValue = 1 + Math.sin(time * 4) * 0.3;
      meshRef.current.scale.set(scaleValue, scaleValue, scaleValue);
    }
  });

  return (
    <Box
      args={[2.5, 2.5, 2.5]}
      ref={meshRef}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <meshStandardMaterial 
        map={texture} 
        color={hovered ? '#ff00ff' : '#00ffff'} 
        emissive={hovered ? '#ff0080' : '#0080ff'}
        emissiveIntensity={0.2}
      />
    </Box>
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
          color={hovered ? '#ffff00' : '#ff8000'} 
          emissive={hovered ? '#ff4000' : '#ff0040'}
          emissiveIntensity={0.3}
          wireframe={active}
        />
      </Box>
      
      {/* Orbiting sphere */}
      <Sphere args={[0.5]} ref={sphereRef}>
        <meshStandardMaterial 
          map={texture}
          color="#ff00aa"
          emissive="#aa00ff"
          emissiveIntensity={0.4}
        />
      </Sphere>
      
      {/* Orbiting torus */}
      <Torus args={[0.8, 0.3, 8, 16]} ref={torusRef}>
        <meshStandardMaterial 
          map={texture}
          color="#00aaff"
          emissive="#0055ff"
          emissiveIntensity={0.3}
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
        <h1 className="title">🧬 DNA HELIX MADNESS! 🧬</h1>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          style={{ background: 'radial-gradient(circle, #1a1a2e, #16213e, #0f3460)' }}
        >
          {/* Ánh sáng cho hiệu ứng dramatic */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#ff00ff" />
          <directionalLight position={[-10, -10, -5]} intensity={1} color="#00ffff" />
          <spotLight position={[0, 10, 0]} intensity={2} color="#ffffff" />

          {/* Suspense để xử lý việc tải ảnh */}
          <Suspense fallback={null}>
            <DNAHelixBox imageUrl={imagePath} />
          </Suspense>

          {/* OrbitControls */}
          <OrbitControls enableZoom={true} enablePan={false} />
        </Canvas>
        <p className="footer-text">🤯 DNA HELIX ANIMATION! Hover để đổi màu!</p>
        
        {/* Nút scroll xuống với animation mới */}
        <button className="scroll-button crazy-button" onClick={scrollToSection2}>
          🚀 MORPHING CHAOS! 🚀
        </button>
      </div>

      {/* Section 2 - Morphing Chaos */}
      <div className="section" id="section2">
        <h1 className="title">⚡ MORPHING CHAOS! ⚡</h1>
        <Canvas
          camera={{ position: [0, 0, 12], fov: 75 }}
          style={{ background: 'linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #00ff00, #00ffff, #0080ff, #8000ff, #ff00ff)' }}
        >
          {/* Ánh sáng rainbow */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ff0080" />
          <directionalLight position={[-5, -5, -5]} intensity={1.5} color="#0080ff" />
          <spotLight position={[0, 0, 10]} intensity={3} color="#ffffff" />
          <spotLight position={[10, 10, 0]} intensity={2} color="#ff8000" />

          {/* Suspense để xử lý việc tải ảnh thứ 2 */}
          <Suspense fallback={null}>
            <MorphingBox imageUrl={imagePath2} />
          </Suspense>

          {/* OrbitControls */}
          <OrbitControls enableZoom={true} enablePan={true} />
        </Canvas>
        <p className="footer-text">🌈 MORPHING + TELEPORT + ORBITING CHAOS! 🌈</p>
      </div>
    </div>
  );
}

export default App;