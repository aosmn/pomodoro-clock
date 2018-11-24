let timer = {};

let session = 25;
let breakLength = 5;

let count = session;
let breakTime = breakLength - 1;
let isBreak = false;
let allSeconds = session*60;
let renderedTime = "";


let secondsInMinute = 60;
let secondsCount = 0;
let hours = 0;
let minutes = 0;


let isPaused = false;
let changed = false;

let isRunning = false;

$("input").change(e => {
  changed = true;
  if($("#session").val())
    session = $("#session").val();
  if($("#break").val())
    breakLength = $("#break").val();
  
  
  $("#label").html("Session");
  
  $("#reset").hide();
  count = session;
  allSeconds = session*60;
  secondsCount = 0;
  breakTime = breakLength - 1;
  renderTime();
});

$("#start").click(e => { 
  e.preventDefault();
  if (isRunning) {
    $("#reset").show();
    isPaused = true;
    clearInterval(timer);
    $("input").attr("disabled", false);
    
    if(!isBreak)
      $("#label").html("Session paused");
    else
      $("#label").html("Break paused");
  } else {
    
    $("#reset").hide();
    $("input").attr("disabled", true);

    if($("#session").val())
      session = $("#session").val();
    if($("#break").val())
      breakLength = $("#break").val();

    if (changed) {
      changed = false;
      isPaused = false;
      secondsCount = 0;
    }

    if (!isPaused) {
      count = session;
      allSeconds = session*60;
      breakTime = breakLength - 1;
      isBreak = false;
    }
    
    if(!isBreak)
      $("#label").html("Session");
    else
      $("#label").html("Break");

    console.log(session, breakLength);
    timer = setInterval(myTimer, 1000);
  }

  isRunning = !isRunning;
});

function myTimer() {
  countSeconds();
  renderTime();
}

function countSeconds() {
  // var audio = new Audio('https://www.freespecialeffects.co.uk/soundfx/computers/bleep_06.wav');
  var audioWork = new Audio('https://www.freespecialeffects.co.uk/soundfx/computers/bleep_02.wav');
  var audioBreak = new Audio('https://www.freespecialeffects.co.uk/soundfx/computers/computerbeep2.wav');
  if (secondsCount > 0) {
    secondsCount--;
  } else {
    secondsCount = 59;
    if (isBreak) {
      if (breakTime == 0) {
        isBreak = false;
        breakTime = breakLength;
        console.log(breakLength);
        allSeconds = session*60;
        audioWork.play();
        $("#circle").removeClass("break");
        $("#circle2").removeClass("break");
        $("#label").removeClass("break");
        $("#label").html("Session");
      }
      breakTime--;
    } else {
      if (count == 0) {
        isBreak = true;
        audioBreak.play();
        
        $("#circle").addClass("break");
        $("#circle2").addClass("break");
        $("#label").addClass("break");
        $("#label").html("Break");
        count = session;
        allSeconds = breakLength*60;
      }
      count--;
    }
  }
  allSeconds--;
}

function renderTime(){
  var counterCount = isBreak ? breakTime : count;
  
  hours = Math.floor(counterCount/60);
  minutes = counterCount % 60;
  
  if(counterCount >= 60){
    renderedTime = (hours < 10 ? "0"+hours : hours) + ":"+ (minutes < 10 ? "0"+minutes : minutes) + ":" + (secondsCount < 10 ? "0"+secondsCount : secondsCount);
  } else {
    renderedTime = (minutes < 10 ? "0"+minutes : minutes) + ":" + (secondsCount < 10 ? "0"+secondsCount : secondsCount);
  }
  
  fillCounter();
}

      
let counter = document.getElementById("counter").getContext("2d");
let no = 0;
let pointToFill = 1.5*Math.PI;
let cw = counter.canvas.width;
let ch = counter.canvas.height;
let diff;
function fillCounter(){
  var allCount = isBreak ? breakLength*60 : session*60;
  diff = (((allCount-allSeconds)/allCount)*Math.PI*2);
  counter.clearRect(0,0,cw,ch);
  counter.lineWidth = 5;
  counter.fillStyle = isBreak ? "#0881A3" : "#F4E7D3";
  counter.strokeStyle = isBreak ? "#0881A3" : "#F4E7D3";
  counter.textAlign= "center";
  counter.font = "45px Dosis";
  counter.fillText(renderedTime,150,165);
  counter.beginPath();
  counter.arc(150,150,145,pointToFill,diff+pointToFill);
  counter.stroke();
 }
      
$((e)=>{
  if($("#session").val())
    session = $("#session").val();
  if($("#break").val())
    breakLength = $("#break").val();
  
  
  count = session;
  allSeconds = session*60;
  secondsCount = 0;
  breakTime = breakLength - 1;
  renderTime();
});

$("#reset").click(e => {
  isBreak = false;
  count = session;
  allSeconds = session*60;
  secondsCount = 0;
  breakTime = breakLength - 1;
  renderTime();
  
  $("#label").html("Session");
  $("#circle").removeClass("break");
  $("#circle2").removeClass("break");
  $("#label").removeClass("break");
  $("#reset").hide();
});

$("input").focus(e=>{
  $(e.target).select();
});