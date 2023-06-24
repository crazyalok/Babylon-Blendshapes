document.addEventListener("DOMContentLoaded", function () {
  // Get the canvas element
  var canvas = document.getElementById("renderCanvas");
  var engine = new BABYLON.Engine(canvas, true,{ preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false, antialias: true });

  if(window.innerWidth < window.innerHeight)
  {
    engine.setHardwareScalingLevel(0.4);
  }
 
  // Create a scene
  var createScene = function () {
      var scene = new BABYLON.Scene(engine);
      var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0,3,0), scene);
      if (scene.activeCameras.length === 0){
		    scene.activeCameras.push(scene.activeCamera);
		  }
      
      camera.attachControl(canvas, true);

    const hdrTexture = new BABYLON.HDRCubeTexture("textures/equirectangular/studio_country_hall_1k.hdr", scene, 512);
    scene.environmentTexture = hdrTexture;
    

      var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 1), scene);

      
      
      scene.imageProcessingConfiguration.toneMappingEnabled = true;
      scene.imageProcessingConfiguration.toneMappingType = BABYLON.ImageProcessingConfiguration.TONEMAPPING_ACES;
      
      BABYLON.SceneLoader.ImportMesh("","/","model.glb",scene,(meshes) => {
          const model = meshes[0];

          model.position = new BABYLON.Vector3(0, -1, 10);
          model.rotation = new BABYLON.Vector3(0, -(Math.PI/2), 0);
          BABYLON.SceneLoader.ImportMesh("","/","bg.glb",scene,(Meshes) => {
            let model = Meshes[0];
            model.position = new BABYLON.Vector3(0, -1, 10);
            model.rotation = new BABYLON.Vector3(0, -(Math.PI/2), 0);
            model.scaling = new BABYLON.Vector3(1,1,-2)
          });
          BABYLON.SceneLoader.ImportMesh("","/","table.glb",scene,(Meshes) => {
            let model = Meshes[0];
            model.position = new BABYLON.Vector3(0, -1, 10);
            model.rotation = new BABYLON.Vector3(0, -(Math.PI/2), 0);
            model.scaling = new BABYLON.Vector3(1,1,-1.5)
            Meshes[1].material.metallic = 0;
            Meshes[1].material.environmentIntensity = 0.3
            //table material metallic 0.54, rough 0.09 f0 0

          });

         
      });

      



      
      return scene;
  };
  // Create the scene
  var scene = createScene();
  if(window.innerWidth > window.innerHeight)
  {
    scene.debugLayer.show();
  }

  // Run the render loop
  engine.runRenderLoop(function () {
    scene.render();
    document.getElementById('debugger').textContent = engine.getFps().toFixed() + " fps";
  });

  // Resize the canvas on window resize
  window.addEventListener("resize", function () {
    engine.resize();
    //engine.setSize(window.innerWidth *window.devicePixelRatio, window.innerHeight*window.devicePixelRatio);
  });

});
