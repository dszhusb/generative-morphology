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
        b: { value: 0.25, min: 0, max: 1, step: 0.01 },
        d: { value: 0.45, min: 0.01, max: 2, step: 0.01 },
        z: { value: 0.34, min: 0, max: 20, step: 0.01 }
    })

    const e = useControls("Cross Section Ellipse", {
        a: { value: 1, min: 0.5, max: 1.5, step: 0.01 },
        phi: { value: 0, min: 0, max: 2 * Math.PI, step: 0.01 },
        psi: { value: 0, min: 0, max: Math.PI, step: 0.01 }
    })

    const d = useControls("Decoration Details", {
        c: { value: 10, min: 0, max: 50, step: 1 },
        cDepth: { value: 0.1, min: 0, max: 0.2 },
        n: { value: 1, min: 1, max: 20, step: 1 },
        nDepth: { value: 0.1, min: 0, max: 0.2 }
    })

    const g = useControls("Geometry Settings", {
        detail: { value: 30, min: 2, max: 100, step: 1 },
        sDetail: { value: 100, min: 20, max: 100, step: 1 },
        s: { value: 12, min: 0, max: 50, step: 1 },
        wireframe: true
    })

    const geometry = new THREE.CylinderGeometry(1, 1, 1, g.sDetail, g.s * g.detail, true)
    const curve = getCurvePoints(e.a, c.b, d.c, g.detail, c.z, c.d, g.s, g.sDetail, e.phi, e.psi, d.n, d.cDepth, d.nDepth)
    const position = geometry.attributes.position;

    for (let i = 0; i < position.count; i += 1) {
        const f = i * 3
        position.setXYZ(i, curve[f], curve[f + 1], curve[f + 2]);
    }

    const mesh = MapMesh(geometry, g.wireframe)

    return (
        <Model mesh={mesh} text={text} />
    )
}

function MapMesh(geometry, wireframe) {

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

function getCurvePoints(a, b, c, detail, z, d, s, sDetail, phi, psi, n, cDepth, nDepth) {
    let curve = []

    for (let i = 0.1; i < s; i += Math.PI / detail) {
        const mult = Math.pow(Math.E, b * i)
        const dx = mult * d * Math.sin(i)
        const dy = mult * d * Math.cos(i)
        const pos = new THREE.Vector3(dx, dy, mult * z)
        const ic = 1 + cDepth * Math.sin(i * c)

        let rotation = Math.atan(dy / dx) + psi
        if (((i / Math.PI) % 2) > 1) {
            rotation += Math.PI
        }
        const qt = new THREE.Quaternion().setFromRotationMatrix(getRotationBy(rotation))

        const frac = 2 * Math.PI / sDetail
        for (let j = 0; j <= sDetail; j++) {
            const deg = frac * j
            const nCurv = 1 + nDepth * Math.sin(deg * n)
            const r = Math.pow(Math.E, b * i) - 1 / (i + 1)
            const px = a * Math.sin(deg) * Math.cos(phi) + Math.cos(deg) * Math.sin(phi)
            const pz = a * Math.sin(deg) * Math.sin(phi) - Math.cos(deg) * Math.cos(phi)
            let point = new THREE.Vector3(px * r * nCurv * ic, 0, pz * r * nCurv * ic)
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