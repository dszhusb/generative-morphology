import * as THREE from 'three'
import { useState, useEffect } from 'react'
// import { useThree, useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { getRotationBy } from '../../components/utilities/utilities'
import Model from '../Model'

import ParametricText from '../../markdown/ParametricText.md'

export default function ParametricMesh() {
    const [text, setText] = useState('')
    useEffect(() => {
        fetch(ParametricText).then(res => res.text()).then(text => setText(text))
    })

    const c = useControls("Generating Curve", {
        b: { value: 0.01, min: 0, max: 2, step: 0.01 },
        d: { value: 1, min: 0.01, max: 2, step: 0.01 },
        z: { value: 1, min: 0, max: 20, step: 0.01 }
    })

    const e = useControls("Cross Section Ellipse", {
        cs: { value: 1, min: 1, max: 5, step: 0.01 },
        a: { value: 1, min: 0.5, max: 1.5, step: 0.01 },
        phi: { value: 0, min: 0, max: 2 * Math.PI, step: 0.01 }
    })

    const d = useControls("Decoration Details", {
        c: { value: 0, min: 0, max: 50, step: 1 },
        cDepth: { value: 0.1, min: 0, max: 0.2 },
        n: { value: 1, min: 1, max: 20, step: 1 },
        nDepth: { value: 0.1, min: 0, max: 0.2 }
    })

    const g = useControls("Geometry Settings", {
        detail: { value: 128, min: 2, max: 100, step: 1 },
        sDetail: { value: 20, min: 20, max: 100, step: 1 },
        s: { value: 12, min: 0, max: 50, step: 1 },
        wireframe: false
    })

    // const controls = useThree((state) => state.controls)
    // useFrame(() => {
    //     if (controls !== null) {
    //         controls.target = new THREE.Vector3(0, 0, g.s * g.z / 2)
    //     }
    // })

    const geometry = new THREE.CylinderGeometry(1, 1, 1, g.sDetail, g.s * g.detail, true)
    const curve = getCurvePoints(e.a, c.b, d.c, g.detail, c.z, c.d, g.s, g.sDetail, e.phi, d.n, d.cDepth, d.nDepth, e.cs)
    const position = geometry.attributes.position;

    for (let i = 0; i < position.count; i += 1) {
        const f = i * 3
        position.setXYZ(i, curve[f], curve[f + 1], curve[f + 2]);
    }

    const mesh = mapMesh(geometry, g.wireframe)

    return (
        <Model mesh={mesh} text={text} />
    )
}

function mapMesh(geometry, wireframe) {

    return (
        <mesh castShadow geometry={geometry}>
            <meshPhysicalMaterial
                wireframe={wireframe}
                side={THREE.DoubleSide}
                color={0xffddd4}
                iridescence={1}
                roughness={0}
                clearcoat={0.5}
            />
        </mesh>
    )
}

function getCurvePoints(a, b, c, detail, z, d, s, sDetail, phi, n, cDepth, nDepth, cs) {
    let curve = []

    for (let i = 0.1; i < s; i += Math.PI / detail) {
        const lz = i * z
        const ld = i * d
        const mult = Math.pow(10, b * i)
        const dx = mult * ld * Math.sin(i)
        const dy = mult * ld * Math.cos(i)
        const pos = new THREE.Vector3(dx, dy, mult * lz)
        const ic = 1 + cDepth * Math.sin(i * c)

        let rotation = Math.atan(dy / dx)
        if (((i / Math.PI) % 2) > 1) {
            rotation += Math.PI
        }
        const qt = new THREE.Quaternion().setFromRotationMatrix(getRotationBy(rotation))

        const frac = 2 * Math.PI / sDetail
        for (let j = 0; j <= sDetail; j++) {
            const deg = frac * j
            const nCurv = 1 + nDepth * Math.sin(deg * n)
            const x = a * Math.sin(deg) * Math.cos(phi) + Math.cos(deg) * Math.sin(phi)
            const z = a * Math.sin(deg) * Math.sin(phi) - Math.cos(deg) * Math.cos(phi)
            let point = new THREE.Vector3(x * i * nCurv * ic * cs, 0, z * i * nCurv * ic * cs)
            point.applyQuaternion(qt)
            point.add(pos)
            curve.push(point.x, point.y, point.z)
        }
    }
    return curve
}

// const controls = useThree((state) => state.controls)
// useFrame(() => {
//     if (controls !== null) {
//         controls.target = new THREE.Vector3(0, 0, s * z / 2)
//     }
// })