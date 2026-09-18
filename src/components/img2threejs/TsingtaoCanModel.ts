import * as THREE from 'three';

export interface TsingtaoCanOptions {
  labelResolution?: number; // default 2048x1024
  dropletCount?: number;   // default 120
}

export interface TsingtaoCanController {
  group: THREE.Group;
  update: (delta: number) => void;
  setExplodeAmount: (amount: number) => void;
  setOpenTabAmount: (amount: number) => void;
  setCondensationVisible: (visible: boolean) => void;
  setWireframe: (wireframe: boolean) => void;
  setMaterialMode: (mode: 'pbr' | 'normal' | 'roughness' | 'uv') => void;
  dispose: () => void;
}

/**
 * Creates a procedural 2D Canvas texture for the Tsingtao 1903 Beer Can label.
 * Generates both diffuse color texture and normal/bump texture.
 */
function createTsingtaoLabelTextures(width = 2048, height = 1024): {
  diffuseMap: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
  roughnessMap: THREE.CanvasTexture;
} {
  // --- 1. DIFFUSE CANVAS ---
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Background - Deep Emerald Green with subtle gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, '#00472b');
  bgGrad.addColorStop(0.12, '#005f38');
  bgGrad.addColorStop(0.5, '#003e24');
  bgGrad.addColorStop(0.85, '#004d2d');
  bgGrad.addColorStop(1.0, '#00331d');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Metallic Brushed Texture Effect on label
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  for (let i = 0; i < width; i += 4) {
    if (Math.random() > 0.4) {
      ctx.fillRect(i, 0, 2, height);
    }
  }

  // --- TOP SECTION: GOLD WAVE PATTERN ---
  const topHeaderH = height * 0.22;
  const topGrad = ctx.createLinearGradient(0, 0, 0, topHeaderH);
  topGrad.addColorStop(0, '#f2d891');
  topGrad.addColorStop(0.5, '#d4a84e');
  topGrad.addColorStop(1.0, '#ba8b36');
  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, width, topHeaderH);

  // Wave lines overlay on top header
  ctx.strokeStyle = 'rgba(120, 80, 20, 0.4)';
  ctx.lineWidth = 3;
  const waveSpacing = 28;
  for (let y = 15; y < topHeaderH - 10; y += waveSpacing) {
    ctx.beginPath();
    for (let x = 0; x <= width; x += 30) {
      const waveY = y + Math.sin(x * 0.05) * 4;
      if (x === 0) ctx.moveTo(x, waveY);
      else ctx.lineTo(x, waveY);
    }
    ctx.stroke();
  }

  // Header Text: "BIERE · BEER · CERVEZA"
  ctx.fillStyle = '#1c4a29';
  ctx.font = 'bold 28px serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '8px';
  // Repeat around the can label (2 faces / front & back)
  [width * 0.25, width * 0.75].forEach((cx) => {
    ctx.fillText('BIERE  ·  BEER  ·  CERVEZA', cx, topHeaderH * 0.5);
  });

  // --- ARCH & GOLDEN BORDERS ---
  [width * 0.25, width * 0.75].forEach((cx) => {
    // Outer Arch Line
    ctx.save();
    ctx.strokeStyle = '#d4a84e';
    ctx.lineWidth = 14;
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 8;
    
    // Draw decorative crest arch
    ctx.beginPath();
    ctx.arc(cx, topHeaderH + 180, 320, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();

    ctx.lineWidth = 4;
    ctx.strokeStyle = '#fff5cf';
    ctx.beginPath();
    ctx.arc(cx, topHeaderH + 180, 310, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();
    ctx.restore();

    // --- PAGODA EMBLEM & LIONS ---
    const logoY = topHeaderH + 120;
    
    // Outer Gold Ring for Seal
    ctx.save();
    ctx.fillStyle = '#b88928';
    ctx.beginPath();
    ctx.arc(cx, logoY, 75, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#00472b';
    ctx.beginPath();
    ctx.arc(cx, logoY, 68, 0, Math.PI * 2);
    ctx.fill();

    // Golden Pagoda Silhouette inside circle
    ctx.fillStyle = '#f5da8a';
    // Base tier
    ctx.fillRect(cx - 30, logoY + 15, 60, 10);
    // Middle tier
    ctx.beginPath();
    ctx.moveTo(cx - 38, logoY + 15);
    ctx.lineTo(cx + 38, logoY + 15);
    ctx.lineTo(cx + 25, logoY - 5);
    ctx.lineTo(cx - 25, logoY - 5);
    ctx.closePath();
    ctx.fill();
    // Upper tier
    ctx.beginPath();
    ctx.moveTo(cx - 28, logoY - 5);
    ctx.lineTo(cx + 28, logoY - 5);
    ctx.lineTo(cx + 18, logoY - 25);
    ctx.lineTo(cx - 18, logoY - 25);
    ctx.closePath();
    ctx.fill();
    // Top spire
    ctx.beginPath();
    ctx.arc(cx, logoY - 32, 6, 0, Math.PI * 2);
    ctx.fill();

    // Flanking Lions / Wheat stalks graphics
    ctx.fillStyle = '#d4a84e';
    ctx.font = 'bold 36px serif';
    ctx.fillText('🦁', cx - 95, logoY + 12);
    ctx.fillText('🦁', cx + 95, logoY + 12);
    ctx.restore();

    // --- BRAND NAME: TSINGTAO ---
    const brandY = logoY + 140;
    ctx.save();
    ctx.font = '900 115px "Times New Roman", Georgia, serif';
    ctx.textAlign = 'center';
    
    // Gold Drop Shadow
    ctx.fillStyle = '#7a5410';
    ctx.fillText('TSINGTAO', cx + 4, brandY + 4);
    
    // Main White / Cream Text
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowBlur = 12;
    ctx.fillText('TSINGTAO', cx, brandY);
    ctx.restore();

    // --- ESTD 1903 BADGE ---
    const badgeY = brandY + 70;
    ctx.save();
    ctx.fillStyle = '#d4a84e';
    ctx.font = 'bold 32px serif';
    ctx.fillText('ESTD', cx - 110, badgeY);

    // 1903 Large Number
    ctx.font = '900 72px serif';
    ctx.fillStyle = '#fceabb';
    ctx.fillText('1903', cx, badgeY + 12);

    // Green Box Chinese Characters "青島啤酒"
    ctx.fillStyle = '#00472b';
    ctx.strokeStyle = '#d4a84e';
    ctx.lineWidth = 2;
    ctx.fillRect(cx + 80, badgeY - 28, 85, 36);
    ctx.strokeRect(cx + 80, badgeY - 28, 85, 36);
    ctx.fillStyle = '#fceabb';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('青島啤酒', cx + 122, badgeY - 3);
    ctx.restore();

    // --- MIDDLE SEAL / COAT OF ARMS ---
    const coatY = badgeY + 115;
    ctx.save();
    ctx.strokeStyle = '#d4a84e';
    ctx.lineWidth = 3;
    ctx.strokeRect(cx - 35, coatY - 40, 70, 75);
    ctx.fillStyle = '#d4a84e';
    ctx.font = '36px serif';
    ctx.fillText('🛡️', cx, coatY + 10);
    ctx.restore();

    // --- SUB-HEADER: PREMIUM LAGER ---
    const lagerY = coatY + 100;
    ctx.save();
    ctx.font = '900 52px serif';
    ctx.fillStyle = '#fceabb';
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = 6;
    ctx.fillText('PREMIUM LAGER', cx, lagerY);
    ctx.restore();

    // --- BREWED TEXT INSTRUCTIONS ---
    const brewedY = lagerY + 45;
    ctx.save();
    ctx.font = '600 22px serif';
    ctx.fillStyle = '#d9e8dd';
    ctx.fillText('BREWED TO THE HIGHEST', cx, brewedY);
    ctx.fillText('QUALITY WITH THE FINEST', cx, brewedY + 28);
    ctx.fillText('SELECTED INGREDIENTS', cx, brewedY + 56);
    ctx.restore();

    // --- IMPORTED RIBBON ---
    const importedY = brewedY + 120;
    ctx.save();
    ctx.font = 'bold 34px serif';
    ctx.fillStyle = '#fceabb';
    ctx.letterSpacing = '6px';
    ctx.fillText('I M P O R T E D', cx, importedY);
    ctx.restore();
  });

  // --- BOTTOM GOLD TRIM & BREWERY FOOTER ---
  const footerH = height * 0.11;
  const footerY = height - footerH;
  const bottomGrad = ctx.createLinearGradient(0, footerY, 0, height);
  bottomGrad.addColorStop(0, '#d4a84e');
  bottomGrad.addColorStop(0.3, '#f2d891');
  bottomGrad.addColorStop(0.7, '#ba8b36');
  bottomGrad.addColorStop(1.0, '#8c6114');
  ctx.fillStyle = bottomGrad;
  ctx.fillRect(0, footerY, width, footerH);

  // Footer Gold Line separator
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, footerY);
  ctx.lineTo(width, footerY);
  ctx.stroke();

  // Footer Text: TSINGTAO BREWERY CO., LTD.
  ctx.fillStyle = '#1c4a29';
  ctx.font = 'bold 36px serif';
  ctx.textAlign = 'center';
  [width * 0.25, width * 0.75].forEach((cx) => {
    ctx.fillText('TSINGTAO BREWERY CO., LTD.', cx, footerY + footerH * 0.65);
  });

  // --- 2. BUMP / NORMAL CANVAS ---
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bCtx = bumpCanvas.getContext('2d')!;

  // Neutral grey (flat normal/height)
  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, width, height);

  // Height highlights (white = embossed / raised, black = recessed)
  [width * 0.25, width * 0.75].forEach((cx) => {
    const logoY = topHeaderH + 120;
    const brandY = logoY + 140;
    const badgeY = brandY + 70;
    const lagerY = badgeY + 215;

    // Raised Pagoda circle border
    bCtx.strokeStyle = '#ffffff';
    bCtx.lineWidth = 10;
    bCtx.beginPath();
    bCtx.arc(cx, logoY, 70, 0, Math.PI * 2);
    bCtx.stroke();

    // Raised TSINGTAO Letters
    bCtx.font = '900 115px "Times New Roman", Georgia, serif';
    bCtx.textAlign = 'center';
    bCtx.fillStyle = '#ffffff';
    bCtx.fillText('TSINGTAO', cx, brandY);

    // Raised 1903
    bCtx.font = '900 72px serif';
    bCtx.fillText('1903', cx, badgeY + 12);

    // Raised PREMIUM LAGER
    bCtx.font = '900 52px serif';
    bCtx.fillText('PREMIUM LAGER', cx, lagerY);
  });

  // --- 3. ROUGHNESS CANVAS ---
  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = width;
  roughCanvas.height = height;
  const rCtx = roughCanvas.getContext('2d')!;

  // Base varnish label roughness (approx 0.35 -> #595959)
  rCtx.fillStyle = '#595959';
  rCtx.fillRect(0, 0, width, height);

  // Gold foil regions are shinier / smoother (roughness 0.18 -> #2e2e2e)
  rCtx.fillStyle = '#2e2e2e';
  rCtx.fillRect(0, 0, width, topHeaderH);
  rCtx.fillRect(0, height - footerH, width, footerH);

  // Text regions shinier
  [width * 0.25, width * 0.75].forEach((cx) => {
    const brandY = topHeaderH + 260;
    rCtx.font = '900 115px "Times New Roman", Georgia, serif';
    rCtx.textAlign = 'center';
    rCtx.fillText('TSINGTAO', cx, brandY);
  });

  // Create Three.js Textures
  const diffuseMap = new THREE.CanvasTexture(canvas);
  diffuseMap.wrapS = THREE.RepeatWrapping;
  diffuseMap.wrapT = THREE.ClampToEdgeWrapping;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.ClampToEdgeWrapping;

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.ClampToEdgeWrapping;

  return { diffuseMap, bumpMap, roughnessMap };
}

/**
 * Procedurally generates the 3D Tsingtao Beer Can hierarchy.
 */
export function createTsingtaoCanModel(options: TsingtaoCanOptions = {}): TsingtaoCanController {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'TsingtaoCan_Root';

  // Sub-groups for explosion animation
  const topTabGroup = new THREE.Group();
  topTabGroup.name = 'Group_TopTab';

  const topLidGroup = new THREE.Group();
  topLidGroup.name = 'Group_TopLid';

  const canBodyGroup = new THREE.Group();
  canBodyGroup.name = 'Group_CanBody';

  const liquidCoreGroup = new THREE.Group();
  liquidCoreGroup.name = 'Group_LiquidCore';

  const bottomBaseGroup = new THREE.Group();
  bottomBaseGroup.name = 'Group_BottomBase';

  const dropletsGroup = new THREE.Group();
  dropletsGroup.name = 'Group_Droplets';

  const particlesGroup = new THREE.Group();
  particlesGroup.name = 'Group_Particles';

  rootGroup.add(topTabGroup);
  rootGroup.add(topLidGroup);
  rootGroup.add(canBodyGroup);
  rootGroup.add(liquidCoreGroup);
  rootGroup.add(bottomBaseGroup);
  rootGroup.add(dropletsGroup);
  rootGroup.add(particlesGroup);

  // --- MATERIALS ---
  // Aluminum Metal Material (Unpainted top lid, rims, base)
  const aluminumMaterial = new THREE.MeshStandardMaterial({
    color: 0xd6dadf,
    metalness: 0.94,
    roughness: 0.22,
    envMapIntensity: 1.5,
  });

  // Dark interior scored flap aluminum
  const innerMetalMaterial = new THREE.MeshStandardMaterial({
    color: 0x88929c,
    metalness: 0.88,
    roughness: 0.45,
  });

  // Printed Label Material
  const { diffuseMap, bumpMap, roughnessMap } = createTsingtaoLabelTextures();
  const labelMaterial = new THREE.MeshStandardMaterial({
    map: diffuseMap,
    bumpMap: bumpMap,
    bumpScale: 0.008,
    roughnessMap: roughnessMap,
    metalness: 0.55,
    roughness: 0.32,
    envMapIntensity: 1.2,
  });

  // Liquid Beer Core Material (golden amber transparent)
  const liquidMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffaa00,
    transmission: 0.85,
    opacity: 1,
    transparent: true,
    roughness: 0.1,
    ior: 1.34,
    thickness: 0.5,
    attenuationColor: new THREE.Color(0xff8800),
    attenuationDistance: 0.6,
  });

  // --- GEOMETRY SPECIFICATIONS ---
  // Standard 330ml/500ml Beer Can Proportions: Height ~ 4.2 units, Radius ~ 1.15 units
  const canRadius = 1.15;
  const canHeight = 4.2;
  const neckRadius = 0.92;
  const neckHeight = 0.35;
  const rimRadius = 0.96;
  const rimHeight = 0.08;

  // 1. CAN BODY & NECK PROFILE (Lathe Geometry)
  // Define profile curve points from bottom concave center to top seam rim
  const points: THREE.Vector2[] = [];
  // Bottom center inner dome
  points.push(new THREE.Vector2(0.0, -canHeight * 0.5 + 0.15));
  points.push(new THREE.Vector2(0.65, -canHeight * 0.5 + 0.05));
  points.push(new THREE.Vector2(0.95, -canHeight * 0.5 + 0.02));
  // Bottom chime rim
  points.push(new THREE.Vector2(canRadius * 0.92, -canHeight * 0.5));
  points.push(new THREE.Vector2(canRadius, -canHeight * 0.5 + 0.15));
  // Main straight cylindrical body
  points.push(new THREE.Vector2(canRadius, canHeight * 0.5 - neckHeight));
  // Tapered neck curve
  points.push(new THREE.Vector2(canRadius * 0.96, canHeight * 0.5 - neckHeight * 0.4));
  points.push(new THREE.Vector2(neckRadius, canHeight * 0.5));
  // Top double seam bead rim
  points.push(new THREE.Vector2(rimRadius, canHeight * 0.5 + 0.02));
  points.push(new THREE.Vector2(rimRadius, canHeight * 0.5 + rimHeight));
  points.push(new THREE.Vector2(neckRadius - 0.02, canHeight * 0.5 + rimHeight));

  const bodyGeo = new THREE.LatheGeometry(points, 64);
  
  // Custom UV mapping for Lathe Geometry so label maps perfectly around cylinder
  const uvAttribute = bodyGeo.attributes.uv;
  const posAttribute = bodyGeo.attributes.position;
  for (let i = 0; i < posAttribute.count; i++) {
    const y = posAttribute.getY(i);
    const x = posAttribute.getX(i);
    const z = posAttribute.getZ(i);

    const angle = Math.atan2(z, x);
    const u = 1.0 - (angle + Math.PI) / (2 * Math.PI);
    const v = (y + canHeight * 0.5) / canHeight;

    uvAttribute.setXY(i, u, v);
  }
  bodyGeo.uvsNeedUpdate = true;
  bodyGeo.computeVertexNormals();

  const bodyMesh = new THREE.Mesh(bodyGeo, labelMaterial);
  canBodyGroup.add(bodyMesh);

  // 2. TOP LID
  const lidY = canHeight * 0.5 + 0.02;
  const lidGeo = new THREE.CylinderGeometry(neckRadius - 0.02, neckRadius - 0.02, 0.04, 64);
  const lidMesh = new THREE.Mesh(lidGeo, aluminumMaterial);
  lidMesh.position.y = lidY;
  topLidGroup.add(lidMesh);

  // Scored Opening Aperture Flap
  const flapGroup = new THREE.Group();
  flapGroup.position.set(0.25, lidY + 0.015, 0.2);
  topLidGroup.add(flapGroup);

  const flapShape = new THREE.Shape();
  flapShape.absarc(0, 0, 0.22, Math.PI * 0.2, Math.PI * 1.8, false);
  const flapGeo = new THREE.ExtrudeGeometry(flapShape, { depth: 0.01, bevelEnabled: true, bevelThickness: 0.005, bevelSize: 0.005 });
  flapGeo.rotateX(Math.PI * 0.5);
  const flapMesh = new THREE.Mesh(flapGeo, innerMetalMaterial);
  flapGroup.add(flapMesh);

  // 3. STAY-ON PULL TAB & RIVET
  const tabHingeGroup = new THREE.Group();
  tabHingeGroup.position.set(0, lidY + 0.025, 0); // Rivet center
  topTabGroup.add(tabHingeGroup);

  // Rivet Center Button
  const rivetGeo = new THREE.CylinderGeometry(0.06, 0.07, 0.03, 24);
  const rivetMesh = new THREE.Mesh(rivetGeo, aluminumMaterial);
  tabHingeGroup.add(rivetMesh);

  // Pull Tab Lever Body
  const tabShape = new THREE.Shape();
  // Outer pull tab contour
  tabShape.moveTo(-0.15, -0.2);
  tabShape.lineTo(-0.16, 0.55);
  tabShape.quadraticCurveTo(-0.16, 0.75, 0, 0.75);
  tabShape.quadraticCurveTo(0.16, 0.75, 0.16, 0.55);
  tabShape.lineTo(0.15, -0.2);
  tabShape.quadraticCurveTo(0.15, -0.32, 0, -0.32);
  tabShape.quadraticCurveTo(-0.15, -0.32, -0.15, -0.2);

  // Finger Hole cutout
  const fingerHole = new THREE.Path();
  fingerHole.absarc(0, 0.45, 0.1, 0, Math.PI * 2, true);
  tabShape.holes.push(fingerHole);

  // Rivet Attachment Hole cutout
  const rivetHole = new THREE.Path();
  rivetHole.absarc(0, 0, 0.07, 0, Math.PI * 2, true);
  tabShape.holes.push(rivetHole);

  const tabExtrudeSettings = {
    depth: 0.02,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.008,
    bevelThickness: 0.008,
  };

  const tabGeo = new THREE.ExtrudeGeometry(tabShape, tabExtrudeSettings);
  tabGeo.rotateX(-Math.PI * 0.5);

  const tabMesh = new THREE.Mesh(tabGeo, aluminumMaterial);
  tabHingeGroup.add(tabMesh);

  // 4. LIQUID CORE
  const liquidGeo = new THREE.CylinderGeometry(canRadius * 0.95, canRadius * 0.95, canHeight * 0.88, 32);
  const liquidMesh = new THREE.Mesh(liquidGeo, liquidMaterial);
  liquidMesh.position.y = -0.1;
  liquidCoreGroup.add(liquidMesh);

  // 5. BOTTOM BASE PLATE
  const baseGeo = new THREE.CylinderGeometry(canRadius * 0.9, canRadius * 0.85, 0.2, 32);
  const baseMesh = new THREE.Mesh(baseGeo, aluminumMaterial);
  baseMesh.position.y = -canHeight * 0.5 - 0.05;
  bottomBaseGroup.add(baseMesh);

  // 6. CONDENSATION WATER DROPLETS (Instanced Mesh)
  const dropletCount = options.dropletCount ?? 150;
  const dropletGeo = new THREE.SphereGeometry(0.025, 12, 12);
  dropletGeo.scale(1, 1, 0.4); // slightly flattened droplet shape

  const dropletMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 0.95,
    opacity: 1,
    transparent: true,
    roughness: 0.05,
    ior: 1.33, // Water index of refraction
  });

  const dropletInstancedMesh = new THREE.InstancedMesh(dropletGeo, dropletMat, dropletCount);
  const dummy = new THREE.Object3D();

  for (let i = 0; i < dropletCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.45) * (canHeight * 0.85);
    const radius = canRadius + 0.01;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    dummy.position.set(x, y, z);
    dummy.rotation.y = -angle;
    dummy.rotation.x = (Math.random() - 0.5) * 0.2;

    const scale = 0.6 + Math.random() * 0.8;
    dummy.scale.set(scale, scale * (0.8 + Math.random() * 0.6), scale);

    dummy.updateMatrix();
    dropletInstancedMesh.setMatrixAt(i, dummy.matrix);
  }
  dropletInstancedMesh.instanceMatrix.needsUpdate = true;
  dropletsGroup.add(dropletInstancedMesh);

  // 7. CARBONATION SPRAY PARTICLES
  const particleCount = 40;
  const particleGeo = new THREE.SphereGeometry(0.015, 8, 8);
  const particleMat = new THREE.MeshBasicMaterial({
    color: 0xfff3d1,
    transparent: true,
    opacity: 0.8,
  });

  const particleInstancedMesh = new THREE.InstancedMesh(particleGeo, particleMat, particleCount);
  const particleData: { velocity: THREE.Vector3; initialPos: THREE.Vector3; active: boolean }[] = [];

  for (let i = 0; i < particleCount; i++) {
    const initialPos = new THREE.Vector3(
      0.25 + (Math.random() - 0.5) * 0.1,
      lidY + 0.05,
      0.2 + (Math.random() - 0.5) * 0.1
    );
    const velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 1.5,
      1.2 + Math.random() * 2.5,
      (Math.random() - 0.5) * 1.5
    );
    particleData.push({ velocity, initialPos, active: false });

    dummy.position.copy(initialPos);
    dummy.scale.set(0, 0, 0);
    dummy.updateMatrix();
    particleInstancedMesh.setMatrixAt(i, dummy.matrix);
  }
  particlesGroup.add(particleInstancedMesh);

  // --- STATE CONTROL VARS ---
  let explodeAmount = 0;
  let openTabAmount = 0;
  let currentMatMode: 'pbr' | 'normal' | 'roughness' | 'uv' = 'pbr';
  let particleAnimTimer = 0;

  // --- CONTROLLER METHODS ---
  const update = (delta: number) => {
    // Animate carbonation particles if tab is open
    if (openTabAmount > 0.1) {
      particleAnimTimer += delta * 3;
      for (let i = 0; i < particleCount; i++) {
        const p = particleData[i];
        const progress = (particleAnimTimer + i * 0.1) % 1.0;
        
        const px = p.initialPos.x + p.velocity.x * progress * 0.4;
        const py = p.initialPos.y + p.velocity.y * progress * 0.4;
        const pz = p.initialPos.z + p.velocity.z * progress * 0.4;

        const scale = Math.sin(progress * Math.PI) * (0.8 + Math.random() * 0.4) * openTabAmount;
        
        dummy.position.set(px, py, pz);
        dummy.scale.set(scale, scale, scale);
        dummy.updateMatrix();
        particleInstancedMesh.setMatrixAt(i, dummy.matrix);
      }
      particleInstancedMesh.instanceMatrix.needsUpdate = true;
    } else {
      // Hide particles when closed
      for (let i = 0; i < particleCount; i++) {
        dummy.scale.set(0, 0, 0);
        dummy.updateMatrix();
        particleInstancedMesh.setMatrixAt(i, dummy.matrix);
      }
      particleInstancedMesh.instanceMatrix.needsUpdate = true;
    }
  };

  const setExplodeAmount = (amount: number) => {
    explodeAmount = Math.max(0, Math.min(1, amount));
    const factor = explodeAmount * 1.8;

    topTabGroup.position.y = factor * 1.5;
    topLidGroup.position.y = factor * 1.0;
    canBodyGroup.position.y = 0;
    liquidCoreGroup.position.y = -factor * 0.5;
    bottomBaseGroup.position.y = -factor * 1.2;
    dropletsGroup.position.y = 0;
  };

  const setOpenTabAmount = (amount: number) => {
    openTabAmount = Math.max(0, Math.min(1, amount));
    
    // Rotate pull tab up 45 degrees
    tabHingeGroup.rotation.x = openTabAmount * Math.PI * 0.35;
    
    // Push scored aperture flap down into can body
    flapGroup.rotation.x = openTabAmount * Math.PI * 0.6;
    flapGroup.position.y = lidY + 0.015 - openTabAmount * 0.08;
    flapGroup.position.z = 0.2 + openTabAmount * 0.05;
  };

  const setCondensationVisible = (visible: boolean) => {
    dropletsGroup.visible = visible;
  };

  const setWireframe = (wireframe: boolean) => {
    labelMaterial.wireframe = wireframe;
    aluminumMaterial.wireframe = wireframe;
    liquidMaterial.wireframe = wireframe;
  };

  const setMaterialMode = (mode: 'pbr' | 'normal' | 'roughness' | 'uv') => {
    currentMatMode = mode;
    if (mode === 'pbr') {
      labelMaterial.map = diffuseMap;
      labelMaterial.bumpMap = bumpMap;
      labelMaterial.roughnessMap = roughnessMap;
      labelMaterial.needsUpdate = true;
    } else if (mode === 'normal') {
      labelMaterial.map = bumpMap;
      labelMaterial.bumpMap = null;
      labelMaterial.needsUpdate = true;
    } else if (mode === 'roughness') {
      labelMaterial.map = roughnessMap;
      labelMaterial.bumpMap = null;
      labelMaterial.needsUpdate = true;
    } else if (mode === 'uv') {
      labelMaterial.map = diffuseMap;
      labelMaterial.bumpMap = null;
      labelMaterial.needsUpdate = true;
    }
  };

  const dispose = () => {
    bodyGeo.dispose();
    lidGeo.dispose();
    flapGeo.dispose();
    tabGeo.dispose();
    rivetGeo.dispose();
    liquidGeo.dispose();
    baseGeo.dispose();
    dropletGeo.dispose();
    particleGeo.dispose();

    diffuseMap.dispose();
    bumpMap.dispose();
    roughnessMap.dispose();
    labelMaterial.dispose();
    aluminumMaterial.dispose();
    innerMetalMaterial.dispose();
    liquidMaterial.dispose();
    dropletMat.dispose();
    particleMat.dispose();
  };

  return {
    group: rootGroup,
    update,
    setExplodeAmount,
    setOpenTabAmount,
    setCondensationVisible,
    setWireframe,
    setMaterialMode,
    dispose,
  };
}
