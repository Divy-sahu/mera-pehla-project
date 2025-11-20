
let cirlecolor=document.getElementById("color");
let shape=document.getElementById("shape");
let circle=document.getElementById("circle");
let innerDiv = circle.querySelector('.square');
let shapeBox = document.getElementById("shapeBox");


shape.addEventListener("click", function() {
    if(shapeBox.className == "square"){
        shapeBox.classList.remove("square");
        shapeBox.classList.add("triangle");
    } else {
        shapeBox.classList.remove("triangle");
        shapeBox.classList.add("square");
    }

   
    console.log(getComputedStyle(circle).backgroundColor);
});


const colors = ["violet", "blue", "yellow", "purple", "orange", "pink"];
let index = 0
function randomcolor(){

const color = colors[index];
    index = (index + 1) % colors.length; 
    return color;

}

cirlecolor.addEventListener("click", function () {
  
    circle.style.backgroundColor = randomcolor();
});
    


