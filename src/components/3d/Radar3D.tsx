import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Radar3DProps {
  className?: string;
}

export const Radar3D: React.FC<Radar3DProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 14, 18);
    camera.lookAt(0, 0, 0);

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

    const radarGroup = new THREE.Group();
    scene.add(radarGroup);

    // Concentric Radar Rings
    const rings: THREE.LineLoop[] = [];
    [2, 4, 6, 8].forEach((r) => {
      const ringGeo = new THREE.BufferGeometry();
      const segments = 64;
      const points = [];
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(r * Math.cos(theta), 0, r * Math.sin(theta)));
      }
      ringGeo.setFromPoints(points);
      const ringMat = new THREE.LineBasicMaterial({
        color: 0x45D8FF,
        transparent: true,
        opacity: 0.25,
      });
      const loop = new THREE.LineLoop(ringGeo, ringMat);
      radarGroup.add(loop);
      rings.push(loop);
    });

    // Cross-axis lines
    const crossGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-8.5, 0, 0),
      new THREE.Vector3(8.5, 0, 0),
      new THREE.Vector3(0, 0, -8.5),
      new THREE.Vector3(0, 0, 8.5),
    ]);
    const crossMat = new THREE.LineBasicMaterial({ color: 0x1E2D4A });
    const crossLines = new THREE.LineSegments(crossGeo, crossMat);
    radarGroup.add(crossLines);

    // Rotating Radar Sweep Blade
    const sweepGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(8, 0, 0),
    ]);
    const sweepMat = new THREE.LineBasicMaterial({
      color: 0x45D8FF,
      linewidth: 2,
    });
    const sweepLine = new THREE.Line(sweepGeo, sweepMat);
    radarGroup.add(sweepLine);

    // Ground Station Contact Nodes
    const targetCount = 6;
    const targetGeo = new THREE.SphereGeometry(0.2, 12, 12);
    const targetMat = new THREE.MeshBasicMaterial({ color: 0x45D8FF });
    const targets: THREE.Mesh[] = [];

    for (let i = 0; i < targetCount; i++) {
      const mesh = new THREE.Mesh(targetGeo, targetMat);
      const rad = 2 + Math.random() * 5.5;
      const angle = Math.random() * Math.PI * 2;
      mesh.position.set(rad * Math.cos(angle), 0, rad * Math.sin(angle));
      radarGroup.add(mesh);
      targets.push(mesh);
    }

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

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();

      if (!prefersReducedMotion) {
        sweepLine.rotation.y += delta * 1.8;
        radarGroup.rotation.y += delta * 0.05;

        // Pulsing targets
        const time = clock.getElapsedTime();
        targets.forEach((t, idx) => {
          const scale = 1 + Math.sin(time * 3 + idx) * 0.35;
          t.scale.set(scale, scale, scale);
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

      crossGeo.dispose();
      crossMat.dispose();
      sweepGeo.dispose();
      sweepMat.dispose();
      targetGeo.dispose();
      targetMat.dispose();
      rings.forEach((r) => {
        r.geometry.dispose();
        (r.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full min-h-[340px] select-none pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};
