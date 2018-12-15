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
            document.querySelector(pathx+pathy).setAttribute("onclick","");
            document.querySelector(pathx+pathy).setAttribute('id',i+""+j);
            //  FOR THE DROP EVENT 
            //REQUIREMENT
            document.querySelector(pathx+pathy).setAttribute("ondrop","drop(event)");
            document.querySelector(pathx+pathy).setAttribute("ondragover","allowDrop(event)");

            //ADDITIONAL ???
        }
    }
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
            // console.log($n.myobj);

            // ADDING IT TO DOM
            let x = pathToX(this.Xposition)+pathToY(this.Yposition);
            // console.log(x)
            let $elem =  document.querySelectorAll(x)[0];
            $elem.append($n);            
        }
        this.cellClicked = function(that){
            let $elem =  document.querySelectorAll(pathToX(that.Xposition)+pathToY(that.Yposition))[0].querySelector("div");
            $elem.addEventListener("click",function(){
                if (that.isClicked) {
                    that.isClicked = false;
                    console.log("click canceled");                    
                }
                else {
                    that.isClicked = true;
                    console.log("click started");
                }

                // console.log("cell x:%d y:%d",that.Xposition,that.Yposition)
                // console.log(that.isClicked);
                // console.log($elem.getBoundingClientRect());// use to display the absoulute position 

                // console.log("yes");

            })
        }
    }else alert("invalid position to create cell")
}


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
        let displayed = false;
        // that.bodyBoat.forEach(function(item){
        //     let $n = document.querySelectorAll(pathToX(item.Xposition)+pathToY(item.Yposition))[0].querySelector("div");
        //     $n.onchange=function(){console.log("ye ")}
        //     if (item.isClicked){
        //     console.log(item);
        //     }
        // }
        // )


        setInterval(function(){
            that.bodyBoat.forEach(function(item){
                if (item.isClicked) {
                    
                    let move = false;

                    //  MOVE UP
                    window.addEventListener("keypress", function(event) {
                        if ((event.code.toLocaleLowerCase() === 'keyw')) {
                            if (!displayed){
                            // console.log("up")
                            moveUp(that);
                            displayed=true;
                            }
                        }
                    })

                    // MOVE DOWN
                    window.addEventListener("keypress", function(event) {
                        if ((event.code.toLocaleLowerCase() === 'keys')) {
                            if (!displayed){
                            // console.log("down");
                            moveDown(that);
                            displayed=true;
                            }
                        }
                    })

                    // MOVE TO RIGHT
                    window.addEventListener("keypress", function(event) {
                        if ((event.code.toLocaleLowerCase() === 'keya')) {
                            if (!displayed){
                            // console.log("left");
                            moveLeft(that);
                            displayed=true;
                            }
                        }
                    })

                    // MOVE TO LEFT
                    window.addEventListener("keypress", function(event) {
                        if ((event.code.toLocaleLowerCase() === 'keyd')) {
                            if (!displayed){
                            // console.log("right");
                            moveRight(that);
                            displayed=true;
                            }
                        }
                    })
                    displayed=false;
                    that.boatIsClicked = true;
                }
                else{}
            })
        },100)
    }
}









// The ExecutTIon of the Program

console.log("hi");
myFunc3();

let cell1 = new cell(1,1);
cell1.createCell();
cell1.cellClicked(cell1);

let boat1 = new boat(4);
boat1.createBody(3,3);
boat1.boatClicked(boat1);

let boat2 = new boat(3);
boat2.createBody(5,6);
boat2.boatClicked(boat2);

