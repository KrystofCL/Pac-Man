const TileSetTiles = [
    //#region Shortcuts explanation
    /*
    #: number | &: letter or symbol

    Maze
        MW##: Maze Wall (##)index
        GHW#: Ghost house Wall (#)index

    Pac Man(Player)
        PC##: Pac Man (#)animation frame (#)image part
        D###: Death (##)animation frame (#)image part
    Ghosts
        @@##: (@)Color (@)Direction (#)animation frame (#)image part
    Letters
        w@: white (@)letter or symbol
        y@: yellow (@)letter or symbol
    Score related
        PD: Pac Dots
        PP: Pac Pallets
    */
    //#endregion
    
    ["MW00","MW01","MW02","MW03","MW04","GhW0","GhW1","GhW2","GhW3","PM00","PM01","PM10","PM11","PM20","PM21",      ,"D100","D101","F70" ,"F71" ],
    ["MW05",      ,"MW06","MW07","MW08","GhW4","GhG" ,"GhW5","GhW6","PM02","PM03","PM12","PM13","PM22","PM23",      ,"D102","D103","F72" ,"F73" ],
    ["MW09","MW10","MW11","MW12","MW13","GhW7","GhW8",      ,"GhW9",      ,      ,      ,      ,      ,      ,      ,      ,      ,      ,      ],
    ["MW14","MW15","MW16","MW17","MW18",10    ,"F00" ,"F01" ,"F10" ,"F11" ,"F20" ,"F21" ,"F30" ,"F31" ,"F40" ,"F41" ,"F50" ,"F51" ,"F60" ,"F61" ],
    ["MW19","MW20","MW21","MW22","MW23",50    ,"F02" ,"F03" ,"F12" ,"F13" ,"F22" ,"F23" ,"F32" ,"F33" ,"F42" ,"F43" ,"F52" ,"F53" ,"F62" ,"F63" ],
    ["RR00","RR01","RR10","RR11","RL00","RL01","RL10","RL11","RU00","RU01","RU10","RU11","RD00","RD01","RD10","RD11","Sb00","Sb01","Sb10","Sb11"],
    ["RR02","RR03","RR12","RR13","RL02","RL03","RL12","RL13","RU02","RU03","RU12","RU13","RD02","RD03","RD12","RD13","Sb02","Sb03","Sb12","Sb13"],
    ["PR00","PR01","PR10","PR11","PL00","PL01","PL10","PL11","PU00","PU01","PU10","PU11","PD00","PD01","PD10","PD11","Sw00","Sw01","Sw10","Sw11"],
    ["PR02","PR03","PR12","PR13","PL02","PL03","PL12","PL13","PU02","PU03","PU12","PU13","PD02","PD03","PD12","PD13","Sw02","Sw03","Sw12","Sw13"],
    ["CR00","CR01","CR10","CR11","CL00","CL01","CL10","CL11","CU00","CU01","CU10","CU11","CD00","CD01","CD10","CD11","DR00","DR01","DL00","DL01"],
    ["CR02","CR03","CR12","CR13","CL02","CL03","CL12","CL13","CU02","CU03","CU12","CU13","CD02","CD03","CD12","CD13","DR02","DR03","DL02","DL03"],
    ["OR00","OR01","OR10","OR11","OL00","OL01","OL10","OL11","OU00","OU01","OU10","OU11","OD00","OD01","OD10","OD11","DU00","DU01","DD00","DD01"],
    ["OR02","OR03","OR12","OR13","OL02","OL03","OL12","OL13","OU02","OU03","OU12","OU13","OD02","OD03","OD12","OD13",      ,      ,"DD02","DD03"],
    ["w0"  ,"w1"  ,"w2"  ,"w3"  ,"w4"  ,"w5"  ,"w6"  ,"w7"  ,"w8"  ,"w9"  ,"wC"  ,"wE"  ,"wG"  ,"wH"  ,"wI"  ,"wO"  ,"wP"  ,"wR"  ,"wS"  ,"wU"  ],
    ["yA"  ,"yD"  ,"yE"  ,"yR"  ,"yY"  ,"y!"  ,"rA"  ,"rE"  ,"rG"  ,"rM"  ,"rO"  ,"rR"  ,"rV"  ,      ,      ,      ,      ,      ,      ,      ],
    ["GE10","GE11","GE20","GE21","GE30","GE31","GE40","GE41","FE00","FE01","FE10","FE11","FE20","FE21","FE30","FE31","FE40","FE41","FE42","FE43"],
    ["FE50","FE51","FE52","FE53","FE60","FE61","FE62","FE63","FE70","FE71","FE72","FE73",      ,      ,      ,      ,      ,      ,      ,      ],
    ["D000","D001","D010","D011","D020","D021","D030","D031","D040","D041","D050","D051","D060","D061","D070","D071","D080","D081","D090","D091"],
    ["D002","D003","D012","D013","D022","D023","D032","D033","D042","D043","D052","D053","D062","D063","D072","D073","D082","D083","D092","D093"],
]
const MazeMap = [
    [      ,      ,      ,"wU","wP",      ,     ,      ,"wH"  ,"wI"  ,"wG"  ,"wH"  ,      ,"wS","wC","wO","wR","wE"   ,      ,      ,      ,      ,      ,      ,      ,      ,      ,      ,      ],
    [      ,      ,      ,      ,      ,      ,"w0"  ,"w0"  ,      ,      ,      ,      ,      ,      ,      ,      ,"w0"  ,"w0"  ,      ,      ,      ,      ,      ,      ,      ,      ,      ,      ],
    [      ,      ,      ,      ,      ,      ,      ,      ,      ,      ,      ,      ,      ,      ,      ,      ,      ,      ,      ,      ,      ,      ,      ,      ,      ,      ,      ,      ],
    ["MW00","MW01","MW01","MW01","MW01","MW01","MW01","MW01","MW01","MW01","MW01","MW01","MW01","MW02","MW03","MW01","MW01","MW01","MW01","MW01","MW01","MW01","MW01","MW01","MW01","MW01","MW01","MW04"],
    ["MW14",10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,"MW06","MW07",10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,"MW08"],
    ["MW14",10    ,"MW10","MW12","MW12","MW11",10    ,"MW10","MW12","MW12","MW12","MW11",10    ,"MW06","MW07",10    ,"MW10","MW12","MW12","MW12","MW11",10    ,"MW10","MW12","MW12","MW11",10    ,"MW08"],
    ["MW14",50    ,"MW06",      ,      ,"MW07",10    ,"MW06",      ,      ,      ,"MW07",10    ,"MW06","MW07",10    ,"MW06",      ,      ,      ,"MW07",10    ,"MW06",      ,      ,"MW07",50    ,"MW08"],
    ["MW14",10    ,"MW15","MW17","MW17","MW16",10    ,"MW15","MW17","MW17","MW17","MW16",10    ,"MW15","MW16",10    ,"MW15","MW17","MW17","MW17","MW16",10    ,"MW15","MW17","MW17","MW16",10    ,"MW08"],
    ["MW14",10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,"MW08"],
    ["MW14",10    ,"MW10","MW12","MW12","MW11",10    ,"MW10","MW11",10    ,"MW10","MW12","MW12","MW12","MW12","MW12","MW12","MW11",10    ,"MW10","MW11",10    ,"MW10","MW12","MW12","MW11",10    ,"MW08"],
    ["MW14",10    ,"MW15","MW17","MW17","MW16",10    ,"MW06","MW07",10    ,"MW15","MW17","MW17","MW11","MW10","MW17","MW17","MW16",10    ,"MW06","MW07",10    ,"MW15","MW17","MW17","MW16",10    ,"MW08"],
    ["MW14",10    ,10    ,10    ,10    ,10    ,10    ,"MW06","MW07",10    ,10    ,10    ,10    ,"MW06","MW07",10    ,10    ,10    ,10    ,"MW06","MW07",10    ,10    ,10    ,10    ,10    ,10    ,"MW08"],
    ["MW19","MW22","MW22","MW22","MW22","MW11",10    ,"MW06","MW15","MW12","MW12","MW11",0     ,"MW06","MW07",0     ,"MW10","MW12","MW12","MW16","MW07",10    ,"MW10","MW22","MW22","MW22","MW22","MW23"],
    [      ,      ,      ,      ,      ,"MW14",10    ,"MW06","MW10","MW17","MW17","MW16",0     ,"MW15","MW16",0     ,"MW15","MW17","MW17","MW11","MW07",10    ,"MW08",      ,      ,      ,      ,      ],
    [      ,      ,      ,      ,      ,"MW14",10    ,"MW06","MW07",0     ,0     ,0     ,0     ,0     ,0     ,0     ,0     ,0     ,0     ,"MW06","MW07",10    ,"MW08",      ,      ,      ,      ,      ],
    [      ,      ,      ,      ,      ,"MW14",10    ,"MW06","MW07",0     ,"GhW0","GhW1","GhW2","GhG" ,"GhG","GhW5" ,"GhW1","GhW3",0     ,"MW06","MW07",10    ,"MW08",      ,      ,      ,      ,      ],
    ["MW01","MW01","MW01","MW01","MW01","MW16",10    ,"MW15","MW16",0     ,"GhW4",      ,      ,      ,      ,      ,      ,"GhW6",0     ,"MW15","MW16",10    ,"MW15","MW01","MW01","MW01","MW01","MW01"],
    [0     ,0     ,0     ,0     ,0     ,0     ,10    ,0     ,0     ,0     ,"GhW4",      ,      ,      ,      ,      ,      ,"GhW6",0     ,0     ,0     ,10    ,0     ,0     ,0     ,0     ,0     ,0     ],
    ["MW22","MW22","MW22","MW22","MW22","MW11",10    ,"MW10","MW11",0     ,"GhW4",      ,      ,      ,      ,      ,      ,"GhW6",0     ,"MW10","MW11",10    ,"MW10","MW22","MW22","MW22","MW22","MW22"],
    [      ,      ,      ,      ,      ,"MW14",10    ,"MW06","MW07",0     ,"GhW7","GhW8","GhW8","GhW8","GhW8","GhW8","GhW8","GhW9",0     ,"MW06","MW07",10    ,"MW08",      ,      ,      ,      ,      ],
    [      ,      ,      ,      ,      ,"MW14",10    ,"MW06","MW07",0     ,0     ,0     ,0     ,0     ,0     ,0     ,0     ,0     ,0     ,"MW06","MW07",10    ,"MW08",      ,      ,      ,      ,      ],
    [      ,      ,      ,      ,      ,"MW14",10    ,"MW06","MW07",0     ,"MW10","MW12","MW12","MW12","MW12","MW12","MW12","MW11",0     ,"MW06","MW07",10    ,"MW08",      ,      ,      ,      ,      ],
    ["MW00","MW01","MW01","MW01","MW01","MW16",10    ,"MW15","MW16",0     ,"MW15","MW17","MW17","MW11","MW10","MW17","MW17","MW16",0     ,"MW15","MW16",10    ,"MW15","MW01","MW01","MW01","MW01","MW04"],
    ["MW14",10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,"MW06","MW07",10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,"MW08"],
    ["MW14",10    ,"MW10","MW12","MW12","MW11",10    ,"MW10","MW12","MW12","MW12","MW11",10    ,"MW06","MW07",10    ,"MW10","MW12","MW12","MW12","MW11",10    ,"MW10","MW12","MW12","MW11",10    ,"MW08"],
    ["MW14",10    ,"MW15","MW17","MW11","MW07",10    ,"MW15","MW17","MW17","MW17","MW16",10    ,"MW15","MW16",10    ,"MW15","MW17","MW17","MW17","MW16",10    ,"MW06","MW10","MW17","MW16",10    ,"MW08"],
    ["MW14",50    ,10    ,10    ,"MW06","MW07",10    ,10    ,10    ,10    ,10    ,10    ,10    ,0     ,0     ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,"MW06","MW07",10    ,10    ,50    ,"MW08"],
    ["MW05","MW12","MW11",10    ,"MW06","MW07",10    ,"MW10","MW11",10    ,"MW10","MW12","MW12","MW12","MW12","MW12","MW12","MW11",10    ,"MW10","MW11",10    ,"MW06","MW07",10    ,"MW10","MW12","MW13"],
    ["MW09","MW17","MW16",10    ,"MW15","MW16",10    ,"MW06","MW07",10    ,"MW15","MW17","MW17","MW11","MW10","MW17","MW17","MW16",10    ,"MW06","MW07",10    ,"MW15","MW16",10    ,"MW15","MW17","MW18"],
    ["MW14",10    ,10    ,10    ,10    ,10    ,10    ,"MW06","MW07",10    ,10    ,10    ,10    ,"MW06","MW07",10    ,10    ,10    ,10    ,"MW06","MW07",10    ,10    ,10    ,10    ,10    ,10    ,"MW08"],
    ["MW14",10    ,"MW10","MW12","MW12","MW12","MW12","MW16","MW15","MW12","MW12","MW11",10    ,"MW06","MW07",10    ,"MW10","MW12","MW12","MW16","MW15","MW12","MW12","MW12","MW12","MW11",10    ,"MW08"],
    ["MW14",10    ,"MW15","MW17","MW17","MW17","MW17","MW17","MW17","MW17","MW17","MW16",10    ,"MW15","MW16",10    ,"MW15","MW17","MW17","MW17","MW17","MW17","MW17","MW17","MW17","MW16",10    ,"MW08"],
    ["MW14",10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,10    ,"MW08"],
    ["MW19","MW22","MW22","MW22","MW22","MW22","MW22","MW22","MW22","MW22","MW22","MW22","MW22","MW22","MW22","MW22","MW22","MW22","MW22","MW22","MW22","MW22","MW22","MW22","MW22","MW22","MW22","MW23"],
    ["","","","","","","","","","","","","","","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","","","","","","","","","","","","","","",""],
]
const LevelVariables = [
   {fruitType: 0,pacManSpeed: 0.80,pacManDotsSpeed: 0.71,ghostSpeed: 0.75, elroy1DotsLeft:  20, elroy1Speed: 0.80,elroy2Speed: 0.85, frightPacManSpeed: 0.90,frightPacManDotsSpeed: 0.79, frightGhostSpeed: 0.50, frightTime: 6000, flashesBeforeExpiration: 5},
   {fruitType: 1,pacManSpeed: 0.90,pacManDotsSpeed: 0.79,ghostSpeed: 0.85, elroy1DotsLeft:  30, elroy1Speed: 0.90,elroy2Speed: 0.95, frightPacManSpeed: 0.95,frightPacManDotsSpeed: 0.83, frightGhostSpeed: 0.55, frightTime: 5000, flashesBeforeExpiration: 5},
   {fruitType: 2,pacManSpeed: 0.90,pacManDotsSpeed: 0.79,ghostSpeed: 0.85, elroy1DotsLeft:  40, elroy1Speed: 0.90,elroy2Speed: 0.95, frightPacManSpeed: 0.95,frightPacManDotsSpeed: 0.83, frightGhostSpeed: 0.55, frightTime: 4000, flashesBeforeExpiration: 5},
   {fruitType: 2,pacManSpeed: 0.90,pacManDotsSpeed: 0.79,ghostSpeed: 0.85, elroy1DotsLeft:  40, elroy1Speed: 0.90,elroy2Speed: 0.95, frightPacManSpeed: 0.95,frightPacManDotsSpeed: 0.83, frightGhostSpeed: 0.55, frightTime: 3000, flashesBeforeExpiration: 5},
   {fruitType: 3,pacManSpeed: 1.00,pacManDotsSpeed: 0.87,ghostSpeed: 0.95, elroy1DotsLeft:  40, elroy1Speed: 1.00,elroy2Speed: 1.05, frightPacManSpeed: 1.00,frightPacManDotsSpeed: 0.87, frightGhostSpeed: 0.60, frightTime: 2000, flashesBeforeExpiration: 5},
   {fruitType: 3,pacManSpeed: 1.00,pacManDotsSpeed: 0.87,ghostSpeed: 0.95, elroy1DotsLeft:  50, elroy1Speed: 1.00,elroy2Speed: 1.05, frightPacManSpeed: 1.00,frightPacManDotsSpeed: 0.87, frightGhostSpeed: 0.60, frightTime: 5000, flashesBeforeExpiration: 5},
   {fruitType: 4,pacManSpeed: 1.00,pacManDotsSpeed: 0.87,ghostSpeed: 0.95, elroy1DotsLeft:  50, elroy1Speed: 1.00,elroy2Speed: 1.05, frightPacManSpeed: 1.00,frightPacManDotsSpeed: 0.87, frightGhostSpeed: 0.60, frightTime: 2000, flashesBeforeExpiration: 5},
   {fruitType: 4,pacManSpeed: 1.00,pacManDotsSpeed: 0.87,ghostSpeed: 0.95, elroy1DotsLeft:  50, elroy1Speed: 1.00,elroy2Speed: 1.05, frightPacManSpeed: 1.00,frightPacManDotsSpeed: 0.87, frightGhostSpeed: 0.60, frightTime: 2000, flashesBeforeExpiration: 5},
   {fruitType: 5,pacManSpeed: 1.00,pacManDotsSpeed: 0.87,ghostSpeed: 0.95, elroy1DotsLeft:  60, elroy1Speed: 1.00,elroy2Speed: 1.05, frightPacManSpeed: 1.00,frightPacManDotsSpeed: 0.87, frightGhostSpeed: 0.60, frightTime: 1000, flashesBeforeExpiration: 3},
   {fruitType: 5,pacManSpeed: 1.00,pacManDotsSpeed: 0.87,ghostSpeed: 0.95, elroy1DotsLeft:  60, elroy1Speed: 1.00,elroy2Speed: 1.05, frightPacManSpeed: 1.00,frightPacManDotsSpeed: 0.87, frightGhostSpeed: 0.60, frightTime: 5000, flashesBeforeExpiration: 5},
   {fruitType: 6,pacManSpeed: 1.00,pacManDotsSpeed: 0.87,ghostSpeed: 0.95, elroy1DotsLeft:  60, elroy1Speed: 1.00,elroy2Speed: 1.05, frightPacManSpeed: 1.00,frightPacManDotsSpeed: 0.87, frightGhostSpeed: 0.60, frightTime: 2000, flashesBeforeExpiration: 5},
   {fruitType: 6,pacManSpeed: 1.00,pacManDotsSpeed: 0.87,ghostSpeed: 0.95, elroy1DotsLeft:  80, elroy1Speed: 1.00,elroy2Speed: 1.05, frightPacManSpeed: 1.00,frightPacManDotsSpeed: 0.87, frightGhostSpeed: 0.60, frightTime: 1000, flashesBeforeExpiration: 3},
   {fruitType: 7,pacManSpeed: 1.00,pacManDotsSpeed: 0.87,ghostSpeed: 0.95, elroy1DotsLeft:  80, elroy1Speed: 1.00,elroy2Speed: 1.05, frightPacManSpeed: 1.00,frightPacManDotsSpeed: 0.87, frightGhostSpeed: 0.60, frightTime: 1000, flashesBeforeExpiration: 3},
   {fruitType: 7,pacManSpeed: 1.00,pacManDotsSpeed: 0.87,ghostSpeed: 0.95, elroy1DotsLeft:  80, elroy1Speed: 1.00,elroy2Speed: 1.05, frightPacManSpeed: 1.00,frightPacManDotsSpeed: 0.87, frightGhostSpeed: 0.60, frightTime: 3000, flashesBeforeExpiration: 5},
   {fruitType: 7,pacManSpeed: 1.00,pacManDotsSpeed: 0.87,ghostSpeed: 0.95, elroy1DotsLeft: 100, elroy1Speed: 1.00,elroy2Speed: 1.05, frightPacManSpeed: 1.00,frightPacManDotsSpeed: 0.87, frightGhostSpeed: 0.60, frightTime: 1000, flashesBeforeExpiration: 3},
   {fruitType: 7,pacManSpeed: 1.00,pacManDotsSpeed: 0.87,ghostSpeed: 0.95, elroy1DotsLeft: 100, elroy1Speed: 1.00,elroy2Speed: 1.05, frightPacManSpeed: 1.00,frightPacManDotsSpeed: 0.87, frightGhostSpeed: 0.60, frightTime: 1000, flashesBeforeExpiration: 3},
   {fruitType: 7,pacManSpeed: 1.00,pacManDotsSpeed: 0.87,ghostSpeed: 0.95, elroy1DotsLeft: 100, elroy1Speed: 1.00,elroy2Speed: 1.05, frightPacManSpeed: 0.00,frightPacManDotsSpeed: 0.00, frightGhostSpeed:    0, frightTime:    0, flashesBeforeExpiration: 0},
   {fruitType: 7,pacManSpeed: 1.00,pacManDotsSpeed: 0.87,ghostSpeed: 0.95, elroy1DotsLeft: 100, elroy1Speed: 1.00,elroy2Speed: 1.05, frightPacManSpeed: 1.00,frightPacManDotsSpeed: 0.87, frightGhostSpeed: 0.60, frightTime: 1000, flashesBeforeExpiration: 3},
   {fruitType: 7,pacManSpeed: 1.00,pacManDotsSpeed: 0.87,ghostSpeed: 0.95, elroy1DotsLeft: 120, elroy1Speed: 1.00,elroy2Speed: 1.05, frightPacManSpeed: 0.00,frightPacManDotsSpeed: 0.00, frightGhostSpeed:    0, frightTime:    0, flashesBeforeExpiration: 0},
]
const FruitScores = [100,300,500,700,1000,2000,3000,5000];
const ModeTimes = [
    7,  //Scatter
    20, //Chase
    7,  //Scatter
    20, //Chase
    5,  //Scatter
    20, //Chase
    5,  //Scatter
    undefined
]

//#region Audio
const audio = {
    beginning:      new Audio("Assets/Beginning.wav"),
    death:          new Audio("Assets/Death.wav"),
    eatFruit:       new Audio("Assets/EatFruit.wav"),
    eatGhost:       new Audio("Assets/EatGhost.wav"),
    chomp:          new Audio("Assets/Chomp.wav")
};
audio.beginning.onended = () => {
    game.time = 0;
}
audio.death.onended = () => {
    game.Restart();
}
audio.eatGhost.onended = () => {
    game.pause = false;
}
//#endregion

var canvas = document.getElementById("Canvas");
var context = canvas.getContext("2d");

if(localStorage.getItem("highScore") === null) localStorage.setItem("highScore",0);
var game = new Game();

//#region tile set
//TODO: Remove: var PacManTileSet = document.getElementById("PacManTileSet");
var PacManTileSet = new Image();
var tileSize = undefined; //20 tiles per row in tile set

ResizeCanvas();
PacManTileSet.onload = () => {
    tileSize = PacManTileSet.width/20
    setInterval(GameLoop, 1000/game.frameRate)
}
PacManTileSet.src = "Assets/PacManTileSet64.png";

function FindTilePosition(TileID){
    let y = 0;
    while(true){
        if(TileSetTiles[y].find(element => element === TileID) != undefined){
            return{x: TileSetTiles[y].findIndex(element => element === TileID), y: y}
        }
        else{
            y++;
            if(y == TileSetTiles.length){
                return -1;
            }        
        }
    }
}
//#endregion
function GameLoop(){game.Loop();}

function DrawTile(index, x, y, width, height){
    let selectMargin = tileSize * .007; //Cuts out the blurred edges of the tiles
    let dragX = FindTilePosition(index).x*tileSize;
    let dragY = FindTilePosition(index).y*tileSize;
    context.drawImage(PacManTileSet,dragX+selectMargin,dragY+selectMargin,tileSize-selectMargin*2,tileSize-selectMargin*2,x-canvasTileSize,y,width,height);
}
function isRound(input){return(Math.round(input) === input)}
function isFacingObstacle(x,y,direction){
    if(direction !== undefined&&x === Math.round(x)&&y === Math.round(y)){
        if     (direction === "U") return(isNaN(game.map[y-1][x]));
        else if(direction === "D") return(isNaN(game.map[y+1][x]));
        else if(direction === "R") return(isNaN(game.map[y][x+1]));
        else if(direction === "L") return(isNaN(game.map[y][x-1]));
        else                       console.error("invalid direction parameter: " + direction);
    }
    else return true
}

window.onresize = ResizeCanvas;
function ResizeCanvas(){
    //Arcade resolution 224x288 | resolution 9:7
    if(window.innerHeight/9<window.innerWidth/7){
        canvas.height = window.innerHeight;
        canvas.width = (canvas.height/9)*7;
    }
    else{
        canvas.width = window.innerWidth;
        canvas.height = (canvas.width/7)*9;
    }                                           
    //Center the canvas  
    canvas.style.marginTop  = (window.innerHeight-canvas.height)/2 + "px";
    canvas.style.marginLeft = (window.innerWidth-canvas.width)/2   + "px";

    canvasTileSize = canvas.width/28
}
window.onkeydown = (key) =>{
    if(key.key === "ArrowUp" || key.key === "w")            game.pacMan.nextDirection = "U";
    else if(key.key === "ArrowDown" || key.key === "s")     game.pacMan.nextDirection = "D";
    else if(key.key === "ArrowRight" || key.key === "d")    game.pacMan.nextDirection = "R";
    else if(key.key === "ArrowLeft" || key.key === "a")     game.pacMan.nextDirection = "L";
}