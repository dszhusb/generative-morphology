import { OrbitControls, Float, Stars } from '@react-three/drei'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

export default function Scene(props) {

    return (
        <div id="canvas-container" className="w-full h-full">
            <Canvas camera={{ position: [0, 0, -30] }}>
                <Stars />
                <color attach="background" args={['black']} />
                <OrbitControls makeDefault minDistance={20} />
                <Suspense fallback={null}>
                    <ambientLight color={0xe0e6ff} />
                    <directionalLight color="white" position={[100, 100, -100]} />
                    <directionalLight color="yellow" position={[100, -100, 0]} />
                    <directionalLight color="blue" position={[100, -100, 100]} />
                    <Float speed={2} rotationIntensity={1} floatIntensity={1} floatingRange={[0, 5]}>
                        {props.children}
                    </Float>
                </Suspense>
            </Canvas>
        </div>
    )
}