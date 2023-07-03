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


      let container;    
      let camera, scene, renderer;
      let controller;

      let reticle_line;
  
      let hitTestSource = null;
      let hitTestSourceRequested = false;

      init();
      animate();


      // navigator.xr.requestSession('immersive-ar', {
      //   requiredFeatures: ['local', 'anchors', 'hit-test'],
      // })

      function init(){


        container = document.createElement( 'div' );
        document.body.appendChild( container );
      
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 2000);
       // camera.position.set( 0, 0, 40);
    
        
        // LIGHTS
    
        const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 3 );
        light.position.set( 0.5, 1, 0.25 );
        scene.add(light);
    
        
      
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.xr.enabled = true;
        container.appendChild(renderer.domElement);
    
        document.body.appendChild( ARButton.createButton( renderer, { requiredFeatures: [ 'hit-test' ] } ) );
    
        const geometry = new THREE.PlaneGeometry( 2, 4 );

        function onSelect(){
          if(reticle_line.visible){
            const texture = new THREE.TextureLoader().load( './sw_door.png' );
            texture.colorSpace = THREE.SRGBColorSpace;
            const material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
            const plane = new THREE.Mesh( geometry, material );
            reticle_line.matrix.decompose( plane.position, plane.quaternion, plane.scale );
            scene.add( plane );
          }
        }
    
    
    
        controller = renderer.xr.getController(0);
        controller.addEventListener( 'select', onSelect );
        scene.add(controller);


        // // Create a geometry for the line
        // const Lgeometry = new THREE.BufferGeometry();
        // const lineLength = 4; // Length in world units
        // const vertices = new Float32Array([
        //   0, 0, 0,           // Start point
        //   lineLength, 0, 0   // End point
        // ]);
        // geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        // // Create a material for the line
        // const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });

        // // Create a line segments object
        //  reticle_line = new THREE.LineSegments(Lgeometry, material);

        // // Add the line to the scene
        // scene.add(reticle_line);

        reticle_line = new THREE.Mesh(
					new THREE.RingGeometry( 0.15, 0.2, 32 ),
					new THREE.MeshBasicMaterial()
				);
				reticle_line.matrixAutoUpdate = false;
				reticle_line.visible = false;
				scene.add( reticle_line );


        window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}
    
      
  
      //console.log(scene)

      function animate() {
        renderer.setAnimationLoop(render);
      }

      // function render(){
      //   renderer.render(scene, camera);
      // }
      function render( timestamp, frame ) {

				if ( frame ) {

					const referenceSpace = renderer.xr.getReferenceSpace();
					const session = renderer.xr.getSession();

					if ( hitTestSourceRequested === false ) {

						session.requestReferenceSpace( 'viewer' ).then( function ( referenceSpace ) {

							session.requestHitTestSource( { space: referenceSpace } ).then( function ( source ) {

								hitTestSource = source;

							} );

						} );

						session.addEventListener( 'end', function () {

							hitTestSourceRequested = false;
							hitTestSource = null;

						} );

						hitTestSourceRequested = true;

					}

					if ( hitTestSource ) {

						const hitTestResults = frame.getHitTestResults( hitTestSource );

						if ( hitTestResults.length ) {

							const hit = hitTestResults[ 0 ];

							reticle_line.visible = true;
							reticle_line.matrix.fromArray( hit.getPose( referenceSpace ).transform.matrix );

						} else {

							reticle_line.visible = false;

						}

					}

				}

				renderer.render( scene, camera );

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
          View in AR
        </button>
        {/* <div> 
          {ViewinAR2D}
        </div> */}

        {/* </div> */}

  </>
);

}
export default App;