const fs = require('fs');
let code = fs.readFileSync('src/components/HolographicOrb.tsx', 'utf8');

// Increase container size
code = code.replace(/max-w-\[320px\] max-h-\[320px\]/g, 'max-w-[480px] max-h-[480px]');
code = code.replace(/w-full h-64 sm:h-72/g, 'w-[120%] h-80 sm:h-96 -ml-[10%]');

// Increase particles
code = code.replace(/const particleCount = 1600;/g, 'const particleCount = 4500;');

// Add new rings and elements in the setup
const sceneSetupTarget = `
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);`;

const extraElements = `
    // Extra Ring 3
    const ringGeo3 = new THREE.TorusGeometry(3.4, 0.008, 16, 100);
    const ringMat3 = new THREE.MeshBasicMaterial({ color: 0x2dd4bf, transparent: true, opacity: 0.3 });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.z = Math.PI / 6;
    scene.add(ring3);

    // Extra Ring 4
    const ringGeo4 = new THREE.TorusGeometry(1.5, 0.02, 16, 100);
    const ringMat4 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.5, wireframe: true });
    const ring4 = new THREE.Mesh(ringGeo4, ringMat4);
    ring4.rotation.x = Math.PI / 2;
    scene.add(ring4);

    // Inner Nucleus (reacts strongly to audio)
    const nucleusGeo = new THREE.IcosahedronGeometry(0.5, 2);
    const nucleusMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    scene.add(nucleusMesh);
`;
code = code.replace(sceneSetupTarget, sceneSetupTarget + extraElements);

// Add rotations and scale to animate loop
const animateTarget = `
      ring1.rotation.z = elapsedTime * 0.3 * speedMult;
      ring2.rotation.x = -elapsedTime * 0.2 * speedMult;`;
const extraAnimate = `
      ring3.rotation.y = elapsedTime * 0.1 * speedMult;
      ring3.rotation.x = Math.sin(elapsedTime * 0.2) * 0.2;
      ring4.rotation.z = -elapsedTime * 0.4 * speedMult;
      
      const nucScale = 1.0 + (currentAmp * 2.5);
      nucleusMesh.scale.set(nucScale, nucScale, nucScale);
      nucleusMesh.rotation.y = elapsedTime * 1.5 * speedMult;
      nucleusMesh.rotation.x = elapsedTime * 1.2 * speedMult;
      nucleusMat.color.setHex(coreColor);
      ringMat3.color.setHex(coreColor);
      ringMat4.color.setHex(coreColor);
`;
code = code.replace(animateTarget, animateTarget + extraAnimate);

// Dispose extra elements
const disposeTarget = `
      ringGeo2.dispose();
      ringMat2.dispose();`;
const extraDispose = `
      ringGeo3.dispose();
      ringMat3.dispose();
      ringGeo4.dispose();
      ringMat4.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
`;
code = code.replace(disposeTarget, disposeTarget + extraDispose);

fs.writeFileSync('src/components/HolographicOrb.tsx', code);
