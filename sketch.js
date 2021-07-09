var monkey , monkey_running, monkeyC
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score, ground
var survivalTime
var PLAY=0, END=1, gameState=PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkeyC = loadImage("monkeyC.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
  FoodGroup= new Group();
  obstacleGroup= new Group();
  
}



function setup() {
  createCanvas(670, 400);
  score=0
  survivalTime=0
  
  ground=createSprite(0,400,1500,10)
  
   monkey=createSprite(90,370,10,10)
  monkey.addAnimation("monkey_running",monkey_running);
  monkey.addAnimation("monkey_collided",monkeyC);
  monkey.scale=0.1
  
  
  

  }
function draw() {
  background("green")
  
  if(gameState==PLAY){
  if(keyDown("space")&&monkey.y >= 350){
    monkey.velocityY=-10
  }
  monkey.velocityY = monkey.velocityY + 0.3
  monkey.collide(ground)
  
  
  ground.velocityX = -7 
 ground.x = ground.width/2;
  survivalTime=Math.ceil(frameCount/frameRate());
    
 if(World.frameCount%80===0){
    fruits()
 }
  
  if(World.frameCount%300===0){
    stones()
 }
  
  if(monkey.isTouching(FoodGroup)){
     FoodGroup.destroyEach();
     score=score+1;
      }
  if(monkey.isTouching(obstacleGroup)){
    gameState = END;
      }
  }
  if(gameState==END){
      ground.velocityX = 0 ;
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    monkey.changeAnimation("monkey_collided",monkeyC);
    monkey.x=300;
    monkey.y=200;
  }
 
 drawSprites()
  fill("white") 
  text("Score: "+ score, 500,50);
  
  fill("black")

  text("Survival Time: "+ survivalTime,350,50)
  
}

function fruits(){
  banana=createSprite(670,Math.round(random(170,230)),10,10)
  banana.addImage(bananaImage)
  banana.scale=0.1
  banana.velocityX=-3
  FoodGroup.add(banana)
}

function stones(){
  obstacle=createSprite(670,380,10,10)
  obstacle.addImage(obstaceImage)
  obstacle.velocityX=-4
  obstacle.scale=0.2
  obstacleGroup.add(obstacle)
}












