var bahu, bahuImg, fall, fallImg;
var bg, bg1,bg2,bg3;
var sound;
var start,startImg;
var avantika,avantikaImg,avantikaGroup;
var rock,rockImg,rockGroup;
var LEVEL1=1;
var END=0;
var LEVEL2=2;
var BEGINNING=3;
var gameState=BEGINNING;
var invisible,invisibleGroup;
var villain,villainImg,villainGroup;
var castle,castleImg,castleGroup;
var stone, stoneImg,stoneGroup;
var count,bahuArrow;
var arrow,arrowImg,arrowGroup;
var edges;

function preload(){
  fallImg=loadImage("water.jpg");
  bahuImg=loadImage("bahubali.jpg");
  sound=loadSound("amar.mp3");
  avantikaImg=loadImage("bahubali-heroine.jpg");
  rockImg=loadImage("images-removebg-preview.png");
  bg1=loadImage("bahubali-athirapally-scene.jpg");
  startImg=loadImage("bahubali.png");
  castleImg=loadImage("castle-removebg-preview.png");
  villainImg=loadImage("Baahubali_Rana-removebg-preview (2).png");
  stoneImg=loadImage("stone-removebg-preview.png");
  bahuArrow=loadImage("bahubali_arrow.jpg");
  arrowImg=loadImage("arrowright.jpg");
}

function setup() {
  sound.loop();
  
  edges= createEdgeSprites();
  
  createCanvas(600,600);
  fall=createSprite(300,300,600,600);
  fall.addImage("fall",fallImg);
  fall.velocityY=1;
  fall.scale=2;
 
  bahu=createSprite(200,500,50,50);
  bahu.addImage("bahu",bahuImg);
  bahu.scale=0.2;
  bahu.setCollider("rectangle",0,0,200,bahu.height);
  bahu.addImage("arrow",bahuArrow);
  
  bg=createSprite(300,300);
  bg.addImage(bg1);
  
  start=createSprite(500,500);
  start.addImage(startImg);
  start.scale=0.3;
  
  avantikaGroup=new Group();
  rockGroup=new Group();
  //invisibleBlockGroup=new Group();
  stoneGroup=new Group();
  villainGroup=new Group();
  castleGroup= new Group();
  arrowGroup=new Group();
}

function draw() {
  if(fall.y>600){
    fall.y=fall.height/4;
     }
  
  if(gameState===LEVEL1){
    bg.visible=false;
    bahu.visible=true;
    fall.visible=true;
    start.visible=false;
    
    bahu.bounceOff(edges[2]);
    
   // bahu.changeImage("bahu",bahuImg)
  
    if(keyDown('left_Arrow')){
    bahu.x=bahu.x-5;
  }
  
  if(keyDown('right_Arrow')){
    bahu.x=bahu.x+5;
  }
  
  if(keyDown('up_Arrow')){
    bahu.velocityY=-8;
  }
  
  bahu.velocityY=bahu.velocityY+0.8;
  
  tamannaah();
  spawnRock();
    
    spawnVillain1();

    if(bahu.isTouching(rockGroup)){
      bahu.velocityY=0;
    }
    
    if(stoneGroup.isTouching(bahu)||
       bahu.x<0){
       bahu.destroy();
       gameState=END;
  }
    
    if(keyWentDown("Space")){
      bahu.changeImage("arrow",bahuArrow);
      bahu.scale=0.5;
      spawnArrow();
    }else if(keyWentUp("Space")){
      bahu.changeImage("bahu",bahuImg);
      bahu.scale=0.2
    }

  }else if(gameState===END){
 
  }else if(gameState===BEGINNING){
    fall.visible=false;
    bahu.visible=false;
    bg.scale=2.5;
    
    if(mousePressedOver(start)){
       gameState=LEVEL1;
       }
           }
  console.log(frameCount);
  start.debug=true;
  drawSprites();
}

function tamannaah(){
  if(frameCount%300===0){
  avantika=createSprite(200,200);
  avantika.addImage(avantikaImg)
  avantika.x=Math.round(random(100,600));
  avantika.y=Math.round(random(100,350))
  avantika.lifetime=100;
    
    if(avantika.x<300){
      avantika.velocityX=-2;
    }else if(avantika.x>300){
      avantika.velocityX=2;
    }
    
    avantika.depth=fall.depth;
    avantika.depth=avantika.depth+1;
    avantika.scale=0.3;
    avantikaGroup.add(avantika);
    avantika.debug=true;
    avantika.setCollider("rectangle",0,70,
    avantika.width+300,avantika.height+100);

}
}
function spawnRock(){
   if(frameCount%400===0){
     rock=createSprite(500,-50,50,50);
     rock.velocityY=1;
     rock.x=Math.round(random(100,300));
     rock.addImage(rockImg);
     rock.scale=0.3;
     rockGroup.add(rock);
     rock.debug=true;
     rock.setCollider("rectangle",0,-30,rock.width-60,rock.height-60)
   }
}
function spawnVillain1(){
  if(frameCount%500===0){
    villain=createSprite(550,-15,5,5);
    villain.addImage(villainImg);
    villain.velocityY=1;
    villain.lifetime=600;
    villainGroup.add(villain);
    villain.scale=0.2;
    
    castle=createSprite(550,15,villain.width,2); 
    castle.velocityY=1;
    castle.addImage(castleImg);
    castle.lifetime=600;
    castle.x=villain.x;
    castle.y=villain.y+60;
    castleGroup.add(castle);
    castle.scale=0.3;
    
    castle.depth=villain.depth;
    castle.depth=castle.depth+1;
    
            if(villain.x>10){
          stone=createSprite(50,-5);
          stone.x=villain.x;
          stone.addImage(stoneImg);
          stone.velocityX=-3;
          stone.velocityY=3;
          stone.scale=0.2;    
          stoneGroup.add(stone);
            }
              
              stone.depth=villain.depth;
              villain.depth=villain.depth+1;
  }
}
function spawnArrow(){
  arrow=createSprite(500,100);
  arrow.x=bahu.x;
  arrow.y=bahu.y;
  arrow.velocityX=2;
  arrow.velocityY=0;                                      
  arrow.addImage(arrowImg);
  arrowGroup.add(arrow);
}