uniform vec2 uFrequency;
uniform float uTime;

attribute float aIsWireframe;

varying vec2 vUv;
varying float vElevation;
varying float vIsWireframe;

float sinc(float x, float y) {
    float r = sqrt(x * x + y * y);
    if (r < 0.0001) {
        return 1.0;
    } else {
        return sin(r) / r;
    }
}

void main() {
    vUv = uv;
    vIsWireframe = aIsWireframe;

    float freq = (sin(uTime) * 2. + 4.) - 0.8;

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += 7.7 * sinc(modelPosition.x * freq, modelPosition.z * freq);

    if (aIsWireframe == 1.0) {
        modelPosition.y += 0.02;
    }

    vElevation = modelPosition.z;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}
