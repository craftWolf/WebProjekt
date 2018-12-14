var board = {
  playerTable: document.querySelector(".player-table"),
  oponentTable:  document.querySelector(".oponent-table"),
  playerCellsItems: [].slice.call(document.getElementsByClassName("table-cell-player")),
  oponentCellsItems: [].slice.call(document.getElementsByClassName(".table-cell-oponent")),
  respondToClick: function(array,func){
    array.forEach(function(item,idx){
      item.addEventListener('click',func)})
  },
  allBoats:new Array,
}
// boats
{
var boat41 = {
  type:4,
  boatNo:41,
  bodyBoat: new Array(4),
  createBody: function(x,y){
    for(var i=0;i<this.bodyBoat.length;i++){
      this.bodyBoat[i]= Object.create(cell)
      this.bodyBoat[i].positionBoat=i;
      this.bodyBoat[i].setPosition(x+i,y);
      this.bodyBoat[i].createCell(x+i,y)
    }
  },
}

var boat31 = {
  type:3,
  boatNo:31,
  bodyBoat: new Array(3),
  createBody: function(x,y){
    for(var i=0;i<this.bodyBoat.length;i++){
      this.bodyBoat[i]= Object.create(cell)
      this.bodyBoat[i].positionBoat=i;
      this.bodyBoat[i].setPosition(x+i,y);
     this.bodyBoat[i].createCell(x+i,y)
    }
  },
}

var boat32 = {
  type:3,
  boatNo:32,
  bodyBoat: new Array(3),
  createBody: function(x,y){
    for(var i=0;i<this.bodyBoat.length;i++){
      this.bodyBoat[i]= Object.create(cell)
      this.bodyBoat[i].positionBoat=i;
      this.bodyBoat[i].setPosition(x+i,y);
     this.bodyBoat[i].createCell(x+i,y)
    }
  },
}

var boat21 = {
  type:2,
  boatNo:21,
  bodyBoat: new Array(2),
  createBody: function(x,y){
    for(var i=0;i<this.bodyBoat.length;i++){
      this.bodyBoat[i]= Object.create(cell)
      this.bodyBoat[i].positionBoat=i;
      this.bodyBoat[i].setPosition(x+i,y);
     this.bodyBoat[i].createCell(x+i,y)
    }
  },
}

var boat22 = {
  type:2,
  boatNo:22,
  bodyBoat: new Array(2),
  createBody: function(x,y){
    for(var i=0;i<this.bodyBoat.length;i++){
      this.bodyBoat[i]= Object.create(cell)
      this.bodyBoat[i].positionBoat=i;
      this.bodyBoat[i].setPosition(x+i,y);
     this.bodyBoat[i].createCell(x+i,y)
    }
  },
}

var boat23 = {
  type:2,
  boatNo:23,
  bodyBoat: new Array(2),
  createBody: function(x,y){
    for(var i=0;i<this.bodyBoat.length;i++){
      this.bodyBoat[i]= Object.create(cell)
      this.bodyBoat[i].positionBoat=i;
      this.bodyBoat[i].setPosition(x+i,y);
     this.bodyBoat[i].createCell(x+i,y)
    }
  },
}

var boat24 = {
  type:2,
  boatNo:24,
  bodyBoat: new Array(2),
  createBody: function(x,y){
    for(var i=0;i<this.bodyBoat.length;i++){
      this.bodyBoat[i]= Object.create(cell)
      this.bodyBoat[i].positionBoat=i;
      this.bodyBoat[i].setPosition(x+i,y);
     this.bodyBoat[i].createCell(x+i,y)
    }
  },
}

var boat11 = {
  type:1,
  boatNo:11,
  bodyBoat: new Array(1),
  createBody: function(x,y){
    for(var i=0;i<this.bodyBoat.length;i++){
      this.bodyBoat[i]= Object.create(cell)
      this.bodyBoat[i].positionBoat=i;
      this.bodyBoat[i].setPosition(x+i,y);
     this.bodyBoat[i].createCell(x+i,y)
    }
  },
}

var boat12 = {
  type:1,
  boatNo:12,
  bodyBoat: new Array(1),
  createBody: function(x,y){
    for(var i=0;i<this.bodyBoat.length;i++){
      this.bodyBoat[i]= Object.create(cell)
      this.bodyBoat[i].positionBoat=i;
      this.bodyBoat[i].setPosition(x+i,y);
     this.bodyBoat[i].createCell(x+i,y)
    }
  },
}

var boat13 = {
  type:1,
  boatNo:13,
  bodyBoat: new Array(1),
  createBody: function(x,y){
    for(var i=0;i<this.bodyBoat.length;i++){
      this.bodyBoat[i]= Object.create(cell)
      this.bodyBoat[i].positionBoat=i;
      this.bodyBoat[i].setPosition(x+i,y);
     this.bodyBoat[i].createCell(x+i,y)
    }
  },
}

var boat14 = {
  type:1,
  boatNo:14,
  bodyBoat: new Array(1),
  createBody: function(x,y){
    for(var i=0;i<this.bodyBoat.length;i++){
      this.bodyBoat[i]= Object.create(cell)
      this.bodyBoat[i].positionBoat=i;
      this.bodyBoat[i].setPosition(x+i,y);
      this.bodyBoat[i].createCell(x+i,y)
    }
  },
}
}
// cells
var cell = {
  positionInBoat:"",
  Xposition:"",
  Yposition:"",
  setPosition:function(x,y){
    this.Yposition = y;
    this.Xposition = x;
  },
  getXPosition:function(){return this.Xposition},
  getYPosition:function(){return this.Yposition},
  createCell:function(x,y){
    // check for a valid position
    if (!(x>9)&&!(y>9)&&!(y<0)&&!(x<0)) {
    let pathx = "[data-x=\'"+x+"\']";
    let pathy = "[data-y=\'"+y+"\']";
    let elem =  document.querySelectorAll(pathy+pathx)[0];
    elem.classList.add("table-cell-tile")
    } else alert("invalid position to create cell")
  }
}

function myFunc(){
  alert("hell");
}

board.allBoats.push(boat11);
board.allBoats.push(boat12);
board.allBoats.push(boat13);
board.allBoats.push(boat14);
board.allBoats.push(boat21);
board.allBoats.push(boat22);
board.allBoats.push(boat23);
board.allBoats.push(boat31);
board.allBoats.push(boat32);
board.allBoats.push(boat41);



