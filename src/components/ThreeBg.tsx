import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBg() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene
    const scene = new THREE.Scene();

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 500;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create particles geometry
    const starsCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starsCount * 3);
    const speeds = new Float32Array(starsCount);

    for (let i = 0; i < starsCount * 3; i += 3) {
      // Random coordinates in space
      positions[i] = (Math.random() - 0.5) * 1000; // X
      positions[i + 1] = (Math.random() - 0.5) * 1000; // Y
      positions[i + 2] = (Math.random() - 0.5) * 1000; // Z
      speeds[i / 3] = 0.2 + Math.random() * 0.4; // Speed
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Create particle canvas-drawn glowing texture
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(0, 217, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(0, 217, 255, 0.5)');
      gradient.addColorStop(1, 'rgba(0, 217, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    // Create points material
    const material = new THREE.PointsMaterial({
      size: 6,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Create the points object
    const starField = new THREE.Points(geometry, material);
    scene.add(starField);

    // Grid helper (extremely subtle and techy)
    const gridHelper = new THREE.GridHelper(1200, 40, 0x00d9ff, 0x003040);
    gridHelper.position.y = -250;
    gridHelper.material.opacity = 0.08;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Mouse movement response
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.05;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.05;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate star field slowly
      starField.rotation.y += 0.0006;
      starField.rotation.x += 0.0003;

      // Animate grid slightly
      gridHelper.rotation.y -= 0.0002;

      // Follow mouse cursor gently
      camera.position.x += (mouseX - camera.position.x) * 0.03;
      camera.position.y += (-mouseY - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      // Move individual particles along Z axis slightly
      const positionsArray = geometry.attributes.position.array as Float32Array;
      for (let i = 2; i < positionsArray.length; i += 3) {
        positionsArray[i] += speeds[(i - 2) / 3]; // Move forward
        if (positionsArray[i] > 500) {
          positionsArray[i] = -500; // Reset back
        }
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="three-background-canvas"
      className="three-bg-canvas"
    />
  );
}
