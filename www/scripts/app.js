// localStorage.setItem("solvedgame0","yes");
// localStorage.setItem("solvedgame1","yes");
// localStorage.setItem("solvedgame2","yes");
// localStorage.setItem("solvedgame3","yes");
// localStorage.setItem("solvedgame4","yes");
// localStorage.setItem("solvedgame5","yes");
// localStorage.setItem("solvedgame6","yes");
// localStorage.setItem("solvedgame7","yes");
// localStorage.setItem("solvedgame8","yes");
// localStorage.setItem("solvedgame9","yes");
// localStorage.setItem("solvedgame10","yes");
// localStorage.setItem("solvedgame11","yes");
// localStorage.setItem("solvedgame12","yes");
// localStorage.setItem("solvedgame13","yes");
// localStorage.setItem("solvedgame14","yes");
// localStorage.setItem("solvedgame15","yes");
// localStorage.setItem("solvedgame16","yes");
// localStorage.setItem("solvedgame17","yes");
// localStorage.setItem("solvedgame18","yes");
// localStorage.setItem("solvedgame19","yes");
// localStorage.setItem("solvedgame20","yes");
// localStorage.setItem("solvedgame21","yes");
// localStorage.setItem("solvedgame22","yes");
// localStorage.setItem("solvedgame23","yes");
// localStorage.setItem("solvedgame24","yes");
// localStorage.setItem("solvedgame25","yes");
// localStorage.setItem("solvedgame26","yes");
// localStorage.setItem("solvedgame27","yes");
// localStorage.setItem("solvedgame28","yes");
// localStorage.setItem("solvedgame29","yes");
// localStorage.setItem("solvedgame30","yes");
// localStorage.setItem("solvedgame31","yes");
// localStorage.setItem("solvedgame32","yes");
// localStorage.setItem("solvedgame33","yes");
// localStorage.setItem("solvedgame34","yes");
// localStorage.setItem("solvedgame35","yes");
// localStorage.setItem("solvedgame36","yes");
// localStorage.setItem("solvedgame37","yes");
// localStorage.setItem("solvedgame38","yes");
// localStorage.setItem("solvedgame39","yes");
// localStorage.setItem("solvedgame40","yes");
// localStorage.setItem("solvedgame41","yes");
// localStorage.setItem("solvedgame42","yes");
// localStorage.setItem("solvedgame43","yes");
// localStorage.setItem("solvedgame44","yes");
// localStorage.setItem("solvedgame45","yes");
// localStorage.setItem("solvedgame46","yes");
// localStorage.setItem("solvedgame47","yes");
// localStorage.setItem("solvedgame48","yes");
// localStorage.setItem("solvedgame49","yes");
// 
// localStorage.setItem("solvedgame50","yes");
// localStorage.setItem("solvedgame51","yes");
// localStorage.setItem("solvedgame52","yes");
// localStorage.setItem("solvedgame53","yes");
// localStorage.setItem("solvedgame54","yes");
// localStorage.setItem("solvedgame55","yes");
// localStorage.setItem("solvedgame56","yes");
// localStorage.setItem("solvedgame57","yes");
// localStorage.setItem("solvedgame58","yes");
// localStorage.setItem("solvedgame59","yes");
// localStorage.setItem("solvedgame60","yes");
// localStorage.setItem("solvedgame61","yes");
// localStorage.setItem("solvedgame62","yes");
// localStorage.setItem("solvedgame63","yes");
// localStorage.setItem("solvedgame64","yes");
// localStorage.setItem("solvedgame65","yes");
// localStorage.setItem("solvedgame66","yes");
// localStorage.setItem("solvedgame67","yes");
// localStorage.setItem("solvedgame68","yes");
// localStorage.setItem("solvedgame69","yes");
// localStorage.setItem("solvedgame70","yes");
// localStorage.setItem("solvedgame71","yes");
// localStorage.setItem("solvedgame72","yes");
// localStorage.setItem("solvedgame73","yes");
// localStorage.setItem("solvedgame74","yes");
// localStorage.setItem("solvedgame75","yes");
// localStorage.setItem("solvedgame76","yes");
// localStorage.setItem("solvedgame77","yes");
// localStorage.setItem("solvedgame78","yes");
// localStorage.setItem("solvedgame79","yes");
// localStorage.setItem("solvedgame80","yes");
// localStorage.setItem("solvedgame81","yes");
// localStorage.setItem("solvedgame82","yes");
// localStorage.setItem("solvedgame83","yes");
// localStorage.setItem("solvedgame84","yes");
// localStorage.setItem("solvedgame85","yes");
// localStorage.setItem("solvedgame86","yes");
// localStorage.setItem("solvedgame87","yes");
// localStorage.setItem("solvedgame88","yes");
// localStorage.setItem("solvedgame89","yes");
// localStorage.setItem("solvedgame90","yes");
// localStorage.setItem("solvedgame91","yes");
// localStorage.setItem("solvedgame92","yes");
// localStorage.setItem("solvedgame93","yes");
// localStorage.setItem("solvedgame94","yes");
// localStorage.setItem("solvedgame95","yes");
// localStorage.setItem("solvedgame96","yes");
// localStorage.setItem("solvedgame97","yes");
// localStorage.setItem("solvedgame98","yes");
// localStorage.setItem("solvedgame99","yes");

window.addEventListener('load', function () {
    new FastClick(document.body);
}, false);
function ResetCurrentGameCounters() {
  wrongMoves=0;
  wrongMovesNew=0;
  shownMoves=0;
}
function appReset() {
if (navigator.notification) {
  navigator.notification.alert('App reset successfully.',appResetConfirm,'Success!','OK');
  }
  else {
    alert("App reset successfully.");
    resetStorage();
    jQT.goTo('#home','slideright');
    // window.location.reload();
  }
}
function appResetConfirm() {
  resetStorage();
  jQT.goTo('#home','slideright');
}
function resetStorage() {
  for (var i=0; i<366; i++)
    {
      $('li.score'+i).removeClass('solved');
    }
  localStorage.clear();
  localStorage.setItem('currentgame','0');
  currentgame=0;
  localStorage.setItem('totalsolved','0');
  totalsolved = "0";
  localStorage.setItem('perfectgamestreak','0');
  perfectgamestreak = "0";
  localStorage.setItem('perfectgamestreakrecord','0');
  perfectgamestreakrecord = "0";
  localStorage.setItem('currentgamesolvedstreak','0');
  currentgamesolvedstreak = "0"; 
  localStorage.setItem('longestgamesolvedstreak','0');
  longestgamesolvedstreak = "0";
  localStorage.setItem('longestcorrectmovestreak','0');
  longestcorrectmovestreak = "0";
  localStorage.setItem('currentcorrectmovestreak','0');
  currentcorrectmovestreak = "0";
  localStorage.setItem('cheatbuttonclicks','0');
  cheatbuttonclicks = "0";
  localStorage.setItem('perfectgamecount','0');
  perfectgamecount = "0";
  localStorage.setItem('puzzlesattempted','0');
  puzzlesattempted = "0";
  localStorage.setItem('totalcorrectmoves','0');
  totalcorrectmoves = "0";
  localStorage.setItem('totalwrongmoves','0');
  totalwrongmoves = "0";
  localStorage.setItem('correctmoveratio','0');
  correctmoveratio = 0;
  localStorage.setItem('puzzlessolved','0');
  puzzlessolved = "0";
  localStorage.setItem('yourrank','pawn');
  yourrank = "pawn";
  localStorage.setItem("currentgamesolvedstreakmessage","");
  currentgamesolvedstreakmessage = "";
  localStorage.setItem("audiocontrol","off");
  audiocontrol = "off";
  isSolved=true;
  isSolved=false;
  EvalUrlString('',puzzle[0]);
  checkBoardRotation();
  updateBullets();
  ResetCurrentGameCounters();
  updateScores();
  updatePuzzleList();
  // for (var i=0; i<367; i++)
  //   {
  //     localStorage.setItem("solvedgame"+i,"no");
  //     localStorage.setItem("wrongmovesingame"+i,0); 
  //     localStorage.setItem("hintsthisgame"+i,0); 
  //   }
}
function hintButtonAlert() {
  if (navigator.notification) {
    navigator.notification.confirm(
              '',  // message
              hintButtonChoice,              // callback to invoke with index of button pressed
              'Help:',            // title
              'Make the correct move,Show tutorial,Report a bug,Cancel'          // buttonLabels
          );
  }
  // for testing in browser:
  else {
    ShowNextMoves(2);
    updateBullets();
    updateScores();
  }
}

function hintButtonChoice(button) {
  if (button==1) {
    ShowNextMoves(2);
    updateBullets();
    updateScores();
    // probably need a counter function here
  }
  if (button==2) {
    jQT.goTo('#tutorial','slideleft');
  }
  if (button==3) {
    jQT.goTo('#reportbug','slideleft');
  }
  if (button==4) {
    // do nothing, just close window
  }
}
function addBullet(number) { 
  // alert(number);
// for white moves
   if (number==1) {$('.bullet0').html('<a onclick="showMateInXMoves('+yes+');"><img src=\"images/read.svg\"></a>');}
   if (number==3) {$('.bullet1').html('<a onclick="showMateInXMoves('+yes+');"><img src=\"images/read.svg\"></a>');}
   if (number==5) {$('.bullet2').html('<a onclick="showMateInXMoves('+yes+');"><img src=\"images/read.svg\"></a>');}
   if (number==7) {$('.bullet3').html('<a onclick="showMateInXMoves('+yes+');"><img src=\"images/read.svg\"></a>');}
   if (number==9) {$('.bullet4').html('<a onclick="showMateInXMoves('+yes+');"><img src=\"images/read.svg\"></a>');}
  if (number==11) {$('.bullet5').html('<a onclick="showMateInXMoves('+yes+');"><img src=\"images/read.svg\"></a>');}
  if (number==13) {$('.bullet6').html('<a onclick="showMateInXMoves('+yes+');"><img src=\"images/read.svg\"></a>');}
  if (number==15) {$('.bullet7').html('<a onclick="showMateInXMoves('+yes+');"><img src=\"images/read.svg\"></a>');}
  if (number==17) {$('.bullet8').html('<a onclick="showMateInXMoves('+yes+');"><img src=\"images/read.svg\"></a>');}
  if (number==19) {$('.bullet9').html('<a onclick="showMateInXMoves('+yes+');"><img src=\"images/read.svg\"></a>');}
// for black moves                    '<a onclick="showMateInXMoves('+yes+');">                                 '
   if (number==2) {$('.bullet0').html('<a onclick="showMateInXMoves('+yes+');"><img src=\"images/read.svg\"></a>');}
   if (number==4) {$('.bullet1').html('<a onclick="showMateInXMoves('+yes+');"><img src=\"images/read.svg\"></a>');}
   if (number==6) {$('.bullet2').html('<a onclick="showMateInXMoves('+yes+');"><img src=\"images/read.svg\"></a>');}
   if (number==8) {$('.bullet3').html('<a onclick="showMateInXMoves('+yes+');"><img src=\"images/read.svg\"></a>');}
  if (number==10) {$('.bullet4').html('<a onclick="showMateInXMoves('+yes+');"><img src=\"images/read.svg\"></a>');}
  if (number==12) {$('.bullet5').html('<a onclick="showMateInXMoves('+yes+');"><img src=\"images/read.svg\"></a>');}
  if (number==14) {$('.bullet6').html('<a onclick="showMateInXMoves('+yes+');"><img src=\"images/read.svg\"></a>');}
  if (number==16) {$('.bullet7').html('<a onclick="showMateInXMoves('+yes+');"><img src=\"images/read.svg\"></a>');}
  if (number==18) {$('.bullet8').html('<a onclick="showMateInXMoves('+yes+');"><img src=\"images/read.svg\"></a>');}
  if (number==20) {$('.bullet9').html('<a onclick="showMateInXMoves('+yes+');"><img src=\"images/read.svg\"></a>');}
  // if (number==21) {$('.bullet10').html("<img src=\"images/read.svg\">");}
}

function updateBullets(solved) {
  yes="yes";
  if (solved=="solved") { 
    bullet='<a onclick="showMateInXMoves(yes);"><img src="images/read.svg"></a>';
    }
  else { bullet='<a onclick="showMateInXMoves(yes);"><img src="images/unread.svg"></a>';}

  var loadCheckmark=localStorage.getItem("solvedgame"+currentgame);
  if(loadCheckmark=="yes") { Checkmark='<a class="checkmark" onclick="ShowSolutionMoves();"><img src="images/success.svg"></a>'; }
  if(loadCheckmark!="yes") { Checkmark='<a class="questionmark" onclick="hintButtonAlert();"><img src="images/help.svg"></a>'; }
  if (solved=="solved") { Checkmark='<a onclick="ShowSolutionMoves();"><img src="images/success.svg"></a>'; }
  
  var bullets = '<div class="bullets">';
  if (currentgame=="0") {movecountcalculate=1;}
  for (var i = 0; i < movecountcalculate; i++) {
    bullets +='<span class="bullet'+i+'">'+bullet+'</span>';
  }
  bullets+=Checkmark;
  bullets += '</div>';
  $('.movebullets').html(bullets);
}
function HideSolutionMoves() {
  $('#gameText').hide();
}
function checkBoardRotation() {
  if (StartMove%2==0){
    firstmovecolor="White";
    RotateBoard(false);
    // alert("white");
    }
  else{
    firstmovecolor="Black";
    RotateBoard(true);
    // alert("black");
    }
}
function showMateInXMoves(bulletclick) {
  var themovecount=GetHTMLMoveText();
  var themovecountSplit = new Array();
  themovecountSplit = themovecount.split('. ');
   movecountcalculate=((themovecountSplit.length)*1)-1;
if (movecountcalculate==1||movecountcalculate==0) { 
      jNotify(firstmovecolor+' to win in 1 move', {
      autoHide : true, 
      clickOverlay : false, 
      MinWidth : 220,
      TimeShown : 3000,
      ShowTimeEffect : 200,
      HideTimeEffect : 200,
      LongTrip :20,
      ShowOverlay : false,
      });
      }  
if (movecountcalculate>1) {
      jNotify(firstmovecolor+' to win in '+movecountcalculate+' moves', {
      autoHide : true, 
      clickOverlay : true, 
      MinWidth : 220,
      TimeShown : 3000,
      ShowTimeEffect : 200,
      HideTimeEffect : 200,
      LongTrip :20,
      ShowOverlay : false,
      });
}
// if the bullets are clicked, it would swap out the bullets mid game without this if statement
if (bulletclick!="yes") {
  updateBullets();  
  }
}

function updateScores() { 
  calculaterank();
  getTotalSolvedCount(); // this updated the total solved count on the trophy screen
  $('.currentpuzzle').html(currentgame);

  yourrank = localStorage.getItem('yourrank');
  $('.yourrank').html(yourrank);
  currenttheme = localStorage.getItem('currenttheme');
  $('.currentlevel').html(currenttheme);
  perfectgamecount = localStorage.getItem('perfectgamecount');
  $('.perfectgamecount').html(perfectgamecount);
  correctmoveratio = localStorage.getItem('correctmoveratio');
  $('.correctmoveratio').html(correctmoveratio);
  cheatbuttonclicks=localStorage.getItem('cheatbuttonclicks'); 
  $('.hintsreceived').html(cheatbuttonclicks);
  currentgamesolvedstreak = localStorage.getItem('currentgamesolvedstreak');
  $('.currentpuzzlessolvedstreak').html(currentgamesolvedstreak);
  longestgamesolvedstreak = localStorage.getItem('longestgamesolvedstreak');
  $('.longestpuzzlessolvedstreak').html(longestgamesolvedstreak);
  longestcorrectmovestreak = localStorage.getItem('longestcorrectmovestreak');
  $('.longestcorrectmovestreak').html(longestcorrectmovestreak);
  currentcorrectmovestreak = localStorage.getItem('currentcorrectmovestreak');
  $('.currentcorrectmovestreak').html(currentcorrectmovestreak);
}

function scoreClick(puzzlenumber) {
  hideNotifications();
  isSolved=true;
  isSolved=false;
  EvalUrlString('',puzzle[puzzlenumber]);
  checkBoardRotation();
  currentgame=puzzlenumber;
   localStorage.setItem("currentgame",currentgame);
  updateBullets();
  jQT.goTo('#puzzles','slideleft');
  showMateInXMoves();
  ResetCurrentGameCounters();
  HideSolutionMoves();
}
function showAll() {
  $('.White').show();
  $('.Black').show();
  // alert("test");
}
function showSolved() {
  $('.unsolved').hide();
  $('.solved').show();
}
function showUnsolved() {
  $('.solved').hide();
  $('.unsolved').show();
}
function showBlack() {
  $('.White').hide();
  $('.Black').show();
  // alert("test");
}
function showWhite() {
  $('.Black').hide();
  $('.White').show();
  // alert("test");
}
function showMateIn(moves) {
  $('.matein1').hide();
  $('.matein2').hide();
  $('.matein3').hide();
  $('.matein4').hide();
  $('.matein5').hide();
  $('.matein6').hide();
  $('.matein7').hide();
  $('.matein8').hide();
  $('.matein9').hide();
  $('.matein11').hide();
  $('.matein'+moves).show();
}
function showMateIn6Plus() {
  $('.matein1').hide();
  $('.matein2').hide();
  $('.matein3').hide();
  $('.matein4').hide();
  $('.matein5').hide();
  $('.matein6').show();
  $('.matein7').show();
  $('.matein8').show();
  $('.matein9').show();
  $('.matein11').show();
}
function puzzleSolved(number,hints,mistakes) {
  // save the status to local storage
  gamenum=("solved"+i);
  localStorage.setItem(gamenum,"yes");
  // add solved class to score#
  $('.score'+number).removeClass('unsolved').addClass('solved');
  // update class result# with hints and mistakes: (Hints: #, Mistakes: #)
  $('.result'+number).html('(Hints: '+hints+', Mistakes: '+mistakes+')');
}

function getTotalSolvedCount() {
  solvedcount=0;
  for (var i=0; i<366; i++)
    {
      solved=localStorage.getItem("solvedgame"+i);
      if (solved=="yes") {
        solvedcount++;
      }
    }
    $('.totalsolved').html(solvedcount);
    totalsolved=solvedcount;
    localStorage.setItem('totalsolved',solvedcount);
}
function checkLevelLocks() {
  getTotalSolvedCount(); // update total solved count
    secretUnlock = localStorage.getItem("secretUnlock");
    if (secretUnlock == "unlocked") {
            locklimit = 400;
        }
    else {
    if (totalsolved<=50) {
      locklimit=50;
    }  
    if (totalsolved>50) {
      locklimit=100;
    }
    if (totalsolved>100) {
      locklimit=150;
    }
    if (totalsolved>150) {
      locklimit=200;
    }
    if (totalsolved>200) {
      locklimit=250;
    }
    if (totalsolved>250) {
      locklimit=300;
    }
    if (totalsolved>300) {
      locklimit=350;
    }
    if (totalsolved>350) {
      locklimit=400;
    }
  }
}

function updatePuzzleList() {
  hideNotifications();
  checkLevelLocks();
  // loop through 363 puzzles, add solved class to score#, update class result# with hints and mistakes: (Hints: #, Mistakes: #)
  for (var i=0; i<367; i++)
    {
      solved=localStorage.getItem("solvedgame"+i);
      if (solved=="yes") {
        hints=localStorage.getItem("hintsthisgame"+i);
        mistakes=localStorage.getItem("wrongmovesingame"+i);
        $('.result'+i).html('(Hints: '+hints+', Mistakes: '+mistakes+')');
        $('li.score'+i).addClass('solved').removeClass('unsolved');
      }
      else {
        // if game isn't locked:
        if (i<=locklimit) {
          // don't update list 
          $('li.score'+i).removeClass('locked');
          $(".score"+i+" a").attr('onclick', 'scoreClick('+i+')');
        }
        // if game is locked remove link, add lock icon
        else if (i>locklimit) {
          $('li.score'+i).addClass('locked');
          $(".score"+i+" a").attr('onclick', '');
          $(".score"+i+" a").attr('onclick', 'lockNotification()');
        }
      }
    }
}

function secretUnlockAll() {
    localStorage.setItem("puzzlepack_purchased","purchased");
    localStorage.setItem("secretUnlock","unlocked");
    updatePuzzleList();
}

function lockNotification() {
  if (navigator.notification) {
    navigator.notification.confirm(
              '50 more puzzles will be unlocked once you solve the current puzzles.',  // message
              LockMessageDismiss,              // callback to invoke with index of button pressed
              'Puzzle Locked',            // title
              'OK'          // buttonLabels
          );
  }
  // for testing in browser:
  else {
  alert("locked");
  }
}
function LockMessageDismiss() {
  jQT.goTo('#listpuzzle1','slideleft');
}
function hideNotifications() {
  $("#jNotify").remove();
  $("#jSuccess").remove();
  $("#jError").remove();
}
function nextGame() { // alert(currentgame+""+locklimit);
  // alert(currentnum+" "+locklimit);
  // check to make sure that the game isn't locked before loading next game
  if (currentgame<locklimit) {
    ResetCurrentGameCounters();
    hideNotifications();
    isSolved=true;
    currentgame = ((currentgame*1)+1);
    EvalUrlString('',puzzle[currentgame]);
    checkBoardRotation();
    localStorage.setItem("currentgame",currentgame);
    $('.currentpuzzle').html(currentgame);
    updateBullets();
    showMateInXMoves();
    HideSolutionMoves();
    isSolved=false; 
  }
  else {
    lockNotification();
  }
}
function prevGame() {
  ResetCurrentGameCounters();
  hideNotifications();
  isSolved=true;
  currentgame = ((currentgame*1)-1);
  if(currentgame<=0) {currentgame=0;}
  EvalUrlString('',puzzle[currentgame]);
  checkBoardRotation();
  localStorage.setItem("currentgame",currentgame);
  $('.currentpuzzle').html(currentgame);
  updateBullets();
  showMateInXMoves();
  HideSolutionMoves();
  isSolved=false;
}
function firstGame() {
  ResetCurrentGameCounters();
  EvalUrlString('',puzzle[1]);
  checkBoardRotation();
  currentgame=1;
  localStorage.setItem("currentgame",currentgame);
  $('.currentpuzzle').html(currentgame);
  updateBullets();
  showMateInXMoves();
  HideSolutionMoves();
}
function gotoGame(number) {
  ResetCurrentGameCounters();
  EvalUrlString('',puzzle[number]);
  checkBoardRotation();
  currentgame=number;
  localStorage.setItem("currentgame",currentgame);
  $('.currentpuzzle').html(currentgame);
  updateBullets();
  showMateInXMoves();
  HideSolutionMoves();
}
// function tutorial() {
//   ResetCurrentGameCounters();
//   $("#jNotify").remove();
//  isSolved=true;
//   EvalUrlString('',puzzle[0]);
//   $('.currentpuzzle').html(currentgame);
//   updateBullets();
//   showMateInXMoves();
//   HideSolutionMoves();
//  isSolved=false;
// }
function currentGame() {
  ResetCurrentGameCounters();
  isSolved=true;
  isSolved=false;
  EvalUrlString('',puzzle[currentgame]);  
  checkBoardRotation();
  updateBullets();
  showMateInXMoves();
  HideSolutionMoves();
}
function newestGame() {
  ResetCurrentGameCounters();
  newestgame=localStorage.getItem('highestlevel');
  if(newestgame==undefined||newestgame==null) {
    newestgame=0;
    localStorage.setItem("highestlevel",newestgame);
    }
  // alert(newestgame);
  EvalUrlString('',puzzle[newestgame]);  
  checkBoardRotation();
  updateBullets();
  showMateInXMoves();
  HideSolutionMoves();
}
function welcomeMessage() {
 var highestlevelCheck=localStorage.getItem('highestlevel'); 
 if (highestlevelCheck==undefined) { var highestlevelCheck=0; }
 
 var gameZeroCheck=getQueryVariable("gamenumber");
 
 if (gameZeroCheck==undefined&&highestlevelCheck!=0) {
   addPGNtoURL(puzzle[highestlevelCheck]); 
 }
 if (gameZeroCheck==undefined) {
         jNotify('<img class="home_photo" src="images/players/puzzles.png" width="60" height="60"><p>Welcome to Chess Puzzles Pro. Here are a few tips to get you started solving puzzles: </p> <p>&nbsp;</p><p>1. To move a piece, first tap on it. </p> <p>&nbsp;</p>  <p>2. Next, tap on the square that you want to move to. If this move doesn\'t correctly solve the puzzle you can try again. If it is the correct move, you continue on.</p> <p>&nbsp;</p><p>3. If you make 3 wrong moves in a row a question mark "hint" icon will appear. Tapping on this icon will make the correct move for you. </p> <p>&nbsp;</p><p>4. That\'s it. Tap the screen to give it a try.</p>', {
       autoHide : false, 
       clickOverlay : true, 
       MinWidth : 220,
       TimeShown : 99999,
       ShowTimeEffect : 200,
       HideTimeEffect : 200,
       LongTrip :20,
       ShowOverlay : true,
       OpacityOverlay : 1,
       onClosed : function(){ // added in v2.0
       addPGNtoURL(puzzle[0]); 
       },
       }
       );
 }

 // if this isn't the first game and the game number isn't undefined, show the previous button
 if (gamenumber!=undefined) {
   if (gamenumber!=1) {
   document.write("<a class=\"previous\" href=\"#puzzles\" onclick=\"addPGNtoURL('"+puzzle[previousgame]+"');return false\">Previous</a>");

 }
 }
 // AH: This checks to see if the game has been solved. If yes, it shows the next game link.
 var haspuzzlebeensolved=localStorage.getItem('solvedgame'+gamenumber);
  if (haspuzzlebeensolved=="yes") {
       $('#buttonSolution').removeClass().addClass('show');}
 var checkifgamesolved = localStorage.getItem('solvedgame'+gamenumber);
 if (checkifgamesolved==undefined) { solved = "hide"; $('#buttonSolution').removeClass().addClass('hide'); 
 if (testing=="on") { solved = "show";}
 if (testing!="on") {$('.previous').removeClass('show').addClass('hide');}

  }

 else solved="show";
   document.write("<a id=\"nextgame"+gamenumber+"\" class=\"next "+solved+"\" href=\"#puzzles\" onclick=\"addPGNtoURL('"+puzzle[nextgame]+"');return false\">Next</a>");

 // AH: set the highest level to the current level
       var highestlevel=localStorage.getItem('highestlevel'); 
       if(gamenumber>highestlevel) { localStorage.setItem("highestlevel",gamenumber); } 
   if (highestlevel==undefined) { var highestlevel=0; }
   var highestunbeatenlevel=((highestlevel*1)+1);
 $('.startingbutton').html("<a href=\"#puzzles\" onclick=\"addPGNtoURL('"+puzzle[highestunbeatenlevel]+"');return false\">Chess Puzzles</a>");
}

function ShowNextMoves(nn)
{ var mm=MoveCount;
  if (nn%2==0)
  { shownMoves++;
// AH: when the "cheat button" is clicked reset the current correct move streak to zero
var currentcorrectmovestreak=localStorage.getItem('currentcorrectmovestreak'); 
      localStorage.setItem("currentcorrectmovestreak",0); 
    localStorage.setItem("perfectgamestreak",0); 
// AH: Every time the "cheat button" gets clicked it gets added to the grand total
  cheatbuttonclicks=localStorage.getItem('cheatbuttonclicks'); 
  cheatbuttonclicks++;
  localStorage.setItem("cheatbuttonclicks",cheatbuttonclicks);

    wrongMovesNew=0;
    if (document.getElementById) {}
      // document.getElementById('hintButtons');
  }
  ExecCommand(true);
  MoveForward(1);
  ExecCommand(false);
// AH: If the cheat button is clicked on the last move of the puzzle then show the solution:
  if (mm==MoveCount) {
  localStorage.setItem("currentgamesolvedstreakmessage","");
  ShowSolution();
}
// AH: If it's not the final move then show the next move:
  else
  { if (nn>1) setTimeout("ShowNextMoves("+(nn-1)+")",1000);
  }
}
function getrecordmessage() {
  var currentgamesolvedstreakmessage=localStorage.getItem('currentgamesolvedstreakmessage');
  return(currentgamesolvedstreakmessage);
}
function randompraise(number) {
  if (number == undefined) { var praise="I'm speachless.<br />"; }  
  if (number == 0) { var praise="Nicely done. <br />"; }
  if (number == 1) { var praise="You got it!<br />"; }
  if (number == 2) { var praise="Perfect.<br />"; }
  if (number == 3) { var praise="Very nice.<br />"; }
  if (number == 4) { var praise="Great job.<br />"; }
  if (number == 5) { var praise="You made that look easy.<br />"; }
  if (number == 6) { var praise="Brilliant.<br />"; }
  if (number == 7) { var praise="Excellent.<br />"; }
  if (number == 8) { var praise="Hey, you're pretty good at this!<br />"; }
  if (number == 9) { var praise="Genius.<br />"; }
  if (number == 10) { var praise="You solved it.<br />"; }  
  return(praise);
}
function randomerrormessage(number) {
  if (number == undefined) { var praise="I'm speachless.<br />"; }  
  if (number == 0) { var praise="Good guess, but no.<br />"; }
  if (number == 1) { var praise="Not quite.<br />"; }
  if (number == 2) { var praise="Try again<br />"; }
  if (number == 3) { var praise="Close, but no cigar.<br />"; }
  if (number == 4) { var praise="Give it another shot.<br />"; }
  if (number == 5) { var praise="Incorrect. Try again.<br />"; }
  if (number == 6) { var praise="Nah. Try again.<br />"; }
  if (number == 7) { var praise="Give it another try.<br />"; }
  if (number == 8) { var praise="Not exactly. Try again.<br />"; }
  if (number == 9) { var praise="Unfortunately, that's wrong. Try again.<br />"; }
  if (number == 10) { var praise="Try it once more.<br />"; }  
  return(praise);
}
function ShowSolution()
{  
// AH: Every time the "cheat button" was clicked it gets saved for this particular game
  localStorage.setItem("hintsthisgame"+currentgame,shownMoves);

  if (document.getElementById)
  { isSolved=true;       
var haspuzzlebeensolved=localStorage.getItem('solvedgame'+currentgame);
 if (haspuzzlebeensolved=="yes") { 
         jSuccess("<p>Correct.</p>", {
      autoHide : true, 
      clickOverlay : false, 
      MinWidth : 220,
      TimeShown : 3000,
      ShowTimeEffect : 200,
      HideTimeEffect : 200,
      LongTrip :20,
      ShowOverlay : false,
      OpacityOverlay : '#000',
      OpacityOverlay : 0,
      onClosed : function(){ 
      },
      }); 
   }

 
 if (haspuzzlebeensolved!="yes") {
      $('#buttonSolution').removeClass().addClass('hide');
      // $('#tabbar').fadeOut('slow');

//event message
var commentmessagesub="";

if (commentmessagesub=="") {
  commentmessage="";
}

// milestone message
  var milestonemessage=("");

if (wrongMoves==0) {
// get a random number between 1 and 10 and then return the corresponding praise message
var random = Math.floor(Math.random()*11); 

  perfectgamemessage=randompraise(random);
}
if (wrongMoves>0&&wrongMoves<4) {  perfectgamemessage="Correct.<br />";
  perfectgamestreak="0";
}
if (wrongMoves>=4&&wrongMoves<6) {  perfectgamemessage="You solved it!<br />";
  perfectgamestreak="0";
}
if (wrongMoves>=6&&wrongMoves<10) {
  perfectgamemessage="That was a hard one. But you got it!<br />";
}
if (wrongMoves>=10&&wrongMoves<15) {
  perfectgamemessage="Don't worry. They aren't all this hard. Hang in there.<br />";
}
if (wrongMoves>=15&&wrongMoves<20) {
  perfectgamemessage="I'll be honest. That was not your best performance. But you'll get 'em next time.<br />";
}
if (wrongMoves>=20&&wrongMoves<30) {
  perfectgamemessage="I admire your determination and patience. Guessing isn't the easiest way to solve a puzzle, but it works!<br />";
}
if (wrongMoves>=30&&wrongMoves<100) {
  perfectgamemessage="I have a feeling you are making wrong moves on purpose. That would just be silly. It's not like there is an easter egg hidden at 100 wrong moves or anything. Seriously, there's not. What? You are going to try anyway? Well, I guess I will see you over there.<br />";
}
if (wrongMoves>100) {
  perfectgamemessage="Wow. I can't believe you did that. You really are something else. I feel like I owe you something. How about a joke?<br /><br />A man is playing chess against a dog in the park. A woman walks by and says, \"What a clever dog!\" The man replies, \"No, no, he isn't that clever. I'm leading by three games to one!\" ";
}
if (currentgame!=0&&currentgame!=300) {
      jSuccess("<p>" + newlevelmessage + milestonemessage + unescape(commentmessage) + perfectgamemessage + getrecordmessage()+"</p>", {
      autoHide : true, 
      clickOverlay : false, 
      MinWidth : 220,
      TimeShown : 5000,
      ShowTimeEffect : 200,
      HideTimeEffect : 200,
      LongTrip :20,
      ShowOverlay : false,
      OpacityOverlay : '#000',
      OpacityOverlay : 0,
      onClosed : function(){ 
      },
      });  
}

// if (currentgame==300) {
//       jSuccess("<p>" + unescape(commentmessage) +"</p>", {
//       autoHide : true, 
//       clickOverlay : false, 
//       MinWidth : 220,
//       TimeShown : 1000,
//       ShowTimeEffect : 200,
//       HideTimeEffect : 200,
//       LongTrip :20,
//       ShowOverlay : false,
//       OpacityOverlay : '#000',
//       OpacityOverlay : 0,
//       onClosed : function(){ 
//        // window.location = puzzle[1];
//       },
//       });  
// }
if (currentgame==0) {
      jSuccess("Nice job. That's pretty easy, right?", {
      autoHide : true, 
      clickOverlay : false, 
      MinWidth : 220,
      TimeShown : 5000,
      ShowTimeEffect : 200,
      HideTimeEffect : 200,
      LongTrip :20,
      ShowOverlay : false,
      OpacityOverlay : '#000',
      OpacityOverlay : 0,
      onClosed : function(){ 
      },
      });  
}

    }
updateBullets('solved');
// AH: this stores whether or not the game has been solved in local storage
  localStorage.setItem("solvedgame"+currentgame,"yes");
  localStorage.setItem("wrongmovesingame"+currentgame,wrongMoves);
  // if (currentgame==0) {localStorage.setItem("solvedgame0","no");}
  }
}

function calculaterank() {
  totalcorrectmoves = localStorage.getItem('totalcorrectmoves');
  totalwrongmoves = localStorage.getItem('totalwrongmoves');

  if (totalcorrectmoves!=0) {
  correctmoveratio=1-(totalwrongmoves/totalcorrectmoves);  
  correctmoveratio=(Math.round(correctmoveratio*100))/100;
  
  localStorage.setItem('correctmoveratio',correctmoveratio);
  // alert(correctmoveratio);
  $('.correctmoveratio').html(correctmoveratio);  
  
  var yournewrank=correctmoveratio;

if (yournewrank==0) { 
  // $('.rankbutton').html("<a id=\"rankcheck\" class=\"piecebutton flip\" href=\"#achievements\" mask=\"images/badges/brown/pawn.png\" mask2x=\"images/badges/brown/pawn@2x.png\"  animation=\"slideleft\"><strong>Records</strong></a>  "); 
   }
if (yournewrank<=0.16) { 
  // $('.rankbutton').html("<a id=\"rankcheck\" class=\"piecebutton flip\" href=\"#achievements\" mask=\"images/badges/brown/pawn.png\" mask2x=\"images/badges/brown/pawn@2x.png\"  animation=\"slideleft\"><strong>Records</strong></a>  "); 
  yourrank="pawn" }
if (yournewrank>0.16&&yournewrank<=0.33) { 
  // $('.rankbutton').html("<a id=\"rankcheck\" class=\"piecebutton flip\" href=\"#achievements\" mask=\"images/badges/brown/knight.png\" mask2x=\"images/badges/brown/knight@2x.png\"  animation=\"slideleft\"><strong>Records</strong></a>  ");
   yourrank="knight" }
if (yournewrank>0.33&&yournewrank<=0.5) { 
  // $('.rankbutton').html("<a id=\"rankcheck\" class=\"piecebutton flip\" href=\"#achievements\" mask=\"images/badges/brown/bishop.png\" mask2x=\"images/badges/brown/bishop@2x.png\"  animation=\"slideleft\"><strong>Records</strong></a>  "); 
   yourrank="bishop" }
if (yournewrank>0.5&&yournewrank<=0.66) { 
  // $('.rankbutton').html("<a id=\"rankcheck\" class=\"piecebutton flip\" href=\"#achievements\" mask=\"images/badges/brown/rook.png\" mask2x=\"images/badges/brown/rook@2x.png\"  animation=\"slideleft\"><strong>Records</strong></a>  "); 
   yourrank="rook" }
if (yournewrank>0.66&&yournewrank<=0.82) { 
  // $('.rankbutton').html("<a id=\"rankcheck\" class=\"piecebutton flip\" href=\"#achievements\" mask=\"images/badges/brown/queen.png\" mask2x=\"images/badges/brown/queen@2x.png\"  animation=\"slideleft\"><strong>Records</strong></a>  "); 
   yourrank="queen" }
if (yournewrank>0.82&&yournewrank<=1) { 
  // $('.rankbutton').html("<a id=\"rankcheck\" class=\"piecebutton flip\" href=\"#achievements\" mask=\"images/badges/brown/king.png\" mask2x=\"images/badges/brown/king@2x.png\"  animation=\"slideleft\"><strong>Records</strong></a>  "); 
   yourrank="king" }
localStorage.setItem('yourrank',yourrank);
  }
}
function removeactivestate() {
  $(".activated").removeClass('activated');
  $("#levelcheck").removeClass('active');
  $("#rankcheck").removeClass('active');
  $(".starbutton").removeClass('active');
}

function getQueryVariable(variable) { 
  return(currentgame);
}

function showAlert(message, title) {
  if (navigator.notification) {
    navigator.notification.alert(message, null, title, 'OK');
  } 
  else {
    alert(title ? (title + ": " + message) : message);
  }
}
// analytics
function trackpage(id)
{
    // console.log("start trackpage: " + id);
  analytics.trackView(id);
    // console.log("end trackpage: " + id);
}

function BlockMove(event) {
  event.preventDefault() ;
}





$(document).ready(function() {
  updateScores();
  updatePuzzleList();

// $('.bullet0').live('click', function(event)  { showMateInXMoves("yes");});
// $('.bullet1').live('click', function(event)  { showMateInXMoves("yes");});
// $('.bullet2').live('click', function(event)  { showMateInXMoves("yes");});
// $('.bullet3').live('click', function(event)  { showMateInXMoves("yes");});
// $('.bullet4').live('click', function(event)  { showMateInXMoves("yes");});
// $('.bullet5').live('click', function(event)  { showMateInXMoves("yes");});
// $('.bullet6').live('click', function(event)  { showMateInXMoves("yes");});
// $('.bullet7').live('click', function(event)  { showMateInXMoves("yes");});
// $('.bullet8').live('click', function(event)  { showMateInXMoves("yes");});
// $('.bullet9').live('click', function(event)  { showMateInXMoves("yes");});
// $('.bullet11').live('click', function(event) { showMateInXMoves("yes");});

});


function onBodyLoad()
{
  var CurrentLevelToTrack=localStorage.getItem('highestlevel');

  $('.rankbutton').click(function() {
    $('.levelbutton a').removeClass('enabled');
    $('.awardsbutton a').removeClass('enabled');
    $('.infobutton a').removeClass('enabled');
  });
  $('.levelbutton').click(function() {
    $('.rankbutton a').removeClass('enabled');
    $('.awardsbutton a').removeClass('enabled');
    $('.infobutton a').removeClass('enabled');
  });
  $('.awardsbutton').click(function() {
    $('.levelbutton a').removeClass('enabled');
    $('.rankbutton a').removeClass('enabled');
    $('.infobutton a').removeClass('enabled');
  });
showMateInXMoves();
updateBullets();

  $('.filtr-all').addClass('underline'); // when app loads, add "all" class to list
  $('.filtr-all').click(function() {
    $('.filtr').removeClass('underline');
    $('.filtr-all').addClass('underline');
  });
  $('.filtr-black').click(function() {
    $('.filtr').removeClass('underline');
    $('.filtr-black').addClass('underline');
  });
  $('.filtr-white').click(function() {
    $('.filtr').removeClass('underline');
    $('.filtr-white').addClass('underline');
  });
  $('.filtr-solved').click(function() {
    $('.filtr').removeClass('underline');
    $('.filtr-solved').addClass('underline');
  });
  $('.filtr-unsolved').click(function() {
    $('.filtr').removeClass('underline');
    $('.filtr-unsolved').addClass('underline');
  });
  $('.filtr-1').click(function() {
    $('.filtr').removeClass('underline');
    $('.filtr-1').addClass('underline');
  });
  $('.filtr-2').click(function() {
    $('.filtr').removeClass('underline');
    $('.filtr-2').addClass('underline');
  });
  $('.filtr-3').click(function() {
    $('.filtr').removeClass('underline');
    $('.filtr-3').addClass('underline');
  });
  $('.filtr-4').click(function() {
    $('.filtr').removeClass('underline');
    $('.filtr-1').addClass('underline');
  });
  $('.filtr-4').click(function() {
    $('.filtr').removeClass('underline');
    $('.filtr-4').addClass('underline');
  });
  $('.filtr-5').click(function() {
    $('.filtr').removeClass('underline');
    $('.filtr-5').addClass('underline');
  });
  $('.filtr-6').click(function() {
    $('.filtr').removeClass('underline');
    $('.filtr-6').addClass('underline');
  });

if (audiocontrol=="on") { 
    $('.audiosettingson').removeClass('show').addClass('hide');
    $('.audiosettingsoff').removeClass('hide').addClass('show');
}
if (audiocontrol=="off") { 
    $('.audiosettingsoff').removeClass('show').addClass('hide');
    $('.audiosettingson').removeClass('hide').addClass('show');
}

  $('.audiosettingsoff').click(function() {
    localStorage.setItem("audiocontrol","off");
    $('.audiosettingsoff').removeClass('show').addClass('hide');
    $('.audiosettingson').removeClass('hide').addClass('show');
  audiocontrol="off";
  });
  $('.audiosettingson').click(function() {
    localStorage.setItem("audiocontrol","on");
    $('.audiosettingson').removeClass('show').addClass('hide');
    $('.audiosettingsoff').removeClass('hide').addClass('show');
  audiocontrol="on";
playAudio('audio/move1.wav');
  });
}

var app = {
  initialize: function() {
    this.bindEvents();
  },
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

// Device ready actions
  onDeviceReady: function() {
    app.receivedEvent('deviceready');

// Don't forget to add the anlytics tracker here
    analytics.startTrackerWithId('UA-3989583-30');
  },
  receivedEvent: function(id) {
    // put things that will happen when app is loaded here.
  }
};

$(function(){
$('#puzzles').bind("swipe",function(event, info){
if (info.direction === 'left') {
nextGame();
}
if (info.direction === 'right') {
prevGame();
}
});
});