// interface VRFloorPoint {
//   readonly attribute double x;
//   readonly attribute double z;
// };
//
// interface VRFrameOfReference : VRCoordinateSystem {
//   readonly attribute sequence<VRFloorPoint>? bounds;
//   attribute EventHandler onboundschange;
// };

// data captured from ovr_GetBoundaryGeometry with ovrBoundary_Outer
let polygon = [{x: -0.398934, z: -0.481803}, {x: -0.388226, z: -0.490023}, {x: -0.338226, z: -0.502845}, {x: -0.288226, z: -0.494529}, {x: 0.111774, z: -0.497388}, {x: 0.211774, z: -0.486960}, {x: 0.261774, z: -0.476973}, {x: 0.311774, z: -0.465427}, {x: 0.561774, z: -0.444915}, {x: 0.603945, z: -0.431802}, {x: 0.611774, z: -0.427990}, {x: 0.661774, z: -0.391202}, {x: 0.670796, z: -0.381802}, {x: 0.700999, z: -0.331802}, {x: 0.711774, z: -0.309253}, {x: 0.721908, z: -0.281802}, {x: 0.726780, z: -0.231802}, {x: 0.729778, z: -0.181802}, {x: 0.730533, z: -0.131802}, {x: 0.693276, z: 0.618198}, {x: 0.660892, z: 0.868198}, {x: 0.643481, z: 0.918198}, {x: 0.617887, z: 0.968198}, {x: 0.611774, z: 0.974372}, {x: 0.561774, z: 1.022236}, {x: 0.511774, z: 1.075628}, {x: 0.461774, z: 1.112387}, {x: 0.451665, z: 1.118198}, {x: 0.411774, z: 1.132989}, {x: 0.361774, z: 1.163530}, {x: 0.350596, z: 1.168198}, {x: 0.311774, z: 1.179126}, {x: 0.261774, z: 1.178659}, {x: 0.211774, z: 1.165249}, {x: 0.161774, z: 1.140118}, {x: 0.110360, z: 1.118198}, {x: 0.061774, z: 1.087203}, {x: 0.019732, z: 1.068198}, {x: 0.011774, z: 1.063331}, {x: -0.038226, z: 1.038872}, {x: -0.097357, z: 1.018198}, {x: -0.138226, z: 1.000617}, {x: -0.188226, z: 0.984605}, {x: -0.238226, z: 0.975599}, {x: -0.267272, z: 0.968198}, {x: -0.288226, z: 0.961668}, {x: -0.338226, z: 0.952076}, {x: -0.388226, z: 0.949404}, {x: -0.438226, z: 0.943957}, {x: -0.538744, z: 0.918198}, {x: -0.588225, z: 0.887727}, {x: -0.610964, z: 0.868198}, {x: -0.638226, z: 0.834407}, {x: -0.648445, z: 0.818198}, {x: -0.666584, z: 0.768198}, {x: -0.680466, z: 0.718198}, {x: -0.688509, z: 0.668198}, {x: -0.687600, z: 0.618198}, {x: -0.683488, z: 0.568198}, {x: -0.672277, z: 0.468198}, {x: -0.664407, z: 0.368198}, {x: -0.656831, z: 0.118198}, {x: -0.664745, z: 0.068198}, {x: -0.678571, z: 0.018198}, {x: -0.684648, z: -0.031802}, {x: -0.676677, z: -0.081802}, {x: -0.659073, z: -0.131802}, {x: -0.637121, z: -0.181802}, {x: -0.527215, z: -0.331802}, {x: -0.488226, z: -0.382006}, {x: -0.438226, z: -0.436548}];

// data captured from ovr_GetBoundaryGeometry wtih ovrBoundary_PlayArea
let rectangle = [{x: -0.500726, z: -0.394302}, {x: 0.624274, z: -0.394302}, {x: 0.624274, z: 0.930698}, {x: -0.500726, z: 0.930698}];

function isRectangle(bounds) {
  if (bounds.length == 4 && 
      bounds[0].x == bounds[3].x &&
      bounds[0].z == bounds[1].z &&
      bounds[2].x == bounds[1].x &&
      bounds[2].z == bounds[3].z)
    return true;
  return false;
}

function getLargestRectFromBounds(bounds) {
  if(isRectangle(bounds)) {
    return bounds;
  } else {
    let poly = [];
    for (let i = 0; i < bounds.length; ++i) {
      poly.push([bounds[i].x, bounds[i].z]);
    }
    let lr = d3plus.geom.largestRect(poly, {angle: [0, 90], nTries: 1000})[0];
    if (lr.angle === 0) {
      return [{x: lr.cx - lr.width/2, z: lr.cy - lr.height/2},
              {x: lr.cx + lr.width/2, z: lr.cy - lr.height/2},
              {x: lr.cx + lr.width/2, z: lr.cy + lr.height/2},
              {x: lr.cx - lr.width/2, z: lr.cy + lr.height/2}];
    } else if (lr.angle === 90) {
      return [{x: lr.cx - lr.height/2, z: lr.cy - lr.width/2},
              {x: lr.cx + lr.height/2, z: lr.cy - lr.width/2},
              {x: lr.cx + lr.height/2, z: lr.cy + lr.width/2},
              {x: lr.cx - lr.height/2, z: lr.cy + lr.width/2}];
    }
  }
}
