/* Version 0.1a
*    CHANGELOG 0.1a
* 1. Some draw methods added to the HTML document so users
* can change circle properties while the animation is
* stopped
* 2. FPS Controls added
* 3. Some bug fixes..
*/
var canvas = document.getElementById("CANVAS");
var ctx = canvas.getContext("2d");
var FPS = 20; // Frames per second, slower or faster animation.
function randColor () {
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);
    var opacity = Math.random();
    var color = "rgba(" + red + "," + green + "," + blue + "," + opacity + ")";
    /* RGB colors are strings and defined with "rgba"
     * Our color has also opacity
     * Opacity is good. (What an unnecessery comment, sorry)
     */
    return color;
}
var arcX = 250; // X position
var arcY = 200; //Y Position
var arcVX = 0; // Horizontal Speed
var arcVY = 0; // Vertical Speed
var arcAX = 0; // Horizontal Acceleration
var arcAY = 0; // Vertical Acceleration
var quantity = 15; // Amount of borders, play with this.
var radius = 10; // Radius of borders, enjoy
var bigRadius = quantity * radius;
var animating = true;
var isBouncing = false;
var isStroking = true;
var isFilling = true;
var start = new Date().getTime();
var time;
var draw = function(){
    /* Draw function draws circles to the screen
    * as its name suggests :) */
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(var i = radius * quantity; i > 0; i -= radius){
        ctx.beginPath();
        ctx.fillStyle = randColor(); // Filling with random color
        ctx.arc(arcX,arcY,i,0,2 * Math.PI); // Drawing arc
        if(isFilling){
            ctx.fill(); // Fill it
        }
        if(isStroking){
            ctx.stroke(); // stroke and done
        }
    }
};
var controls = {
    addCirc: function(){
        quantity += 1;
        bigRadius = quantity * radius;
        draw();
        this.updateStatus();
    },
    removeCirc: function(){
        quantity -= 1;
        bigRadius = quantity * radius;
        draw();
        this.updateStatus();
    },
    incRadius: function(){
        radius += 1;
        bigRadius = quantity * radius;
        draw();
        this.updateStatus();
    },
    decRadius: function(){
        radius -= 1;
        bigRadius = quantity * radius;
        draw();
        this.updateStatus();
    },
    animate: function(){
        animating = !animating;
    },
    bounce: function(){
        isBouncing = !isBouncing; //Toogle bounce boolean
        // Add random values for speed and acceleration
        arcVX = Math.floor(Math.random() * 200 - 100);
        arcVX = Math.floor(Math.random() * 200 - 100);
        arcAX = Math.floor(Math.random() * 200 - 100);
        arcAY = Math.floor(Math.random() * 200 - 100);
    },
    fill: function(){
        isFilling = !isFilling;
        draw();
    },
    stroke: function(){
        isStroking = !isStroking;
        draw();
    },
    incFPS: function(){
        FPS += 5;
        clearInterval(interval);
        interval = setInterval(init,1000 / FPS);
        this.updateStatus();
    },
    decFPS: function(){
        if(FPS - 5 !== 0){
            FPS -= 5;
        }
        clearInterval(interval);
        interval = setInterval(init,1000 / FPS);
        this.updateStatus();
    },
    moveUp: function(){
        arcY -= 5;
        draw();
    },
    moveDown: function(){
        arcY += 5;
        draw();
    },
    moveLeft: function(){
        arcX -= 5;
        draw();
    },
    moveRight: function(){
        arcX += 5;
        draw();
    },
    updateStatus: function(){
        document.getElementById("circCount").innerHTML = "Circles: " + quantity;
        document.getElementById("radius").innerHTML = "Radius: " + radius;
        document.getElementById("fpsgauge").innerHTML = "FPS: " + FPS;
    }
};
function init(){
    /* Inıt function initializes the script and plays it in FPS frames per
     * second.
     */
    time = new Date().getTime() - start;
    if(isFilling){
        document.getElementById("FILL").innerHTML = "Don't Fill";
    }else{
        document.getElementById("FILL").innerHTML = "Fill!";
    }
    if(isStroking){
        document.getElementById("STROKE").innerHTML = "Don't Stroke";
    }else{
        document.getElementById("STROKE").innerHTML = "Stroke!";
    }
    if(animating){
        if(isBouncing){
            document.getElementById("BOUNCE").innerHTML = "Stop Bouncing";
            arcVX += arcAX / FPS;
            arcVY += arcAY / FPS;
            arcX += arcVX / FPS;
            arcY += arcVY / FPS;
            //Collision Detection Starts Here
            if(arcX - bigRadius < 0){
               arcX = bigRadius;
               arcVX = -arcVX;
            }
            if(arcX + bigRadius > canvas.width){
                arcX = canvas.width - bigRadius;
                arcVX = -arcVX;
            }
            if(arcY - bigRadius < 0){
                arcY = bigRadius;
                arcVY = -arcAY;
            }
            if(arcY + bigRadius > canvas.height){
                arcY = canvas.height - bigRadius;
                arcVY = -arcVY;
            }
            //If you dont understand this code, try this course.
            //http://www.codecademy.com/courses/web-beginner-en-Hdmch
        }else{
            document.getElementById("BOUNCE").innerHTML = "Bounce!";
        }
        document.getElementById("ANIMATE").innerHTML = "■ Stop Animation";
        draw();
    }else{
        document.getElementById("ANIMATE").innerHTML = "► ANIMATE";
    }
}
var interval = setInterval(init,1000 / FPS);