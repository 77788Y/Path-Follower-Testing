let path_follower = {
  
  obstacles: {
    weight: 1000000,
    dist_for_angle: 100
  },

  path: {
    lookahead: 25,
    weight: .5,
    min: 10,
    last_index: 0
  }
};


function updatePathFollower(delta_t=1000/60) {

  let goal_point = createVector(0, 0);
  let pos = tank_sim.position.pos;

  // go through obstacles
  for (let i = 0; i < obstacles.length; i++) {

    // calculate distance and base strength
    let dist_sq = pow(pos.x - obstacles[i].x, 2) + pow(pos.y - obstacles[i].y, 2);
    let dist = pow(dist_sq, .5);

    // calculate and scale strength by angle if within range
    if (dist - obstacles[i].size/2 - tank_sim.physics.chassis_width/2 < path_follower.obstacles.dist_for_angle, 2) {

      // calculate base strength
      let strength = path_follower.obstacles.weight / pow(max(dist - obstacles[i].size/2 - tank_sim.physics.chassis_width/2, 10), 2);

      // scale strength
      let desired_angle = atan2(obstacles[i].y - pos.y, obstacles[i].x - pos.x) - Math.PI / 2;
      let diff = angle_sub(desired_angle, tank_sim.position.angle);
      strength *= sin(diff);

      // add to target point
      let angle = atan2(obstacles[i].x - pos.x, obstacles[i].y - pos.y);
      console.log(strength);
      goal_point.sub(createVector((strength) * cos(angle), -(strength) * sin(angle)));
    }
  }

  // find furthest point along path within lookahead distance
  let dist = null;
  for (let i = path.length - 1; i >= 0; i--) {

    let dist_sq = pow(path[i].x - pos.x, 2) + pow(path[i].y - pos.y, 2);
    if (dist_sq <= pow(path_follower.path.lookahead, 2)) {
      dist = pow(dist_sq, .5);
      path_follower.path.last_index = i;
      break;
    }
  }

  // save index in a shorter variable and calculate distance
  let index = path_follower.path.last_index;
  if (dist == null) dist = pow(pow(path[index].x - pos.x, 2) + pow(path[index].y - pos.y, 2), .5);

  // calculate strength and angle
  let strength = min(path_follower.path.max, max(path_follower.path.weight / dist, path_follower.path.min));
  console.log(strength);
  let angle = atan2(path[index].y - pos.y, path[index].x - pos.x);

  // add to desired point
  goal_point.add(createVector(strength * cos(angle), strength * sin(angle)));

  // translate point to agent position
  goal_point.add(pos);

  // send point off to pure pursuit
  return goal_point;

}