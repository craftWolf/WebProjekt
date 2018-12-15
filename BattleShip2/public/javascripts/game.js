//  FUNTIONS THAT gives THE ATRIBUTE *data-x & data-y
function pathToX(value){
    return "[data-x=\'"+value+"\']";
}
function pathToY(value){
    return "[data-y=\'"+value+"\']";
}

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
        this.getIsClicked=function(){return this.isClicked};
        this.setIsClicked =function(x){this.isClicked=x};
        this.setInBoat = function(inBoat){this.inBoatPosition=inBoat;}
        this.getInBoat = function() {return this.inBoatPosition}
        this.createCell = function(){
            //CREATED THE DRAGGABLE ELEMENT
            const $n = document.createElement("div");
            $n.classList.add("table-cell-tile");
            $n.setAttribute("id",this.id);
            
            // assigning the JS object to the DOM-Element representation 
            $n.myobj = this;
            console.log($n.myobj);

            // Making it Draggable
            $n.setAttribute("draggable","true");
            $n.setAttribute("ondragstart","drag(event)");

            // ADDING IT TO DOM
            let x = pathToX(this.Xposition)+pathToY(this.Yposition);
            console.log(x)
            let $elem =  document.querySelectorAll(x)[0];
            $elem.append($n);            
        }
        this.cellClicked = function(that){
            let $elem =  document.querySelectorAll(pathToX(that.Xposition)+pathToY(that.Yposition))[0].querySelector("div");
            $elem.addEventListener("click",function(){
                console.log($elem);
                if (that.isClicked) {that.isClicked = false;}
                else (that.isClicked = true)
            
                console.log("cell x:%d y:%d",that.Xposition,that.Yposition)
                console.log(that.isClicked);
                // console.log("yes");

            })
        }
    }else alert("invalid position to create cell")
}

// IT CREATES THE BOAT 
// USING A PARAMETER TO DETERMINE THE SIZE OF THE BOAT 
function boat(size){
    this.size = size;
    this.type = "";
    this.boatIsClicked=false;
    this.setType = function(type){this.type=type};
    this.getType = function(){return this.type};
    this.getSize = function(){return this.size};
    this.bodyBoat = new Array(this.size);
    this.createBody = function(x,y){
        for(var i=0;i<this.bodyBoat.length;i++){
          this.bodyBoat[i]= new cell(x+i,y)
          this.bodyBoat[i].inBoatPosition=i;
          this.bodyBoat[i].id = "ship:"+this.size+"_cell:"+i;
          this.bodyBoat[i].createCell(x+i,y)
          this.bodyBoat[i].cellClicked(this.bodyBoat[i])
        }
    }
    this.boatClicked = function(that){
        setInterval(function(){
            that.bodyBoat.forEach(function(item){
                if (item.isClicked) {
                    item.isClicked=false;
                    that.boatIsClicked = true;
                    console.log("in boat");
                    // console.log(item.isClicked);
                    // console.log(that.boatIsClicked);
                }
            })
        },10)
    }
}

// OUR BOARD OBJECT contains THE PLAYER-TABLE  & THE OPPONENT-TABLE
function board(){
    this.playerTable = document.querySelector(".player-table");
    this.oponentTable = document.querySelector(".oponent-table");
    this.playerCellsItems =[].slice.call(document.getElementsByClassName("table-cell-player"));
    this.oponentCellsItems = [].slice.call(document.getElementsByClassName(".table-cell-oponent"));
}


// MU FUNC3 ADDS CONTENT TO PLAYER TABLE IN DOM
function myFunc3(){
    for(var i=0;i<10;i++){
        for(var j=0;j<10;j++){
            let pathx = "[data-x=\'"+i+"\']";
            let pathy = "[data-y=\'"+j+"\']";
            document.querySelector(pathx+pathy).setAttribute("onclick","");
            document.querySelector(pathx+pathy).setAttribute('id',i+""+j);
            //  FOR THE DROP EVENT 
            //REQUIREMENT
            document.querySelector(pathx+pathy).setAttribute("ondrop","drop(event)");
            document.querySelector(pathx+pathy).setAttribute("ondragover","allowDrop(event)");

            //ADDITIONAL ???
            document.querySelector(pathx+pathy).addEventListener('dragover', handleDragOver, false);

        }
    }
}

let boatsCollector = [];

let cell1 = new cell(1,1);
cell1.createCell();
cell1.cellClicked(cell1);


let boat1 = new boat(4);
boat1.createBody(3,3);
boat1.boatClicked(boat1);
boatsCollector.push(boat1);

let boat2 = new boat(3);
boat2.createBody(5,6);
boat2.boatClicked(boat2);
boatsCollector.push(boat2);

// const kekek = "ship:3_cell:2";
// // console.log(total boats: ${JSON.stringify(boatsCollector)});
// console.log('totals:');
// boatsCollector.forEach(element => {
//     // console.log(element);
//     element.bodyBoat.forEach(elem => {
//         if (elem.id === kekek) {
//             console.log("Magic happens");
//         }
//         console.log(elem.id);     
//     });
// });



// MYFUNC4 CHANGES/ UPDATES THE CELL POSITION  
// after it being moved to another place
function myFunc4(newX,newY,obj){
    console.log("old X"+obj.Xposition);
    console.log("old Y"+obj.Yposition);
    obj.Xposition = newX;
    obj.Yposition = newY;
    console.log("new X"+obj.Xposition);
    console.log("new Y"+obj.Yposition);
    console.log(obj);
}


// THE DRAG FUNCTIONS
function allowDrop(ev) {
    ev.preventDefault();
}
  
// function drag(ev) {
//     ev.dataTransfer.setData("text", ev.target.id);
//     console.log(ev.target.id);
// }
  

function drag(ev) {
    console.log(ev.target.id);
    boatsCollector.forEach(element => {
        element.bodyBoat.forEach(elem => {
            console.log($(ev.target.id));
            if (elem.id.match(/\d+/g).map(Number)[0] === ev.target.id.match(/\d+/g).map(Number)[0]) {
                ev.dataTransfer.setData("text", elem.id);

                console.log("Magic happens");
            }
        });
    });
    // ev.dataTransfer.setData("text", ev.target.id);
}


function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    // CREATING THE OBJECT TO BE PASSED && ITS PARENT TO READ THE NEW POSSITION
    let father =  document.getElementById(data).parentElement;
    let obj = document.getElementById(data).myobj;
    // CALLING TO UPDATE THE POSITION
    myFunc4(father.getAttribute("data-x"),father.getAttribute("data-y"),obj);
}
// ADDITIONAL 
// nu folosesc asta inka 
function handleDragOver(e) {

    console.log("over");
}




//  EXECUTION OF THE FUNCTION


console.log("hi");
myFunc3();

// let cell1 = new cell(1,1);
// cell1.createCell();
// cell1.cellClicked(cell1);

// let boat1 = new boat(4);
// boat1.createBody(3,3);
// boat1.boatClicked(boat1);

// let boat2 = new boat(3);
// boat2.createBody(5,6);
// boat2.boatClicked(boat2);



function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");

    boatsCollector.forEach(element => {
        element.bodyBoat.forEach(elem => {
            // console.log(`${data}`, elem);
            if (elem.id.match(/\d+/g).map(Number)[0] === data.match(/\d+/g).map(Number)[0]) {
                // ev.dataTransfer.setData("text", elem.id);
                console.log(`data: ${data}`, ` data match: ${data.match(/\d+/g).map(Number)[0]}`);
                console.log(`elem.id: ${elem.id}`, ` elem.id match: ${elem.id.match(/\d+/g).map(Number)[0]}`);

                ev.target.appendChild(document.getElementById(elem.id));
                let father =  document.getElementById(elem.id).parentElement;
                let obj = document.getElementById(elem.id).myobj;
                console.log("Magic happens");
            }
        });
    });
    // let data = ev.dataTransfer.getData("text");
    // ev.target.appendChild(document.getElementById(data));
    // CREATING THE OBJECT TO BE PASSED && ITS PARENT TO READ THE NEW POSSITION
    // let father =  document.getElementById(data).parentElement;
    // let obj = document.getElementById(data).myobj;
    // CALLING TO UPDATE THE POSITION
    myFunc4(father.getAttribute("data-x"),father.getAttribute("data-y"),obj);
}