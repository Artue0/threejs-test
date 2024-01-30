import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const icosahedronGeometry = new THREE.IcosahedronGeometry(1,0)
const material = new THREE.MeshBasicMaterial( { color: 0x19C515, wireframe: true } );
const cube = new THREE.Mesh( cubeGeometry, material );
const cameraShape = new THREE.Mesh( icosahedronGeometry, material );
const icosahedron = new THREE.Mesh( icosahedronGeometry, material );
scene.add(cameraShape);

cameraShape.position.z = 4.2
cube.position.x = 4.2
icosahedron.position.x = -6
icosahedron.position.y = 3
camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement)

function moveCamera() {
	const top = document.body.getBoundingClientRect().top;
	cameraShape.rotation.x = top * 0.001;
	cameraShape.rotation.y = top * 0.001;
}

document.body.onscroll = moveCamera

function animate() {
	requestAnimationFrame( animate );
	controls.update

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();