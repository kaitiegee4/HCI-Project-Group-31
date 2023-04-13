function initialize(){
    document.getElementsByClassName("countryButtons").style.display = 'none';
    document.getElementById("score").style.display = 'none';
}

function startGame(){
    document.getElementById("score").style.display = 'block';
    document.getElementById("selectCountry").style.display = 'block';
    document.getElementById("playbutton").style.display = 'none';
    document.getElementById("canadaButton").style.display = 'block';
    document.getElementById("brazilButton").style.display = 'block';
    document.getElementById("southAfricaButton").style.display = 'block';
}

function startCanada(){
    document.getElementById("brazilButton").style.display = 'none';
    document.getElementById("selectCountry").textContent = "Your first destination is CN Tower";
    document.getElementById("canadaButton").style.display = 'none';
}
