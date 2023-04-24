var socket = new WebSocket("ws://cpsc484-04.yale.internal:8888/frames");

var host = "cpsc484-04.yale.internal:8888";

$(document).ready(function () {
    frames.start();
});

var frames = {
    socket: null,

    start: function () {
        var url = "ws://" + host + "/frames";
        frames.socket = new WebSocket(url);
        frames.socket.onmessage = function (event) {
            frames.show(JSON.parse(event.data));
            //My own line below:
            let frame = JSON.parse(event.data);
            if(frame.people.length > 0){
                document.getElementById("inputtest").innerHTML = "Someone at display";
                document.getElementById("postest").innerHTML = frame.people[0].joints[8].position.x.toString();
                let lh = frame.people[0].joints[8].position.y;
                let ls = frame.people[0].joints[5].position.y;
                let rh = frame.people[0].joints[15].position.y;
                let rs = frame.people[0].joints[12].position.y;

                let lhx = frame.people[0].joints[8].position.x;
                let lsx = frame.people[0].joints[5].position.x;
                let rhx = frame.people[0].joints[15].position.x;
                let rsx = frame.people[0].joints[12].position.x;
                
                if(leftArmSelection(lhx, lsx)){
                    //Select left option
                    //resultsScreen(1);
                    document.getElementById("selectionTEster").innerHTML = "left selection";
                }
                else if(rightArmSelection(rhx, rsx)){
                    //Select right option
                    //resultsScreen(0);
                    document.getElementById("selectionTester").innerHTML = "right selection";
                }
                else{
                    document.getElementById("selectionTester").innerHTML = "no selection";
                }

                console.log(lhx.toString());
                console.log(lsx.toString());

                //Allow user to select answers with their hands
                if(currentSceneType == "question"){
                    if(leftArmSelection(lhx, lsx) && rightArmSelection(rhx, rsx)){
                        //Nothing happens
                    }
                    else if(leftArmSelection(lhx, lsx)){
                        //Select left option
                        resultsScreen(1);
                    }
                    else if(rightArmSelection(rhx, rsx)){
                        //Select right option
                        resultsScreen(0);
                    }
                    else{
                        //nothing happens;
                    }
                }

                if(currentSceneType == "instructionsScreen"){
                    if(leftArmSelection(lhx, lsx) && rightArmSelection(rhx, rsx)){
                        //Nothing happens
                    }
                    else if(leftArmSelection(lhx, lsx)){
                        //Select left option
                        console.log("left");
                        startTrivia(1);
                    }
                    else if(rightArmSelection(rhx, rsx)){
                        //Select right option
                        console.log("right");
                        startTrivia(2);
                    }
                }

                //Allow user to transition with their arms.
                if(currentSceneType == "titleScreen"){
                    if(armsRaised(lh, ls, rh, rs) == "left"|| armsRaised(lh, ls, rh, rs) == "right"){
                        displayInstructions();
                    }
                }
                else if(currentSceneType == "instructionsScreen"){
                    if(leftArmRaised(lh, ls)){
                        startGame();
                    }
                }
                else if(currentSceneType == "pickGameMode"){
                    if(leftArmSelection(lhx, lsx)){
                        startTrivia(0);
                    }
                    else if(rightArmSelection(rhx, rsx)){
                        startTrivia(1);
                    }
                }
                else if(currentSceneType == "question"){
                    if(leftArmSelection(lhx, lsx)){
                        resultScreen(0);
                    }
                    else if(rightArmSelection(rhx, rsx)){
                        resultScreen(1);
                    }
                }
            }
            else{
                //initialize();
                document.getElementById("inputtest").innerHTML = "Nobody at display";
                document.getElementById("postest").innerHTML = 'no people';
            }
        }
    },

    show: function (frame) {
        console.log(frame);
    }
};

var twod = {
    socket: null,

    // create a connection to the camera feed
    start: function () {
        var url = "ws://" + host + "/frames";
        twod.socket = new WebSocket(url);

        // whenever a new frame is received...
        twod.socket.onmessage = function (event) {

            // parse and show the raw data
            twod.show(JSON.parse(event.data));
        }
    },

    // show the image by adjusting the source attribute of the HTML img object previously created
    show: function (twod) {
        $('img.twod').attr("src", 'data:image/pnjpegg;base64,' + twod.src);
    },
};

//EDITED CODE
function sendPositionToDisplay(){
    let position = positionCheck();
    document.getElementById("inputtest").innerHTML = position.toString();
}

function leftArmRaised(lh, ls){
    if(lh < ls){
        return true;
    }
    else{
        return false;
    }
}

function rightArmRaised(rh, rs){
    if(rh < rs){
        return true;
    }
    else{
        return false;
    }
}

function leftArmSelection(lhx, lsx){
    if((lhx - lsx) > 450){
        return true;
    }
    else{
        return false
    }
}

function rightArmSelection(rhx, rsx){
    if((rsx - rhx) > 450){
        return true;
    }
    else{
        return false;
    }
}

function isPlayerPresent(frameinput){
    if(frameinput.people.length > 0){
        return true;
    }
    else{
        return false;
    }
}

function displayPosition(frame){
    if(positionCheck(frame) == "left"){
        document.getElementById("postest").innerHTML = "left";
    }
    else if(positionCheck(frame) == "right"){
        document.getElementById("postest").innerHTML = "right";
    }
    else{
        document.getElementById("postest").innerHTML = "nobody here!";
    }
}

function armsRaised(lh, ls, rh, rs){
    if(leftArmRaised(lh, ls) && rightArmRaised(rh, rs)){
        document.getElementById("armtest").innerHTML = "both arms raised";
        return "both";
    }
    else if(leftArmRaised(lh, ls)){
        document.getElementById("armtest").innerHTML = "left arm raised";
        return "left";
    }
    else if(rightArmRaised(rh, rs)){
        document.getElementById("armtest").innerHTML = "right arm raised";
        return "right";
    }
    else{
        document.getElementById("armtest").innerHTML = "no arms raised";
        return "none";
    }
}