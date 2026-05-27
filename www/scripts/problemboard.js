function WriteBoard(sshowcapt) {
  for (var ii=0; ii<64; ii++) { 
  if ((9*ii-ii%8)%16==0) {
    document.write("<td background='"+ImagePath+"blank.svg'>");
    }
    else document.write("<td>");
    document.write("<div class=\"square"+ii+"\"><img src='"+ImagePath+"blank.svg' onclick='BoardClick("+ii+")'></div></td>");
    if (ii%8==7)
    { 
  if (ii<63) { 
  document.write("</tr><tr>");
  }
    }    
  }
}
function WriteButtons()
{ var ii, nn=0, ss=0;
  if (document.getElementById) //adjust button size
  { if (ImagePath)
    { for (ii=0; ii<ImagePath.length; ii++)
      { if (isNaN(ImagePath.charAt(ii))) nn=0;
        else { nn*=10; nn+=parseInt(ImagePath.charAt(ii)); ss=nn; }
      }
    }
    if (ss==0) ss=31;
    ss+=2*Border;
    if (ss>27) ss-=8;
    else ss=19;
  }
  else ss=25;
  document.writeln("<div id='buttons' style='display:none'>");
  document.writeln("<TABLE border=0 cellpadding=0 cellspacing=0><TR>");
  document.writeln("<TD class=\"button\"><input type=button value='xxxx' width="+eval(ss-4)+" style='width:"+ss+"px' id='btnInit' onTouch='Init(\"\")'></TD>");
  document.writeln("<TD class=\"button\"><input type=button value='xxxx' width="+eval(ss-4)+" style='width:"+ss+"px' id='btnMB10' onTouch='MoveBack(10)'></TD>");
  document.writeln("<TD class=\"button\"><input type=button value='xxxx' width="+eval(ss-4)+" style='width:"+ss+"px' id='btnMB1' onTouch='MoveBack(1)'></TD>");
  document.writeln("<TD class=\"button\"><input type=button value='xxxx' width="+eval(ss-4)+" style='width:"+ss+"px' id='btnMF1' onTouch='MoveForward(1)'></TD>");
  document.writeln("<TD class=\"button\"><input type=button value='xxxx;' width="+eval(ss-4)+" style='width:"+ss+"px' id='btnMF10' onTouch='MoveForward(10)'></TD>");
  document.writeln("<TD class=\"button\"><input type=button value='xxxx' width="+eval(ss-4)+" style='width:"+ss+"px' id='btnMF1000' onTouch='MoveForward(1000)'></TD>");
  document.writeln("<TD><input type=button value='play' width="+eval(2*ss-4)+"px style='width:"+(2*ss)+"px' id='btnPlay' name='AutoPlay' onTouch='SwitchAutoPlay()'></TD>");
  document.writeln("<TD><select name='Delay' onChange='SetDelay(this.options[selectedIndex].value)' SIZE=1>");
  document.writeln("<option value=1000>fast");
  document.writeln("<option value=2000>med.");
  document.writeln("<option value=3000>slow");
  document.writeln("</select>");
  document.writeln("</TD></TR></TABLE>");
  document.writeln("<BR></div>");
}

function WritePosition()
{ var ii, nn=0, ss=0;
  if (document.getElementById) //adjust button size
  { if (ImagePath)
    { for (ii=0; ii<ImagePath.length; ii++)
      { if (isNaN(ImagePath.charAt(ii))) nn=0;
        else { nn*=10; nn+=parseInt(ImagePath.charAt(ii)); ss=nn; }
      }
    }
    if (ss==0) ss=31;
    ss+=2*Border;
    if (ss>27) ss-=8;
    else ss=19;
  }
  else ss=25;
  document.writeln("<TABLE border=0 cellpadding=0 cellspacing=0><TR>");
  document.writeln("<TD></TD>");
  document.writeln("<TH><input type=text name='Position' value='' width="+eval(4*ss-4)+" style='width:"+eval(4*ss)+"px' id='inpPos' size=14></TH>");
  document.writeln("<TD></TD>");
  document.writeln("</TR></TABLE>");
}

function ShowSolutionMoves() {
    document.getElementById('gameText').innerHTML=GetHTMLMoveText();
    $('#gameText').show();
}

function WriteHintButtons(solved)
{ 
// Create info button
// document.write("<a class=\"infobutton\" href=\"#\" mask=\"images/badges/brown/info.png\"></a>");      
var themovecount=GetHTMLMoveText();
var themovecountSplit = new Array();
themovecountSplit = themovecount.split('. ');
movecountcalculate=((themovecountSplit.length)*1)-1;
$(".infobutton").click(function() { 
  $("#ranking").toggle("fast");

if (movecountcalculate==1) { 
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
   });

  document.write("<div id=\"ranking\" class=\"hide\">");
// This is where all the achievements get generated

// Create Badge
  calculaterank();
  

// Create game list button
var listpage="1";
if (currentgame>=51&&currentgame<101) { listpage="2";}
if (currentgame>=101&&currentgame<151) { listpage="3";}
if (currentgame>=151&&currentgame<201) { listpage="4";}
if (currentgame>=201&&currentgame<251) { listpage="5";}
if (currentgame>=251&&currentgame<301) { listpage="6";}
if (currentgame>=301&&currentgame<351) { listpage="7";}
if (currentgame>=351&&currentgame<401) { listpage="8";}
if (currentgame>=401&&currentgame<451) { listpage="9";}
if (currentgame>=451&&currentgame<501) { listpage="10";}
if (currentgame>=501&&currentgame<551) { listpage="11";}
if (currentgame>=551&&currentgame<601) { listpage="12";}
if (currentgame>=601&&currentgame<651) { listpage="13";}
if (currentgame>=651&&currentgame<701) { listpage="14";}
if (currentgame>=701&&currentgame<751) { listpage="15";}
if (currentgame>=751&&currentgame<801) { listpage="16";}
if (currentgame>=801&&currentgame<851) { listpage="17";}
if (currentgame>=851&&currentgame<901) { listpage="18";}
if (currentgame>=901&&currentgame<951) { listpage="19";}
if (currentgame>=951&&currentgame<1001) { listpage="20";}

  // document.write("<a class=\"listbutton flip show\" href=\"#listpuzzle"+listpage+"\" mask=\"images/badges/brown/check.png\"></a>");      
  $('.historybutton').html("<a class=\"listbutton flip show\" href=\"#listpuzzle"+listpage+"\" mask=\"images/badges/brown/flag.png\" mask2x=\"images/badges/brown/flag@2x.png\" animation=\"slideleft\"><strong>History</strong></a>");      

document.write("</div>");
document.writeln("<div id='hintButtons'>");
  document.writeln("<input type=button id='buttonNextMove' name='buttonNextMove' value='show next move' width=120 style='width:121' onclick='ShowNextMoves(2)'></div>");
  document.writeln("<input type=button id='buttonSolution' class='show' name='buttonSolution' value='show solution' width=120 style='width:121' onclick='ShowSolutionMoves()'>");
}
$("#buttonSolution").click(function() { $('#gameText').removeClass().addClass('show');});
  isSolved=false;
  wrongMoves=0;
  shownMoves=0;
  wrongMovesNew=0;
//function UserMove is called whenever you make a move by clicking on the board
//you can change the code if you want to do anything else here
function UserMove(isTextMove, MoveText)
{ if (isSolved) return;
  mm=MoveCount;
  if ((isTextMove)&&(MoveText.indexOf("?")<0))
  { var mm=MoveCount;
    ExecCommand(true);
    
    addBullet(mm);
    
    MoveForward(1);
// play a sound and switch the variable so the other sound plays on the next move
if (audiocontrol=="on") { 
  if (movesound=="1") {
playAudio('audio/move1.wav');
movesound="2";
  }
  if (movesound=="2") {
playAudio('audio/move2.wav');
movesound="2";
  }
}

// AH: Increase the total correct move count by one:
var totalcorrectmoves=localStorage.getItem('totalcorrectmoves'); 
  totalcorrectmoves++;
    localStorage.setItem("totalcorrectmoves",totalcorrectmoves); 
// AH: When a correct move is made, increase the current correct move streak by one
var currentcorrectmovestreak2=localStorage.getItem('currentcorrectmovestreak'); 
  currentcorrectmovestreak2++;
    localStorage.setItem("currentcorrectmovestreak",currentcorrectmovestreak2); 
// AH: If current correct move streak is greater then the current record, set a new record
        var longestcorrectmovestreak=localStorage.getItem('longestcorrectmovestreak'); 
        if (currentcorrectmovestreak2>longestcorrectmovestreak) {
        localStorage.setItem("longestcorrectmovestreak",currentcorrectmovestreak2);          
        }
    ExecCommand(false);
// AH: if the current move is equal to the total moves in the puzzle, the puzzle is over.
    if (mm==MoveCount) { 

// puzzle is over, update list item:
$('.result'+currentgame).html('(Hints: '+cheatbuttonclicks+', Mistakes: '+wrongMoves+')');
$('li.score'+currentgame).addClass('solved').removeClass('unsolved');

$('#Board table').addClass('solved');

// increase the total number of games attempted if this puzzle hasn't been attempted before
  gamesolvedcheck3="solvedgame"+currentgame;
      var hasgamepreviouslybeensolved3=localStorage.getItem('gamesolvedcheck3'); 
      if (hasgamepreviouslybeensolved3==undefined) {
      var puzzlesattempted=localStorage.getItem('puzzlesattempted'); 
        puzzlesattempted++;
        localStorage.setItem("puzzlesattempted",puzzlesattempted);         
      }      
// AH: if "cheat button" was clicked then reset the current game solved streak
    if (shownMoves>0) {
      localStorage.setItem("currentgamesolvedstreak",0); 
      localStorage.setItem("currentgamesolvedstreakmessage","");
      }
      if (shownMoves==0) {
// increase the total number of games solved if this puzzle hasn't been attempted before
  gamesolvedcheck2="solvedgame"+currentgame;
      var hasgamepreviouslybeensolved2=localStorage.getItem('gamesolvedcheck2'); 
      if (hasgamepreviouslybeensolved2==undefined) {
        var puzzlessolved=localStorage.getItem('puzzlessolved'); 
        puzzlessolved++;
        localStorage.setItem("puzzlessolved",puzzlessolved);       
// trackpage('/puzzlesolved/'+puzzlessolved);
      }     
// increase the current streak of games solved
      var currentgamesolvedstreak=localStorage.getItem('currentgamesolvedstreak'); 
        currentgamesolvedstreak++;
        localStorage.setItem("currentgamesolvedstreak",currentgamesolvedstreak);
        localStorage.setItem("currentgamesolvedstreakmessage","");
// Set the congratulations message to say how many games in a row have been solved
          // if (currentgamesolvedstreak>=2) {
          //     localStorage.setItem("currentgamesolvedstreakmessage",currentgamesolvedstreak+" in a row. Keep it up.<br />");
          // } 
        
        // AH: if the current game solved streak is larger than the longest streak it is a new record:
        if (currentgamesolvedstreak>longestgamesolvedstreak) {
        localStorage.setItem("longestgamesolvedstreak",currentgamesolvedstreak);   
          // if (currentgamesolvedstreak>=2) {
          //     localStorage.setItem("currentgamesolvedstreakmessage","Wow! "+currentgamesolvedstreak+" in a row. That's your new record!<br />");
          // }
        }
// AH: If the puzzle was completed without any wrong moves or showing any moves 
    if (wrongMoves==0) {
      if (shownMoves==0) {
  localStorage.setItem("hintsthisgame"+currentgame,0);
// AH: If the puzzle hasn't been soved yet and if you don't hit the cheat button and you don't make a wrong move then it was a perfect game.
  gamesolvedcheck="solvedgame"+currentgame;
      var hasgamepreviouslybeensolved=localStorage.getItem('gamesolvedcheck'); 
      if (hasgamepreviouslybeensolved==undefined) {
      var perfectgamecount=localStorage.getItem('perfectgamecount'); 
        perfectgamecount++;
        localStorage.setItem("perfectgamecount",perfectgamecount);        

        perfectgamestreakrecord = localStorage.getItem('perfectgamestreakrecord');
perfectgamestreak++;
if (perfectgamestreak>=2) {
localStorage.setItem("currentgamesolvedstreakmessage",perfectgamestreak+" perfect games in a row. Keep it up. Your record is "+perfectgamestreakrecord+".<br />");
}
// if this is a new record set the new perfect game record
localStorage.setItem('perfectgamestreak',perfectgamestreak);
if (perfectgamestreak==perfectgamestreakrecord) {
    localStorage.setItem("currentgamesolvedstreakmessage",perfectgamestreak+" perfect games in a row. That's ties your record!<br />");
  }
if (perfectgamestreak>perfectgamestreakrecord) {
localStorage.setItem("perfectgamestreakrecord",perfectgamestreak);   
// Set the congratulations message to say how many games in a row have been solved
          if (perfectgamestreak>=2) {
              localStorage.setItem("currentgamesolvedstreakmessage",perfectgamestreak+" perfect games in a row. That's a new record!<br />");
          }
}
      }
        }
      }
    }
ShowSolution();

checkLevelLocks();

// track analytics:
trackpage('/solved-puzzle/'+currentgame);

  }
// AH: set the highest level to the current level
      var highestlevel=localStorage.getItem('highestlevel'); 
      if(currentgame>highestlevel) { localStorage.setItem("highestlevel",currentgame); } 
    else
    { wrongMovesNew=0;
      if (document.getElementById){}
        // document.getElementById('hintButtons').style.display="none";
    }
  }
  else
  { 
// AH: When a wrong move is made do this:
      localStorage.setItem("currentgamesolvedstreakmessage","");
// get a random number between 1 and 10 and then return the corresponding praise message
var randomnumber = Math.floor(Math.random()*11);

// get a random error message from the list
  errorgamemessage=randomerrormessage(randomnumber);
    jError(errorgamemessage);
// AH: Increase the total wrong move count by one:
var totalwrongmoves=localStorage.getItem('totalwrongmoves'); 
  totalwrongmoves++;
    localStorage.setItem("totalwrongmoves",totalwrongmoves); 
// AH: reset the current correct move streak to zero
var currentcorrectmovestreak=localStorage.getItem('currentcorrectmovestreak'); 
    localStorage.setItem("currentcorrectmovestreak",0); 
    localStorage.setItem("perfectgamestreak",0); 
    wrongMoves++;
    MoveBack(1);
    ExecCommand(true);
    SetMove(MoveCount+1,CurVar);
    ExecCommand(false);
    MoveBack(1);
    wrongMovesNew++;

// AH: When 3 wrong moves are made, show a hint:
    if ((wrongMovesNew==3)&&(document.getElementById)) {}
      // document.getElementById('hintButtons').style.display="inline";
  }
}