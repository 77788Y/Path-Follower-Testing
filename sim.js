let agent = {
  x: 0, y: 0,
  momentum: null,
  speed: 0,
  angle: 0,
  max_speed: 5,
  angle_delta: 1,
  acceleration: 1,
  look_ahead: 15,
};


function sign (x) {
  if (x > 0) return 1;
  if (x < 0) return -1;
  return 0;
}


function reset_sim() {

  init_tank_sim(width/4, height/2, Math.PI);
  path_follower = {
  
    obstacles: {
      weight: 20000,
      dist_for_angle: 25
    },
  
    path: {
      lookahead: 30,
      weight: 500,
      min: 5,
      max: 15,
      last_index: 0
    }
  };

}


function angle_sub (x, y) {
  return atan2(sin(x-y), cos(x-y));
}


function draw_sim() {

  // draw bezier
  noFill();
  stroke(255);
  beginShape();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y);
  }
  endShape();

  // draw obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    let len = obstacles.length;
    fill(0);
    if (pow(obstacles[i].x - agent.x, 2) + pow(obstacles[i].y - agent.y, 2) <= pow(obstacles[i].size/2, 2)) stroke(164, 164, 0);
    else stroke(255, 0, 0);
    if (len == obstacles.length) ellipse(obstacles[i].x, obstacles[i].y, obstacles[i].size, obstacles[i].size);
  }

  // move agent
  let p = updatePathFollower();
  updatePurePursuit(p);
  updateTankSim();
  fill(0);
  stroke(255);

  // draw agent
  push();
  translate(tank_sim.position.pos.x, tank_sim.position.pos.y);
  rotate(tank_sim.position.angle);
  stroke(255);
  fill(0);
  rect(-10, -10, 20, 20);
  ellipse(10, 0, 5);
  pop();
  
  // ellipse(p.x, p.y, 10);
}