import * as THREE from 'three'
import { useState, useEffect } from 'react'
// import { useThree, useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { getRotationBy } from '../../components/utilities/utilities'
import Model from '../Model'

import RaupText from '../../markdown/Raup.md'

export default function Raup() {
    const [text, setText] = useState('')
    useEffect(() => {
        fetch(RaupText).then(res => res.text()).then(text => setText(text))
    })

    const c = useControls("Generating Curve", {
        w: { value: 0.04, min: 0, max: 10, step: 0.01 },
        d: { value: 0.45, min: 0, max: 10, step: 0.01 },
        t: { value: 0.34, min: 0, max: 20, step: 0.01 },
        snug: false
    })

    const e = useControls("Cross Section Ellipse", {
        s: { value: 1, min: 0.5, max: 1.5, step: 0.01 },
        phi: { value: 0, min: 0, max: 2 * Math.PI, step: 0.01 }
    })

    const g = useControls("Geometry Settings", {
        detail: { value: 30, min: 2, max: 100, step: 1 },
        sDetail: { value: 100, min: 20, max: 100, step: 1 },
        l: { value: 12, min: 0, max: 50, step: 1 },
        wireframe: true
    })

    const geometry = new THREE.CylinderGeometry(1, 1, 1, g.sDetail, g.l * g.detail, true)
    const curve = getCurvePoints(e.s, c.w, g.detail, c.t, c.d, g.l, g.sDetail, e.phi, c.snug)
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

function getCurvePoints(s, w, detail, t, d, l, sDetail, phi, snug) {
    let curve = []

    for (let i = 0.1; i < l; i += Math.PI / detail) {
        const lw = i * w
        const lt = i * t
        let ld = i * d
        
        // if (snug) {
        //     ld = (1 + Math.sqrt(1 + Math.pow(lt, 2)) + (1 - Math.sqrt(1 + Math.pow(lt, 2))) * lw) / (1 - Math.sqrt(1 + Math.pow(lt, 2)) + (1 + Math.sqrt(1 + Math.pow(lt, 2))) * lw)
        // }

        const r = (lw - ld) / 2
        const p = r + ld
        const dx = p * Math.sin(i)
        const dy = p * Math.cos(i)
        const pos = new THREE.Vector3(dx, dy, lt)

        let rotation = Math.atan(dy / dx)
        if (((i / Math.PI) % 2) > 1) {
            rotation += Math.PI
        }
        const qt = new THREE.Quaternion().setFromRotationMatrix(getRotationBy(rotation))

        const frac = 2 * Math.PI / sDetail
        for (let j = 0; j <= sDetail; j++) {
            const deg = frac * j
            const px = s * Math.sin(deg) * Math.cos(phi) + Math.cos(deg) * Math.sin(phi)
            const pt = s * Math.sin(deg) * Math.sin(phi) - Math.cos(deg) * Math.cos(phi)
            let point = new THREE.Vector3(px * r, 0, pt * r)
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