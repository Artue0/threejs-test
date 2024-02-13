import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import { degToRad } from 'three/src/math/MathUtils';

const shipUrl = new URL('assets/spaceship.glb', import.meta.url);

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

cameraShape.position.z = 5
cube.position.x = 4.2
icosahedron.position.x = -6
icosahedron.position.y = 3
camera.position.z = 5

const assetLoader = new GLTFLoader();
let ship2;

assetLoader.load(shipUrl.href, function(gltf) {
    const ship = gltf.scene;
    const shipMesh = ship.children[0];
    shipMesh.material = material;
    scene.add(ship);
    ship.position.z = 5;
    ship.position.y = -15;
    ship2 = ship;
}, undefined, function(error) {
    console.error(error)
});

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

var cameraStage = 0;
var change = true;

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    console.log(camera.rotation.x)
    switch(cameraStage) {
        case 0:
            camera.rotation.x = Math.max(t * 0.001, -Math.PI/2);

            if (camera.rotation.x <= -Math.PI/2 && change) {
                cameraStage = 1;
                console.log("a")
            }
            break;
        case 1:
            camera.position.y = Math.max(t * 0.005 + 5, -15.6);
            change = false;
            if (camera.position.y > -10) {
                cameraStage = 1;
            } else if (camera.position.y >= -3) {
                cameraStage = 0;
                console.log("b")
            }
            break;
        case 2:
            camera.position.z = Math.max(t * 0.005 + 5, -15.6);

            if (camera.position.z > -10) {
                cameraStage = 1;
            }
            break;
    }
}
  
document.body.onscroll = moveCamera;
moveCamera();

let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    /*
    if (currentScroll > lastScrollTop) {
        cameraShape.rotation.x += 0.008;
		cameraShape.rotation.y += 0.008;
    } else {
        cameraShape.rotation.x -= 0.008;
		cameraShape.rotation.y -= 0.008;
    }
    */
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

    if(ship2){
        ship2.rotation.y += 0.008;
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
