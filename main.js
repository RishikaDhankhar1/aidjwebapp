leftwristx=0;
rightwristx=0;
leftwristy=0;
rightwristy=0;
song="";
scoreleftwrist="";
scorerightwrist="";
function preload(){
    song=loadSound("music.mp3");

}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPosses);
}

function gotPosses(results){
    if(results.length>0){
        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        scorerightwrist=results[0].pose.keypoints[10].score;
        console.log("scoreleftwrist="+scoreleftwrist);
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log("leftwristx="+leftwristx+",leftwristy="+leftwristy);
        console.log("rightwristx="+rightwristx+",rightwristy="+rightwristy);
    }
    
}

function modelLoaded(){
    console.log("poseNet is initiallized");

}





function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scorerightwrist>0.2)
    {
        circle(rightwristx,rightwristy,20);
        if(rightwristy>0 && rightwristy<=100)
        {
            document.getElementById("speed").innerHTML="Speed = 0.5x " ;
            song.rate(0.5);
        }

        if(rightwristy>100 && rightwristy<=200)
        {
            document.getElementById("speed").innerHTML="Speed = 1x " ;
            song.rate(1)
        }
        if(rightwristy>200 && rightwristy<=300)
        {
            document.getElementById("speed").innerHTML="Speed = 1.5x " ;
            song.rate(1.5);
        }

        if(rightwristy>300 && rightwristy<=400)
        {
            document.getElementById("speed").innerHTML="Speed = 2x " ;
            song.rate(2);
        }
        else if(rightwristy>400)
        {
            document.getElementById("speed").innerHTML="Speed = 2.5x";
            song.rate(2.5);
        }
    }

    
    if(scoreleftwrist>0.2)
    {
        circle(leftwristx,leftwristy,20);
        inNumberleftWristy= Number(leftwristy);
        remove_decimals=floor(inNumberleftWristy);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="volume = "+volume;
        song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

