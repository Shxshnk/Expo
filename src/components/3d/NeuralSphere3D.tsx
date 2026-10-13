import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface NeuralSphere3DProps {
  className?: string;
}

export const NeuralSphere3D: React.FC<NeuralSphere3DProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 18;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const neuralGroup = new THREE.Group();
    scene.add(neuralGroup);

    // Neural Nodes Generation
    const nodeCount = 140;
    const baseRadius = 5.2;
    const nodes: THREE.Vector3[] = [];
    const originalPositions: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;

      const pos = new THREE.Vector3(
        baseRadius * Math.cos(theta) * Math.sin(phi),
        baseRadius * Math.sin(theta) * Math.sin(phi),
        baseRadius * Math.cos(phi)
      );

      // Add subtle random depth jitter
      pos.multiplyScalar(0.9 + Math.random() * 0.25);
      nodes.push(pos.clone());
      originalPositions.push(pos.clone());
    }

    // Node Points Mesh
    const pointsGeo = new THREE.BufferGeometry().setFromPoints(nodes);
    const pointsMat = new THREE.PointsMaterial({
      color: 0x7167FF,
      size: 0.22,
      transparent: true,
      opacity: 0.9,
    });
    const pointsMesh = new THREE.Points(pointsGeo, pointsMat);
    neuralGroup.add(pointsMesh);

    // Dynamic Synaptic Lines Connecting Nearby Nodes
    const maxDistance = 2.2;
    const maxLineConnections = 280;
    const linePositions = new Float32Array(maxLineConnections * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x45D8FF,
      transparent: true,
      opacity: 0.35,
    });
    const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
    neuralGroup.add(lineSegments);

    // Inner glowing core
    const coreGeo = new THREE.SphereGeometry(baseRadius * 0.45, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x1E1B4B,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    neuralGroup.add(coreMesh);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const halfX = window.innerWidth / 2;
      const halfY = window.innerHeight / 2;
      mouseX = (e.clientX - halfX) * 0.0004;
      mouseY = (e.clientY - halfY) * 0.0004;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // IntersectionObserver
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        neuralGroup.rotation.y = elapsed * 0.15;
        neuralGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.15;

        // Damped pointer parallax
        targetRotationY += (mouseX - targetRotationY) * 0.05;
        targetRotationX += (mouseY - targetRotationX) * 0.05;
        neuralGroup.rotation.y += targetRotationY;
        neuralGroup.rotation.x += targetRotationX;

        // Organic node breathing pulsation
        const positions = pointsGeo.attributes.position.array as Float32Array;
        let lineIdx = 0;

        for (let i = 0; i < nodeCount; i++) {
          const orig = originalPositions[i];
          const wave = 1 + Math.sin(elapsed * 2.5 + i * 0.3) * 0.06;
          
          nodes[i].x = orig.x * wave;
          nodes[i].y = orig.y * wave;
          nodes[i].z = orig.z * wave;

          positions[i * 3] = nodes[i].x;
          positions[i * 3 + 1] = nodes[i].y;
          positions[i * 3 + 2] = nodes[i].z;
        }
        pointsGeo.attributes.position.needsUpdate = true;

        // Update synaptic connecting lines between close neighbors
        for (let i = 0; i < nodeCount; i++) {
          for (let j = i + 1; j < nodeCount; j++) {
            const dist = nodes[i].distanceTo(nodes[j]);
            if (dist < maxDistance && lineIdx < maxLineConnections) {
              linePositions[lineIdx * 6] = nodes[i].x;
              linePositions[lineIdx * 6 + 1] = nodes[i].y;
              linePositions[lineIdx * 6 + 2] = nodes[i].z;
              linePositions[lineIdx * 6 + 3] = nodes[j].x;
              linePositions[lineIdx * 6 + 4] = nodes[j].y;
              linePositions[lineIdx * 6 + 5] = nodes[j].z;
              lineIdx++;
            }
          }
        }
        lineGeo.setDrawRange(0, lineIdx * 2);
        lineGeo.attributes.position.needsUpdate = true;

        coreMesh.rotation.y -= 0.005;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

      pointsGeo.dispose();
      pointsMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full min-h-[360px] select-none pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};
