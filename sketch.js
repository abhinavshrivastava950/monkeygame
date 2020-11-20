var PLAY = 0;
var END = 1;
var gameState = PLAY;
var monkey , monkey_running , ground;
var banana ,bananaImage, obstacle, obstacleImage;
var foodgroup, obstaclegroup;
var score = 0;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300);

  monkey = createSprite(40, 235, 60, 60);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.12;
  
  ground = createSprite(300,285,1200,30);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  console.log(ground.x)
  
  foodgroup = createGroup();
  obstaclegroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  
}


function draw() {
  background("skyblue");
  
  text("Score: "+score, 350, 30);
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: "+survivalTime , 420, 30);
  
  if(gameState === PLAY){
    
    if(keyDown("space") && monkey.y >= 175){
      monkey.velocityY = -10;
    }
    
    monkey.velocityY = monkey.velocityY + 1
    
    if(ground.x < 0){
      ground.x = ground.width/2
    }
    
    food();
    obstacles();
    
    if(foodgroup.isTouching(monkey)){
      foodgroup.destroyEach();
      score = score+2
    }
    
    if(obstaclegroup.isTouching(monkey)){
      gameState = END;
      
    }
    
  }
  else if(gameState === END){
    
    ground.velocityX = 0; 
    monkey.velocityY = 0;
    
    textSize(30);
    text("Game Over", 225, 150);
    textSize(15);
    text("Press 'r' to Restart", 240, 170);
    
    if(keyDown("r") && gameState === END){
      reset();
    }
    
    foodgroup.setVelocityXEach(0);
    obstaclegroup.setVelocityXEach(0);
    foodgroup.setLifetimeEach(-1);
    obstaclegroup.setLifetimeEach(-1);
    
    
  }
  
  monkey.collide(ground);
  drawSprites();
}
function reset(){
  gameState = PLAY;
  foodgroup.destroyEach();
  obstaclegroup.destroyEach();
  score = 0;
  survivalTime = 0;
}



function food(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600,150,20,20);
    banana.y = Math.round(random(150,180));
    banana.addImage(bananaImage);
    banana.scale = 0.09
    banana.velocityX = -4
    banana.lifetime = 200
    foodgroup.add(banana);
  }
  
}

function obstacles(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(600,251,60,60);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
    obstacle.lifetime = 200
    obstaclegroup.add(obstacle);
  }
}


