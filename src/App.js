import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { TextureLoader } from 'three';
import './App.css'; // File CSS cơ bản để tùy chỉnh nền
import myImage from './assets/my-image.jpg';

// Component hiển thị khối 3D với ảnh
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

function App() {
  const imagePath = myImage; // Đường dẫn đến ảnh của bạn

  return (
    <div className="App">
      <h1 className="title">Chào Bé Nương!</h1>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }} // Thiết lập camera
        style={{ background: '#282c34' }} // Màu nền của canvas
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
    </div>
  );
}

export default App;