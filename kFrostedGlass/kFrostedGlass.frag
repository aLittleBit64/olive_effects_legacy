/*
Olive port from https://www.shadertoy.com/view/MtsSWs

Experiment: Frosted Glass
by Jack Davenport
Original: http://coding-experiments.blogspot.com.au/2010/06/frosted-glass.html
*/

#version 330

uniform sampler2D image;
uniform vec2 resolution;
uniform float time;

uniform float kXoffset;
uniform float kYoffset;
uniform float kRadius;
uniform float kDisp;
uniform float kSpeed;

float rand(vec2 uv) {
    float a = dot(uv, vec2(kXoffset + (sin(uv.y*10.0+(time*(kSpeed/10.0)))),
                            kYoffset + (sin(uv.x*10.0+(time*(kSpeed/10.0))))));
    float b = dot(uv, vec2(41.0, 62.0));
        
    float x = sin(a) + cos(b) * ((kRadius * kRadius)/10.0);
    return fract(x);
}

void main(void)
{
	vec2 uv = gl_FragCoord.xy / resolution.xy;
	vec2 rnd = vec2(rand(uv), rand(uv));
    
    uv += rnd * (kDisp/100.0);
    gl_FragColor = texture2D(image, uv);
}