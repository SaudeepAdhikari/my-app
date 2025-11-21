import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

const AnimatedSphere = () => {
    const sphereRef = useRef();

    useFrame(({ clock, mouse }) => {
        const t = clock.getElapsedTime();
        // Rotate the sphere
        sphereRef.current.rotation.z = t * 0.1;
        sphereRef.current.rotation.x = t * 0.1;

        // Subtle movement based on mouse position
        const x = (mouse.x * window.innerWidth) / 500;
        const y = (mouse.y * window.innerHeight) / 500;
        sphereRef.current.position.x = x;
        sphereRef.current.position.y = y;
    });

    return (
        <Sphere visible args={[1, 100, 200]} scale={2.5} ref={sphereRef}>
            <MeshDistortMaterial
                color="#8b5cf6" // Primary purple color
                attach="material"
                distort={0.4} // Strength of distortion
                speed={2} // Speed of distortion
                roughness={0.2}
                metalness={0.8}
            />
        </Sphere>
    );
};

const ThreeBackground = () => {
    return (
        <div className="absolute inset-0 w-full h-full -z-10 opacity-40">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={1} color="#ec4899" /> {/* Secondary pink light */}
                <AnimatedSphere />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;
