class PacMan{
    constructor(x,y){
        this.defaultX = x;
         this.x = this.defaultX;        
        this.defaultY = y;
         this.y = this.defaultY;

        this.direction = undefined;
        this.nextDirection = undefined;

        this.animationFrame = 0;
        this.animationFrameChangeInterval = 45;
        this.animationFrameChange = 0;
        this.deathAnimationFrame = 0;

        this.eating = false;
        this.eatingCheckX = undefined;
        this.eatingCheckY = undefined;

        this.fright = 0;
        this.ghostEatPoints = 200;
        this.ghostsEaten = 0;

        this.isAlive = true;
        this.lives = 3;
    }
    Draw(){
        if(!this.isAlive) this.deathAnimationFrame = Math.floor(audio.death.currentTime/audio.death.duration*11);

        let x = this.x;
        let y = this.y;
        if(this.direction !== undefined || !this.isAlive){
            let angle = 0;
            context.translate(this.x*canvasTileSize,this.y*canvasTileSize);
            if(this.direction == "U"){
                angle = 270;
                x = 0;
                y = 0;
            }
            else if(this.direction == "D"){
                angle = 90;
                x = 1;
                y = -1;
            }
            else if(this.direction == "R"){
                angle = 0;
                x = 1;
                y = 0;
            }
            else if(this.direction == "L"){
                angle = 180;
                x = 0;
                y = -1;
            }
            context.rotate(Math.PI/180*angle);
            if(!this.isAlive){
                let animationFrame = this.deathAnimationFrame
                if(animationFrame < 10) animationFrame = "0"+animationFrame;
                DrawTile("D"+animationFrame+"0",(x-.5)*canvasTileSize,(y-.5)*canvasTileSize,canvasTileSize,canvasTileSize);
                DrawTile("D"+animationFrame+"1",(x+.5)*canvasTileSize,(y-.5)*canvasTileSize,canvasTileSize,canvasTileSize);
                DrawTile("D"+animationFrame+"2",(x-.5)*canvasTileSize,(y+.5)*canvasTileSize,canvasTileSize,canvasTileSize);
                DrawTile("D"+animationFrame+"3",(x+.5)*canvasTileSize,(y+.5)*canvasTileSize,canvasTileSize,canvasTileSize); 
            }
            else if(this.direction !== undefined){
                DrawTile("PM"+this.animationFrame+"0",(x-.5)*canvasTileSize,(y-.5)*canvasTileSize,canvasTileSize,canvasTileSize);
                DrawTile("PM"+this.animationFrame+"1",(x+.5)*canvasTileSize,(y-.5)*canvasTileSize,canvasTileSize,canvasTileSize);
                DrawTile("PM"+this.animationFrame+"2",(x-.5)*canvasTileSize,(y+.5)*canvasTileSize,canvasTileSize,canvasTileSize);
                DrawTile("PM"+this.animationFrame+"3",(x+.5)*canvasTileSize,(y+.5)*canvasTileSize,canvasTileSize,canvasTileSize);                
            }
        }
        else{
            DrawTile("PM00",(x+.5)*canvasTileSize,(y-.5)*canvasTileSize,canvasTileSize,canvasTileSize);
            DrawTile("PM01",(x+1.5)*canvasTileSize,(y-.5)*canvasTileSize,canvasTileSize,canvasTileSize);
            DrawTile("PM02",(x+.5)*canvasTileSize,(y+.5)*canvasTileSize,canvasTileSize,canvasTileSize);
            DrawTile("PM03",(x+1.5)*canvasTileSize,(y+.5)*canvasTileSize,canvasTileSize,canvasTileSize);
        }
        context.resetTransform();
    }
    Move(){
        //#region speed calculating
        let speed = game.deltaTime*11;
        if(this.eating){
            if(this.fright > 0) speed *= LevelVariables[game.level-1].frightPacManDotsSpeed;
            else                speed *= LevelVariables[game.level-1].pacManDotsSpeed;
        }
        else{
            if(this.fright > 0) speed *= LevelVariables[game.level-1].frightPacManSpeed;
            else                speed *= LevelVariables[game.level-1].pacManSpeed;
        }
        //#endregion
        if(!isFacingObstacle(Math.round(this.x),Math.round(this.y),this.direction)){
            //#region changing animation frame
            this.animationFrameChange -= game.deltaTime*1000;
            if(this.animationFrameChange <= 0){
                this.animationFrameChange = this.animationFrameChangeInterval;
                this.animationFrame--;
            }
            if(this.animationFrame < 0) this.animationFrame = 2;
            //#endregion

            if(this.direction === "U"){
                this.y -= speed;
                this.x = Math.round(this.x);
            }
            else if(this.direction === "D"){
                this.y += speed;
                this.x = Math.round(this.x);
            }
            else if(this.direction === "R"){
                this.x += speed;
                this.y = Math.round(this.y);
            }
            else if(this.direction === "L"){
                this.x -= speed;
                this.y = Math.round(this.y);
            }
        }
        else{
            if(this.direction != undefined){
                this.x = Math.round(this.x);
                this.y = Math.round(this.y);
                this.eating = false;
            }
        }

        if(this.x < -1){
            this.x = 28;
        }
        else if(this.x > 28){
            this.x = -1;
        }

        this.ChangeDirection();
        this.Eat();
    }
    ChangeDirection(){
        if(!isFacingObstacle(Math.round(this.x),Math.round(this.y),this.nextDirection)){
            if(this.nextDirection != undefined){
                let lastDirection = this.direction
                this.direction = this.nextDirection;
                if(isFacingObstacle(Math.round(this.x),Math.round(this.y),this.direction)){
                    this.direction = lastDirection;
                }
            }
            if(isFacingObstacle(Math.round(this.x),Math.round(this.y),this.direction)){
                this.direction = undefined;
                this.x = Math.round(this.x);
                this.y = Math.round(this.y);
            } 
        }
    }
    Eat(){
        this.fright -= 1000*game.deltaTime;

        let standingTile = game.map[Math.round(this.y)][Math.round(this.x)]
        if(standingTile > 0){
            this.eatingCheckX = Math.round(this.x);
            this.eatingCheckY = Math.round(this.y);
            this.eating = true;

            if(standingTile === 50){
                game.ChangeGhostModes("Scared");
                this.fright = LevelVariables[game.level-1].frightTime;
                this.ghostEatPoints = 200;
                this.ghostsEaten = 0;
            }
            game.score += standingTile;
            game.map[Math.round(this.y)][Math.round(this.x)] = 0;
            if(game.score > localStorage.getItem("highScore")) localStorage.setItem("highScore", game.score);
            game.UpdateScore();
        }
        else if(Math.round(this.x) !== this.eatingCheckX || Math.round(this.y) !== this.eatingCheckY){
            this.eating = false;
        }
        if(this.eating){
            if(audio.chomp.paused === true) audio.chomp.currentTime = 0;
            audio.chomp.play();
        }
        else{
            audio.chomp.pause();
        }
    }
    Kill(){
        audio.chomp.pause();
        this.lives--;
        if(this.direction === undefined) this.direction = "R";
        audio.death.play();
        this.isAlive = false;
        game.UpdateLives();
    }
    Restart(){
        this.x = this.defaultX;
        this.y = this.defaultY;
        this.direction = undefined;
        this.animationFrame = 0;
        this.deathAnimationFrame = 0;
        this.fright = 0;
        this.isAlive = true;
    }
}