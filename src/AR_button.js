import * as THREE from 'three';;
import { ARButton } from "three/examples/jsm/webxr/ARButton";


navigator.xr.requestSession('immersive-ar', {
  requiredFeatures: ['local', 'anchors', 'dom-overlay', 'hit-test'],
})

if (navigator.xr) {
  navigator.xr.isSessionSupported("immersive-ar").then((isSupported) => {
    if (isSupported) {
      ARButton.addEventListener("click", onButtonClicked);
      ARButton.textContent = "Enter AR";
      ARButton.disabled = false;
    }
  });
}

function onButtonClicked() {
  if (!xrSession) {
    navigator.xr.requestSession("immersive-ar").then((session) => {
      xrSession = session;
      // onSessionStarted() not shown for reasons of brevity and clarity.
      onSessionStarted(xrSession);
    });
  } else {
    // Button is a toggle button.
    xrSession.end();
  }
}

const ViewinAR2D =()=>{

    let container;
    let camera, scene, renderer;
    let controller;

    let reticle;

    let hitTestSource = null;
    let hitTestSourceRequested = false;

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
    // document.body.appendChild(
    //     ARButton.createButton(renderer, {
    //       requiredFeatures: ["local", "hit-test"],
    //     })
    //   );


    const texture = new THREE.TextureLoader().load( './sw_door.png' );
    texture.colorSpace = THREE.SRGBColorSpace;

    const geometry = new THREE.PlaneGeometry( 2, 4 );
    const material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xAAAAAA );
    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );



    controller = renderer.xr.getController(0);
    scene.add(controller);
  
    

    //console.log(scene)
    function animate() {
      requestAnimationFrame( animate );
    
       renderer.render( scene, camera, );
    }
    
    animate();
    

};
     
export {ViewinAR2D};