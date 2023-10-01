

function getDiceImg(){
    let randomDice = Math.floor((Math.random())*6+1);
    return randomDice;
}



function bodyOnload(){
    let img1Num =getDiceImg();
    let img2Num =getDiceImg();
    console.log("images/dice"+img2Num+".png");

    document.querySelector(".img1").setAttribute("src","images/dice"+img1Num+".png"); 
    document.querySelector(".img2").setAttribute("src","images/dice"+img2Num+".png"); 
    

    if (img1Num > img2Num){
        document.querySelector("h1").innerHTML=("🚩 Player 1 Wins!");
    }else if (img1Num === img2Num){
        document.querySelector("h1").innerHTML=(" Draw! ");
    }
    else {
        document.querySelector("h1").innerHTML=("Player 2 Wins! 🚩");
    }
}


