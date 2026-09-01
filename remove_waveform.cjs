const fs = require('fs');
let code = fs.readFileSync('src/components/HolographicOrb.tsx', 'utf8');

const setupInjection = `    // Audio Waveform Ring
    const waveCount = 128;
    const waveGeo = new THREE.BufferGeometry();
    const wavePos = new Float32Array(waveCount * 3);
    waveGeo.setAttribute('position', new THREE.BufferAttribute(wavePos, 3));
    const waveMat = new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.8 });
    const waveMesh = new THREE.LineLoop(waveGeo, waveMat);
    waveMesh.rotation.x = Math.PI / 2.2;
    scene.add(waveMesh);

    const ampHistory = new Array(waveCount).fill(0);`;
code = code.replace(setupInjection, '');

const animateInjection = `      // Update Audio Waveform History
      const lastAmp = ampHistory[0];
      const smoothedAmp = lastAmp + (currentAmp - lastAmp) * 0.2;
      ampHistory.unshift(smoothedAmp);
      ampHistory.pop();`;
code = code.replace(animateInjection, '');

const renderInjection = `      const wavePosAttr = waveGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < waveCount; i++) {
        const angle = (i / waveCount) * Math.PI * 2;
        const env = ampHistory[i];
        const carrier = Math.sin(i * 0.5 + elapsedTime * 15) * Math.cos(i * 0.8);
        const r = 4.2 + (env * 1.0) + (env * carrier * 2.0);
        wavePosAttr.setXYZ(i, Math.cos(angle) * r, Math.sin(angle) * r, 0);
      }
      wavePosAttr.needsUpdate = true;
      waveMat.color.setHex(coreColor);
      waveMesh.rotation.z = -elapsedTime * 0.1 * speedMult;`;
code = code.replace(renderInjection, '');

const disposeInjection = `      waveGeo.dispose();
      waveMat.dispose();`;
code = code.replace(disposeInjection, '');

fs.writeFileSync('src/components/HolographicOrb.tsx', code);
