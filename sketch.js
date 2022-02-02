var player; 
var mainGround, groundImg;
var harmGroup, shieldGroup;
var jumpSFX, gdSFX, adSFX, hurtSFX, srSFX, shieldSFX;
var font, titleImg, goImg, newWhsImg, laserSFX;
var score = 0;
var fallSpeed;
var srGroup;
var gameState = "start";
var nameInput, okButton;
var playerCount = 0;
var database;
var whsValue;
var whsLocal;
var whsName;
var playerName = "", asked = false;
var spaceReleased;
var submitted = false;
var appearSpeed = 50;
var bgImg;
var initFS;
var canvas;
var controls;
var x,y,z;

function preload(){
  jumpSFX = loadSound("SFX/Jump.wav");
  gdSFX = loadSound("SFX/GroundDash.wav");
  adSFX = loadSound("SFX/AirDash.wav");
  hurtSFX = loadSound("SFX/Hurt.wav");
  laserSFX = loadSound("SFX/Laser.wav");
  srSFX = loadSound("SFX/SR.wav");
  shieldSFX = loadSound("SFX/Shield.wav");
  font = loadFont("Fonts/Kenney Future Narrow.ttf");
  groundImg = loadImage("sprites/Ground.png");
  titleImg = loadAnimation("sprites/Title.png");
  goImg = loadAnimation("sprites/GameOver.png");
  newWhsImg = loadAnimation("sprites/NewWHS.png");
  bgImg = loadImage("sprites/Background.jpg");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  database = firebase.database();

  var wW = windowWidth;
  var wH = windowHeight;

  harmGroup = createGroup();
  srGroup = createGroup();
  shieldGroup = createGroup();

  nameInput = createInput("Name");
  nameInput.position(width-200,25);
  nameInput.hide();

  okButton = createButton("GO!");
  okButton.position(width-250,25);
  okButton.hide();
  
  mainGround = createSprite(wW/2,wH/8*4,wW,wH/8);
  mainGround.addImage("Main", groundImg);
  mainGround.scale = windowWidth/3072;
  mainGround.depth = 2;
  mainGround.setCollider("rectangle", 0, 450, 10000, 200);

  player = new Player();

  title = createSprite(windowWidth/2, windowHeight/2);
  title.addAnimation("Main", titleImg);
  title.addAnimation("GO", goImg);
  title.addAnimation("New WHS", newWhsImg);
  title.scale = windowWidth/2400;
  title.depth = 0;

  fallSpeed = width/200;
  initFS = fallSpeed;

  var whs = database.ref("WHS/");
  whs.on("value",readWHS,showError);

  controls = new Controls();
}

function draw() {
  background(bgImg);

  // Game States
  if(gameState === "start"){
    title.visible = true;

    if(keyIsDown(32) || controls.jmp > 0){
      gameState = "play";
    }

    player.animation();
  }
  if(gameState === "play"){
    title.visible = false;
  
    player.movement();
    spawnObj();

    if(frameCount % 30 === 0){
      score += 1;
    }

    if(player.sprite.isTouching(harmGroup) && player.shield.visible == false){
      player.endGame();
    }
    else if(player.sprite.isTouching(harmGroup) && player.shield.visible == true){
      harmGroup.destroyEach();
      hurtSFX.play();
      player.shield.visible = false;
    }
    else{
      player.animation();
    }

    if(player.sprite.isTouching(srGroup)){
      score += 5;
      fallSpeed = initFS;
      appearSpeed = 30;
      frameCount = 1200;
      srSFX.play();
      srGroup.destroyEach();
    }

    if(player.sprite.isTouching(shieldGroup)){
      player.shield.visible = true;
      score += 5;
      shieldSFX.play();
      shieldGroup.destroyEach();
    }

    if(keyIsDown(32)){
      spaceReleased = false;
    }
    else{
      spaceReleased = true;
    }
  }
  if(gameState === "end"){
    player.movement();

    title.visible = true;

    if(score > whsLocal){
      title.changeAnimation("New WHS");
      asked = false;
      submitted = false;
    }
    else{
      title.changeAnimation("GO");
      submitted = true;
    }

    if(keyIsDown(32) && spaceReleased == true && submitted == true || controls.jmp > 0 && submitted == true){
      player.reset();
      fallSpeed = width/200;
      appearSpeed = 50;
      harmGroup.destroyEach();
      shieldGroup.destroyEach();
      srGroup.destroyEach();
      gameState = "play";
      spaceReleased = false;
      frameCount = 0;
    }
    else{
      spaceReleased = true;
    }
  }
  
  player.display();
  controls.display();

  drawSprites();

  fill("white");
  textFont(font);
  textSize(width/50);
  text("Score: " + score + " pts",50,50);
  text("WHS: " + whsName + ", " + whsLocal + " pts",50,100);

  // Name Input and GO! Button
  if(score > whsLocal && asked == false && gameState == "end"){
    okButton.show();
    nameInput.show();
    asked = true;
  }

  else if (gameState === "play"){
    asked = false;
    okButton.hide();
    nameInput.hide();
  }

  playerName = nameInput.value();

  okButton.mousePressed(function(){
    writeScore();
  });
}

function spawnObj(){
  // Meteor & RS
  if(frameCount % appearSpeed === 0 && frameCount < 1600){
    var randy = round(random(1,5));
    switch(randy){
      case 1: var meteor = new Meteor(harmGroup,fallSpeed,player);
        break;
      case 2: shieldAppear();
        break;
      case 3: var meteor = new Meteor(harmGroup,fallSpeed,player);
        break;
      case 4: var meteor = new Meteor(harmGroup,fallSpeed,player);
        break;
      case 5: var meteor = new Meteor(harmGroup,fallSpeed,player);
        break;
    }
    fallSpeed += 0.1;
    appearSpeed -= 0.5;
  }
  else if(frameCount % appearSpeed === 0 && frameCount > 1600){
    var rand = round(random(1,6));
    switch(rand){
      case 1: var sr = new SR();
        break;
      case 2: var meteor = new Meteor(harmGroup,fallSpeed,player);
        break;
      case 3: shieldAppear();
        break;
      case 4: var meteor = new Meteor(harmGroup,fallSpeed,player);
        break;
      case 5: var meteor = new Meteor(harmGroup,fallSpeed,player);
        break;
      case 6: var meteor = new Meteor(harmGroup,fallSpeed,player);
        break;
    }

    fallSpeed += 0.1;
  }

  if(appearSpeed == 0 || appearSpeed < 0){
    appearSpeed = 10;
  }

  // Laser
  if(frameCount % 150 === 0 && frameCount > 500){
    var laser = new Laser(harmGroup);
  }
}

function shieldAppear(){
  if(player.shield.visible == false){
    var shield = new Shield();
  }
  else{
    var meteor = new Meteor(harmGroup,fallSpeed,player);
  }
}

function readWHS(data){
  whsValue = data.val();
  whsLocal = whsValue.playerScore;
  whsName = whsValue.playerName;
}

function writeScore(){
  database.ref("WHS").set({
    "playerName":playerName,
    "playerScore":score
  });

  nameInput.hide();
  okButton.hide();

  submitted = true;
}

function showError(){

}

function touched(obj,radius){
  if(touches.lenght > 0 
    && touches.x > obj.x - radius
    && touches.x < obj.x + radius
    && touches.x > obj.y - radius
    && touches.x < obj.y + radius){
      return true;
  }
  else{
    return false;
  }
}