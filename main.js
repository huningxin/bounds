// Render the bounds with WebGL
let container;
let camera, scene, renderer, controls;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );
  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 0, 1.7, 1 );
  scene = new THREE.Scene();

  renderBounds(polygon);

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );
  controls = new THREE.TrackballControls( camera );
  controls.target.set( 0, 0, 0 )
  window.addEventListener( 'resize', onWindowResize, false );

  gui = new dat.GUI({autoPlace: false});
  document.body.appendChild(gui.domElement);
  gui.domElement.style.position = "absolute";
  gui.domElement.style.top = "0px";
  gui.domElement.style.right = "5px";

  let guiControl =  {
    Polygon : function() {renderBounds(polygon);},
    Rectangle : function() {renderBounds(rectangle);}
  };

  gui.add(guiControl, 'Polygon');
  gui.add(guiControl, 'Rectangle');
}

function renderBounds(bounds) {
  function addLineShape( shape, color) {
    let points = shape.createPointsGeometry();
    let line = new THREE.Line( points, new THREE.LineBasicMaterial( { color: color, linewidth: 2 } ) );
    line.rotation.x = 90 * (Math.PI / 180);
    scene.add( line );
  }

  clearScene();

  // render the bounds
  let poly = [];
  for (let i = 0; i < bounds.length; ++i) {
    poly.push( new THREE.Vector3 ( bounds[i].x, bounds[i].z ) );
  }
  poly.push( new THREE.Vector3 ( bounds[0].x, bounds[0].z ) );
  let polyShape = new THREE.Shape( poly );

  addLineShape( polyShape, 0xffaa00);

  // render the largest rectangle
  let rect = [];
  let lr = getLargestRectFromBounds(bounds);
  rect.push( new THREE.Vector3 ( lr[0].x, lr[0].z ) );
  rect.push( new THREE.Vector3 ( lr[1].x, lr[1].z ) );
  rect.push( new THREE.Vector3 ( lr[2].x, lr[2].z ) );
  rect.push( new THREE.Vector3 ( lr[3].x, lr[3].z ) );
  rect.push( new THREE.Vector3 ( lr[0].x, lr[0].z ) );
  let rectShape = new THREE.Shape( rect );

  addLineShape( rectShape, 0xffffff);
}

function clearScene() {
  while(scene.children.length > 0) { 
    scene.remove(scene.children[0]);
  }
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame( animate );
  controls.update();
  render();
}

function render() {
  renderer.render( scene, camera );
}