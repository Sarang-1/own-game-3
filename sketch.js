// ....declaring all variables

var form;
//components during assembling stage
var component1,component2,component3,component4,component5,component6;
//variables containing the final position of components
var comp1,comp2,comp3,comp4,comp5,comp6;
//variables containing the initial position of the components
var pos1,pos2,pos3,pos4,pos5,pos6;
var rocket,distance,speed,dark;
//all the groups and arrays
var compPos = [];
var componentG,compG,posG,obstacleG;
//all the images
var i1,i2,i3,i4,i5,i6,darkImg,groundImg,rocketImg,rocketImg2,speechBubbleImg,healthImg,blast,meteor,stars,planetImg;
//the buttons
var next,forward,yes,no,home,site,retry,overview,details,size,exception,communicate;
// backgrounds
var ground,space,bg2,bg,back,mars;
//health 
var health;
//tutorial text and the speech box
var tutorial,speechBubble;
//gamestate
var gameState;
// for choosing the tutorials'text
var speechState = 0;
//time for speeches
var speechCount = 0;
//delay time for speeches
var delayCount = 0;
// some important game elements
var isChecked,assembled,planet,canvas,edges,landed;


//loading all the images
function preload(){
  bg = loadImage("images/bg.jpg");
  meteor = loadImage("images/meteor.png");
  blast = loadImage("images/blast.png");
  back = loadImage("images/bg.jpg");
  stars = loadImage("images/original.gif");
  planetImg = loadImage("images/planet.png");
  i1 = loadImage("images/1.png");
  i2 = loadImage("images/2.png");
  i3 = loadImage("images/3.png");
  i4 = loadImage("images/4.png");
  i5 = loadImage("images/5.png");
  i6 = loadImage("images/6.png");
  darkImg = loadImage("images/dark.png");
  rocketImg = loadImage("images/rocket.png");
  rocketImg2 = loadImage("images/rocket2.png");
  groundImg = loadImage("images/ground.jpg");
  healthImg = loadImage("images/healthBar.png");
  speechBubbleImg = loadImage("images/text.png");
  bg2 = loadImage("images/bg2.jpg");
  mars = loadImage("images/mars.jpg");
}


function setup() {
  //the canvas area
  canvas = createCanvas(1350,650);

  edges = createEdgeSprites();

 // declaring groups
 componentG = createGroup();
 compG = createGroup();
 obstacleG = createGroup();
 posG = createGroup();

 landed = false;
 //rocket's components
 component1 = createSprite(200,130,50,50);
 component2 = createSprite(200,380,50,50);
 component3 = createSprite(200,550,50,50);
 component4 = createSprite(1150,150,50,50);
 component5 = createSprite(1150,360,50,50);
 component6 = createSprite(1150,550,50,50);

 compPos.push([component1.x,component1.y]);
 compPos.push([component2.x,component2.y]);
 compPos.push([component3.x,component3.y]);
 compPos.push([component4.x,component4.y]);
 compPos.push([component5.x,component5.y]);
 compPos.push([component6.x,component6.y]);

 component1.depth=10;
 component1.addImage(i1);
 component2.addImage(i2);
 component3.addImage(i3);
 component4.addImage(i4);
 component5.addImage(i5);
 component6.addImage(i6);
 componentG.add(component1);
 componentG.add(component2);
 componentG.add(component3);
 componentG.add(component4);
 componentG.add(component5);
 componentG.add(component6);
 componentG.setScaleEach(0.7);
 componentG.setVisibleEach(false);

 //final position of components
 comp1 = createSprite(683,364,10,10);
 comp2 = createSprite(626,346,10,10);
 comp3 = createSprite(680,199,10,10);
 comp4 = createSprite(681,293,10,10);
 comp5 = createSprite(736,346,10,10);
 comp6 = createSprite(680,505,10,10);
 compG.add(comp1);
 compG.add(comp2);
 compG.add(comp3);
 compG.add(comp4);
 compG.add(comp5);
 compG.add(comp6);
 compG.setVisibleEach(false);

 //when components touch these they settle to their final position
 pos1 = createSprite(683,364-component1.height/3,10,10);
 pos2 = createSprite(626,346-component2.height/3,10,10);
 pos3 = createSprite(680,199-component3.height/3,10,10);
 pos4 = createSprite(681,293-component4.height/3,10,10);
 pos5 = createSprite(736,344-component5.height/3,10,10);
 pos6 = createSprite(680,505-component6.height/3,10,10);
 posG.add(pos1);
 posG.add(pos2);
 posG.add(pos3);
 posG.add(pos4);
 posG.add(pos5);
 posG.add(pos6);
 posG.setVisibleEach(false);

 //take off button
 next = createButton("TAKE OFF");
 next.position(620,100);
 next.hide();

 home = createButton("bACK");
 home.position(2,2);
 home.mousePressed(()=>{
   gameState = "home";
 });

 site = createButton("Creator's profile");
 site.position(800,40);
 site.style('background-color: cyan;color: #181515; border-radius: 15px;');
 site.style('width: 200px;height: 70px; box-shadow: 4px 4px darkblue;')
 
 retry = createButton("RETRY");
 retry.position(620,200);
 retry.hide();
 
 rocket = createSprite(600,400,50,250);
 rocket.addImage(rocketImg2);
 rocket.scale = 0.7;
 rocket.visible = false;
 rocket.setCollider("rectangle",0,0,170,400);

 planet = createSprite(width-200,-600,100,100);
 planet.addImage(planetImg);
 planet.scale = 2;
 planet.visible = false;

 //black rocket during assembling
 dark = createSprite(680,350,50,50);
 dark.addImage(darkImg);
 dark.visible = false;
 dark.scale = 0.7
 dark.depth = -1;

 //background sprites
 ground = createSprite(width/2,-height*11.3,width,height);
 ground.addImage(groundImg);
 ground.scale = 4;
 ground.depth = -2;
 ground.visible = false;

 //speech box
 speechBubble = createSprite(200,530,50,50);
 speechBubble.addImage(speechBubbleImg);
 speechBubble.scale = 1;
 speechBubbleImg.resize(400,210);
 speechBubble.visible = false;

 // next button
 forward = createButton("Next");
 forward.position(300,height-100);
 forward.hide();
 forward.style("background-color","rgb(255,255,255)");
 forward.style('width','60px');
 forward.style('height','22px');
 forward.style('font-family','sans-serif');
 forward.style('font-weight','bold');
 forward.style('font-size','15px');
 forward.style('color','rgb(0,0,0)');

 // yes button
 yes = createButton("Yes");
 yes.position(300,height-100);
 yes.hide();
 yes.style("background-color","rgb(255,255,255)");
 yes.style('width','40px');
 yes.style('height','22px');
 yes.style('font-family','sans-serif');
 yes.style('font-weight','bold');
 yes.style('font-size','15px');
 yes.style('color','rgb(0,0,0)');

 //no button
 no = createButton("No");
 no.position(240,height-100);
 no.hide();
 no.style("background-color","rgb(255,255,255)");
 no.style('width','40px');
 no.style('height','22px');
 no.style('font-family','sans-serif');
 no.style('font-weight','bold');
 no.style('font-size','15px');
 no.style('color','rgb(0,0,0)');

 /*overview = createButton('Overview of the planet');
 overview.position(800,400);

 details = createButton("Get the details");
 details.position(800,450);
 
 size = createButton("Planet's size");
 size.position(800,500);

 exception = createButton("what's new");
 exception.position(800,550);*/

 //some important elements of the game
 tutorial = document.getElementById("abc");
 distance = 0;
 speed = 0;
 health=155;
 gameState = "home";
 form = new Form();
 assembled = false;
}

function draw() {
  background(bg);
  drawSprites();
  form.display();
  home.show();
  ground.y += distance/100;

  // assembling stage
  if(gameState === "assemble"){
    textSize(30);
    fill("red");
    stroke("red");
    strokeWeight(2);
    text("ASSEMBLING STAGE",550,70);
    strokeWeight(1);
    textSize(20);
    text("(DRAG and DROP the components to form a rocket)",460,100);

  if(componentG.get(0).x === compG.get(0).x && componentG.get(0).y === compG.get(0).y &&componentG.get(1).x === compG.get(1).x && componentG.get(1).y === compG.get(1).y &&
  componentG.get(2).x === compG.get(2).x && componentG.get(2).y === compG.get(2).y &&componentG.get(3).x === compG.get(3).x && componentG.get(3).y === compG.get(3).y &&
  componentG.get(4).x === compG.get(4).x && componentG.get(4).y === compG.get(4).y &&componentG.get(5).x === compG.get(5).x && componentG.get(5).y === compG.get(5).y )
  {
   assembled = true;
   home.hide();
   next.show();
   }
   //take off button pressed
   next.mousePressed(()=>{
     rocket.visible = true;
     componentG.setVisibleEach(false);
     dark.visible = false;
     form.hide();
     gameState = "tutorial";
     speechCount = 0;
     delayCount = 0;
     next.hide();
  });
  }

  // home page display
  if(gameState === "home"){
    background(back);
    form.start.show();
    form.help.show();
    form.options.show();
    form.miniGames.show();
    speechBubble.visible = false;
    tutorial.style.display = "none";
    forward.hide();
    yes.hide();
    no.hide();
    canvas.show();
    site.hide();
    rocket.visible = false;
    home.hide();
    document.getElementById("name").style.display = "inline-block";
    document.getElementById("cards_landscape_wrap-2").style.display = "none";
    distance = 0;
    speed = 0;
    health = 155;
    ground.y = -height*11.3;
    rocket.x = 600;
    speechCount = 0;
    delayCount = 0;
  }
   
 // all the text for tutorials+
 if(gameState === "tutorial"){
   speechBubble.visible = true;
   tutorial.style.display = "inline-block";
   textSize(20);
   fill("red");
   text("DISTANCE: "+round(distance),1110,130);
   text("SPEED: "+round(speed),1110,160); 
   fill(255);
   rect(140,57,155,26);
   if(health >= 100){
   fill(rgb(0,255,0));
   }else if(health >=50 && health< 100){
     fill("orange");
   } else{
     fill("red");
   }
   rect(140,57,health,26);
   image(healthImg,100,50,200,40);
   
   // changing speech when button pressed
   forward.mousePressed(()=>{
     nxt();
     
   });

   if(speechState>=31){
      gameState="start";
      speechBubble.visible = false;
      tutorial.style.display = "none";
      speed = 10;
    }

   speech(0,"Hello Commander!! Welcome to 'NO WAY OUT!!' ..");

   if(speechState === 1){
     speech(1,"Do you know how to play this game??");
     yes.mousePressed(()=>{
       nxt();
       speechState = 30;
     });
     no.mousePressed(()=>{
       nxt();
       speechState = 26;       
     });
   }

   speech(26,"First of all, to move the rocket, use the arrow keys(< ^ >).");

   if(speechState === 27){
   speech(27,"EXCEPTIONAL! now this red bar shows your health.");
   speechBubble.rotation = 180;
   speechBubble.y = 160;
   speechBubble.x = 140;
   speechBubble.scale = 0.9;
   tutorial.style.top = "130px";
   tutorial.style.left = "30px";
   tutorial.style.marginRight = "1050px";
   forward.position(240,230);
   }

   if(speechState === 28){
   speech(28,"These are your rocket's current distance and speed.");
   speechBubble.x = width-300;
   speechBubble.y = 250;
   speechBubble.rotation = 180;
   tutorial.style.top = "220px";
   tutorial.style.marginRight = "130px";
   tutorial.style.left = "910px";
   forward.position(width-180,330);
   }

   if(speechState === 29){
   speech(29,"Beware of the obstacles.. and Your destination at a distance of 30000 km.");
   speechBubble.x = 200;
   speechBubble.y = 530;
   speechBubble.rotation = 0;
   forward.position(300,height-100);
   tutorial.style.top = "450px";
   tutorial.style.marginRight = "1000px";
   tutorial.style.left = "50px";
   }
   speech(30,"SUPERB!! YOU ARE READY TO GO. COME ON.. ");
  }

  if(gameState === "mini-games"){
    canvas.hide();
    document.getElementById("name").style.display = "none";
    document.getElementById("cards_landscape_wrap-2").style.display = "inline-block";
    site.show();
    site.mousePressed(()=>{
      open("http://sarang73.whjr.site");
    })
  }

 // when game is in play
 if(rocket.visible === true && gameState === "start"){
   bg = stars;
   rocket.collide(edges);
   fill(255);
   rect(140,57,155,26);
   if(health >= 100){
   fill(rgb(0,255,0));
   }else if(health >=50 && health< 100){
     fill("orange");
   } else{
     fill("red");
   }
   rect(140,57,health,26);
   image(healthImg,100,50,200,40);
 
   ground.visible = true;

   if(distance >= 30000){
     planet.visible = true;
     planet.velocityY = 3;
     obstacleG.destroyEach();
     home.hide();
   }
   if(planet.y === -210){
       planet.velocityY = 0;
       speechBubble.visible = true;
       tutorial.style.display  = "inline-block";
       tutorial.style.top = "450px";
       speech(31,"Here's your destination . . . . . 'KEPLER - 32b'. Press enter to land.");
       if(keyCode === 13){
         gameState = "landed";
         nxt();
       }
       home.hide();
     }
     
   //controls for the rocket
   if(gameState === "start" && planet.y <= -211){
      if(health>0){
        if(ground.y >= -830){
          spawnObstacles();
        }

       if(keyIsDown(UP_ARROW)){
         speed += 1;
         rocket.addImage(rocketImg)
        } else {
         rocket.addImage(rocketImg2);
        }

       if(keyIsDown(LEFT_ARROW)){
         rocket.x -= 10;
        }  

       if(keyIsDown(RIGHT_ARROW)){
         rocket.x += 10;
        }
        //calculations for speed and distance
        speed *= 0.98;
        distance += speed/2;

       if(distance <= 0){
         distance = 0;
        }
      }
     

      if(health <= -1){
        obstacleG.destroyEach();
        rocket.addImage(blast);
        retry.show();
      }
      retry.mousePressed(()=>{
        health = 155;
        distance = 0;
        speed = 0;
        ground.y = -height*11.3;
        retry.hide();
      });
      
    }
   
   //status of rocket
   textSize(20);
   fill("red");
   text("DISTANCE: "+round(distance),1110,130);
   text("SPEED: "+round(speed),1110,160);    

   //decreasing health
   if(rocket.isTouching(obstacleG)){
     speed -= 1;
     health -= 35;

     for(var i=0;i<obstacleG.length;i++){
       obstacleG.get(i).destroy();
      }
    }
  }

  if(gameState === "landed"){
    bg = mars;

    ground.visible = false;
    planet.visible = false;
    rocket.visible = false;
    landed = true;

    if(speechState === 32){
     home.hide();
     speechBubble.visible = true;
     tutorial.style.display  = "inline-block";
     tutorial.style.top = "440px";
     speech(32,"Now you are landed on KEPLER - 32b. As the commander of this mission, try to explore this planet.");

     forward.mousePressed(()=>{
       speechBubble.visible = false;
       tutorial.style.display = "none";
       nxt();
      });

    }
    
  }
}

 

// controls for the rocket components during assembling stage
function mouseDragged(){
  for(let i=0;i<componentG.length;i++){

    if(componentG.get(i).isTouching(posG.get(i))){
     componentG.get(i).x = compG.get(i).x;
     componentG.get(i).y = compG.get(i).y;
    }
   else if(mousePressedOver(componentG.get(i))){
     componentG.get(i).x = mouseX;
     componentG.get(i).y = mouseY;
    }
   else{
     componentG.get(i).x = compPos[i][0];
     componentG.get(i).y = compPos[i][1];
    }
  }
}


//spawning random obstacles
function spawnObstacles(){
  if(frameCount%80 === 0){
    var obstacle = createSprite(random(rocket.x-100,rocket.x+100),-20,50,50);
    obstacle.addImage(meteor);
    obstacle.scale = 0.1;
    obstacle.depth = 10;
    obstacle.velocityY = 10;
    obstacle.lifetime = 220;
    obstacleG.add(obstacle);
  }
}

//displaying all the tutorials
function speech(state,message) { 
  if (speechState === state) {
    if(frameCount%5===0){
      speechCount++;
      delayCount++;
    }

    if (speechCount>0 && (delayCount < 2)) {
      var typewriter = new Typewriter(tutorial, {
       loop: false,
       delay: 45,
      });

      typewriter
      .typeString(message)
      .callFunction(()=>{
        if((speechState!=1)&&(speechState!=2)&&(speechState != 31)){
          forward.show();
        }else if(speechState != 31){
          yes.show();
          no.show();
        }
      })
      .start();
    }
  }
}

//when next is pressed during tutorial stage
function nxt(){
  yes.hide();
  no.hide();
  speechState++;
  speechCount = 0;
  delayCount = 0;
  forward.hide();
}
