let prev_right = false;
let scroll_delta = 0;


function mouseWheel(event) {
  if (event.delta > 0) scroll_delta += 5;
  else scroll_delta -= 5;
}


function draw_design() {

  // update mouseover
  p1.mouseover = (pow(mouseX - p1.x, 2) + pow(mouseY - p1.y, 2) < pow(25/2, 2));
  p1.mouseover_pull = (pow(mouseX - p1.pull_x, 2) + pow(mouseY - p1.pull_y, 2) < pow(25/2, 2));
  p2.mouseover = (pow(mouseX - p2.x, 2) + pow(mouseY - p2.y, 2) < pow(25/2, 2));
  p2.mouseover_pull = (pow(mouseX - p2.pull_x, 2) + pow(mouseY - p2.pull_y, 2) < pow(25/2, 2));

  // update positions
  if (mouseIsPressed && mouseButton == LEFT) {

    // determine selections
    if ((!selected && p1.mouseover) || p1.selected) {
      p1.selected = true;
      selected = true;
      p1.x = mouseX;
      p1.y = mouseY;
    }
    if ((!selected && p1.mouseover_pull) || p1.selected_pull) {
      p1.selected_pull = true;
      selected = true;
      p1.pull_x = mouseX;
      p1.pull_y = mouseY;
    }
    if ((!selected && p2.mouseover) || p2.selected) {
      p2.selected = true;
      selected = true;
      p2.x = mouseX;
      p2.y = mouseY;
    }
    if ((!selected && p2.mouseover_pull) || p2.selected_pull) {
      p2.selected_pull = true;
      selected = true;
      p2.pull_x = mouseX;
      p2.pull_y = mouseY;
    }

    // recalculate bezier
    bez = new Bezier (
      p1.x, p1.y,
      p1.pull_x, p1.pull_y,
      p2.pull_x, p2.pull_y,
      p2.x, p2.y
    )
 
    path = bez.getLUT();
  }
  else {
    selected = false;
    p1.selected = false;
    p1.selected_pull = false;
    p2.selected = false;
    p2.selected_pull = false;
  }

  // add obstacle
  let can_add = mouseIsPressed && mouseButton == RIGHT && !prev_right;
  prev_right = mouseIsPressed && mouseButton == RIGHT;

  // draw obstacle
  for (let i = obstacles.length - 1; i >= 0; i--) {
    let len = obstacles.length;
    let mouseover = pow(mouseX - obstacles[i].x, 2) + pow(mouseY - obstacles[i].y, 2) < pow(obstacles[i].size/2, 2);
    if (mouseover) {
      if (can_add) obstacles.splice(i, 1);
      else {
        obstacles[i].size += scroll_delta;
        scroll_delta = 0;
      }
      can_add = false;
      fill(255, 0, 0);
      noStroke();
    }
    else {
      fill(0);
      stroke(255, 0, 0);
    }
    if (len == obstacles.length) ellipse(obstacles[i].x, obstacles[i].y, obstacles[i].size, obstacles[i].size);
  }
  scroll_delta = 0;

  if (can_add) {
    obstacles.push({
      x: mouseX,
      y: mouseY,
      size: 35
    });
  }

  // draw bezier
  noFill();
  stroke(255);
  beginShape();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y);
  }
  endShape();

  // line between endpoints and pull points
  noFill();
  stroke(255, 64);
  line(p1.x, p1.y, p1.pull_x, p1.pull_y);
  line(p2.x, p2.y, p2.pull_x, p2.pull_y);

  // draw endpoints
  stroke(255);
  fill(p1.mouseover ? 255 : 0);
  ellipse(p1.x, p1.y, 25, 25);
  fill(p2.mouseover ? 255 : 0);
  ellipse(p2.x, p2.y, 25, 25);

  // draw pull points
  noStroke();
  fill(0);
  ellipse(p1.pull_x, p1.pull_y, 25, 25);
  ellipse(p2.pull_x, p2.pull_y, 25, 25);

  fill(255, p1.mouseover_pull ? 255 : 64);
  ellipse(p1.pull_x, p1.pull_y, 25, 25);
  fill(255, p2.mouseover_pull ? 255 : 64);
  ellipse(p2.pull_x, p2.pull_y, 25, 25);

}