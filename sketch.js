var trex, trex_running, trex_collided;
var ground, ground_img, isnvGround;
var cloud_img;
var ob1_img, ob2_img, ob3_img, ob4_img, ob5_img, ob6_img;
var score=0;
var cloudGroup, obGroup;
var jumpSound, dieSound, checkpointSound;

var PLAY =1;
var END =0;
var gameState = PLAY;

var gameOver, gameOver_img, restart, restart_img;

function preload(){
  
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  ground_img = loadImage("ground2.png")
  cloud_img = loadImage("cloud.png")
  ob1_img = loadImage("obstacle1.png")
  ob2_img = loadImage("obstacle2.png")
  ob3_img = loadImage("obstacle3.png")
  ob4_img = loadImage("obstacle4.png")
  ob5_img = loadImage("obstacle5.png")
  ob6_img = loadImage("obstacle6.png")
  gameOver_img = loadImage("gameOver.png")
  restart_img = loadImage("restart.png")
  jumpSound=loadSound("jump.mp3")
  dieSound=loadSound("die.mp3")
  checkpointSound=loadSound("checkPoint.mp3")
}

function setup(){
  createCanvas(600,400)
  
  //create a trex sprite
  trex= createSprite(50,160, 20,10);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided)
  trex.scale=0.5;
  trex.debug=false
  trex.setCollider("rectangle", 0, 0, 200, 80)
  
  ground = createSprite(300, 180, 600, 20)
  ground.addImage(ground_img)
  
  isnvGround= createSprite(300, 185, 600, 10)
  isnvGround.visible=false
  
  cloudGroup=new Group()
  obGroup=new Group()
  
  //trex.debug=true
  
  gameOver= createSprite(300, 80, 20, 20)
  restart= createSprite(300, 110, 20, 20)
  gameOver.addImage(gameOver_img)
  gameOver.scale=0.5
  restart.addImage(restart_img)
  restart.scale=0.5
  gameOver.visible=false
  restart.visible=false
}

function draw(){
  background("purple")
  
  if (gameState === PLAY){
      camera.position.x=trex.x+250
      camera.position.y=trex.y

    if((keyDown("space") || keyDown("UP_ARROW")) && trex.y>156)   {
      trex.velocityY=-10
      jumpSound.play()
    }
    trex.velocityY= trex.velocityY + 0.5
    
    ground.velocityX=-(10+score/100)
    
    if(ground.x<0){
     ground.x=ground.width/2
    }
    
  
  
    Obstacle()
    
    
    score=Math.round(getFrameRate()/30)+score
    console.log(getFrameRate())
    if(score%100===0 && score>0){
      checkpointSound.play()
    }
    if(obGroup.isTouching(trex)){
      /*dieSound.play()
      gameState=END*/
      //jumpSound.play()
      trex.velocityY=-6
      }
    /*if(score>200){
    obGroup.velocityX=-7
      ground.velocityX=-12
    }*/
    
    
   
  }
  else if( gameState === END){
    
      ground.velocityX=0
        
    //trex.changeAnimation("collided", trex_collided)

    obGroup.setVelocityXEach(0)
    
   cloudGroup.setVelocityXEach(0)  
    
    cloudGroup.setLifetimeEach(-1)
    
    obGroup.setLifetimeEach(-1)
    
    trex.velocityY=0
  
    gameOver.visible=true
    restart.visible=true
    trex.changeAnimation("collided",trex_collided);

    
  }
  
  if(mousePressedOver(restart)){
    reset()
  }
  
  trex.collide(isnvGround)
 
  text("score "+score, 500, 50)
  
  drawSprites();
  //console.log(frameCount)
}

/*function spawnCloud(){
  if(frameCount%50===0){
    var cloud=createSprite(600, 100, 20, 20) 
    cloud.addImage(cloud_img)
    cloud.scale=0.7
    cloud.velocityX=-4
    var r=random(1,100)
    cloud.y=r
    trex.depth=cloud.depth++
    cloud.lifetime=160
    cloudGroup.add(cloud)
  }
}*/

function Obstacle(){
  if(frameCount%50===0){
    var ob=createSprite(600, 165, 20, 30)
    var R=Math.round(random(1,6))
    //console.log(R)
    ob.velocityX=-(5+score/100)
    switch(R){
      case 1: ob.addImage(ob1_img) ;
        break;
      case 2: ob.addImage(ob2_img) ;
        break;
      case 3: ob.addImage(ob3_img) ;
        break;
      case 4: ob.addImage(ob4_img) ;
        break;
      case 5: ob.addImage(ob5_img) ;
        break;
      case 6: ob.addImage(ob6_img) ;
        break;
      default : break;
    }
  obGroup.add(ob) 
  ob.scale=0.5
  ob.lifetime=130    
  }
  
}

function reset(){
  gameState=PLAY
  gameOver.visible=false
  restart.visible=false
  obGroup.destroyEach()
  cloudGroup.destroyEach()
  score=0
  trex.changeAnimation("running", trex_running) 
}