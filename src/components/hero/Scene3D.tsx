"use client";

import React, { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

interface Scene3DProps {
  progressRef: React.RefObject<number>;
  onSceneReady?: () => void;
  maxDpr?: number;
}

export function Scene3D({ progressRef, onSceneReady, maxDpr }: Scene3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const coreGroupRef = useRef<THREE.Group | null>(null);
  const ringsRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const pointLightRef = useRef<THREE.PointLight | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  // Generate a procedural digital identity monogram canvas texture (fallback for /images/profile.jpg)
  const createProceduralIdentityTexture = useCallback((): THREE.CanvasTexture => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Dark navy gradient background
      const grad = ctx.createLinearGradient(0, 0, size, size);
      grad.addColorStop(0, "#080B12");
      grad.addColorStop(0.5, "#0C1424");
      grad.addColorStop(1, "#111C33");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      // Subtle engineering circuit lines
      ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
      ctx.lineWidth = 1.5;

      // Outer tech framing brackets
      const pad = 36;
      const blen = 48;
      // Top-Left
      ctx.beginPath();
      ctx.moveTo(pad, pad + blen);
      ctx.lineTo(pad, pad);
      ctx.lineTo(pad + blen, pad);
      ctx.stroke();

      // Top-Right
      ctx.beginPath();
      ctx.moveTo(size - pad - blen, pad);
      ctx.lineTo(size - pad, pad);
      ctx.lineTo(size - pad, pad + blen);
      ctx.stroke();

      // Bottom-Left
      ctx.beginPath();
      ctx.moveTo(pad, size - pad - blen);
      ctx.lineTo(pad, size - pad);
      ctx.lineTo(pad + blen, size - pad);
      ctx.stroke();

      // Bottom-Right
      ctx.beginPath();
      ctx.moveTo(size - pad - blen, size - pad);
      ctx.lineTo(size - pad, size - pad);
      ctx.lineTo(size - pad, size - pad - blen);
      ctx.stroke();

      // Circuit grid lines
      ctx.strokeStyle = "rgba(37, 99, 235, 0.2)";
      ctx.beginPath();
      ctx.moveTo(size / 2, pad);
      ctx.lineTo(size / 2, size - pad);
      ctx.moveTo(pad, size / 2);
      ctx.lineTo(size - pad, size / 2);
      ctx.stroke();

      // Central glowing diamond
      ctx.strokeStyle = "rgba(56, 189, 248, 0.6)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(size / 2, size / 2 - 80);
      ctx.lineTo(size / 2 + 80, size / 2);
      ctx.lineTo(size / 2, size / 2 + 80);
      ctx.lineTo(size / 2 - 80, size / 2);
      ctx.closePath();
      ctx.stroke();

      // Monogram letters "M // E"
      ctx.fillStyle = "#F8FAFC";
      ctx.font = "bold 64px 'Space Grotesk', system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("M  E", size / 2, size / 2 - 8);

      // Subtitle code
      ctx.fillStyle = "#38BDF8";
      ctx.font = "600 16px 'JetBrains Mono', monospace";
      ctx.fillText("SYS: DEV_IDENTITY // 0x4D45", size / 2, size / 2 + 48);

      // Status mark
      ctx.fillStyle = "rgba(148, 163, 184, 0.8)";
      ctx.font = "12px 'JetBrains Mono', monospace";
      ctx.fillText("MOHAMED ELBEEK // DIGITAL CORE", size / 2, size - pad - 16);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x080b12, 0.045);

    // 2. Camera setup
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const isMobile = width < 768;

    const camera = new THREE.PerspectiveCamera(isMobile ? 55 : 45, width / height, 0.1, 100);
    // Initial Stage A close-up framing
    camera.position.set(0.3, 0.2, 3.4);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. WebGL Renderer with optimized Pixel Ratio
    // Desktop capped at 1.75 (or user override maxDpr), Mobile capped at 1.5 to eliminate fill-rate stutter
    const devicePixelRatio = window.devicePixelRatio || 1;
    const targetDpr = Math.min(devicePixelRatio, isMobile ? 1.5 : (maxDpr || 1.75));

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch (e) {
      console.warn("WebGL initialization failed, falling back to CSS background", e);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(targetDpr);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Lighting Design
    const ambientLight = new THREE.AmbientLight(0x0c1424, 0.9);
    scene.add(ambientLight);

    // Key directional light - Electric Blue
    const keyLight = new THREE.DirectionalLight(0x2563eb, 3.2);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    // Fill light - Cyan
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    fillLight.position.set(-6, -2, 4);
    scene.add(fillLight);

    // Rim / Back light - Cool White
    const rimLight = new THREE.DirectionalLight(0xe0f2fe, 2.5);
    rimLight.position.set(0, 7, -6);
    scene.add(rimLight);

    // Dynamic central core point light
    const pointLight = new THREE.PointLight(0x38bdf8, 3.0, 15);
    pointLight.position.set(0, 0, 1.2);
    scene.add(pointLight);
    pointLightRef.current = pointLight;

    // 5. Build Digital Core Geometry
    const coreGroup = new THREE.Group();
    coreGroupRef.current = coreGroup;
    scene.add(coreGroup);

    // A. Interlocking Architectural Monolith / Crystalline Prisms
    const darkMaterial = new THREE.MeshStandardMaterial({
      color: 0x0c1424,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: false,
    });

    const edgeLineMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
    });

    const blueLineMaterial = new THREE.LineBasicMaterial({
      color: 0x2563eb,
      transparent: true,
      opacity: 0.7,
    });

    // Central geometric crystal monolith (Octahedron)
    const octaGeom = new THREE.OctahedronGeometry(1.35, 0);
    const octaMesh = new THREE.Mesh(octaGeom, darkMaterial);
    coreGroup.add(octaMesh);

    // Glowing cyan edges on the crystal
    const octaEdges = new THREE.EdgesGeometry(octaGeom);
    const octaWire = new THREE.LineSegments(octaEdges, edgeLineMaterial);
    octaMesh.add(octaWire);

    // Outer faceted geometric cage (Icosahedron)
    const icoGeom = new THREE.IcosahedronGeometry(2.1, 0);
    const icoEdges = new THREE.EdgesGeometry(icoGeom);
    const icoWire = new THREE.LineSegments(icoEdges, blueLineMaterial);
    coreGroup.add(icoWire);

    // B. Orbital Depth Rings
    const ringsGroup = new THREE.Group();
    ringsRef.current = ringsGroup;
    coreGroup.add(ringsGroup);

    const ringMaterial1 = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.6,
      roughness: 0.3,
    });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.018, 16, 100), ringMaterial1);
    ring1.rotation.x = Math.PI / 3;
    ringsGroup.add(ring1);

    const ringMaterial2 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.7,
      roughness: 0.3,
    });
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.014, 16, 100), ringMaterial2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    ringsGroup.add(ring2);

    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.01, 16, 80), ringMaterial1);
    ring3.rotation.z = Math.PI / 5;
    ringsGroup.add(ring3);

    // C. Developer Portrait Portal / Monogram Frame
    const portalGroup = new THREE.Group();
    portalGroup.position.set(0, 0, 0.05);
    coreGroup.add(portalGroup);

    const textureLoader = new THREE.TextureLoader();
    const fallbackTexture = createProceduralIdentityTexture();

    const portalMaterial = new THREE.MeshBasicMaterial({
      map: fallbackTexture,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
    });

    // Attempt loading user's profile portrait
    textureLoader.load(
      "/images/profile.jpg",
      (loadedTexture) => {
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        portalMaterial.map = loadedTexture;
        portalMaterial.needsUpdate = true;
      },
      undefined,
      () => {
        // Fallback remains in place silently
      }
    );

    const portalGeometry = new THREE.PlaneGeometry(1.5, 1.5);
    const portalMesh = new THREE.Mesh(portalGeometry, portalMaterial);
    portalGroup.add(portalMesh);

    // Architectural bracket frame around the portal
    const bracketGeom = new THREE.EdgesGeometry(new THREE.PlaneGeometry(1.6, 1.6));
    const bracketWire = new THREE.LineSegments(
      bracketGeom,
      new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 })
    );
    portalGroup.add(bracketWire);

    // Corner beacon pins
    const pinGeom = new THREE.BoxGeometry(0.06, 0.06, 0.06);
    const pinMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const corners = [
      [-0.8, -0.8],
      [0.8, -0.8],
      [-0.8, 0.8],
      [0.8, 0.8],
    ];
    corners.forEach(([cx, cy]) => {
      const pin = new THREE.Mesh(pinGeom, pinMat);
      pin.position.set(cx, cy, 0.02);
      portalGroup.add(pin);
    });

    // 6. Ambient 3D Particle Constellation / Data Field
    const particleCount = 450;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorElectric = new THREE.Color(0x2563eb);
    const colorCyan = new THREE.Color(0x38bdf8);
    const colorWhite = new THREE.Color(0xf8fafc);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 26;
      positions[i3 + 1] = (Math.random() - 0.5) * 18;
      positions[i3 + 2] = (Math.random() - 0.5) * 20 - 2;

      // Color variation
      const r = Math.random();
      const pColor = r < 0.4 ? colorCyan : r < 0.8 ? colorElectric : colorWhite;
      colors[i3] = pColor.r;
      colors[i3 + 1] = pColor.g;
      colors[i3 + 2] = pColor.b;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particlesRef.current = particles;
    scene.add(particles);

    // 7. Ground Perspective Horizon Grid
    const gridHelper = new THREE.GridHelper(36, 36, 0x2563eb, 0x0c1424);
    gridHelper.position.y = -3.2;
    scene.add(gridHelper);

    // Notify caller that 3D scene is ready
    if (onSceneReady) {
      onSceneReady();
    }

    // 8. Mouse interaction handlers
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 9. Resize handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      const mobile = w < 768;

      cameraRef.current.aspect = w / h;
      cameraRef.current.fov = mobile ? 55 : 45;
      cameraRef.current.updateProjectionMatrix();

      rendererRef.current.setSize(w, h);
      const currTargetDpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : (maxDpr || 1.75));
      rendererRef.current.setPixelRatio(currTargetDpr);

      // Re-render immediately if reduced motion
      if (prefersReducedMotion) {
        rendererRef.current.render(scene, cameraRef.current);
      }
    };

    window.addEventListener("resize", handleResize);

    // 10. Intelligent Animation Lifecycle & Visibility Scheduling
    let animationFrameId: number = 0;
    const clock = new THREE.Clock();
    let isViewportIntersecting = true;
    let isDocVisible = !document.hidden;
    let isLoopRunning = false;

    const renderFrame = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Read directly from the shared mutable progress ref (ZERO React overhead!)
      const rawP = progressRef.current ?? 0;
      const p = Math.max(0, Math.min(1, rawP));

      // Subtle autonomous rotation when not reduced motion
      if (!prefersReducedMotion && ringsRef.current) {
        ring1.rotation.z += delta * 0.2;
        ring2.rotation.x += delta * 0.25;
        ring3.rotation.y += delta * 0.15;
      }

      // Pulse point light
      if (pointLightRef.current) {
        pointLightRef.current.intensity = 2.4 + Math.sin(time * 2.5) * 0.8;
      }

      // Camera Choreography across Stages A, B, C, D
      if (cameraRef.current && coreGroupRef.current) {
        let camZ: number;
        let camY: number;
        let camX: number;
        let lookAtY: number;
        let coreRotY: number;
        let coreScale: number;

        if (p < 0.22) {
          // Stage A -> Stage B interpolation (0.00 - 0.22)
          const t = p / 0.22;
          camX = 0.3 * (1 - t);
          camY = 0.2 + t * 0.35;
          camZ = 3.4 + t * 1.8; // 3.4 -> 5.2
          lookAtY = 0.0;
          coreRotY = t * 0.5;
          coreScale = 1.0;
        } else if (p < 0.52) {
          // Stage B (0.22 - 0.52)
          const t = (p - 0.22) / 0.3;
          camX = 0.0;
          camY = 0.55 + t * 0.2; // 0.55 -> 0.75
          camZ = 5.2 + t * 2.4;  // 5.2 -> 7.6
          lookAtY = 0.05 * t;
          coreRotY = 0.5 + t * 0.7;
          coreScale = 1.0 - t * 0.05;
        } else if (p < 0.82) {
          // Stage C (0.52 - 0.82)
          const t = (p - 0.52) / 0.3;
          camX = 0.0;
          camY = 0.75 - t * 0.25; // 0.75 -> 0.50
          camZ = 7.6 + t * 0.8;   // 7.6 -> 8.4
          lookAtY = 0.05 - t * 0.05;
          coreRotY = 1.2 + t * 0.5;
          coreScale = 0.95 - t * 0.1;
        } else {
          // Stage D (0.82 - 1.00) — Graceful receding monolith, never disappearing
          const t = (p - 0.82) / 0.18;
          camX = 0.0;
          camY = 0.5 - t * 0.15; // 0.50 -> 0.35 (stays elevated)
          camZ = 8.4 + t * 1.0;  // 8.4 -> 9.4 (gentle push back)
          lookAtY = -t * 0.2;
          coreRotY = 1.7 + t * 0.35;
          coreScale = 0.85 - t * 0.12; // 0.85 -> 0.73 (remains prominent in horizon)
        }

        // Apply interactive mouse parallax (damped)
        const parallaxX = prefersReducedMotion ? 0 : mouseRef.current.x * 0.45;
        const parallaxY = prefersReducedMotion ? 0 : mouseRef.current.y * 0.3;

        cameraRef.current.position.set(camX + parallaxX, camY + parallaxY, camZ);
        cameraRef.current.lookAt(parallaxX * 0.2, lookAtY + parallaxY * 0.2, 0);

        if (!prefersReducedMotion) {
          coreGroupRef.current.rotation.y = coreRotY + time * 0.08;
          coreGroupRef.current.rotation.x = Math.sin(time * 0.5) * 0.05 + parallaxY * 0.15;
        }
        coreGroupRef.current.scale.setScalar(coreScale);
      }

      // Drift particles gently
      if (particlesRef.current && !prefersReducedMotion) {
        particlesRef.current.rotation.y = time * 0.015;
        particlesRef.current.rotation.x = Math.sin(time * 0.02) * 0.02;
      }

      renderer.render(scene, camera);
    };

    const animateLoop = () => {
      renderFrame();
      if (isLoopRunning) {
        animationFrameId = requestAnimationFrame(animateLoop);
      }
    };

    const startLoop = () => {
      if (prefersReducedMotion) {
        renderFrame(); // Render once for reduced motion
        return;
      }
      if (!isLoopRunning) {
        isLoopRunning = true;
        clock.start(); // Prevent time delta jump
        animationFrameId = requestAnimationFrame(animateLoop);
      }
    };

    const stopLoop = () => {
      if (isLoopRunning) {
        isLoopRunning = false;
        cancelAnimationFrame(animationFrameId);
      }
    };

    const updateLifecycle = () => {
      const shouldRun = isViewportIntersecting && isDocVisible;
      if (shouldRun) {
        startLoop();
      } else {
        stopLoop();
      }
    };

    // IntersectionObserver on the actual WebGL container viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isViewportIntersecting = entry.isIntersecting;
        updateLifecycle();
      },
      { threshold: 0 }
    );
    observer.observe(container);

    // Tab visibility handling (pause when tab is hidden, resume when visible)
    const handleVisibilityChange = () => {
      isDocVisible = !document.hidden;
      updateLifecycle();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Start rendering if initially visible
    updateLifecycle();

    // 11. Cleanup and resource disposal
    return () => {
      stopLoop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      // Dispose Three.js objects
      octaGeom.dispose();
      darkMaterial.dispose();
      octaEdges.dispose();
      edgeLineMaterial.dispose();
      icoGeom.dispose();
      icoEdges.dispose();
      blueLineMaterial.dispose();
      ringMaterial1.dispose();
      ringMaterial2.dispose();
      portalGeometry.dispose();
      portalMaterial.dispose();
      fallbackTexture.dispose();
      bracketGeom.dispose();
      pinGeom.dispose();
      pinMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      gridHelper.dispose();

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [createProceduralIdentityTexture, onSceneReady, maxDpr, progressRef]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      aria-hidden="true"
    />
  );
}
