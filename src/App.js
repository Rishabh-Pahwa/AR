import React ,{useState} from "react";
//import Axios from 'axios' 
import ".//App.css";
//import * from '../webxr-polyfill/webxr-polyfill.js';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ARButton } from "three/examples/jsm/webxr/ARButton";
import  {ViewinAR2D} from './AR_button.js'


//<script src="../webxr-polyfill/webxr-polyfill.js"></script>
//<script src="https://launchar.app/sdk/v1?key=YOUR_SDK_KEY"></script>


function App() {

navigator.xr.requestSession('immersive-ar', {
  requiredFeatures: ['local', 'anchors', 'dom-overlay', 'hit-test'],
})



  const ViewinAR3D =()=>{

    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000 )
    camera.position.set( 0, 0, 450);

    
    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 5 );
    
    const light = new THREE.DirectionalLight( 0xFFFFFF, 1 );
    light.position.set( 0.32, 0.39, 0.7 );
    
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    const loader = new GLTFLoader();
    
    // loader.load( './sm_door.glb', function ( gltf ) {
    //   // console.log(gltf.scene.children[0])
    //  // const object = gltf.scene.children[0];
    //   const object = gltf.scene;
    //  // object.scale.set(2, 2, 2);
    //   scene.add( object);
      loader.load('./sm_door.glb', function (gltf) {
    const object = gltf.scene;
    // object.scale.set(2, 2, 2);
    scene.add(object);
    // Center the object in the scene
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    object.position.sub(center);

    
    
    } );
    
    //const controls = new OrbitControls( camera, renderer.domElement );
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableRotate = true;
  
    
    //camera.position.z = 5000;
    const scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xAAAAAA );
    
            scene.add( ambientLight );
           //scene.add( light );
    console.log(scene)
    function animate() {
      requestAnimationFrame( animate );
    
       renderer.render( scene, camera, );
        controls.update()
    }
    
    animate();

  };

return(
  <>
 <div className="button-container">
        <button
          className="action-button"
          onClick={ViewinAR3D}
        >
          VIEW (3D Scan)
        </button>
        <button
          className="action-button"
          onClick={ViewinAR2D}
        >
          VIEW (2D Image)
        </button>
      </div>

  </>
);

}
export default App;