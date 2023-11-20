let bgMusic;
let bird1Sound, bird2Sound, bird3Sound;
let sequence = ['a', 's', 'd'];
let playerSequence = [];
let index = 0;
let playing = false;
let musicPlayed = false;
let intervalId;

let drawRect1 = false;
let drawRect2 = false;
let drawRect3 = false;

var i, o, p;
var bird1, bird2, bird3;
var show = true;

function preload() {
  bgMusic = loadSound('background.mp3');
  bgMusic.setVolume(0.05);
  bird1 = loadSound('bird1.mp3');
  bird2 = loadSound('bird2.mp3');
  bird3 = loadSound('bird3.mp3');
}

function setup() {
  createCanvas(600, 600);
  background(0);
  
  // Add event listeners to the buttons
  document.getElementById('buttonA').addEventListener('click', function() {
      playBird('a');
      playerSequence.push('a');
      drawRect1 = true;
  });
  document.getElementById('buttonS').addEventListener('click', function() {
      playBird('s');
      playerSequence.push('s');
      drawRect2 = true;
  });
  document.getElementById('buttonD').addEventListener('click', function() {
      playBird('d');
      playerSequence.push('d');
      drawRect3 = true;
  });
  document.getElementById('buttonB').addEventListener('click', function() {
    replaySequence();
  });
}

function instruction() {
  textAlign(CENTER);
  fill(255);
  textSize(15);
  text("Click the buttons to make sounds or replay the sequence.", width / 2, height / 2 );
  fill(150)
  text("Click to continue!", width / 2, height / 2 + 25);
}

function draw() {
  background(0);
  
  if (show == true){
    instruction();
  }
  
  if (playing) {
    // Check if the player sequence is correct
    if (arraysEqual()) {
      fill(0, 255, 0);
      textSize(32);
      textAlign(CENTER, CENTER);
      text('You Win!', width / 2, height / 2);
    }
  }

  // Top rectangle
  if (drawRect1) {
    i = map(bird1.currentTime(), 0, bird1.duration() , 0, width);
    fill(105, 100);
    rect(0, 0, i, 200);
  }
  
  // Middle rectangle
  if (drawRect2) {
    o = map(bird2.currentTime(), 0, bird2.duration() , 0, width);
    fill(135, 100);
    rect(600, 200, -o, 200);
  }
  
  // Bottom rectangle
  if (drawRect3) {
    p = map(bird3.currentTime(), 0, bird3.duration() , 0, width);
    fill(165, 100);
    rect(0, 400, p, 200);
  }
}

function keyPressed() {
  if (key === 'b') {
    playSequence();
  } else if (!playing) {
    mousePressed();
  } else {
    if (key === 'a' || key === 's' || key === 'd') {
      if(key === 'a') {
        drawRect1 = true;
      } else if(key === 's') {
        drawRect2 = true;
      } else {
        drawRect3 = true;
      }
      playBird(key);
      playerSequence.push(key);
    }
  }
}

function playBird(key) {
  switch (key) {
    case 'a':
      bird1.play();
      break;
    case 's':
      bird2.play();
      break;
    case 'd':
      bird3.play();
      break;
  }
}

function arraysEqual() {
  console.log(playerSequence.length);
  for (let i = 0; i < playerSequence.length; i++) {
    if (sequence[i] !== playerSequence[i]) {
      let key = playerSequence[i];
      playerSequence = [];
      if(key === sequence[0]) {
        playerSequence.push(key);
      }
      return false;
    }
  }
  
  if (sequence.length !== playerSequence.length) return false;
  
  return true;
}

function playSequence() {
  index = 0;
  intervalId = setInterval(function () {
    if (index < sequence.length) {
      let key = sequence[index];
      playBird(key);
      index++;
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
}

function replaySequence() {
  clearInterval(intervalId); 
  playSequence(); 
}

function mousePressed() {
  if (!playing) {
    playing = true;
    show = false;
 if (!musicPlayed) {
      bgMusic.loop();
      musicPlayed = true;
    }
    playerSequence = [];
    playSequence();
  }
}