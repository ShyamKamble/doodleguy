const grid = document.querySelector(".grid");
const doodle = document.createElement("div");
let doodleLeftSpace = 50;
let startpoint =150
let dooodleBottomSpace = startpoint;
let platformcount=5;
let isGameOver = false;
let platforms=[]
let upTimeid
let downtimeid
let isjumping
let isgoingleft =false
let isgoingright=false
let LeftTimeId
let RightTimeId
let score=0

function createdoodler() {
  
  grid.appendChild(doodle);
  doodle.classList.add("doodle");
  
  doodleLeftSpace=platforms[0].left
  doodle.style.left = doodleLeftSpace + 'px';
  doodle.style.bottom = dooodleBottomSpace + 'px';
}

class Platform {
  constructor(newplatbot) {
    this.bottom = newplatbot;
    this.left = Math.random() * 315;
    this.visual = document.createElement("div");
    const visual = this.visual;
    visual.classList.add("platform");
    visual.style.left = this.left + 'px';
    visual.style.bottom = this.bottom + "px";
    grid.appendChild(visual);
  }
}
function createPlatforms() {
  const platform = document.querySelector(".platform");
  for (var i = 0; i < platformcount; i++) {
    let platformSpace = 600 / platformcount;
    
    let newplatbot = 100 + i * platformSpace;
    let newPlatform = new Platform(newplatbot);
    platforms.push(newPlatform)
    console.log(platforms)
    
  }
}
function moveplatforms() {
  if (dooodleBottomSpace > 200) {
    platforms.forEach((platform, index) => {
      platform.bottom -= 4;
      let visual = platform.visual;
      visual.style.bottom = platform.bottom + 'px';
      
      if (platform.bottom < 10) {
        grid.removeChild(visual); // Remove the visual element from the DOM
        platforms.splice(index, 1); // Remove the platform from the array
        console.log(platforms);
        score++;
        let newPlatformBottom = 600; // Set the new platform's bottom value
        let newPlatform = new Platform(newPlatformBottom); // Create a new Platform object
        platforms.push(newPlatform); // Add the new platform to the array
      }
    });
  }
}
start();
function jump(){
  clearInterval(downtimeid)
  isjumping =true
  upTimeid=setInterval(function(){
    dooodleBottomSpace+=10;
    doodle.style.bottom=dooodleBottomSpace+'px'
   if(dooodleBottomSpace>startpoint +200){
    fall()
    }
  },30)
}
  function fall(){
    clearInterval(upTimeid)
    isjumping =false
    downtimeid=setInterval(function(){
      dooodleBottomSpace-=5
      doodle.style.bottom=dooodleBottomSpace+'px'
      if(dooodleBottomSpace<=0){
        gameover();
      }
      platforms.forEach(platform=>{
        if((dooodleBottomSpace >=platform.bottom)&&(dooodleBottomSpace<=platform.bottom+15)&&((doodleLeftSpace +60)>=platform.left)&&(doodleLeftSpace<=(platform.left+85))&&!isjumping){
          console.log('landed')  
          startpoint =dooodleBottomSpace
          jump()
        }
         
        
      }) 
    },30)
    
  }
  function control(e) {
    if (e.keyCode === 37) { // Arrow Left
      clearInterval(RightTimeId);
      moveleft();
    } else if (e.keyCode === 39) { // Arrow Right
      clearInterval(LeftTimeId);
      moveright();
    } else if (e.keyCode === 38) { // Arrow Up
      clearInterval(LeftTimeId);
      clearInterval(RightTimeId);
      clearInterval(upTimeid);
      clearInterval(downtimeid);
      jump();
    }
  }
  function moveleft(){
    if(isgoingright){
      clearInterval(RightTimeId)
        isgoingright=false
      
    }
    isgoingleft=true
    LeftTimeId=setInterval(function(){
      if(doodleLeftSpace>=0){
      doodleLeftSpace-=5
        doodle.style.left=doodleLeftSpace+"px"
      }else{
        moveright()
      }
    } ,30)
  }
  function moveright() {
    if(isgoingleft){
      clearInterval(LeftTimeId)
      isgoingleft=false
    }
    isgoingright = true;
    RightTimeIdTimeId = setInterval(function() {
      if (doodleLeftSpace <= grid.clientWidth - 90) { // 60 is the width of the doodle
        doodleLeftSpace += 5;
        doodle.style.left = doodleLeftSpace + "px";
      }
    }, 30);
   
  }
  
function gameover(){ 
  console.log("game over")
  isGameOver=true
  while(grid.firstChild){
    grid.removeChild(grid.firstChild)
  }
  grid.innerHTML=score
  clearInterval(upTimeid)
  clearInterval(downtimeid)
  clearInterval(LeftTimeId)
  clearInterval(RightTimeId)
  if(isGameOver==true){
    isgoingleft=false
    isgoingright=false
    isjumping=false
  }
}
 
function start() {
  if (!isGameOver) {
    createPlatforms();
    createdoodler();
   
    setInterval(moveplatforms,30)
    jump();
   document.addEventListener('keyup',function (e){control(e);
   })
  

  
  }
 
}

