let pure_pursuit_controller = {

  angle_scalar: 0.06366197723,
  slow_range: {
    start: 2,
    end: 3
  }
}


function updatePurePursuit(point, delta_t=1000/60) {

  // calculate arc
  let dist = tank_sim.position.pos.dist(point);
  let angle = angle_sub(tank_sim.position.angle, atan2(point.y - tank_sim.position.pos.y, point.x - tank_sim.position.pos.x));
  let x = dist * sin(angle);
  let radius = dist * dist * .5 / x;
  let curvature = 1 / radius;

  // calculate ideal velocities
  let ideal_left;
  let ideal_right;
  if (abs(angle) <= Math.PI/2) {
    ideal_left = tank_sim.drive.max_vel * (2 - curvature * tank_sim.physics.chassis_width) / 2;
    ideal_right = tank_sim.drive.max_vel * (2 + curvature * tank_sim.physics.chassis_width) / 2;
  }
  else {
    ideal_left = -tank_sim.drive.max_vel * sign(angle);
    ideal_right = tank_sim.drive.max_vel * sign(angle);
  }

  // make ideal velocities technically possible
  let l_r_ratio = ideal_left / ideal_right;
  if (abs(ideal_left) > tank_sim.drive.max_vel) {
    ideal_left = tank_sim.drive.max_vel * sign(ideal_left);
    ideal_right = ideal_left / l_r_ratio;
  }
  if (abs(ideal_right) > tank_sim.drive.max_vel) {
    ideal_right = tank_sim.drive.max_vel * sign(ideal_right);
    ideal_left = ideal_right * l_r_ratio;
  }

  // make velocities physically possible (i.e. account for acceleration)
  let diff_l = ideal_left - tank_sim.drive.left_vel;
  let diff_r = ideal_right - tank_sim.drive.right_vel;
  if (abs(diff_l) > tank_sim.drive.max_accel * delta_t) diff_l = tank_sim.drive.max_accel * delta_t * sign(diff_l);
  if (abs(diff_r) > tank_sim.drive.max_accel * delta_t) diff_r = tank_sim.drive.max_accel * delta_t * sign(diff_r);

  // send over to tank sim
  setTankSim(ideal_left, ideal_right);
}