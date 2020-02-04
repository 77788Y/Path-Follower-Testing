let tank_sim;


function init_tank_sim(x, y, a) {
  tank_sim = {

    drive: {
      left_vel: 0, right_vel: 0,
      max_vel: 256 * 1/1000,
      max_accel: 32 * 1/1000
    },
  
    position: {
      pos: createVector(x, y),
      vel: createVector(0, 0),
      angle: a, angular_vel: 0
    },
  
    physics: {
      chassis_width: 20,
      damping: .1
    },
  };
}


function setTankSim(left=null, right=null) {
  if (left != null) {
    let diff = left - tank_sim.drive.left_vel;
    if (abs(diff) > tank_sim.drive.max_accel) diff = tank_sim.drive.max_accel * sign(diff);
    tank_sim.drive.left_vel += diff;
  }
  if (right != null) {
    let diff = right - tank_sim.drive.right_vel;
    if (abs(diff) > tank_sim.drive.max_accel) diff = tank_sim.drive.max_accel * sign(diff);
    tank_sim.drive.right_vel += diff;
  }
}


function updateTankSim(delta_t=1000/60) {

  let l = tank_sim.drive.left_vel * delta_t;
  let r = tank_sim.drive.right_vel * delta_t;
  let d = (l + r) / 2;
  let a = (l - r) / tank_sim.physics.chassis_width;

  let h;
  let i;

  if (a) {

    let r = d / a;
    i = a / 2;
    let sin_i = sin(i);
    h = r * sin_i * 2;
  }
  else {

    h = d;
    i = 0;
  }

  let p = tank_sim.position.angle + i;
  let cos_p = cos(p);
  let sin_p = sin(p);

  let vel = createVector(h * cos_p, h * sin_p);
  let mag = tank_sim.position.vel.mag() * sin(tank_sim.position.vel.heading() - p);
  mag *= (1 - tank_sim.physics.damping * max(tank_sim.angular_vel * 10, 1));
  vel.add(mag * cos(p + Math.PI / 2), mag * sin(p + Math.PI / 2));

  tank_sim.position.pos.add(vel);
  tank_sim.position.vel.set(vel);
  tank_sim.angular_vel = a / delta_t;
  tank_sim.position.angle += a;
}