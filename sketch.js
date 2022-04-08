
var castleImg,castle
var lolipop
var iceCream
var carrot
var bellPepper
var broccoli
var ears
var ground
var girlRight
var girlLeft
var girlDie
var girlStart
var gamestate = "start"
var livesScore = 3
var Score = 0
var edges
var AwMan
var wha
var yummy
var bonus

function preload(){
castleImg = loadImage("Disney CastleF.jpeg")
girlRight = loadAnimation("GirlRightH.png", "GirlRightH.png", "GirlRightH3.png","GirlRightH3.png","GirlRightH2.png","GirlRightH2.png","GirlRightH.png","GirlRightH3.png","GirlRightH2.png")
girlLeft = loadAnimation("GirlLeftH.png","GirlLeftH.png","GirlLeftH2.png","GirlLeftH2.png")
lolipop = loadImage("Lolipop.png")
iceCream = loadImage("Disney Ice Cream.png")
carrot = loadImage("Carrot.png")
bellPepper = loadImage("Bell Pepper.png")
ears = loadImage("Disney Ears.png")
girlDie = loadImage("GirlSilly.png")
girlStart = loadImage("GirlRightH3.png")
broccoli = loadImage("Broccoli.png")
AwMan = loadSound("assets/AwMan.mp3")
wha = loadSound("assets/whawhawha.mp3")
yummy = loadSound("assets/Yummy.mp3")
bonus = loadSound("assets/Bonus.mp3")
}
//left right arrows+change animations accordingly

function setup() {
 createCanvas(600,600)
 //making the castle
 castle = createSprite(500,300,600,600)
 castle.addImage(castleImg)
 //making the girl animation
 girl = createSprite(200,560,20,20)
 girl.addAnimation("right",girlRight)
 girl.addAnimation("left",girlLeft)
 girl.addAnimation("die",girlDie)
 girl.addAnimation("start",girlStart)
 girl.scale = 0.5
 //girl.debug = true
 girl.setCollider("circle",0,0,30)
 

//making the ground
ground = createSprite(300,590,600,20)
//making the ground invisible 
ground.visible = false
//making the group-ADD THINGS TO GROUP(CREATE FUNCTION)
treatG = createGroup()
vegG = createGroup()
earGroup = createGroup()
//making the edges
edges = createEdgeSprites()
}

function draw() {
background("pink")
drawSprites()

//making the girl bounce off with the edges
 girl.bounceOff(edges)

//making an if block when space bar is clicked game should start
if(gamestate == "start"){
    stroke("black")
    strokeWeight(2)
    fill ("hotpink")
    textSize (25)
    text ("Press Space to Begin!",200,40)
    textSize(20)
    fill("lightyellow")
    stroke("black")
    strokeWeight(2)
    text("To Make the Girl Move Press the Left and Right Arrows!",30,80)
    fill("paleturquoise")
    text("Remember, she loves sweet treats but HATES vegetables!",30,120)
    fill("lightyellow")
    text("When you touch the ears you get a bonus of an extra life!",20,160)
    //setting animation
    girl.changeAnimation("start", girlStart)
    if(keyDown("space")){
        gamestate = "alive"
    } 
}
//alive block
if(gamestate == "alive"){
    textSize(20)
    stroke("black")
    strokeWeight(2)
fill("lavender")
text("Score:"+Score,480,40)
text("Lives Left:"+livesScore,480,60)

    //making the background infinite
 castle.velocityX = -0.5
 if(castle.x<100){
 castle.x = 500
 }
    //making the animation change when right arrow is clicked
if(keyDown("right_arrow")){
    girl.changeAnimation("right",girlRight)
    girl.x = girl.x+5
}
//making the animation change when the left arrow is clicked
if(keyDown("left_arrow")){
    girl.changeAnimation("left",girlLeft)
    girl.x = girl.x-5
}
if(girl.isTouching(vegG)){
livesScore=livesScore-1
AwMan.play()
AwMan.setVolume(0.5)
if(livesScore<1){
    gamestate = "dead"
}
}
if(girl.isTouching(treatG)){
    Score = Score+1
    yummy.play()
}
if(girl.isTouching(earGroup)){
    livesScore = livesScore+1
    bonus.play()
}
treats()
 broccoliF()
 bellPepperF()
 carrotF()
 ear()
 girl.overlap(vegG,function(collector,collected){
    collected.remove()
})
girl.overlap(treatG,function(collector,collected){
    collected.remove()
})
girl.overlap(earGroup,function(collector,collected){
    collected.remove()
})
   
}
//dead block
if(gamestate == "dead"){
    
    girl.changeAnimation("die",girlDie)
    castle.velocityX = 0
    vegG.setVelocityYEach(0)
    treatG.setVelocityYEach(0)
    earGroup.setVelocityYEach(0)
    if(!AwMan.isPlaying()){
        wha.play()
        gamestate = "end"
    }
   
   
}
if(gamestate=="end"){
    textSize(20)
    stroke("black")
    strokeWeight(2)
fill("lavender")
text("Score:"+Score,480,40)
text("Lives Left:"+livesScore,480,60)
textSize(100)
fill("plum")
text("Game Over!",45,350)
}

 
}
//making the treats function
function treats(){
    if(frameCount%200==0){
        //making the lolipop
lolipopS = createSprite(Math.round(random(20,580)),-60,20,20)
lolipopS.velocityY = 5
lolipopS.addImage(lolipop)
lolipopS.scale = 0.09
treatG.add(lolipopS)
lolipopS.setCollider("circle",0,0,30)
//making the ice cream
iceCreamS = createSprite(Math.round(random(20,580)),-40,20,20)
iceCreamS.velocityY = 5
iceCreamS.addImage(iceCream)
iceCreamS.scale = 0.09
treatG.add(iceCreamS)
iceCreamS.setCollider("circle",0,0,30)

    }

}
/*
//making the vegetable function
function vegetable(){
    if(frameCount%250==0){
        //making the broccoli
 broccoliS = createSprite(Math.round(random(20,580)),-20,20,20)
 broccoliS.velocityY = 5
 broccoliS.addImage(broccoli)
 broccoliS.scale = 0.2
 vegG.add(broccoliS)
//making the carrot
carrotS = createSprite(Math.round(random(20,580)),-80,20,20)
carrotS.velocityY = 5
carrotS.addImage(carrot)
carrotS.scale = 0.2
vegG.add(carrotS)
//making the bell pepper
bellPepperS = createSprite(Math.round(random(20,580)),-50,20,20)
bellPepperS.addImage(bellPepper)
bellPepperS.scale  = 0.4
vegG.add(bellPepperS)
    }
}*/
function broccoliF(){
    if(frameCount%250==0){
        //making the broccoli
 broccoliS = createSprite(Math.round(random(20,580)),-20,20,20)
 broccoliS.velocityY = 5
 broccoliS.addImage(broccoli)
 broccoliS.scale = 0.2
 vegG.add(broccoliS)
 //broccoliS.debug = true
 broccoliS.setCollider("circle",0,0,30)
    }
 
}
function carrotF(){
    if(frameCount%200==0){
        //making the carrot
carrotS = createSprite(Math.round(random(20,580)),-80,20,20)
carrotS.velocityY = 5
carrotS.addImage(carrot)
carrotS.scale = 0.2
vegG.add(carrotS)
carrotS.setCollider("circle",0,0,30)
    }

}
function bellPepperF(){
    if(frameCount%300==0){
       //making the bell pepper
bellPepperS = createSprite(Math.round(random(20,580)),-50,20,20)
bellPepperS.addImage(bellPepper)
bellPepperS.velocityY = 5
bellPepperS.scale  = 0.4
vegG.add(bellPepperS) 
bellPepperS.setCollider("circle",0,0,30)
    }
}

function ear(){
if(frameCount%400==0){
//making the ears
earsS = createSprite(Math.round(random(20,580)),-100,20,20)
earsS.velocityY = 5
earsS.addImage(ears)
earsS.scale = 0.3
earGroup.add(earsS)
earsS.setCollider("circle",0,0,30)
}

}
