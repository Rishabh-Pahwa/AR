import React ,{useState} from "react";
//import Axios from 'axios' 
import ".//App.css";
//import * from '../webxr-polyfill/webxr-polyfill.js';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ARButton } from "three/examples/jsm/webxr/ARButton";
//import  {ViewinAR2D} from './AR_button.js'


//<script src="../webxr-polyfill/webxr-polyfill.js"></script>
<script src="https://launchar.app/sdk/v1?key=OJCGSzkAxldsp3QiEw45MmgHE8dnPyBH&redirect=true"></script>


function App() {
 
  
  const ViewinAR2D =()=>{
  
      let container;
      let camera, scene, renderer;
      let controller;
  
      let reticle;
  
      let hitTestSource = null;
      let hitTestSourceRequested = false;

      navigator.xr.requestSession('immersive-ar', {
        requiredFeatures: ['local', 'anchors', 'hit-test'],
      })
      
  
      camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 20 );
  
      
      // LIGHTS
  
      const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
      light.position.set( 0.5, 1, 0.25 );
  
      
    
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.xr.enabled = true;
      document.body.appendChild(renderer.domElement);
  
      document.body.appendChild( ARButton.createButton( renderer ) );
      document.body.appendChild(
          ARButton.createButton(renderer, {
            requiredFeatures: ["local", "hit-test"],
          })
        );
  
  
      const texture = new THREE.TextureLoader().load( './sw_door.png' );
      texture.colorSpace = THREE.SRGBColorSpace;
  
      const geometry = new THREE.PlaneGeometry( 2, 4 );
      const material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
      scene = new THREE.Scene();
      scene.background = new THREE.Color( 0xAAAAAA );
      const mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );
  
  
  
      controller = renderer.xr.getController(0);
      //scene.add(controller);
    
      
  
      //console.log(scene)
      function animate() {
        requestAnimationFrame( animate );
      
         renderer.render( scene, camera, );
      }
      
      animate();
      
  
  };

return(
  <>
  <div className="button-container">
        <button
          className="action-button"
          onClick={ViewinAR2D}
        >
          VIEW (2D Scan)
        </button>

        {/* <button
          className="action-button"
          onClick={ViewinAR2D}
        >
          VIEW (2D Image)
        </button> */}
        {/* <div> 
          {ViewinAR2D}
        </div> */}

        </div>

  </>
);

}
export default App;