import * as THREE from 'three'
export { getRotationBy }

function getRotationBy(rotation) {
    const rotationMatrix = new THREE.Matrix4(
        Math.cos(rotation), -Math.sin(rotation), 0, 0,
        Math.sin(rotation), Math.cos(rotation), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    )
    return rotationMatrix
}