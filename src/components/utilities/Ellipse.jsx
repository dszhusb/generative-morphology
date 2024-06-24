//https://stackoverflow.com/questions/72085586/how-can-i-create-a-3d-flat-ellipse-in-react-three-fiber
import React from 'react';

import { EllipseCurve } from 'three';

import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';

import { extend } from '@react-three/fiber';

extend({ Line2 });

export default function Ellipse(props) {

  // geometry
  const geometry = new LineGeometry();
  const material = new LineMaterial({ color: props.color, linewidth: props.lineWidth });

  const curve = new EllipseCurve(
    0, 0, // xCenter, yCenter
    props.rx, props.ry, // xRadius, yRadius
    0, 2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    0 // aRotation
  );

  const points = curve.getPoints(50);

  const positions = points.reduce((acc, p) => {
    acc.push(p.x);
    acc.push(p.y);
    acc.push(0);

    return acc;
  }, []);

  // to get a closed curve, add first point at the end again
  positions.push(points[0].x);
  positions.push(points[0].y);
  positions.push(0);

  geometry.setPositions(positions);
  material.resolution.set(window.innerWidth, window.innerHeight);

  return (
    <mesh {...props} position={props.position} quaternion={props.quaternion}>
      <line2 geometry={geometry} material={material} />
    </mesh>
  );
}