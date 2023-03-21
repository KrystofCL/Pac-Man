class Ghost{
    constructor(color,x,y,direction){
        this.color = color;
        this.mode = undefined;
        
        this.defaultX = x;
         this.x = this.defaultX;   
         this.checkBlockX = undefined;     
        this.defaultY = y;
         this.y = this.defaultY;
         this.checkBlockY = undefined;
        
        this.target = undefined;

        this.defaultDirection = direction
         this.direction = this.defaultDirection;
        this.nextDirection = undefined;
        this.lastDirection = undefined;

        this.animationFrame = 0;
        this.animationFrameChangeInterval = 200;
        this.animationFrameChange = 0;

        this.isAlive = true;
        this.isActive = false;
    }
    Draw(){
        let color = this.color;

        //#region Changing animation frame
        this.animationFrameChange -= game.deltaTime*1000;
        if(this.animationFrameChange <= 0&&this.isAlive){
            this.animationFrameChange = this.animationFrameChangeInterval;
            this.animationFrame++;
        }
        if(this.animationFrame > 1||!this.isAlive) this.animationFrame = 0;
        //#endregion
        
        if(this.mode !== "Scared" || !this.isAlive){
            if(!this.isAlive) color = "D";

            DrawTile(color+this.direction+this.animationFrame+"0",(this.x+0.5)*canvasTileSize,(this.y-.5)*canvasTileSize,canvasTileSize,canvasTileSize);
            DrawTile(color+this.direction+this.animationFrame+"1",(this.x+1.5)*canvasTileSize,(this.y-.5)*canvasTileSize,canvasTileSize,canvasTileSize);
            DrawTile(color+this.direction+this.animationFrame+"2",(this.x+0.5)*canvasTileSize,(this.y+.5)*canvasTileSize,canvasTileSize,canvasTileSize);
            DrawTile(color+this.direction+this.animationFrame+"3",(this.x+1.5)*canvasTileSize,(this.y+.5)*canvasTileSize,canvasTileSize,canvasTileSize);
        }
        else{
            color = "b";
            if(game.pacMan.fright < LevelVariables[game.level-1].flashesBeforeExpiration*400&&Math.round(game.pacMan.fright) % 400 < 200){
                color = "w";
            }

            DrawTile("S"+color+this.animationFrame+"0",(this.x+0.5)*canvasTileSize,(this.y-.5)*canvasTileSize,canvasTileSize,canvasTileSize);
            DrawTile("S"+color+this.animationFrame+"1",(this.x+1.5)*canvasTileSize,(this.y-.5)*canvasTileSize,canvasTileSize,canvasTileSize);
            DrawTile("S"+color+this.animationFrame+"2",(this.x+0.5)*canvasTileSize,(this.y+.5)*canvasTileSize,canvasTileSize,canvasTileSize);
            DrawTile("S"+color+this.animationFrame+"3",(this.x+1.5)*canvasTileSize,(this.y+.5)*canvasTileSize,canvasTileSize,canvasTileSize);
        }
    }
    Move(){ 
        //#region speed calculating
        let speed = 11*game.deltaTime;
        if(this.isAlive){
            if(this.mode === "Scared"){
                speed *= LevelVariables[game.level-1].frightGhostSpeed;
            }
            if(this.color === "R" && game.DotsRemaining() <= LevelVariables[game.level-1].elroy1DotsLeft){
                if  (game.DotsRemaining() <= LevelVariables[game.level-1].elroy1DotsLeft/2) speed *= LevelVariables[game.level-1].elroy2Speed;
                else                                                                        speed *= LevelVariables[game.level-1].elroy1Speed;
            }
            else speed *= LevelVariables[game.level-1].ghostSpeed;
        }
        else speed *= 1;
        //#endregion
        if(this.isActive){
            this.UpdateTarget();
            this.ChangeDirection();

            if(!isFacingObstacle(Math.round(this.x),Math.round(this.y),this.direction)){
                if      (this.direction === "U"){
                    this.y -= speed;
                    this.x = Math.round(this.x);
                }
                else if (this.direction === "D"){
                    this.y += speed;
                    this.x = Math.round(this.x);
                }
                else if (this.direction === "R"){
                    this.x += speed;
                    this.y = Math.round(this.y);
                }
                else if (this.direction === "L"){
                    this.x -= speed;
                    this.y = Math.round(this.y);
                }
            }
            else{
                this.x = Math.round(this.x);
                this.y = Math.round(this.y);
            }

            //Tunnel movement
            if      (this.x < -1) this.x = 28;
            else if (this.x > 28) this.x = -1;
        }
        else{
            if(!this.isActive){
                if(!this.isAlive){
                    if(this.x !== 13.5) this.x = 13.5;
                    this.direction = "D";
                    this.y += speed;
                    if(this.y > 17){
                        this.y =17;
                        this.isAlive = true;
                        this.mode = game.mode;
                    }
                }
                else{
                    if(this.x === 13.5){
                        this.direction = "U";
                        this.y -= speed;
                        if(this.y <= 14){
                            this.y = 14;
                            this.lastDirection = undefined;
                            this.checkBlockX = undefined;
                            this.checkBlockY = undefined;
                            this.isActive = true;
                        }
                    }
                    else{
                        if((this.color === "C" && game.time < 5000)||(this.color === "O" && game.time < 15000)){
                            speed /= 2;
                            if     (this.direction === "U"){
                                this.y -= speed;
                                if     (this.y < 16.5){
                                    this.y = 16.5;
                                    this.direction = "D";
                                }
                                
                            }
                            else if(this.direction === "D"){
                                this.y += speed;
                                if(this.y > 17.5){
                                    this.y = 17.5;
                                    this.direction = "U";
                                }
                            }
                        }
                        else if(this.x < 13.5){
                            this.direction = "R";
                            this.x += speed;
                            if(this.x > 13.5)    this.x = 13.5;
                        }
                        else{
                            this.direction = "L";
                            this.x -= speed;
                            if(this.x < 13.5)    this.x = 13.5;
                        }
                    }
                }
            }
        }

        if(!this.isAlive&&this.x > 13&&this.x<14&&this.y === 14) this.isActive = false;
    }
    ChangeDirection(){
        this.nextDirection = this.GetNextDirection();
        if(!isFacingObstacle(Math.round(this.x),Math.round(this.y),this.nextDirection)&&this.nextDirection != undefined){
            this.lastDirection = this.direction;
            this.direction = this.nextDirection;
        }
        this.checkBlockX = Math.round(this.x);
        this.checkBlockY = Math.round(this.y);
    }
    UpdateTarget(){
        if(this.isAlive){
            if(this.color === "R"){
                if      (this.mode === "Chase") this.target = {x: game.pacMan.x,y: game.pacMan.y};
                else                            this.target = {x: 25,y: 0};
            }
            else if(this.color === "P") {
                if      (this.mode === "Chase"){
                    if      (game.pacMan.direction === "U") this.target = {x: game.pacMan.x, y:game.pacMan.y-4};
                    else if (game.pacMan.direction === "D") this.target = {x: game.pacMan.x, y:game.pacMan.y+4};
                    else if (game.pacMan.direction === "R") this.target = {x: game.pacMan.x+4, y:game.pacMan.y};
                    else if (game.pacMan.direction === "L") this.target = {x: game.pacMan.x-4, y:game.pacMan.y};
                    else                                    this.target = {x: game.pacMan.x,   y:game.pacMan.y};
                }
                else                                        this.target = {x: 2,y: 0};
            }
            else if(this.color === "C"){
                if      (this.mode === "Chase"){
                    let intermediaX = game.pacMan.x;
                    let intermediaY = game.pacMan.y;

                    if      (game.pacMan.direction === "U") intermediaY+=2;
                    else if (game.pacMan.direction === "D") intermediaY-=2;
                    else if (game.pacMan.direction === "R") intermediaX+=2;
                    else if (game.pacMan.direction === "L") intermediaX-=2;

                    this.target = {x: intermediaX-(game.redGhost.x-intermediaX), y: intermediaY-(game.redGhost.y-intermediaY)}
                }
                else    this.target = {x: 27,y: 35};
            }
            else if(this.color === "O"){
                if(this.mode === "Chase"&&this.CalculateDistance(this.x,this.y,game.pacMan.x,game.pacMan.y)>64) this.target = {x: game.pacMan.x,y: game.pacMan.y};
                else                                                                                            this.target = {x: 0,y: 35};
            }
        }
        else this.target = {x: 13.5,y: 14};
    }
    GetNextDirection(){
        if(Math.round(this.x) !== this.checkBlockX || Math.round(this.y) !== this.checkBlockY){
            this.checkBlockX = Math.round(this.x);
            this.checkBlockY = Math.round(this.y);
            let x = Math.round(this.x);
            let y = Math.round(this.y);

            let availableDirections = [];

            let upMoveDistance    = 9000000;
            let downMoveDistance  = 9000000;
            let rightMoveDistance = 9000000;
            let leftMoveDistance  = 9000000;

            if(!isFacingObstacle(x,y,"U")&&this.direction !== "D"&&"D" !== this.lastDirection){
                upMoveDistance    = this.CalculateDistance(x,y-1,this.target.x,this.target.y,false);
                availableDirections.push("U");
            }
            if(!isFacingObstacle(x,y,"D")&&this.direction !== "U"&&"U" !== this.lastDirection){
                downMoveDistance  = this.CalculateDistance(x,y+1,this.target.x,this.target.y,false);
                availableDirections.push("D");
            }
            if(!isFacingObstacle(x,y,"R")&&this.direction !== "L"&&"L" !== this.lastDirection){
                rightMoveDistance = this.CalculateDistance(x+1,y,this.target.x,this.target.y,false);
                availableDirections.push("R");
            }
            if(!isFacingObstacle(x,y,"L")&&this.direction !== "R"&&"R" !== this.lastDirection){
                leftMoveDistance  = this.CalculateDistance(x-1,y,this.target.x,this.target.y,false);  
                availableDirections.push("L");
            }

            if(this.mode !== "Scared"||!this.isAlive){
                if      (upMoveDistance<=downMoveDistance&&upMoveDistance<=rightMoveDistance&&upMoveDistance<=leftMoveDistance)         return "U"
                else if (leftMoveDistance<=downMoveDistance&&leftMoveDistance<=rightMoveDistance&&leftMoveDistance<=rightMoveDistance)  return "L"
                else if (downMoveDistance<=upMoveDistance&&downMoveDistance<=rightMoveDistance&&downMoveDistance<=leftMoveDistance)     return "D"
                else                                                                                                                    return "R"
            }
            else{
                return availableDirections[Math.round(Math.random()*(availableDirections.length-1))];
            }
        }
    }
    CalculateDistance(x1,y1,x2,y2,accurate){
        let x = Math.abs(x1-x2);
        let y = Math.abs(y1-y2);
        if(accurate) return Math.sqrt(x*x+y*y)
        else         return x*x+y*y
    }
    Restart(){
        this.x = this.defaultX;
        this.y = this.defaultY;
        this.direction = this.defaultDirection;
        this.isAlive = true;
        this.isActive = false;
        this.mode = "Chase";
    }
    TurnAround(){
        if(this.isAlive){
                    this.lastDirection = this.direction;

            if     (this.direction === "U") this.direction = "D";
            else if(this.direction === "D") this.direction = "U";
            else if(this.direction === "R") this.direction = "L";
            else if(this.direction === "L") this.direction = "R";

            this.checkBlockX = undefined;
            this.checkBlockY = undefined;
        }
    }
}