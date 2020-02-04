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

  // agent.x = path[0].x;
  // agent.y = path[0].y;
  // agent.momentum.set(path[1].x - path[0].x, path[1].y - path[0].y);
  // agent.momentum.setMag(agent.max_speed);
  // agent.speed = agent.max_speed;
  // agent.angle = agent.momentum.heading();

  init_tank_sim(width/4, height/2, Math.PI);

}


function angle_sub (x, y) {
  return atan2(sin(x-y), cos(x-y));
}


function draw_sim() {

  // // draw bezier
  // noFill();
  // stroke(255);
  // beginShape();
  // for (let i = 0; i < path.length; i++) {
  //   vertex(path[i].x, path[i].y);
  // }
  // endShape();

  // let momentum_delta = createVector(0, 0);

  // // calculate and draw repulsions
  // for (let i = 0; i < obstacles.length; i++) {

  //   // calculate
  //   let distance_squared = pow(obstacles[i].x - agent.x, 2) + pow(obstacles[i].y - agent.y, 2);
  //   let strength = 2500 / pow(pow(distance_squared, .5) - obstacles[i].size/2, 1.5);
  //   if (!Number.isFinite(strength) || Number.isNaN(strength)) strength = 2500;
  //   if (strength < 0) {
  //     strength = 500 - strength;
  //   }

  //   // update agent
  //   let vector_to_agent = createVector(agent.x - obstacles[i].x, agent.y - obstacles[i].y);
  //   vector_to_agent.normalize();
  //   vector_to_agent.mult(strength * .3);
  //   momentum_delta.add(vector_to_agent);

  //   // draw
  //   stroke(255, 0, 0);
  //   noFill();
  //   strokeWeight(min(strength/5, 30));
  //   line(obstacles[i].x, obstacles[i].y, agent.x, agent.y);
  // }
  // strokeWeight(1);

  // // find path point within lookahead
  // let path_point = null;
  // for (let i = path.length - 1; i >= 0; i--) {

  //   if (pow(path[i].x - agent.x, 2) + pow(path[i].y - agent.y, 2) <= pow(agent.look_ahead, 2)) {
  //     path_point = i;
  //     break;
  //   }
  // }

  // // // find path point within larger radius if it hasn't found one yet
  // // if (!path_point && path_point != 0) {
  // //   for (let i = path.length - 1; i >= 0; i--) {

  // //     if (pow(path[i].x - agent.x, 2) + pow(path[i].y - agent.y, 2) <= pow(agent.look_ahead * 3, 2)) {
  // //       console.log('swecond');
  // //       path_point = i;
  // //       break;
  // //     }
  // //   }
  // // }

  // // find path point that would create shortest total path, given a straight line to said point, if one hasn't been found yet
  // if (!path_point && path_point != 0) {
  //   let shortest_dist = {
  //     index: 0,
  //     dist: Infinity
  //   };

  //   for (let i = 0; i < path.length; i++) {

  //     let dist_squared = pow(path[i].x - agent.x, 2) + pow(path[i].y - agent.y, 2);
  //     let second_stage_path = bez.split(i / (path.length - 1), 1);
  //     let total_dist = pow(dist_squared, .5) * 5 + second_stage_path.length();
  //     if (total_dist < shortest_dist.dist) shortest_dist = {
  //       index: i,
  //       dist: total_dist
  //     };
  //   }
  //   path_point = shortest_dist.index;
  // }

  // // go to path point
  // let p = path[path_point];
  // let vector_to_point = createVector(p.x - agent.x, p.y - agent.y);
  // vector_to_point.mult(.3);
  // if (vector_to_point.mag() > agent.max_speed/2) vector_to_point.setMag(agent.max_speed/2);
  // momentum_delta.add(vector_to_point);

  // // draw obstacles
  // for (let i = obstacles.length - 1; i >= 0; i--) {
  //   let len = obstacles.length;
  //   fill(0);
  //   if (pow(obstacles[i].x - agent.x, 2) + pow(obstacles[i].y - agent.y, 2) <= pow(obstacles[i].size/2, 2)) stroke(164, 164, 0);
  //   else stroke(255, 0, 0);
  //   if (len == obstacles.length) ellipse(obstacles[i].x, obstacles[i].y, obstacles[i].size, obstacles[i].size);
  // }

  // // move agent
  // if (momentum_delta.mag() > agent.acceleration) momentum_delta.setMag(agent.acceleration);
  // let mag = momentum_delta.mag();
  // let target_angle = momentum_delta.heading();
  // if (abs(angle_sub(target_angle, agent.angle)) > agent.angle_delta) {
  //   console.log(agent.angle, target_angle, angle_sub(target_angle, agent.angle));
  //   target_angle = agent.angle_delta * sign(angle_sub(target_angle, agent.angle));
  // }
  // momentum_delta = createVector(mag * cos(target_angle), mag * sin(target_angle));

  // agent.momentum.add(momentum_delta);
  // agent.angle = agent.momentum.heading();
  // agent.speed = agent.momentum.mag();
  // let d = abs(angle_sub(momentum_delta.heading(), agent.angle));
  // if (agent.momentum.mag() > agent.max_speed - d*10) agent.momentum.setMag(max(0, agent.max_speed - d*10));
  // agent.x += agent.speed * cos(agent.angle);
  // agent.y += agent.speed * sin(agent.angle);

  // // draw agent
  // stroke(255);
  // fill(0);
  // push();
  // translate(agent.x, agent.y);
  // rotate(agent.momentum.heading());
  // beginShape();
  // vertex(10, 0);
  // vertex(-3, -5);
  // vertex(-3, 5);
  // endShape(CLOSE);
  // pop();

  // // draw lines
  // stroke(0, 255, 255, 64);
  // noFill();
  // line(agent.x, agent.y, p.x, p.y);
  // ellipse(agent.x, agent.y, agent.look_ahead * 2);
  // // ellipse(agent.x, agent.y, agent.look_ahead * 3 * 2);



  v = createVector(mouseX, mouseY);
  updatePurePursuit(v);
  updateTankSim();

  push();
  translate(tank_sim.position.pos.x, tank_sim.position.pos.y);
  rotate(tank_sim.position.angle);
  stroke(255);
  fill(0);
  rect(-10, -10, 20, 20);
  ellipse(10, 0, 5);
  pop();

}