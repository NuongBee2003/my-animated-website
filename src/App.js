import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { TextureLoader } from 'three';
import './App.css'; // File CSS cơ bản để tùy chỉnh nền
import myImage from './assets/my-image.jpg';
import myImage2 from './assets/my-image2.jpg';

// Component hiển thị khối 3D với ảnh - Animation xoay
function TexturedBox({ imageUrl }) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Load ảnh làm texture
  const texture = useLoader(TextureLoader, imageUrl);

  // Xoay khối lập phương
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    // Box là một component tiện ích từ @react-three/drei
    <Box
      args={[3, 3, 3]} // Kích thước của khối (width, height, depth)
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* Sử dụng MeshStandardMaterial cho hiệu ứng ánh sáng tốt hơn */}
      <meshStandardMaterial map={texture} color={hovered ? 'hotpink' : 'orange'} />
    </Box>
  );
}

// Component hiển thị khối 3D với ảnh - Animation bouncing/floating
function FloatingBox({ imageUrl }) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Load ảnh làm texture
  const texture = useLoader(TextureLoader, imageUrl);

  // Animation floating lên xuống và xoay nhẹ
  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation (lên xuống)
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.5;
      // Xoay nhẹ theo trục Y
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3;
      // Xoay nhẹ theo trục X
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Box
      args={[2.5, 2.5, 2.5]} // Kích thước khác một chút
      ref={meshRef}
      scale={active ? 1.3 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* Material với màu khác */}
      <meshStandardMaterial map={texture} color={hovered ? 'lightblue' : 'lightgreen'} />
    </Box>
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
      {/* Section 1 */}
      <div className="section" id="section1">
        <h1 className="title">Chào Bé Nương!</h1>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 75 }} // Thiết lập camera
          style={{ background: '#282c34', height: '70vh' }} // Màu nền của canvas
        >
          {/* Ánh sáng để khối 3D có thể nhìn thấy được */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />

          {/* Suspense để xử lý việc tải ảnh */}
          <Suspense fallback={null}>
            <TexturedBox imageUrl={imagePath} />
          </Suspense>

          {/* OrbitControls cho phép xoay, zoom cảnh bằng chuột */}
          <OrbitControls />
        </Canvas>
        <p className="footer-text">Click và kéo để xoay khối! Cuộn để zoom.</p>
        
        {/* Nút scroll xuống */}
        <button className="scroll-button" onClick={scrollToSection2}>
          ⬇️ Xem thêm animation khác
        </button>
      </div>

      {/* Section 2 */}
      <div className="section" id="section2">
        <h1 className="title">Animation Floating!</h1>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 75 }} // Thiết lập camera
          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', height: '70vh' }} // Gradient background
        >
          {/* Ánh sáng cho section 2 */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[-10, 10, 5]} intensity={1.2} />
          <spotLight position={[0, 10, 0]} intensity={0.5} />

          {/* Suspense để xử lý việc tải ảnh thứ 2 */}
          <Suspense fallback={null}>
            <FloatingBox imageUrl={imagePath2} />
          </Suspense>

          {/* OrbitControls cho section 2 */}
          <OrbitControls />
        </Canvas>
        <p className="footer-text">Khối này có animation floating! Click để phóng to.</p>
      </div>
    </div>
  );
}

export default App;