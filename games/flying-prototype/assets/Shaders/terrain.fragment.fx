precision highp float;

// Varying
varying vec3 vPosition;
// varying vec3 vPositionW;
varying vec3 vNormal;
// varying vec3 vNormalW;
varying vec2 vUV;

// Uniforms
uniform mat4 world;

// Refs
uniform vec3 cameraPosition;
uniform sampler2D textureSampler;

void main(void) {
    /**/
    vec3 vLightPosition = cameraPosition + vec3(0,100,200);
    
    // World values
    vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
    vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
    vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
    
    // Light
    vec3 lightVectorW = normalize(vLightPosition - vPositionW);
    vec3 color = normalize(vec3(0.8,0.0,0.1));//texture2D(textureSampler, vUV).rgb;
    
    // diffuse
    float ndl = max(0., dot(vNormalW, lightVectorW));
    
    // Specular
    vec3 angleW = normalize(viewDirectionW + lightVectorW);
    float specComp = max(0., dot(vNormalW, angleW));
    specComp = pow(specComp, max(1., 64.)) * 2.;
    
    gl_FragColor = vec4(color * ndl + vec3(specComp), 1.);
    
    /*
    vec3 color = vec3(1., 1., 1.);
    vec3 viewDirectionW = normalize(cameraPosition - vPositionW);

    // Fresnel
	float fresnelTerm = dot(viewDirectionW, vNormalW);
	fresnelTerm = clamp(1.0 - fresnelTerm, 0., 1.);

    gl_FragColor = vec4(color * fresnelTerm, 1.);
    */
}