var cube, edges;
var obstacle1, obstacle2;
var obstacleGroup, goalGroup;
var gameState = "playing";
var score = 0;
function setup() {
  createCanvas(800, 600);
  obstacleGroup = new Group();
  goalGroup = new Group();
  cube = createSprite(800, 600, 50, 50);
  cube.shapeColor = "white";
  obstacle1 = createSprite(400, 300, 20, 400);
  obstacle2 = createSprite(400, 300, 550, 20);
  obstacle1.shapeColor = "red";
  obstacle2.shapeColor = "red";
  obstacleGroup.add(obstacle1);
  obstacleGroup.add(obstacle2);
  edges = createEdgeSprites();
  spawnGoal();
}

function draw() {
  background(50);  
  text("Treasures Collected: " + score, 600, 50)
  if(gameState === "playing"){
  cube.velocityY = cube.velocityY * 0.93;
  cube.velocityX = cube.velocityX * 0.93;
  cube.collide(edges[0]);
  cube.collide(edges[1]);
  cube.collide(edges[2]);
  cube.collide(edges[3]);

  if(keyWentDown("SPACE")){

      throwCube(cube);

  }

  if(keyWentDown("R")){

    mouseX = 0;
    mouseY = 0;

  }

  if(cube.isTouching(obstacleGroup)){

    gameState = "end";

  }

  if(cube.isTouching(goalGroup)){

    score = score + 1;
    goalGroup.destroyEach();
    spawnGoal();

  }

  drawSprites();
  } else {

    text("You Died. Press R to restart.", 300, 200);
    if(keyWentDown("R")){

        cube.x = 800;
        cube.y = 600;
        cube.setVelocity(0, 0);
        score = 0;
        goalGroup.destroyEach();
        spawnGoal();
        gameState = "playing";

    }

  }
}

function isTouchingAlgorithm(sprite1, sprite2){

  if((Math.abs(sprite1.x - sprite2.x) - 0.5 * (sprite1.width + sprite2.width) <= 0)
  &&(Math.abs(sprite1.y - sprite2.y) - 0.5 * (sprite1.height + sprite2.height) <= 0)){

      return true;

  }

}

function bounceOffAlgorithm(sprite1, sprite2){
  if(isTouchingAlgorithm(sprite1, sprite2)){

      sprite1.velocityX = sprite1.velocityX*-1;
      sprite1.velocityY = sprite1.velocityY*-1;
      sprite2.velocityX = sprite2.velocityX*-1;
      sprite2.velocityY = sprite2.velocityY*-1;

  }

}

function throwCube(sprite){

    sprite.velocityX = (World.mouseX - sprite.x)/16;
    sprite.velocityY = (World.mouseY - sprite.y)/16;    

}

function spawnGoal(){

    i = random(0, 800)
    while(i > 350 && i < 450){

      i = random(0, 800);

    }
    j = random(0, 600)
    while(j > 250 && j < 350){

      j = random(0, 600);

    }

    goal = createSprite(i, j, 20, 20);
    goalGroup.add(goal);
    goal.shapeColor = "yellow";
}