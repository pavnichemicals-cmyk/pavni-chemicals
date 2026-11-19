/**
 * Pavni Chemicals — 3D Molecular Hero Animation
 * Uses Three.js to create a premium, abstract chemical network
 */
(function () {
    if (typeof THREE === 'undefined') return;

    const container = document.getElementById('hero-3d-container');
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- Object Parameters ---
    const nodeCount = 60;
    const nodes = [];
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    // --- Materials ---
    const nodeMaterial = new THREE.MeshPhongMaterial({
        color: 0x2dd4bf,
        emissive: 0x14b8a6,
        emissiveIntensity: 0.5,
        shininess: 100
    });

    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x2dd4bf,
        transparent: true,
        opacity: 0.2
    });

    // --- Create Nodes ---
    const sphereGeo = new THREE.SphereGeometry(0.1, 16, 16);
    for (let i = 0; i < nodeCount; i++) {
        const mesh = new THREE.Mesh(sphereGeo, nodeMaterial);
        
        // Random positions in a sphere-like volume
        const r = 5 + Math.random() * 5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        mesh.position.set(
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta),
            r * Math.cos(phi)
        );
        
        // Velocity for floating effect
        mesh.userData.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01
        );
        
        nodes.push(mesh);
        nodeGroup.add(mesh);
    }

    // --- Create Connections (Lines) ---
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(nodeCount * nodeCount * 6); // Max possible connections
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x2dd4bf, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 12;

    // --- Interaction ---
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.005;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.005;
    });

    // --- Resize Handler ---
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // --- Animation Loop ---
    function animate() {
        requestAnimationFrame(animate);

        // Subtle rotation based on mouse
        nodeGroup.rotation.y += (mouseX - nodeGroup.rotation.y) * 0.05;
        nodeGroup.rotation.x += (mouseY - nodeGroup.rotation.x) * 0.05;

        // Animate nodes and update lines
        let lineIndex = 0;
        const positions = lineGeometry.attributes.position.array;

        for (let i = 0; i < nodeCount; i++) {
            const nodeA = nodes[i];
            
            // Move node
            nodeA.position.add(nodeA.userData.velocity);
            
            // Bounce off "walls"
            if (Math.abs(nodeA.position.x) > 8) nodeA.userData.velocity.x *= -1;
            if (Math.abs(nodeA.position.y) > 8) nodeA.userData.velocity.y *= -1;
            if (Math.abs(nodeA.position.z) > 8) nodeA.userData.velocity.z *= -1;

            // Connect nearby nodes
            for (let j = i + 1; j < nodeCount; j++) {
                const nodeB = nodes[j];
                const dist = nodeA.position.distanceTo(nodeB.position);

                if (dist < 4) {
                    positions[lineIndex++] = nodeA.position.x;
                    positions[lineIndex++] = nodeA.position.y;
                    positions[lineIndex++] = nodeA.position.z;
                    positions[lineIndex++] = nodeB.position.x;
                    positions[lineIndex++] = nodeB.position.y;
                    positions[lineIndex++] = nodeB.position.z;
                }
            }
        }

        lineGeometry.setDrawRange(0, lineIndex / 3);
        lineGeometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    }

    animate();
})();
