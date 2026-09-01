const fs = require('fs');
let code = fs.readFileSync('src/components/HolographicOrb.tsx', 'utf8');

const setupInjection = `
    // Inner Nucleus (reacts strongly to audio)
    const nucleusGeo = new THREE.IcosahedronGeometry(0.5, 2);
    const nucleusMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    scene.add(nucleusMesh);

    // Audio Waveform Ring
    const waveCount = 128;
    const waveGeo = new THREE.BufferGeometry();
    const wavePos = new Float32Array(waveCount * 3);
    waveGeo.setAttribute('position', new THREE.BufferAttribute(wavePos, 3));
    const waveMat = new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.8 });
    const waveMesh = new THREE.LineLoop(waveGeo, waveMat);
    waveMesh.rotation.x = Math.PI / 2.2;
    scene.add(waveMesh);

    const ampHistory = new Array(waveCount).fill(0);
`;

code = code.replace(/\/\/ Inner Nucleus.*?scene\.add\(nucleusMesh\);/s, setupInjection);

const animateInjection = `
      // Color palettes by cognitive state
`;
const animateReplacement = `
      // Update Audio Waveform History
      const lastAmp = ampHistory[0];
      const smoothedAmp = lastAmp + (currentAmp - lastAmp) * 0.2;
      ampHistory.unshift(smoothedAmp);
      ampHistory.pop();

      // Color palettes by cognitive state
`;
code = code.replace(animateInjection, animateReplacement);

const renderInjection = `
      const nucScale = 1.0 + (currentAmp * 2.5);
      nucleusMesh.scale.set(nucScale, nucScale, nucScale);
      nucleusMesh.rotation.y = elapsedTime * 1.5 * speedMult;
      nucleusMesh.rotation.x = elapsedTime * 1.2 * speedMult;
      nucleusMat.color.setHex(coreColor);
      ringMat3.color.setHex(coreColor);
      ringMat4.color.setHex(coreColor);

      const wavePosAttr = waveGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < waveCount; i++) {
        const angle = (i / waveCount) * Math.PI * 2;
        const env = ampHistory[i];
        const carrier = Math.sin(i * 0.5 + elapsedTime * 15) * Math.cos(i * 0.8);
        const r = 4.2 + (env * 1.0) + (env * carrier * 2.0);
        wavePosAttr.setXYZ(i, Math.cos(angle) * r, Math.sin(angle) * r, 0);
      }
      wavePosAttr.needsUpdate = true;
      waveMat.color.setHex(coreColor);
      waveMesh.rotation.z = -elapsedTime * 0.1 * speedMult;
`;
code = code.replace(/const nucScale = 1\.0 \+ \(currentAmp \* 2\.5\);.*?ringMat4\.color\.setHex\(coreColor\);/s, renderInjection);

const disposeInjection = `
      nucleusGeo.dispose();
      nucleusMat.dispose();
      waveGeo.dispose();
      waveMat.dispose();
`;
code = code.replace(/nucleusGeo\.dispose\(\);\s*nucleusMat\.dispose\(\);/s, disposeInjection);

fs.writeFileSync('src/components/HolographicOrb.tsx', code);
