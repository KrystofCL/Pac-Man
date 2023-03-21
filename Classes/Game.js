class Game{
    constructor(){
        this.score = 0;
        this.frameRate = 60;
        this.deltaTime = 0;
         this.lastTime = performance.now();
        this.mode = "Scatter"; //"Scatter" or "Chase" game starts with opposite of chosen mode
        this.time = undefined;
        this.started = false;
        this.level = 1;
        this.map = undefined;
         this.resetMap = false;
         this.ResetMap();
        this.pause = false;

        this.pacMan      = new PacMan(13.5,26);
        this.redGhost    = new Ghost("R",13.5,14,"U");
        this.pinkGhost   = new Ghost("P",13.5,17,"D");
        this.cyanGhost   = new Ghost("C",11.5,17,"U");
        this.orangeGhost = new Ghost("O",15.5,17,"U");

        this.fruitCollected = false;
        this.fruitDespawnIn = 0;

        this._1upChangeInterval = 500;
        this._1upChange = 0;

        this.powerPalletBlinkInterval = 500;
        this.powerPalletBlink         = 0;

        this.phase = 0;
        this.phaseChange = 0;

        this.UpdateLives();
        this.UpdateScore();

        this.fruitsCollected = []; //Stores types of fruits collected
    }
    Loop(){
        //#region calculating delta time
        this.deltaTime = (performance.now()-this.lastTime)/1000;
        this.lastTime = performance.now();
        //#endregion

        //#region Blinking animations
        this._1upChange -= this.deltaTime*1000;
        if(this._1upChange <= 0){
            this._1upChange = this._1upChangeInterval;

            if(this.map[0][3] !== "w1") this.MapText(3,0,"1UP","w");
            else                        this.MapText(3,0,"   ","w");
        }
        this.powerPalletBlink += this.deltaTime*1000;
        if(this.powerPalletBlink > this.powerPalletBlinkInterval) this.powerPalletBlink = -this.powerPalletBlinkInterval;
        //#endregion

        if(this.level > 19) this.level = 19;
        if(true){
            if(this.phaseChange !== undefined && this.time > 0){
                this.phaseChange -= this.deltaTime;
                if(this.phaseChange <= 0){
                    this.phase++;
                    this.phaseChange = ModeTimes[this.phase];
                    if(this.mode === "Scatter") this.mode = "Chase";
                    else                        this.mode = "Scatter";
                }
            }

            //TODO: Put in function
            if(!isNaN(this.time) && this.pacMan.isAlive === true){
                this.time += 1000*this.deltaTime;
                this.fruitDespawnIn -= this.deltaTime;
            }
            this.UpdateScreen();

            if(this.time >= 0 && !this.pause){
                if(this.resetMap){
                    this.resetMap = false;
                    this.ResetMap();
                     this.UpdateScore();
                     this.UpdateLives();
                     this.UpdateEatenFruit();
                    this.Restart();
                }
                else if(this.DotsRemaining() === 0){
                    //TODO: Add board cleared sound
                    this.level++;
                    this.fruitCollected = false;
                    this.time = -2000;
                    this.resetMap = true;
                }
                if(!this.fruitCollected && (this.DotsRemaining() === 122 || this.DotsRemaining() === 61) && this.fruitDespawnIn <= 0) this.fruitDespawnIn = 8;
                if(this.pacMan.lives < 0) this.Reset()
                else{
                    this.MapText(9,20,"          ") //Hides text under ghost house

                    this.ChangeGhostModes(this.mode);

                    if(this.pacMan.isAlive) this.pacMan.Move();
                    this.redGhost.Move();
                    this.cyanGhost.Move();
                    this.pinkGhost.Move();
                    this.orangeGhost.Move(); 
                }
            }
            this.CheckGhostCollision();
            if(!this.fruitCollected && this.fruitDespawnIn > 0 && this.AreColliding(this.pacMan,{x:13.5,y:20})){
                audio.eatFruit.play();

                if(!this.fruitsCollected.includes(LevelVariables[this.level-1].fruitType)) this.fruitsCollected.push(LevelVariables[this.level-1].fruitType);
                this.UpdateEatenFruit();

                this.score += FruitScores[LevelVariables[this.level-1].fruitType];
                this.UpdateScore();
                this.fruitCollected = true;
                this.fruitDespawnIn = 3;
            }

            if(this.started === false)  this.Start();    
        }
    }
    UpdateScreen(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        this.DrawMap(); //TODO: rerender map only after eating points
        if(this.fruitDespawnIn > 0) this.DrawFruit();
        if(this.pause === false){
            if(this.pacMan.isAlive&&!this.resetMap){
                this.redGhost.Draw();
                this.pinkGhost.Draw();
                this.cyanGhost.Draw();
                this.orangeGhost.Draw(); 
            }
            this.pacMan.Draw();
        }

        context.closePath();
    }
    DrawMap(){
        let x = 0;
        let y = 0;
        while(y<36){
            if(this.map[y][x] !== 50 || this.powerPalletBlink > 0) DrawTile(this.map[y][x++],x*canvasTileSize,y*canvasTileSize,canvasTileSize,canvasTileSize);
            else x++;
            if(x>28){
                x = 0;
                y++;
            }
        }   
    }
    UpdateScore(){
        let score = this.score;
        let x = 0;
        for(let i = 0; i <= 1; i++){
            let j = 0;

            if(i == 0)  x += 7-String(this.score).length;
            else        x += 7-localStorage.getItem("highScore").length
            
            for(;j<=7;j++){
                this.map[1][x++] = "w"+String(score)[j];
            }
            x = 10;
            score = parseInt(localStorage.getItem("highScore"));
        }
    }
    UpdateLives(){
        for(var x = 0; x/2 <= this.pacMan.lives; x+=2){
            this.map[34][x]   = "D000";
            this.map[34][x+1] = "D001";
            this.map[35][x]   = "D002";
            this.map[35][x+1] = "D003";
        }
        this.map[34][x-2] = "";
        this.map[34][x-1] = "";
        this.map[35][x-2] = "";
        this.map[35][x-1] = "";
    }
    CheckGhostCollision(){
        let checkingGhost = undefined;
        for(let ghostIndex = 0; ghostIndex<=3;ghostIndex++){
            //TODO: optimize here(Load just needed parameters to variable)
            if     (ghostIndex === 0) checkingGhost = this.redGhost;
            else if(ghostIndex === 1) checkingGhost = this.pinkGhost;
            else if(ghostIndex === 2) checkingGhost = this.cyanGhost;
            else if(ghostIndex === 3) checkingGhost = this.orangeGhost;
            
            if(this.pacMan.isAlive){
                if(this.AreColliding(this.pacMan,checkingGhost)){
                    if(checkingGhost.mode !== "Scared"){
                        if(checkingGhost.isAlive){
                            this.time = -1
                            this.pacMan.Kill();
                        }
                    }
                    else if(checkingGhost.isAlive){
                        if     (ghostIndex === 0) this.redGhost.isAlive    = false;
                        else if(ghostIndex === 1) this.pinkGhost.isAlive   = false;
                        else if(ghostIndex === 2) this.cyanGhost.isAlive   = false;
                        else if(ghostIndex === 3) this.orangeGhost.isAlive = false;

                        this.pause = true;

                        this.score += this.pacMan.ghostEatPoints;
                        this.pacMan.ghostEatPoints*=2;
                        this.pacMan.ghostsEaten++;

                        audio.eatGhost.play();
                    }
                }
                this.DrawGhostEatScore();
            }
        }
    }
    AreColliding(object1,object2){
        return((object1.x-.25 <= object2.x+.25 && object2.x-.25 <= object1.x+.25)
            && (object1.y-.25 <= object2.y+.25 && object2.y-.25 <= object1.y+.25));
    }
    DotsRemaining(){
        let dotsRemaining = 0;
        for(let checkingY = 0;checkingY < this.map.length;checkingY++){
            for(let checkingX = 0;checkingX < this.map[checkingY].length;checkingX++){
                if(!isNaN(this.map[checkingY][checkingX])&&this.map[checkingY][checkingX] > 0) dotsRemaining++;
            }
        }
        return dotsRemaining;
    }
    Start(){
        audio.beginning.play()
        .then(() => {
            this.MapText(9,20,"  READY!  ","y");
            this.started = true;
        })
        .catch(error => {}); //Don't show error message when user didn't interact with application.
    }
    Restart(){
        this.pacMan.Restart();
        this.redGhost.Restart();
        this.cyanGhost.Restart();
        this.pinkGhost.Restart();
        this.orangeGhost.Restart();

        if(this.pacMan.lives >= 0) this.MapText(11,20,"READY!","y");
        else                       this.MapText(9,20,"GAME  OVER","r");

        this.phase = 0;
        this.phaseChange = 0;
        this.mode = "Scatter";
        this.time = -2000;
        this.fruitDespawnIn = 0;
    }
    Reset(){
        this.pacMan.Restart();
        this.redGhost.Restart();
        this.cyanGhost.Restart();
        this.pinkGhost.Restart();
        this.orangeGhost.Restart();

        this.level = 1;

        this.ResetMap();

        this.pacMan.lives = 3;
        this.UpdateLives();

        this.score = 0;
        this.UpdateScore();

        this.time = undefined

        this.fruitCollected = false;
        this.fruitDespawnIn = 0;

        this.fruitsCollected = [];

        this.started = false;
        audio.beginning.play();
    }
    ChangeGhostModes(newMode){
        if(this.pacMan.fright <= 0 || newMode === "Scared"){
            if(newMode !== this.redGhost.mode)    this.redGhost.TurnAround();
            if(newMode !== this.cyanGhost.mode)   this.cyanGhost.TurnAround();
            if(newMode !== this.pinkGhost.mode)   this.pinkGhost.TurnAround();
            if(newMode !== this.orangeGhost.mode) this.orangeGhost.TurnAround();
            this.redGhost.mode    = newMode;
            this.pinkGhost.mode   = newMode;
            this.cyanGhost.mode   = newMode;
            this.orangeGhost.mode = newMode;
        }
    }
    MapText(x,y,text, color){
        text = text.toString();
        for(let i = 0;i < text.length;i++){
            if(text[i] == " ") this.map[y][x++] = 0;
            else               this.map[y][x++] = color+text[i];
        }
    }
    ResetMap(){
        this.map = new Array(MazeMap.length);

        for (var i = 0; i < MazeMap.length; i++) {
            this.map[i] = new Array(MazeMap[i].length);
            for (var j = 0; j < this.map[i].length; j++) {
                this.map[i][j] = MazeMap[i][j];
            }            
        }

        this.map[17][-1] = 0; //Creates movable tunnel
        this.map[17][-2] = 0;
        this.map[17][28] = 0;
        this.map[17][29] = 0;
    }
    DrawGhostEatScore(){
        if(this.pause === true){
            DrawTile("GE"+this.pacMan.ghostsEaten+"0",(this.pacMan.x+0)*canvasTileSize,this.pacMan.y*canvasTileSize,canvasTileSize,canvasTileSize)
            DrawTile("GE"+this.pacMan.ghostsEaten+"1",(this.pacMan.x+1)*canvasTileSize,this.pacMan.y*canvasTileSize,canvasTileSize,canvasTileSize)
        }
    }
    DrawFruit(){
        if(!this.fruitCollected){
            DrawTile("F"+LevelVariables[this.level-1].fruitType+"0",14*canvasTileSize,19.5*canvasTileSize,canvasTileSize,canvasTileSize);
            DrawTile("F"+LevelVariables[this.level-1].fruitType+"1",15*canvasTileSize,19.5*canvasTileSize,canvasTileSize,canvasTileSize);
            DrawTile("F"+LevelVariables[this.level-1].fruitType+"2",14*canvasTileSize,20.5*canvasTileSize,canvasTileSize,canvasTileSize);
            DrawTile("F"+LevelVariables[this.level-1].fruitType+"3",15*canvasTileSize,20.5*canvasTileSize,canvasTileSize,canvasTileSize);
        }
        else{
            if(LevelVariables[this.level-1].fruitType < 4){
                DrawTile("FE"+LevelVariables[this.level-1].fruitType+"0",14*canvasTileSize,20*canvasTileSize,canvasTileSize,canvasTileSize);
                DrawTile("FE"+LevelVariables[this.level-1].fruitType+"1",15*canvasTileSize,20*canvasTileSize,canvasTileSize,canvasTileSize);
            }
            else{
                DrawTile("FE"+LevelVariables[this.level-1].fruitType+"0",13*canvasTileSize,20*canvasTileSize,canvasTileSize,canvasTileSize);
                DrawTile("FE"+LevelVariables[this.level-1].fruitType+"1",14*canvasTileSize,20*canvasTileSize,canvasTileSize,canvasTileSize);
                DrawTile("FE"+LevelVariables[this.level-1].fruitType+"2",15*canvasTileSize,20*canvasTileSize,canvasTileSize,canvasTileSize);
                DrawTile("FE"+LevelVariables[this.level-1].fruitType+"3",16*canvasTileSize,20*canvasTileSize,canvasTileSize,canvasTileSize);
            }
        }
    }
    UpdateEatenFruit(){
        for(let i = 0; i<this.fruitsCollected.length; i++){
            let topX = 27 - (i)*2;

            this.map[34][topX-1] = "F"+this.fruitsCollected[i]+"0";
            this.map[34][topX]   = "F"+this.fruitsCollected[i]+"1";
            this.map[35][topX-1] = "F"+this.fruitsCollected[i]+"2";
            this.map[35][topX]   = "F"+this.fruitsCollected[i]+"3";
        }
    }
}