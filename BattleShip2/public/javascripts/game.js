// My custom FUNCTIONS

//  FUNTIONS THAT gives THE ATRIBUTE *data-x & data-y
function pathToX(value){
    return "[data-x=\'"+value+"\']";
}
function pathToY(value){
    return "[data-y=\'"+value+"\']";
}

// MYFUNC3 ADDS CONTENT TO PLAYER TABLE IN DOM
function myFunc3(){
    for(var i=0;i<10;i++){
        for(var j=0;j<10;j++){
            let pathx = "[data-x=\'"+i+"\']";
            let pathy = "[data-y=\'"+j+"\']";
            document.querySelector(pathx+pathy).setAttribute('id',i+""+j);

        }
    }
}

// TODO remove the eventListener
function myFunc4(that,value){
    if (value)
    document.addEventListener("keypress", function(event) {
        switch(event.code.toLocaleLowerCase()){
            case"keyw":moveUp(that);break;
            case"keys":moveDown(that);break;
            case"keya":moveLeft(that);break;
            case"keyd":moveRight(that);break;
        }
        
    })
    else{
        // window.addEventListener("keypress", function (event) {
        // event.stopPropagation();
        // }, true);
    }
}


// pass an array
function setAllCells(that,value){
    that.forEach(function(item){
        item.isClicked=value;
    })
}


// MOVE UP FUNCTION
function moveUp(ship){
console.log("move up");
    ship.bodyBoat.forEach(function(item){
        let $n =  document.querySelectorAll(pathToX(item.Xposition)+pathToY(item.Yposition))[0].querySelector("div");
        console.log($n);
        let $prevParent = document.querySelectorAll(pathToX(item.Xposition)+pathToY(item.Yposition))[0];
        console.log($prevParent);
        let $newParent = document.querySelectorAll(pathToX(item.Xposition)+pathToY(item.Yposition-1))[0];
        $n.myobj.Yposition--;
        console.log($newParent);
        $newParent.append($n);
    })
}

//MOVE DOWN FUNCTION
function moveDown(ship){
console.log("move down");
    ship.bodyBoat.forEach(function(item){
        let $n =  document.querySelectorAll(pathToX(item.Xposition)+pathToY(item.Yposition))[0].querySelector("div");
        console.log($n);
        let $prevParent = document.querySelectorAll(pathToX(item.Xposition)+pathToY(item.Yposition))[0];
        console.log($prevParent);
        let $newParent = document.querySelectorAll(pathToX(item.Xposition)+pathToY(item.Yposition+1))[0];
        $n.myobj.Yposition++;
        console.log($newParent);
        $newParent.append($n);
    })
}

// MOVE LEFT FUNTION
function moveLeft(ship){
console.log("move left");
    ship.bodyBoat.forEach(function(item){
        let $n =  document.querySelectorAll(pathToX(item.Xposition)+pathToY(item.Yposition))[0].querySelector("div");
        console.log($n);
        let $prevParent = document.querySelectorAll(pathToX(item.Xposition)+pathToY(item.Yposition))[0];
        console.log($prevParent);
        let $newParent = document.querySelectorAll(pathToX(item.Xposition-1)+pathToY(item.Yposition))[0];
        $n.myobj.Xposition--;
        console.log($newParent);
        $newParent.append($n);
    })
}

// MOVE RIGHT FUNCTIONS
function moveRight(ship){
console.log("move right");
    ship.bodyBoat.forEach(function(item){
        let $n =  document.querySelectorAll(pathToX(item.Xposition)+pathToY(item.Yposition))[0].querySelector("div");
        console.log($n);
        let $prevParent = document.querySelectorAll(pathToX(item.Xposition)+pathToY(item.Yposition))[0];
        console.log($prevParent);
        let $newParent = document.querySelectorAll(pathToX(item.Xposition+1)+pathToY(item.Yposition))[0];
        $n.myobj.Xposition++;
        console.log($newParent);
        $newParent.append($n);
    })

}



// GAME OBJECTS


// CREATING THE CELL OF A BOAT 
// 1 unit of the boat
// !!!!!!!!!!!!!!!!!!! EVERY CELL MUST HAVE AN UNIQUE ID 
// THE ID by default is : joke
function cell(x,y){
    if (!(x>9)&&!(y>9)&&!(y<0)&&!(x<0)) {
        this.Xposition=x;
        this.Yposition=y;
        this.inBoatPosition="";
        this.isClicked=false;
        this.id="joke";
        this.createCell = function(){
            //CREATED THE DRAGGABLE ELEMENT
            let $n = document.createElement("div");
            $n.classList.add("table-cell-tile");
            $n.setAttribute("id",this.id);
            
            // assigning the JS object to the DOM-Element representation 
            $n.myobj = this;

            // ADDING IT TO DOM
            let x = pathToX(this.Xposition)+pathToY(this.Yposition);
            let $elem =  document.querySelectorAll(x)[0];
            $elem.append($n);            
        }
    }else alert("invalid position to create cell")
}


function boat(size){
    this.size = size;
    this.type = "";
    this.boatIsClicked=false;
    this.bodyBoat = new Array(this.size);
    this.createBody = function(x,y){
        for(var i=0;i<this.bodyBoat.length;i++){
          this.bodyBoat[i]= new cell(x+i,y)
          this.bodyBoat[i].inBoatPosition=i;
          this.bodyBoat[i].id = "ship:"+this.size+"_cell:"+i;
          this.bodyBoat[i].createCell(x+i,y)
        }
    }
    this.boatClicked = function(that){
        that.bodyBoat.forEach( function(item){
            let $elem =  document.querySelectorAll(pathToX(item.Xposition)+pathToY(item.Yposition))[0].querySelector("div");
            $elem.addEventListener("click",function(){
                if (item.isClicked) {
                    item.isClicked = false;
                    console.log("click canceled"); 
                    setAllCells(that.bodyBoat,false);      
                    myFunc4(that,false)             
                }
                else {
                    item.isClicked = true;
                    console.log("click started");
                    setAllCells(that.bodyBoat,true);
                    myFunc4(that,true);                
                }
            })
        })
    }
}


function ready() {
    //create ready button
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode("READY");
    $(btn).attr('onclick', 'startgame()');    // ready onclick calls setup() function
    btn.appendChild(t);
    document.getElementById("ready").appendChild(btn);
    //remove rotate box, ships 
   
    return true;
  }



// WEB

function setup() {
    socket = new WebSocket(Setup.WEB_SOCKET_URL);
    gamestate = new GameState(socket);
  
    socket.onmessage = function (event) {
      let msg = JSON.parse(event.data);
      //console.log(incomingMsg);
      console.log(msg);
    }
  
    // socket.onopen = function () {
    //   socket.send("{}");
    // };
  }
  
  function GameState(socket) {
    this.socket = socket;
    this.sendmsg = function(message) {
      this.socket.send(message);
    }
  }



// The ExecutTIon of the Program
{
console.log("hi");
myFunc3();

let boatArray = [];

let boat51 = new boat(5);
boat51.createBody(0,0);
boatArray.push(boat51);


let boat41 = new boat(4);
boat41.createBody(0,2);
boatArray.push(boat41);

let boat31 =  new boat(3);
boat31.createBody(0,4);
boatArray.push(boat31);

let boat32 = new boat(3);
boat32.createBody(5,4);
boatArray.push(boat32);

let boat21 = new boat(2);
boat21.createBody(0,6);
boatArray.push(boat21);

boatArray.forEach(function(item){
    item.boatClicked(item);
})
}
setup();
ready();