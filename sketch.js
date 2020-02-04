
let p1 = {
       x: 0,      y: 0,
  pull_x: 0, pull_y: 0,
  mouseover: false, mouseover_pull: false,
  selected: false,  selected_pull: false
};

let p2 = {
     x: 0,      y: 0,
pull_x: 0, pull_y: 0,
mouseover: false, mouseover_pull: false,
selected: false,  selected_pull: false
};

let bez = null;
let path = null;
let selected = false;
let mode = 'draw';
let prev_pressed = false;
let obstacles = [];


document.addEventListener('contextmenu', event => event.preventDefault());


function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight);
  agent.momentum = createVector(0, 0);

   p1.x = width / 3;
   p1.y = height / 3;
   p1.pull_x = 2 * width / 3;
   p1.pull_y = height / 3;

   p2.x = 2 * width / 3;
   p2.y = 2 * height / 3;
   p2.pull_x = width / 3;
   p2.pull_y = 2 * height / 3;

   bez = new Bezier (
     p1.x, p1.y,
     p1.pull_x, p1.pull_y,
     p2.pull_x, p2.pull_y,
     p2.x, p2.y
   )

   path = bez.getLUT();
}


function draw() {

  background(0);

  // setup button styling
  let new_pressed = mouseIsPressed && mouseButton == LEFT && !prev_pressed;
  prev_pressed = mouseIsPressed && mouseButton == LEFT;
  let mouse_over = mouseX > 16 && mouseY > 16 && mouseX < 216 && mouseY < 64;
  let current_fill = 0;
  if (mouse_over) {
    current_fill = 255;
    fill(255);
    stroke(0);
  }
  else {
    current_fill = 0;
    fill(0);
    stroke(255);
  }
  rect(16, 16, 200, 48);
  noStroke();
  fill(255 - current_fill);
  textSize(24);
  textAlign(CENTER, CENTER);

  // draw design button in top right
  if (mode == 'draw') {
    text('Run simulation', 116, 41)
    if (mouse_over && new_pressed) {
      reset_sim();
      mode = 'sim';
    }
  }

  // draw sim button in top right
  else if (mode == 'sim') {
    text('Back to draw', 116, 41)
    if (mouse_over && new_pressed) mode = 'draw';
  }

  if (mode == 'draw') draw_design();
  if (mode == 'sim') draw_sim();
}
