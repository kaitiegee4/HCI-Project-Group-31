let score = 0;

function initialize(){
    document.getElementsByClassName("countryButtons").style.display = 'none';
    document.getElementById("scoreGroup").style.display = 'none';
    document.getElementById("scoreVal").innerHTML = "0";
}

function startGame(){
    document.getElementById("scoreGroup").style.display = 'block';
    document.getElementById("scoreVal").innerHTML = score.toString();
    document.getElementById("selectCountry").style.display = 'block';
    document.getElementById("playbutton").style.display = 'none';
    document.getElementById("canadaButton").style.display = 'block';
    document.getElementById("brazilButton").style.display = 'block';
    document.getElementById("southAfricaButton").style.display = 'block';
}

function startCanada(){
    document.getElementById("brazilButton").style.display = 'none';
    document.getElementById("canadaButton").style.display = 'none';
    document.getElementById("cnTowerQuestion").style.display = 'block';
    document.getElementById("selectCountry").style.display = 'none';
}

function resultScreen(correct){
    document.getElementById("cnTowerQuestion").style.display = "none";

    if (correct == 1) {
        score = score + 1;
        document.getElementById("correctDisplay").style.display = "block";
    }
    else {
        document.getElementById("incorrectDisplay").style.display = "block";
    }   

    document.getElementById("scoreVal").innerHTML = score.toString();

}