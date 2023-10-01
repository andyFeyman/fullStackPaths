// the click press event
for(var i =0;i<7;i++){
    document.querySelectorAll(".drum")[i].addEventListener("mouseup", function () {
        this.style.color="#DA0463";
    });
    document.querySelectorAll(".drum")[i].addEventListener("mousedown",function (){

        this.style.color="white";
        var clickButtonText = this.innerHTML;
        makeSounds(clickButtonText);
        animation(clickButtonText);
        }
    )
}

// the keyboard event
document.querySelector("body").addEventListener("keydown", (event) =>  {
    var userPressKey = event.key;
    makeSounds(userPressKey);
    animation(userPressKey);

    }   
);

// let event make some sounds
function makeSounds(theKey){
    switch (theKey) {
        case "w":
            var audioW = new Audio("sounds/crash.mp3");
            audioW.play();
            break;
            
        case "a":
            var audioA = new Audio("sounds/kick-bass.mp3");
            audioA.play();
            break;

        case "s":
            var audioS = new Audio("sounds/snare.mp3");
            audioS.play();
            break;
        case "d":
            var audioD = new Audio("sounds/tom-1.mp3");
            audioD.play();
            break;  
        case "j":
            var audioJ = new Audio("sounds/tom-2.mp3");
            audioJ.play();
            break; 
        case "k":
            var audioK = new Audio("sounds/tom-3.mp3");
            audioK.play();
            break;   

        case "l":
            var audioL = new Audio("sounds/tom-4.mp3");
            audioL.play();
            break;  

        default:
            break;
    }
}


function animation(e) {
    document.querySelector("."+e).classList.add("pressed");
    setTimeout(function () {
        document.querySelector("."+e).classList.remove("pressed"); 
    },100);
}