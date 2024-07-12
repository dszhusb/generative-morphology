import * as THREE from 'three'
import { useState, useEffect } from 'react'
import { useControls } from 'leva'
import { Line } from '@react-three/drei'
import Model from '../Model'

import PlanarBryozoanText from '../../markdown/PlanarBryozoan.md'

export default function PlanarBryozoan() {
    const [text, setText] = useState('')
    useEffect(() => {
        fetch(PlanarBryozoanText).then(res => res.text()).then(text => setText(text))
    })

    const c = useControls("Generating Curve", {
        angle: { value: Math.PI / 5, min: 0, max: Math.PI, step: 0.01 },
        angleRate: { value: 0, min: 0, max: Math.PI, step: 0.01 },
        branchLength: { value: 1, min: 0, max: 10, step: 0.01 },
        branchLengthRate: { value: 0, min: -1, max: 1, step: 0.01 },
        branchDepth: { value: 6, min: 1, max: 10, step: 1 },
    })

    const curve = getCurvePoints(c.angle, c.angleRate, c.branchLength, c.branchLengthRate, c.branchDepth)
    const mesh = mapMesh(curve)

    return (
        <Model mesh={mesh} text={text} />
    )
}

function mapMesh(curve) {
    return (
        <>
            {curve.map((l, i) => {
                return <Line points={l} color="white" key={i} />
            })}
        </>
    )
}

function getCurvePoints(a, ar, b, br, d) {
    let curve = []
    let layer = [new THREE.Vector4(0, 0, 0, 0)]

    for (let i = 0; i < d; i++) {
        let newLayer = []
        const cb = b + b * br * i / d
        const ca = a + (ar - a) * i / d
        for (let p of layer) {
            const al = ca / 2 + p.w
            const ar = -ca / 2 + p.w
            const l = new THREE.Vector4(cb * Math.sin(al) + p.x, cb * Math.cos(al) + p.y, 0, al)
            const r = new THREE.Vector4(cb * Math.sin(ar) + p.x, cb * Math.cos(ar) + p.y, 0, ar)
            newLayer.push(l, r)
            curve.push([p, l], [p, r])
        }
        layer = newLayer
    }
    return curve
}