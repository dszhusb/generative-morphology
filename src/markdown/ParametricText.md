# Parametric Shell Model

**This parametric shell model is based on a [paper](https://www.mdpi.com/1424-2818/15/3/431) by Gabriela Contreras-Figueroa and José L. Aragón. This model was built to more closely match the data produced by real shells and contains a number of additional parameters compared to the model in Raup's original paper.**

---

> **Generating Curve Equation:** 𝛾→(t) = ebt(d*sin(t),d*cos(t),z)

> **b:** Spiral expansion

> **d:** Distance from curve to the central axis

> **z:** Vertical translation of the spiral along its length

> **Shell Aperture Shape:** (𝑎sin𝜃cos𝜙+cos𝜃sin𝜙,𝑎sin𝜃sin𝜙−cos𝜃cos𝜙)

> **a:** Ratio between the major and minor axes of the ellipse modeling the aperture of the shell.

> **ϕ :** Initial tilt angle of the shell aperture (generating curve).

> **Geometry Settings:** Three.js geometry settings.

> **detail:** The amount of detail between key points.

> **sDetail:** The amount of detail in the aperture of the ellipse.

> **s:** Length of the spiral

> **Decoration Details:**

> **c:** The number of oscillating curves along the generating curve.

> **cDepth:** The depth of the oscillating curve along the curve.

> **n:** The number of oscillating curves along the aperture of the shell.

> **nDepth:** The depth of the oscillating curve along the aperture of the shell.