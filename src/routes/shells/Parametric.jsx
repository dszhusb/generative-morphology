import * as THREE from 'three'
// import { useThree, useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { getRotationBy } from '../../components/utilities/utilities'
import Model from '../Model'

export default function Parametric() {
    const { a } = useControls({ a: { value: 1, min: 0, max: 2, step: 0.01 } })
    const { b } = useControls({ b: { value: 0.05, min: 0, max: 2, step: 0.01 } })
    const { detail } = useControls({ detail: { value: 128, min: 0, max: 200, step: 1 } })
    const { z } = useControls({ z: { value: 1, min: 0, max: 10, step: 0.01 } })
    const { d } = useControls({ d: { value: 1, min: 0, max: 2, step: 0.01 } })
    const { s } = useControls({ s: { value: 11, min: 0, max: 20, step: 1 } })

    let curve = []
    let quaternions = []
    let radii = []

    for (let i = 0; i < s; i += Math.PI / detail) {
        let lz = i * z
        let ld = i * d
        const mult = Math.pow(Math.E, b * i)
        const dx = mult * ld * Math.sin(i)
        const dy = mult * ld * Math.cos(i)
        const pos = new THREE.Vector3(dx, dy, mult * lz)
        let qt = new THREE.Quaternion().setFromRotationMatrix(getRotationBy(Math.atan(dy / dx)))
        const rad = i * a

        curve.push(pos)
        quaternions.push(qt)
        radii.push(rad)
    }

    const mesh = mapCurve(curve, quaternions, radii, detail)

    return (
        <Model mesh={mesh} />
    )
}

function mapCurve(curve, quaternions, radii, detail) {
    return (
        <>
            {
                quaternions.map((q, i) => {
                    const r = radii[i]
                    const dist = curve[i].distanceTo(new THREE.Vector3(0, 0, 0)) + r
                    const h = dist * Math.sin(Math.PI / detail)
                    return (
                        <mesh position={curve[i]} quaternion={q} key={i + "c"}>
                            <meshPhysicalMaterial side={THREE.DoubleSide} color="white" roughness={0} />
                            <cylinderGeometry args={[r, r, h, 60, 1, true]} />
                        </mesh>
                    )
                })
            }
        </>
    )
}