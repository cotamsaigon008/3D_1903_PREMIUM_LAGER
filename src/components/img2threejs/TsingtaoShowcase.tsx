import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createTsingtaoCanModel, type TsingtaoCanController } from './TsingtaoCanModel';

export const TsingtaoShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<TsingtaoCanController | null>(null);
  
  // Interactive UI State
  const [isOpenTab, setIsOpenTab] = useState(false);
  const [explodeAmount, setExplodeAmount] = useState(0);
  const [hasCondensation, setHasCondensation] = useState(true);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isWireframe, setIsWireframe] = useState(false);
  const [materialMode, setMaterialMode] = useState<'pbr' | 'normal' | 'roughness' | 'uv'>('pbr');
  const [lightingPreset, setLightingPreset] = useState<'gold' | 'emerald' | 'daylight' | 'midnight'>('gold');
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'code' | 'reference'>('overview');
  const [showReferenceOverlay, setShowReferenceOverlay] = useState(false);

  // Camera animation target state
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 7.5));
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Lighting references
  const lightGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f0d);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 7.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // --- LIGHTING RAG ---
    const lightGroup = new THREE.Group();
    lightGroupRef.current = lightGroup;
    scene.add(lightGroup);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    lightGroup.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff4d6, 2.2);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
    lightGroup.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x408060, 1.2);
    fillLight.position.set(-6, -2, -4);
    lightGroup.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffd700, 2.5);
    rimLight.position.set(0, 6, -8);
    lightGroup.add(rimLight);

    // Studio Environment Shadow Plane
    const shadowPlaneGeo = new THREE.PlaneGeometry(20, 20);
    const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.35 });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.5;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Subtle background pedestal mesh
    const pedestalGeo = new THREE.CylinderGeometry(2.5, 2.8, 0.2, 48);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x111915,
      metalness: 0.8,
      roughness: 0.3,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -2.6;
    pedestal.receiveShadow = true;
    scene.add(pedestal);

    // --- INSTANTIATE PROCEDURAL MODEL ---
    const canController = createTsingtaoCanModel();
    controllerRef.current = canController;
    scene.add(canController.group);

    // --- MOUSE ORBIT CONTROLS ---
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      rotationVelocity.y = deltaX * 0.005;
      rotationVelocity.x = deltaY * 0.005;

      canController.group.rotation.y += rotationVelocity.y;
      canController.group.rotation.x += rotationVelocity.x;

      // Clamp vertical rotation
      canController.group.rotation.x = Math.max(-Math.PI * 0.4, Math.min(Math.PI * 0.4, canController.group.rotation.x));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.005;
      camera.position.z = Math.max(3.5, Math.min(12, camera.position.z + zoomDelta));
      targetCamPos.current.z = camera.position.z;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElem.addEventListener('wheel', handleWheel, { passive: false });

    // Touch support for mobile
    let touchStartDist = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;

        canController.group.rotation.y += deltaX * 0.006;
        canController.group.rotation.x += deltaY * 0.006;

        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const delta = (touchStartDist - dist) * 0.01;
        camera.position.z = Math.max(3.5, Math.min(12, camera.position.z + delta));
        touchStartDist = dist;
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    domElem.addEventListener('touchstart', handleTouchStart);
    domElem.addEventListener('touchmove', handleTouchMove);
    domElem.addEventListener('touchend', handleTouchEnd);

    // --- ANIMATION LOOP ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Inertial smooth rotation decay or auto rotation
      if (!isDragging) {
        if (isAutoRotate) {
          canController.group.rotation.y += 0.008;
        } else {
          canController.group.rotation.y += rotationVelocity.y;
          canController.group.rotation.x += rotationVelocity.x;
          rotationVelocity.y *= 0.92;
          rotationVelocity.x *= 0.92;
        }
      }

      // Smooth camera motion interpolation
      camera.position.lerp(targetCamPos.current, 0.08);
      currentLookAt.current.lerp(targetLookAt.current, 0.08);
      camera.lookAt(currentLookAt.current);

      canController.update(delta);
      renderer.render(scene, camera);
    };

    animate();

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElem.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElem.removeEventListener('wheel', handleWheel);
      domElem.removeEventListener('touchstart', handleTouchStart);
      domElem.removeEventListener('touchmove', handleTouchMove);
      domElem.removeEventListener('touchend', handleTouchEnd);

      canController.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Sync state changes with controller
  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.setOpenTabAmount(isOpenTab ? 1 : 0);
    }
  }, [isOpenTab]);

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.setExplodeAmount(explodeAmount);
    }
  }, [explodeAmount]);

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.setCondensationVisible(hasCondensation);
    }
  }, [hasCondensation]);

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.setWireframe(isWireframe);
    }
  }, [isWireframe]);

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.setMaterialMode(materialMode);
    }
  }, [materialMode]);

  // Handle Lighting Preset Switch
  useEffect(() => {
    if (!lightGroupRef.current) return;
    const lg = lightGroupRef.current;
    const amb = lg.children[0] as THREE.AmbientLight;
    const key = lg.children[1] as THREE.DirectionalLight;
    const fill = lg.children[2] as THREE.DirectionalLight;
    const rim = lg.children[3] as THREE.DirectionalLight;

    if (lightingPreset === 'gold') {
      amb.color.setHex(0xffffff); amb.intensity = 0.7;
      key.color.setHex(0xfff4d6); key.intensity = 2.2;
      fill.color.setHex(0x408060); fill.intensity = 1.2;
      rim.color.setHex(0xffd700); rim.intensity = 2.5;
    } else if (lightingPreset === 'emerald') {
      amb.color.setHex(0x052e16); amb.intensity = 1.0;
      key.color.setHex(0x34d399); key.intensity = 3.0;
      fill.color.setHex(0x064e3b); fill.intensity = 1.5;
      rim.color.setHex(0xa7f3d0); rim.intensity = 3.5;
    } else if (lightingPreset === 'daylight') {
      amb.color.setHex(0xffffff); amb.intensity = 1.2;
      key.color.setHex(0xffffff); key.intensity = 2.5;
      fill.color.setHex(0xdddddd); fill.intensity = 1.0;
      rim.color.setHex(0xffffff); rim.intensity = 1.5;
    } else if (lightingPreset === 'midnight') {
      amb.color.setHex(0x020617); amb.intensity = 0.4;
      key.color.setHex(0x38bdf8); key.intensity = 2.0;
      fill.color.setHex(0x1e1b4b); fill.intensity = 1.0;
      rim.color.setHex(0xf59e0b); rim.intensity = 3.0;
    }
  }, [lightingPreset]);

  // Camera Bookmark Navigation
  const setCameraPreset = (preset: 'front' | 'top' | 'seal' | 'bottom') => {
    setIsAutoRotate(false);
    if (!controllerRef.current) return;
    const group = controllerRef.current.group;

    if (preset === 'front') {
      group.rotation.set(0, 0, 0);
      targetCamPos.current.set(0, 0, 7.5);
      targetLookAt.current.set(0, 0, 0);
    } else if (preset === 'top') {
      group.rotation.set(Math.PI * 0.4, 0, 0);
      targetCamPos.current.set(0, 2.5, 5.5);
      targetLookAt.current.set(0, 2.0, 0);
    } else if (preset === 'seal') {
      group.rotation.set(-0.1, 0, 0);
      targetCamPos.current.set(0, 0.5, 4.2);
      targetLookAt.current.set(0, 0.6, 0);
    } else if (preset === 'bottom') {
      group.rotation.set(-Math.PI * 0.45, 0, 0);
      targetCamPos.current.set(0, -2.5, 5.5);
      targetLookAt.current.set(0, -2.0, 0);
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-neutral-950 text-white py-6 sm:py-8 px-4 sm:px-8 overflow-hidden font-sans select-none">
      {/* Background Lighting Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              img2threejs Rebuilt 3D Model
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-emerald-200 to-white">
              Tsingtao Premium Lager 1903
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl font-light">
              Brewed to the Highest Quality with the Finest selected Ingredients
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowReferenceOverlay(!showReferenceOverlay)}
              className={`px-4 py-2 rounded-xl border text-xs sm:text-sm font-mono font-medium transition-all ${
                showReferenceOverlay
                  ? 'bg-amber-500 text-black border-amber-400 shadow-lg shadow-amber-500/20'
                  : 'bg-white/5 hover:bg-white/10 text-white border-white/20'
              }`}
            >
              {showReferenceOverlay ? '📷 Hide Reference Image' : '📷 Compare Reference'}
            </button>
          </div>
        </div>

        {/* Main 3D Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 3D VIEWER CANVAS (8 Cols) */}
          <div className="lg:col-span-8 relative bg-neutral-900/70 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-2xl group min-h-[580px] flex flex-col">
            
            {/* 3D Canvas Mount */}
            <div ref={containerRef} className="w-full h-[540px] sm:h-[620px] cursor-grab active:cursor-grabbing relative" />

            {/* Reference Image Side-by-side Overlay */}
            {showReferenceOverlay && (
              <div className="absolute top-4 right-4 z-20 w-48 sm:w-60 bg-black/90 border border-amber-500/40 rounded-2xl p-2.5 shadow-2xl backdrop-blur-md animate-fadeIn">
                <div className="flex items-center justify-between mb-1.5 px-1">
                  <span className="text-[11px] font-mono text-amber-400 font-semibold uppercase">Source Reference</span>
                  <span className="text-[10px] text-neutral-400">1903 Can</span>
                </div>
                <img
                  src="https://user-images.githubusercontent.com/tsingtao-beer-can-reference.jpg"
                  onError={(e) => {
                    // Fallback to inline generated reference representation if web image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                  alt="Tsingtao Beer Can Reference"
                  className="w-full h-auto rounded-xl object-contain bg-neutral-800 border border-white/10"
                />
                <div className="text-[10px] text-neutral-400 text-center mt-2 font-mono">
                  Photorealistic Can Image
                </div>
              </div>
            )}

            {/* Floating Top Control Overlay */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 p-1.5 rounded-2xl">
              <span className="text-[11px] font-mono text-neutral-400 px-2.5 font-medium">CAM PRESETS:</span>
              <button
                onClick={() => setCameraPreset('front')}
                className="px-2.5 py-1 text-xs rounded-xl bg-white/10 hover:bg-emerald-500 hover:text-black font-mono transition-all"
              >
                🏷️ Front
              </button>
              <button
                onClick={() => setCameraPreset('top')}
                className="px-2.5 py-1 text-xs rounded-xl bg-white/10 hover:bg-emerald-500 hover:text-black font-mono transition-all"
              >
                🔓 Tab
              </button>
              <button
                onClick={() => setCameraPreset('seal')}
                className="px-2.5 py-1 text-xs rounded-xl bg-white/10 hover:bg-emerald-500 hover:text-black font-mono transition-all"
              >
                🛡️ Crest
              </button>
              <button
                onClick={() => setCameraPreset('bottom')}
                className="px-2.5 py-1 text-xs rounded-xl bg-white/10 hover:bg-emerald-500 hover:text-black font-mono transition-all"
              >
                🔍 Base
              </button>
            </div>

            {/* Floating Bottom Toolbar Overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 bg-black/75 backdrop-blur-md border border-white/10 p-3 rounded-2xl">
              
              {/* Left Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setIsOpenTab(!isOpenTab)}
                  className={`px-4 py-2 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-lg ${
                    isOpenTab
                      ? 'bg-amber-400 text-black shadow-amber-500/20'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20'
                  }`}
                >
                  {isOpenTab ? '🍺 Can Opened (Close)' : '💥 Pop & Open Can'}
                </button>

                <button
                  onClick={() => setHasCondensation(!hasCondensation)}
                  className={`px-3.5 py-2 rounded-xl font-mono text-xs transition-all border ${
                    hasCondensation
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : 'bg-white/5 text-neutral-400 border-white/10 hover:bg-white/10'
                  }`}
                >
                  🧊 {hasCondensation ? 'Frost On' : 'Frost Off'}
                </button>

                <button
                  onClick={() => setIsAutoRotate(!isAutoRotate)}
                  className={`px-3.5 py-2 rounded-xl font-mono text-xs transition-all border ${
                    isAutoRotate
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-white/5 text-neutral-400 border-white/10 hover:bg-white/10'
                  }`}
                >
                  🔄 {isAutoRotate ? 'Rotating' : 'Paused'}
                </button>
              </div>

              {/* Explode View Slider */}
              <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 min-w-[200px]">
                <span className="text-xs font-mono text-neutral-300 whitespace-nowrap">Explode:</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={explodeAmount}
                  onChange={(e) => setExplodeAmount(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-1.5 bg-neutral-700 rounded-lg"
                />
                <span className="text-xs font-mono text-amber-400 w-8 text-right">
                  {Math.round(explodeAmount * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT CONTROL PANEL & DETAILS (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Tab Navigation header */}
            <div className="flex rounded-2xl bg-neutral-900 border border-white/10 p-1.5">
              {(['overview', 'inventory', 'code'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-xs font-mono font-semibold rounded-xl capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-emerald-500 text-black shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {tab === 'overview' ? '⚙️ Controls' : tab === 'inventory' ? '📋 Inventory' : '💻 TS Code'}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: CONTROLS & DIAGNOSTICS */}
            {activeTab === 'overview' && (
              <div className="flex flex-col gap-5 animate-fadeIn">
                
                {/* Lighting Rigs Card */}
                <div className="p-5 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-md">
                  <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Studio Lighting Rigs
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'gold', label: '🌟 Golden Heritage' },
                      { id: 'emerald', label: '🌿 Emerald Cyber' },
                      { id: 'daylight', label: '☀️ Studio Daylight' },
                      { id: 'midnight', label: '🌙 Midnight Bar' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setLightingPreset(item.id as any)}
                        className={`p-2.5 text-xs rounded-xl font-mono text-left border transition-all ${
                          lightingPreset === item.id
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold'
                            : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Shader & Material Diagnostics */}
                <div className="p-5 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-md">
                  <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Shader Pass Diagnostics
                  </h3>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {[
                      { id: 'pbr', label: '🎨 Photorealistic PBR' },
                      { id: 'normal', label: '🗺️ Normal / Bump Map' },
                      { id: 'roughness', label: '✨ Roughness Map' },
                      { id: 'uv', label: '📐 Canvas Texture Map' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setMaterialMode(item.id as any)}
                        className={`p-2.5 text-xs rounded-xl font-mono text-left border transition-all ${
                          materialMode === item.id
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold'
                            : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsWireframe(!isWireframe)}
                    className={`w-full py-2.5 px-3 rounded-xl font-mono text-xs border transition-all flex items-center justify-between ${
                      isWireframe
                        ? 'bg-amber-500 text-black border-amber-400 font-bold'
                        : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <span>Wireframe Topology View</span>
                    <span>{isWireframe ? 'ON' : 'OFF'}</span>
                  </button>
                </div>

                {/* Model Specs Card */}
                <div className="p-5 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-md font-mono text-xs space-y-2.5">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-neutral-400">Geometry Type</span>
                    <span className="text-emerald-400 font-bold">Procedural Lathe + Extrude</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-neutral-400">Texture Resolution</span>
                    <span className="text-white">2048 x 1024 (Canvas HTML5)</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-neutral-400">PBR Materials</span>
                    <span className="text-white">Anisotropic Aluminum + Varnish</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">External Assets</span>
                    <span className="text-emerald-400 font-bold">0 KB (100% Code)</span>
                  </div>
                </div>

              </div>
            )}

            {/* TAB CONTENT: DETAIL INVENTORY */}
            {activeTab === 'inventory' && (
              <div className="p-5 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-md text-xs space-y-4 animate-fadeIn">
                <h3 className="font-mono text-emerald-400 font-bold text-sm">
                  📋 img2threejs Detail Inventory
                </h3>
                <p className="text-neutral-400 leading-relaxed font-light">
                  Systematic feature analysis mapped directly from reference photo to Three.js sub-components:
                </p>

                <div className="space-y-3 font-mono">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-amber-300 font-bold mb-1">1. Can Shell Geometry</div>
                    <div className="text-neutral-300">LatheGeometry with 64 radial segments defining concave base chime, straight body, tapered neck bevel, and double-seam top rim.</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-amber-300 font-bold mb-1">2. Stay-On Pull Tab Mechanics</div>
                    <div className="text-neutral-300">Extruded aluminum lever with finger ring, central button rivet, and scored aperture flap with hinge pivot rotation.</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-amber-300 font-bold mb-1">3. Procedural Label Shader</div>
                    <div className="text-neutral-300">Canvas 2D render pipeline generating emerald green metallic gradient, gold wave top header, Tsingtao pagoda logo, 1903 badge, and Chinese characters.</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-amber-300 font-bold mb-1">4. Bump & Emboss Normal Map</div>
                    <div className="text-neutral-300">Dynamic heightmap canvas generating realistic tactile embossing on TSINGTAO logo typography and seal ring.</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: TS CODE SNIPPET */}
            {activeTab === 'code' && (
              <div className="p-5 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-md animate-fadeIn">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-amber-400 font-bold">createTsingtaoCanModel.ts</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`import { createTsingtaoCanModel } from './TsingtaoCanModel';\nconst model = createTsingtaoCanModel();\nscene.add(model.group);`);
                      alert('Code snippet copied to clipboard!');
                    }}
                    className="px-2.5 py-1 text-[11px] rounded-lg bg-emerald-500 text-black font-mono font-bold hover:bg-emerald-400 transition-all"
                  >
                    Copy Code
                  </button>
                </div>

                <pre className="p-3 bg-black/80 rounded-2xl border border-white/10 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-[360px] leading-relaxed">
{`// img2threejs Procedural Reconstruction
import * as THREE from 'three';
import { createTsingtaoCanModel } from './TsingtaoCanModel';

const canController = createTsingtaoCanModel({
  labelResolution: 2048,
  dropletCount: 150
});

// Add to scene
scene.add(canController.group);

// Animate Open Tab
canController.setOpenTabAmount(1.0);

// Explode View
canController.setExplodeAmount(0.5);`}
                </pre>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};
