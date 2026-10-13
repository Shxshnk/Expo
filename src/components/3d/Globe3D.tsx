import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Globe3DProps {
  className?: string;
}

export const Globe3D: React.FC<Globe3DProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      // WebGL not supported, fallback cleanly
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Root Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const radius = 7.5;

    // 1. Inner dark sphere with subtle cyan edge glow
    const innerSphereGeo = new THREE.SphereGeometry(radius * 0.98, 48, 48);
    const innerSphereMat = new THREE.MeshBasicMaterial({
      color: 0x071124,
      transparent: true,
      opacity: 0.9,
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    globeGroup.add(innerSphere);

    // 2. Wireframe / Latitude Longitude Grid
    const wireGeo = new THREE.WireframeGeometry(new THREE.SphereGeometry(radius, 24, 24));
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x45D8FF,
      transparent: true,
      opacity: 0.12,
    });
    const wireLines = new THREE.LineSegments(wireGeo, wireMat);
    globeGroup.add(wireLines);

    // 3. Dense points / nodes on surface
    const pointCount = 1800;
    const pointPositions = new Float32Array(pointCount * 3);
    const pointColors = new Float32Array(pointCount * 3);

    const colorCyan = new THREE.Color(0x45D8FF);
    const colorIndigo = new THREE.Color(0x7167FF);
    const colorWhite = new THREE.Color(0xFFFFFF);

    for (let i = 0; i < pointCount; i++) {
      // Fibonacci sphere distribution for uniform coverage
      const phi = Math.acos(-1 + (2 * i) / pointCount);
      const theta = Math.sqrt(pointCount * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      pointPositions[i * 3] = x;
      pointPositions[i * 3 + 1] = y;
      pointPositions[i * 3 + 2] = z;

      // Color variation
      const c = Math.random() > 0.6 ? colorCyan : (Math.random() > 0.5 ? colorIndigo : colorWhite);
      pointColors[i * 3] = c.r;
      pointColors[i * 3 + 1] = c.g;
      pointColors[i * 3 + 2] = c.b;
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
    pointsGeo.setAttribute('color', new THREE.BufferAttribute(pointColors, 3));

    const pointsMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const pointsMesh = new THREE.Points(pointsGeo, pointsMat);
    globeGroup.add(pointsMesh);

    // 4. Orbital Rings (Fine circular tracks at different tilts)
    const createRing = (ringRadius: number, tiltX: number, tiltZ: number, color: number, opacity: number) => {
      const ringGeo = new THREE.RingGeometry(ringRadius - 0.03, ringRadius + 0.03, 96);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = tiltX;
      ringMesh.rotation.z = tiltZ;
      return ringMesh;
    };

    const ring1 = createRing(radius * 1.35, Math.PI / 2.3, 0.4, 0x45D8FF, 0.25);
    const ring2 = createRing(radius * 1.6, Math.PI / 3, -0.6, 0x7167FF, 0.2);
    const ring3 = createRing(radius * 1.85, Math.PI / 1.8, 1.2, 0x45D8FF, 0.15);
    globeGroup.add(ring1);
    globeGroup.add(ring2);
    globeGroup.add(ring3);

    // 5. Orbiting Satellites with glowing beacons
    interface SatelliteData {
      mesh: THREE.Group;
      orbitRadius: number;
      speed: number;
      inclination: number;
      angle: number;
    }

    const satellites: SatelliteData[] = [];
    const satCount = 4;

    for (let i = 0; i < satCount; i++) {
      const satGroup = new THREE.Group();

      // Satellite main body
      const bodyGeo = new THREE.BoxGeometry(0.3, 0.2, 0.5);
      const bodyMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
      const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
      satGroup.add(bodyMesh);

      // Solar panel wings
      const wingGeo = new THREE.PlaneGeometry(0.9, 0.3);
      const wingMat = new THREE.MeshBasicMaterial({ color: 0x45D8FF, side: THREE.DoubleSide });
      const wingMesh = new THREE.Mesh(wingGeo, wingMat);
      wingMesh.rotation.y = Math.PI / 2;
      satGroup.add(wingMesh);

      // Blinking antenna beacon
      const beaconGeo = new THREE.SphereGeometry(0.12, 12, 12);
      const beaconMat = new THREE.MeshBasicMaterial({ color: 0x45D8FF });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.y = 0.25;
      satGroup.add(beacon);

      globeGroup.add(satGroup);

      satellites.push({
        mesh: satGroup,
        orbitRadius: radius * (1.3 + i * 0.2),
        speed: 0.008 + i * 0.004,
        inclination: (i * Math.PI) / 3,
        angle: (i * Math.PI * 2) / satCount,
      });
    }

    // 6. Connecting Arcs (Great circle paths between communication nodes)
    const cities = [
      { name: 'Mumbai', lat: 19.076, lon: 72.8777 },
      { name: 'Delhi', lat: 28.6139, lon: 77.209 },
      { name: 'London', lat: 51.5074, lon: -0.1278 },
      { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
      { name: 'Frankfurt', lat: 50.1109, lon: 8.6821 },
      { name: 'Singapore', lat: 1.3521, lon: 103.8198 },
    ];

    const latLonToVector3 = (lat: number, lon: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    };

    const arcs: THREE.Line[] = [];
    const pulses: { mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; progress: number }[] = [];

    const pairs = [
      [0, 1], // Mumbai -> Delhi
      [0, 2], // Mumbai -> London
      [0, 3], // Mumbai -> Tokyo
      [1, 4], // Delhi -> Frankfurt
      [0, 5], // Mumbai -> Singapore
    ];

    pairs.forEach(([fromIdx, toIdx], pairIndex) => {
      const vFrom = latLonToVector3(cities[fromIdx].lat, cities[fromIdx].lon, radius);
      const vTo = latLonToVector3(cities[toIdx].lat, cities[toIdx].lon, radius);

      // Arc mid-point elevated above surface
      const mid = new THREE.Vector3().addVectors(vFrom, vTo).multiplyScalar(0.5);
      const distance = vFrom.distanceTo(vTo);
      mid.setLength(radius + distance * 0.28);

      const curve = new THREE.QuadraticBezierCurve3(vFrom, mid, vTo);
      const points = curve.getPoints(40);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: pairIndex % 2 === 0 ? 0x45D8FF : 0x7167FF,
        transparent: true,
        opacity: 0.5,
      });

      const arcLine = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(arcLine);
      arcs.push(arcLine);

      // Traveling data pulse
      const pulseGeo = new THREE.SphereGeometry(0.16, 12, 12);
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      globeGroup.add(pulseMesh);

      pulses.push({
        mesh: pulseMesh,
        curve,
        progress: pairIndex * 0.2,
      });
    });

    // 7. Ambient Particle Starfield
    const starCount = 350;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 80;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 15;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.12,
      color: 0x45D8FF,
      transparent: true,
      opacity: 0.4,
    });
    const starMesh = new THREE.Points(starGeo, starMat);
    scene.add(starMesh);

    // Mouse Tracking with Damping
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.00035;
      mouseY = (e.clientY - windowHalfY) * 0.00035;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Scroll Tracking for continuous perspective shift
    let scrollOffset = 0;
    const handleScroll = () => {
      scrollOffset = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // IntersectionObserver to pause loop when off-screen
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    // Resize Handler
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

      const delta = clock.getDelta();

      if (!prefersReducedMotion) {
        // Base auto-rotation
        globeGroup.rotation.y += delta * 0.12;

        // Mouse Parallax Damping
        targetRotationY += (mouseX - targetRotationY) * 0.05;
        targetRotationX += (mouseY - targetRotationX) * 0.05;

        globeGroup.rotation.y += targetRotationY * 0.5;
        globeGroup.rotation.x = targetRotationX * 0.5;

        // Scroll responsive positioning and scaling
        const scrollFactor = Math.min(scrollOffset / (window.innerHeight || 1), 1.5);
        globeGroup.position.y = -scrollFactor * 3.5;
        globeGroup.position.x = scrollFactor * 4.0;
        globeGroup.scale.setScalar(1 - scrollFactor * 0.18);

        // Orbit satellites
        satellites.forEach((sat) => {
          sat.angle += sat.speed;
          sat.mesh.position.x = sat.orbitRadius * Math.cos(sat.angle) * Math.cos(sat.inclination);
          sat.mesh.position.y = sat.orbitRadius * Math.sin(sat.angle) * Math.sin(sat.inclination);
          sat.mesh.position.z = sat.orbitRadius * Math.sin(sat.angle);
          sat.mesh.rotation.y += 0.02;
        });

        // Advance communication pulses along bezier curves
        pulses.forEach((p) => {
          p.progress += delta * 0.35;
          if (p.progress > 1) p.progress = 0;
          const pos = p.curve.getPoint(p.progress);
          p.mesh.position.copy(pos);
        });

        // Rotate orbital rings subtly
        ring1.rotation.z += delta * 0.02;
        ring2.rotation.z -= delta * 0.03;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Three.js resources
      innerSphereGeo.dispose();
      innerSphereMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      arcs.forEach((a) => {
        a.geometry.dispose();
        (a.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};
