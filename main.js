rightwristx = 0;
rightwristy = 0;
leftwristx = 0;
leftwristy = 0;
scoreLeftWrist = 0;
scoreRightwrist = 0;
var song ="";
function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
video= createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}
function draw(){
image(video,0,0,600,500);

fill("#ff000");
stroke("#ff000");

if(scoreRightwrist > 0.2)
{
circle(rightwristx,rightwristy,20);

if(rightwristy>0 && rightwristy <100)
{
    document.getElementById("speed").innerHTML = "Speed = 0.5x";
    song.rate(0.5);
}
    else if(rightwristy>100 && rightwristy<=200)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }

else if(rightwristy>200 && rightwristy<=300)
{
    document.getElementById("speed").innerHTML = "Speed = 1.5x";
    song.rate(1.5);
}

else if(rightwristy>300 && rightwristy<=400)
{
    document.getElementById("speed").innerHTML = "Speed = 2x";
    song.rate(2);
}

else if(rightwristy>400 && rightwristy<=500)
{
    document.getElementById("speed").innerHTML = "Speed = 2.5x";
    song.rate(2.5);
}


}

}
if(scoreLeftWrist > 0.2)
{
circle(leftwristx,leftwristy,20);
InNumberleftWristY = Number(leftwristy);
remove_decimal = floor(InNumberleftWristY);
volume = remove_decimal/500;
leftWristy_divide_1000= remove_decimal/1000;
volume = leftWristy_divide_1000 *2;
document.getElementById("volume").innerHTML="Volume = " + volume;
song.setVolume(volume);
}

function Play(){
    song.play();
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightwrist= results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightwrist + "scoreLeftWrist =" + scoreLeftWrist);

        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log("rightWristX = " +  rightwristx + "rightWristY"+ rightwristy);

        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        console.log("leftWristX = " +  rightwristx + "leftWristY"+ rightwristy);
        console.log("right wrist x = "+rightwristx+" y =" + rightwristy);
        console.log("left wrist x = "+leftwristx+" y =" + leftwristy);
    }
}
function modelLoaded(){
    console.log ("pose net is loaded");
}
