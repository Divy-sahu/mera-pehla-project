let textnote= document.getElementById("textarea");
let addnote=document.getElementById("notebutton");
let spn= document.getElementById("spn");
let errorMessage = document.getElementById("error-message");

const colorPicker = document.getElementById("colorPicker");
 const colorDisplay = document.getElementById("colorDisplay");
var  chosenColor;
        // Listen for change events on the color picker
        colorPicker.addEventListener("input", function() {

            // Get the value of the chosen color
            console.log("jjslkjf")
             chosenColor = colorPicker.value;
            console.log("color", chosenColor)
            
            
            
            // Apply the chosen color to the div
        });
        


let count =0



 addnote.addEventListener("click", () => {
    const note = textnote.value.trim();
    count++;
    if (note) {
       let notetext= localStorage.setItem("note", note);  
        console.log("Note saved:", note);   
        spn.textContent="";
     const noteDiv = document.createElement("div");
    
    noteDiv.classList.add("note");
      noteDiv.style.backgroundColor = chosenColor;
    noteDiv.id = "box" + count,
    noteDiv.textContent = note;
    page2.appendChild(noteDiv);
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("clsbtn");
    noteDiv.appendChild(closeBtn);
    closeBtn.innerText = "X";
    textnote.value="";
      closeBtn.addEventListener("click", function () {
        noteDiv.remove();  
        console.log("Note removed: " + noteDiv.id);
console.log(page2.children.length)
        if (page2.children.length === 1) {
                spn.textContent = "No notes available";  // If no notes, show "stick"
            }
            console.log("Note removed: " + noteDiv.id);

   

});
    }
else {
        // Show error message and apply styling
        errorMessage.style.display = "block";
        textnote.style.border = "2px solid red";  // Change border to red

        // Optional: Shake effect (if you want)
        textnote.classList.add("shake");
        
        // Remove shake effect after animation ends
        setTimeout(() => {
            textnote.classList.remove("shake");
        }, 500);
    }

    });




   





