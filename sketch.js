//imposto le mie variabili

let mySong;
let mic;
let myImg1, myImg2, myImg3, myImg4, logo;
let t =
  "Fai click e spostati con il mouse per cambiare la velocità e il volume";
let t2 = "Clicca r o g o b sulla tastiera per cambiare colore dello sfondo";
let myMent1;
let myMent2;
let myMent3;
let myMent4;

//la function preload serve per caricare gli elementi esterni che mi servono
function preload() {
  mySong = loadSound("./assets/disavventure.mp3");
  myImg1 = loadImage("./assets/img1.png");
  myImg2 = loadImage("./assets/img2.png");
  myImg3 = loadImage("./assets/img3.png");
  myImg4 = loadImage("./assets/img4.png");
  logo = loadImage("./assets/logo.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //imposto come si devono muovere le mie bubble create dalla classe, imposta le dimensioni e la velocità di movimento
  //si muoveranno in maniera randomica, avranno grandezze diverse e velocità diverse
  myMent1 = new Mentana(random(width), random(height), 150, 150, myImg1, 5, 5);
  myMent2 = new Mentana(random(width), random(height), 200, 200, myImg2, 3, 3);
  myMent3 = new Mentana(random(width), random(height), 120, 120, myImg3, 4, 4);
  myMent4 = new Mentana(random(width), random(height), 175, 175, myImg4, 2, 2);

  //amplitude misura i suoni e i volumi da 0 e 1 e mi permetterà di cambiare il volume della canzone
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);
}

//imposto l'interazione. se clicchi r, g o b sulla tastiera il colore di sofndo cambia
function draw() {
  if (keyIsPressed) {
    if (key == "r") {
      background(255, 0, 0);
    } else if (key == "g") {
      background(0, 255, 0);
    } else if (key == "b") {
      background(0, 0, 255);
    }
  } else {
    background(32);
  }

  //modifico il suono al variare della posizione X e Y del mouse
  //se mi sposto sulle ascisse si alza e si abbassa il volume
  //se mi sposto sulle ordinate invece cambia la velocità del suono
  let volume = map(mouseX, 0, width, 0, 2);
  volume = constrain(volume, 0, 1);
  mySong.amp(volume);

  let speed = map(mouseY, 0.9, height, 0, 2);
  speed = constrain(speed, 0.9, 1.5);
  mySong.rate(speed);

  myMent1.run();
  myMent2.run();
  myMent3.run();
  myMent4.run();

  let rms = analyzer.getLevel();

  //il cerchio che contiene il logo si ingrandisce al variare del suono
  ellipse(width / 2, height / 2, 400 + rms * 500, 400 + rms * 500);

  //aggiungo il logo dentro al mio cerchio e inserisco i testi in alto al centro
  push();
  translate(-150, -150);
  image(logo, width / 2, height / 2, 300, 300);
  pop();

  fill("white");
  textAlign(CENTER);
  text(key, 110, 180);
  text(t, width / 2, 20);
  text(t2, width / 2, 40);
}

//se faccio click la canzone inizia ad andare se ripeto l'azione si stoppa
function mousePressed() {
  if (mySong.isPlaying()) {
    mySong.pause();
  } else {
    mySong.play();
  }
}

//creo la classe Mentana

class Mentana {
  constructor(x, y, w, h, img, xDir, yDir) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
    this.xDir = xDir;
    this.yDir = yDir;
  }
  //visualizzazione su schermo
  display() {
    noStroke();
    image(this.img, this.x, this.y, this.w, this.h);
  }

  updatePosition() {
    this.x += this.xDir;
    this.y += this.yDir;
    if (this.y >= height || this.y <= 0) {
      this.yDir *= -1;
    }
    if (this.x >= width || this.x <= 0) {
      this.xDir *= -1;
    }
  }

  run() {
    this.updatePosition();
    this.display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
