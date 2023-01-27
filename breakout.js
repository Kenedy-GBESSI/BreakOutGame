const canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var ballR = 10, x = canvas.width/2 , y = (canvas.height - ballR)/2, dx = 3,dy = -3,pongW = 80,
pongH = 15, pongX = (canvas.width - ballR)/2 , pongY = canvas.height - 80, brickRow = 4, brickCol = 9,
brickOffsetLeft = 30, brickOffsetTop = 10 , brickX = 55 , brickY = 15, rightpressed =  false, leftpressed = false,score = 0,echec = 0;

var blicks = [];
for(let c = 0 ; c < brickCol ; c++){
    for(let r = 0 ; r < brickRow ; r++){
      blicks.push({
          x : c*brickX + (c+1)*brickOffsetLeft ,
          y : r*brickY +  (r+1)*brickOffsetTop ,
          status : 1
      })    
    }
}
function drawBall(){
    context.beginPath();
    context.arc(x,y,ballR,0,Math.PI*2);
    context.fillStyle = 'green';
    context.fill();
    context.closePath();
}
function drawPong(){
    context.beginPath();
    context.fillRect(pongX,pongY,pongW,pongH);
    context.fillStyle = 'green';
    context.fill();
    context.closePath();
}
function drawBricks(){
    context.beginPath();
    blicks.forEach(function(b){
        if(!b.status){return;}
        context.fillStyle = 'green';
        context.fillRect(b.x,b.y,brickX,brickY);
    })
    context.closePath();
}
function collisionDetection(){
    blicks.forEach(function(b){
        if(!b.status){return ;}
        var collisionOfX = x > b.x && x< b.x + brickX;
        var collisionOfY = y> b.y && y< b.y + brickY;
        if(collisionOfY && collisionOfX){
            dy = -dy;
            b.status = 0;
            score++;
        }
    })   
}

function update(){
    document.getElementsByTagName('strong')[1].innerHTML = score;
    document.getElementsByTagName('strong')[0].innerHTML = echec;
    context.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    collisionDetection();
    drawBricks();
    drawPong();
    if(hitPong()){
        /*
        let collide = x - (pongX + pongW/2);
        collide = collide/(pongW/2);
        let angle = collide * (Math.PI/3);
        x = dx * Math.sin(angle)*x;
        y = -dy *Math.cos(angle)*y;  */
        dy = -dy;
    }
    if(hitTop()){
        dy = -dy;
    }
    if(hitSide()){
        dx = -dx;
    }
    if(gameOver()){
        resetBall();
         if(echec === 3){
            alert("Game Over");
            document.location.reload();
         } 
        else{
            ++echec;
        }
    }        
    function hitPong(){
        var hitX =  x > pongX && x< pongX + pongW;
        var hitY = y> pongY && y < pongY + pongH;
        return hitX && hitY ;
    }
    function hitTop(){
        return y + dy < ballR;
    }
    function hitSide(){
        return x + dx < ballR || x + dx > canvas.width - ballR;
    }
    function gameOver(){
        return y + ballR > canvas.height;
    }
    function pongRight(e){
        return e.keyCode === 39;
    }
    function pongLeft(e){
       return e.keyCode === 37;
    }
    function keydow(e){
        leftpressed = pongLeft(e);
        rightpressed = pongRight(e);
    }
    function keyup(e){
        rightpressed = pongRight(e) ? false : rightpressed;
        leftpressed = pongLeft(e) ? false : leftpressed;
    }
    function resetBall(){
        x = canvas.width/2;
        y = pongY - ballR;
        dx = 3*(Math.random()*2 - 1);
        dy = -dx;
    }
    document.addEventListener('keydown',keydow,false);
    document.addEventListener('keyup',keyup,false);
    var maxX = canvas.width - pongW , min = 0, value = rightpressed ? 7 : leftpressed ? -7 : 0;
    pongX = pongX + value;
    pongX = Math.min(maxX,pongX);
    pongX = Math.max(min,pongX);
    x += dx;
    y += dy;
    console.log(rightpressed,leftpressed);
   
}
setInterval(update,20);

