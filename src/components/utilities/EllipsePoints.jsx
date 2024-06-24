//https://stackoverflow.com/questions/72085586/how-can-i-create-a-3d-flat-ellipse-in-react-three-fiber

import * as THREE from 'three'
import { EllipseCurve } from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { extend } from '@react-three/fiber';

extend({ Line2 });

export default function EllipsePoints(rx, ry) {

  const curve = new EllipseCurve(
    0, 0, // xCenter, yCenter
    rx, ry, // xRadius, yRadius
    0, 2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    0 // aRotation
  );

  const points = curve.getPoints(50);
  const positions = points.reduce((acc, p) => {
    acc.push(new THREE.Vector3(p.x, p.y, 0))
    return acc;
  }, []);

  // to get a closed curve, add first point at the end again
  positions.push(points[0].x);
  positions.push(points[0].y);
  positions.push(0);

  return positions
}