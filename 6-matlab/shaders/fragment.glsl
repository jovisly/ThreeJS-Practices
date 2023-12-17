precision mediump float;

// varying float vRandom;
varying vec2 vUv;
varying float vElevation;
varying float vIsWireframe;

uniform vec3 uColor;
uniform sampler2D uTexture;

void main() {
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb += vElevation * 0.02;

    if (vIsWireframe == 1.0) {
        gl_FragColor = vec4(.0, .0, .0, 0.2);
    } else {
        gl_FragColor = textureColor;
    }
}
