//Collision v. 01
//This release adds:
//1.
//
//BUGS:
//1.
//
//TO DO:
//1. 
//
//By Marcelo Silva

//canvas definition
var document; var window; var init;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//get canvas dimensions
var canvasWidth = canvas.width;
var canvasHigth = canvas.height;
//font definition
ctx.font = '20px Arial';
//scene speed setup
var wSpeed = 1;
//keyboard setup
var pressingDown = false;
var pressingUp = false;
var pressingLeft = false;
var pressingRight = false;
var pressingDownE = false;
var pressingUpE = false;
var pressingLeftE = false;
var pressingRightE = false;
document.onkeydown = function (event) {
    if (event.keyCode === 40) { pressingDown = true; }
    else if (event.keyCode === 37) { pressingLeft = true; }
    else if (event.keyCode === 39) { pressingRight = true; }
    else if (event.keyCode === 38) { pressingUp = true; }
    if (event.keyCode === 83) { pressingDownE = true; }
    else if (event.keyCode === 65) { pressingLeftE = true; }
    else if (event.keyCode === 68) { pressingRightE = true; }
    else if (event.keyCode === 87) { pressingUpE = true; }
};
document.onkeyup = function (event) {
    if (event.keyCode === 40) { pressingDown = false; }
    else if (event.keyCode === 37) { pressingLeft = false; }
    else if (event.keyCode === 39) { pressingRight = false; }
    else if (event.keyCode === 38) { pressingUp = false; }
    if (event.keyCode === 83) { pressingDownE = false; }
    else if (event.keyCode === 65) { pressingLeftE = false; }
    else if (event.keyCode === 68) { pressingRightE = false; }
    else if (event.keyCode === 87) { pressingUpE = false; }
};
//collision functions
function collisionFromBelow(actor1, actor2) {//actor1 hits actor2 from below
    var vx = actor1.xpos - actor2.xpos;
    var vy = actor1.ypos - actor2.ypos;
    return (vx > -actor1.width && vx < actor2.width && vy > actor2.height - 5 && vy < actor2.height);
}
function collisionFromUp(actor1, actor2) {//actor1 hits actor2 from above
    var vx = actor1.xpos - actor2.xpos;
    var vy = actor1.ypos - actor2.ypos;
    ctx.fillStyle = 'black';
    ctx.fillText('vx = ' + vx, 50, 70);
    ctx.fillText('vy = ' + vy, 50, 90);
    return (vx > -actor1.width && vx < actor2.width && vy > -actor1.height && vy < -actor1.height + 5);
}
function collisionFromLeft(actor1, actor2) {//actor2 hits actor1 from left
    var vx = actor1.xpos - actor2.xpos;
    var vy = actor1.ypos - actor2.ypos;
    return (vx > -actor1.width && vx < -actor1.width + 5 && vy > -actor1.height && vy < actor2.height);

}
function collisionFromRight(actor1, actor2) {//actor2 hits actor1 from right
    var vx = actor1.xpos - actor2.xpos;
    var vy = actor1.ypos - actor2.ypos;
    return (vx > actor2.width - 5 && vx < actor2.width && vy > -actor1.height && vy < actor2.height);

}
//clashing functions
function clashingFromBelow(actor1, actor2) {//actor1 clashes with actor2 from below
    var vx = actor1.xpos - actor2.xpos;
    var vy = actor1.ypos - actor2.ypos;
    return (vx > -actor1.width && vx < actor2.width && vy > actor2.height - 5 && vy < actor2.height - 1);
}
function clashingFromUp(actor1, actor2) {//actor1 clashes with actor2 from above
    var vx = actor1.xpos - actor2.xpos;
    var vy = actor1.ypos - actor2.ypos;
    return (vx > -actor1.width && vx < actor2.width && vy > -actor1.height + 1 && vy < -actor1.height + 5);
}
function clashingFromLeft(actor1, actor2) {//actor2 clashes with actor1 from left
    var vx = actor1.xpos - actor2.xpos;
    var vy = actor1.ypos - actor2.ypos;
    return (vx > -actor1.width + 1 && vx < -actor1.width + 5 && vy > -actor1.height && vy < actor2.height);

}
function clashingFromRight(actor1, actor2) {//actor2 clashes with actor1 from right
    var vx = actor1.xpos - actor2.xpos;
    var vy = actor1.ypos - actor2.ypos;
    return (vx > actor2.width - 5 && vx < actor2.width - 1 && vy > -actor1.height && vy < actor2.height);

}
//actor object
function Actor(type, color, width, height, speed, xpos, ypos) {
    this.type = type;
    this.color = color;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.xpos = xpos;
    this.ypos = ypos;

    //to not get player off canvas
    this.testBounds = function () {
        if (this.xpos > canvasWidth - this.width) {
        this.xpos = canvasWidth - this.width;
        } else if (this.xpos < 0) { this.xpos = 0; }
        if (this.ypos > canvasHigth - this.height) {
        this.ypos = canvasHigth - this.height;
        } else if (this.ypos < 0) { this.ypos = 0; }

        //to player not to get into enemy
        this.testClash = function () {
            //clashing tests
            var isClashingFromBelow = clashingFromBelow(player, enemy);
            var isClashingFromUp = clashingFromUp(player, enemy);
            var isClashingFromLeft = clashingFromLeft(player, enemy);
            var isClashingFromRight = clashingFromRight(player, enemy);
            if (isClashingFromBelow) { this.ypos += 1; }
            else if (isClashingFromUp) { this.ypos -= 1; }
            else if (isClashingFromLeft) { this.xpos -= 1; }
            else if (isClashingFromRight) { this.xpos += 1; }
        };
    };

    //enemy position
    if (type == 'enemy') {//enemy moves when hit by player
        this.position = function () {
            //collision tests
            var isCollindingFromBelow = collisionFromBelow(player, enemy);
            var isCollindingFromUp = collisionFromUp(player, enemy);
            var isCollindingFromLeft = collisionFromLeft(player, enemy);
            var isCollindingFromRight = collisionFromRight(player, enemy);
            if (isCollindingFromBelow) { this.ypos -= 2; }
            else if (isCollindingFromUp) { this.ypos += 2; }
            else if (isCollindingFromLeft) { this.xpos += 2; }
            else if (isCollindingFromRight) { this.xpos -= 2; }
            //moving the enemy
            if (pressingDownE) { this.ypos += this.speed * wSpeed; }//arrow key s
            if (pressingUpE) { this.ypos -= this.speed * wSpeed; }//arrow key w
            if (pressingRightE) { this.xpos += this.speed * wSpeed; }//arrow key d
            if (pressingLeftE) { this.xpos -= this.speed * wSpeed; }//arrow key a
            this.testBounds();
        };
    }
    //player position
    if (type == 'player') {//player controlled on the keyboard
        this.position = function () {
            //collision tests
            var isCollindingFromBelow = collisionFromBelow(player, enemy);
            var isCollindingFromUp = collisionFromUp(player, enemy);
            var isCollindingFromLeft = collisionFromLeft(player, enemy);
            var isCollindingFromRight = collisionFromRight(player, enemy);
            if (isCollindingFromBelow) { this.ypos += 2; }
            else if (isCollindingFromUp) { this.ypos -= 2; }
            else if (isCollindingFromLeft) { this.xpos -= 2; }
            else if (isCollindingFromRight) { this.xpos += 2; }
            //player movement
            if (pressingDown) { this.ypos += this.speed * wSpeed; }//arrow key down
            if (pressingUp) { this.ypos -= this.speed * wSpeed; }//arrow key up
            if (pressingRight) { this.xpos += this.speed * wSpeed; }//arrow key right
            if (pressingLeft) { this.xpos -= this.speed * wSpeed; }//arrow key left
            this.testBounds();
            this.testClash();

        };
    }



    this.print = function () {
        ctx.fillStyle = this.color;//defines the Actor color
        ctx.fillRect(this.xpos, this.ypos, width, height);//draw the actor
    };

}

//player position function

//clear canvas function
var clearCanvas = function () {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasWidth, canvasHigth);
};
//main loop definition
function main() {
    init = window.requestAnimationFrame(main);
    // Whatever your main loop needs to do below    
    clearCanvas();
    //calculate player position
    player.position();
    //print player
    player.print();
    //is colliding?
    //calculate enemy position
    enemy.position();
    //print enemy
    enemy.print();
}

//create player
var player = new Actor('player', 'green', 50, 50, 1, 300, 469);
//create enemy
var enemy = new Actor('enemy', 'red', 70, 70, 1, canvasWidth / 2, canvasHigth / 2);

//main call
main();