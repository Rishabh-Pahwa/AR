//import React ,{useState} from "react";
import React from "react";
//import Axios from 'axios' 
import ".//App.css";
//import * from '../webxr-polyfill/webxr-polyfill.js';
import * as THREE from 'three';
//import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ARButton } from 'three/addons/webxr/ARButton.js';
//import { ARButton } from "three/examples/jsm/webxr/ARButton";
//import  {ViewinAR2D} from './AR_button.js'


//<script src="../webxr-polyfill/webxr-polyfill.js"></script>
//<script src="https://launchar.app/sdk/v1?key=OJCGSzkAxldsp3QiEw45MmgHE8dnPyBH"></script>


function App() {
 
  
  const ViewinAR2D =()=>{

      let camera, scene, renderer;
      let controller;
  
      // let hitTestSource = null;
     // let hitTestSourceRequested = false;

      init();
      animate();


      // navigator.xr.requestSession('immersive-ar', {
      //   requiredFeatures: ['local', 'anchors', 'hit-test'],
      // })

      function init(){


        const container = document.createElement( 'div' );
        document.body.appendChild( container );
      
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 100000 );
        //camera.position.set( 0, 0, 4);
    
        
        // LIGHTS
    
        const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 3 );
        light.position.set( 0.5, 1, 0.25 );
        scene.add(light);
    
        
      
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.xr.enabled = true;
        container.appendChild(renderer.domElement);
    
        document.body.appendChild(ARButton.createButton(renderer));
    

        const geometry = new THREE.PlaneGeometry( 2, 4 );

        function onSelect(){
        const texture = new THREE.TextureLoader().load( './sw_door.png' );
        texture.colorSpace = THREE.SRGBColorSpace;
        const material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
        const mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );
        }
    
    
    
        controller = renderer.xr.getController(0);
        controller.addEventListener( 'select', onSelect );
        scene.add(controller);

        window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}
    
      
  
      console.log(scene)

      function animate() {
        renderer.setAnimationLoop(render);
      }

      function render(){
        renderer.render(scene, camera);
      }
      
      
  
  };

return(
  <>
  {/* <div className="button-container">
        <button
          className="action-button"
          onClick={ViewinAR2D}
        >
          VIEW (2D Scan)
        </button> */}

        <button
          className="action-button"
          onClick={ViewinAR2D}
        >
          VIEW (2D Image)
        </button>
        {/* <div> 
          {ViewinAR2D}
        </div> */}

        {/* </div> */}

  </>
);

}
export default App;