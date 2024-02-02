import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const icosahedronGeometry = new THREE.IcosahedronGeometry(1)
const material = new THREE.MeshBasicMaterial( { color: 0x19C515, wireframe: true } );
const cube = new THREE.Mesh( cubeGeometry, material );
const cameraShape = new THREE.Mesh( icosahedronGeometry, material );
const icosahedron = new THREE.Mesh( icosahedronGeometry, material );
scene.add(cameraShape);

cameraShape.position.z = 4.2
cube.position.x = 4.2
icosahedron.position.x = -6
icosahedron.position.y = 3
camera.position.z = 5

const controls = new OrbitControls(camera, renderer.domElement)

function isPageScrolledToTop() {
    return (document.documentElement.scrollTop || document.body.scrollTop) === 0;
}

let rotate = true;

window.addEventListener('scroll', function() {
    if (isPageScrolledToTop()) {
        rotate = true;
    } else {
        rotate = false;
    }
});

let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > lastScrollTop) {
        cameraShape.rotation.x += 0.008;
		cameraShape.rotation.y += 0.008;
    } else {
        cameraShape.rotation.x -= 0.008;
		cameraShape.rotation.y -= 0.008;
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);


function animate() {
	requestAnimationFrame( animate );
	//controls.update

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	if(rotate){
		cameraShape.rotation.x += 0.008;
		cameraShape.rotation.y += 0.008;
	}

	renderer.render( scene, camera );
}

animate();

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

document.addEventListener('DOMContentLoaded', function () {
    var customCursor = document.getElementById('custom-cursor');

    document.addEventListener('mousemove', function (e) {
        var x = e.clientX;
        var y = e.clientY;
        customCursor.style.left = x + 'px';
        customCursor.style.top = y + 'px';
    });

    document.addEventListener('mouseleave', function () {
        customCursor.style.display = 'none';
    });

    document.addEventListener('mouseenter', function () {
        customCursor.style.display = 'block';
    });
});
