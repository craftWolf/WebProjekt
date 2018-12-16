var boatArray = [];


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
            document.querySelectorAll(pathx+pathy)[0].setAttribute('id',i+""+j);
            document.querySelectorAll(pathx+pathy)[1].setAttribute('id',i+""+j+"-op");

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
        window.addEventListener("keypress", function (event) {
        event.stopPropagation();
        }, true);
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
        if((item.Yposition>0)){
        console.log("Valid move Y"+item.Yposition)
        let $n =  document.querySelectorAll(pathToX(item.Xposition)+pathToY(item.Yposition))[0].querySelector("div");
        console.log($n);
        let $prevParent = document.querySelectorAll(pathToX(item.Xposition)+pathToY(item.Yposition))[0];
        console.log($prevParent);
        let $newParent = document.querySelectorAll(pathToX(item.Xposition)+pathToY(item.Yposition-1))[0];
        $n.myobj.Yposition--;
        console.log($newParent);
        $newParent.append($n);
        }
        else{
            console.log("no more move Y="+item.Yposition);
        }
    })
}

//MOVE DOWN FUNCTION
function moveDown(ship){
console.log("move down");
    ship.bodyBoat.forEach(function(item){
        if((item.Yposition<9)) {
        console.log("valid move Y"+item.Yposition)
        let $n =  document.querySelectorAll(pathToX(item.Xposition)+pathToY(item.Yposition))[0].querySelector("div");
        console.log($n);
        let $prevParent = document.querySelectorAll(pathToX(item.Xposition)+pathToY(item.Yposition))[0];
        console.log($prevParent);
        let $newParent = document.querySelectorAll(pathToX(item.Xposition)+pathToY(item.Yposition+1))[0];
        $n.myobj.Yposition++;
        console.log($newParent);
        $newParent.append($n);
        }else{
            console.log("no more move down Y"+item.Yposition);
        }
    })
}

// MOVE LEFT FUNTION
function moveLeft(ship){
console.log("move left");
    if(ship.bodyBoat[0].Xposition>0){
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
    }else{
        console.log("no valid move X"+ship.bodyBoat[0].Xposition);
    }
}

// MOVE RIGHT FUNCTIONS
function moveRight(ship){
console.log("move right");
    if(ship.bodyBoat[ship.size-1].Xposition<9){
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
    }else{
        console.log("no valid move X"+ship.bodyBoat[ship.size-1].Xposition);
    }

}

//The followin 2 {} are me trying ToDo a valid move 
{
// function validMoveUp(ship){
//     let valid =true;
//     if(ship.bodyBoat[0].Yposition-2>=0){
//         ship.bodyBoat.forEach(function(item){
//             let $elemUp1 =  document.querySelectorAll(pathToX(item.Xposition)+pathToY(item.Yposition-1))[0];
//             let $elemUp2 =  document.querySelectorAll(pathToX(item.Xposition)+pathToY(item.Yposition-2))[0];
//             console.log($elemUp1);
//             console.log($elemUp2);
//             if (($elemUp1.hasChildNodes())||($elemUp2.hasChildNodes())){
//                 valid = !valid;
//             }
//         })
//     }else return true;
//     return valid;
// }
}
{
// function validMove(ship){
//     let valid = true
//     // check the UPPER position
//     ship.bodyBoat.forEach(function(item){
//         let $elemUp =  document.querySelectorAll(pathToX(item.Xposition)+pathToY(item.Yposition-2))[0];
//         if($elemUp.hasChildNodes()) {valid=false; console.log("up nope")};
//     })
//     if(!valid) return false;

//     //check the LOWER position
//     ship.bodyBoat.forEach(function(item){
//         let $elemDown =  document.querySelectorAll(pathToX(item.Xposition)+pathToY(item.Yposition+2))[0];
//         if($elemDown.hasChildNodes()) {valid=false; console.log("down nope")};
//     })
//     if(!valid) return false;


//     //check the leftEXTREME

//     //check the rightEXTREME

//     //THE END of the check , the move is Valid
//     return true;

// }
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
//Creating the BOAT
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
                    that.boatIsClicked = false;
                    console.log("click canceled"); 
                    setAllCells(that.bodyBoat,false);      
                    myFunc4(that,false)             
                }
                else {
                    item.isClicked = true;
                    that.boatIsClicked = true;
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
    $(btn).attr('onclick', 'prepareStart()');    // ready onclick calls setup() function
    btn.appendChild(t);
    document.getElementById("ready").appendChild(btn);
    //remove rotate box, ships 
   
    return true;
}




//PRE READY STATE

//prepare the boatArray
function preReady(){
console.log("hi");
myFunc3();


var boat51 = new boat(5);
boat51.createBody(0,0);
boatArray.push(boat51);


var boat41 = new boat(4);
boat41.createBody(0,2);
boatArray.push(boat41);

var boat31 =  new boat(3);
boat31.createBody(0,4);
boatArray.push(boat31);

var boat32 = new boat(3);
boat32.createBody(5,4);
boatArray.push(boat32);

var boat21 = new boat(2);
boat21.createBody(0,6);
boatArray.push(boat21);

boatArray.forEach(function(item){
    item.boatClicked(item);
})
ready();
}


// POST READY STATE



// after Ready is Pressed
function prepareStart(){
    document.getElementById("ready").remove();
    console.log("GO");
    console.log(boatArray);
    //Stop any Event Listener
    boatArray.forEach(function(item){
        myFunc4(item,false);
        item.bodyBoat.forEach(function(item2){
            let it = document.querySelectorAll(pathToX(item2.Xposition)+pathToY(item2.Yposition))[0];
            it.addEventListener("click",function(event){
                event.stopPropagation();
            },true);
            

        })
    })

    let opCell = [].slice.call(document.getElementsByClassName("table-cell-oponent"));
    console.log(opCell);
    // Making the Oponents cell being Clicked no more than ones
    opCell.forEach(function(item){
        item.myValue = false;
    })
    opCell.forEach(function(item){
        item.addEventListener("click",function(){
            if(item.myValue==false){
                item.myValue = true;
                console.log("I am clicked");
                item.classList.add("iWasClicked");

                let a ={
                    messageType:"uShotMe",
                    data: item.id
                }
                
                let ahit = JSON.stringify(a);
                gamestate.sendmsg(ahit)

            }else{
                console.log("I was AlreadyClicked");
            }
        })
    })

    setup();

}

function GameState(socket) {
    this.socket = socket;
    this.sendmsg = function(message) {
      this.socket.send(message);
    }
}

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



// The ExecutTIon of the Program
preReady();
console.log(boatArray);


