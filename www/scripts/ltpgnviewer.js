// LT-PGN-VIEWER 3.491 (c) Lutz Tautenhahn (2001-2011)
var ScriptPath="http://www.lutanho.net/pgn/";
var i, j, s, StartMove, MoveCount, MoveType, CanPass, EnPass, MaxMove=500, isInit=false, isCalculating=false;
var CurVar=0, activeAnchor=-1, startAnchor=-1, activeAnchorBG=" rgba(0,174,239,0.5)", TargetDocument, isSetupBoard=false, BoardSetupMode='copy';
var dragX, dragY, dragObj, dragBorder, dragImgBorder, isDragDrop=false, isAnimating=false, isExecCommand=true, BoardPic, ParseType=1, AnnotationFile="";
OldCommands=new Array();
NewCommands=new Array();
dragImg=new Array(2);
dragPiece=new Array(8);
dragPiece[0]=-1;
dragPiece[4]=-1;

ShortPgnMoveText=new Array(3);
for (i=0; i<3; i++) ShortPgnMoveText[i] = new Array();
ShortPgnMoveText[0][CurVar]="";

PieceType = new Array(2); for (i=0; i<2; i++) PieceType[i] = new Array(16);
PiecePosX = new Array(2); for (i=0; i<2; i++) PiecePosX[i] = new Array(16);
PiecePosY = new Array(2); for (i=0; i<2; i++) PiecePosY[i] = new Array(16);
PieceMoves = new Array(2); for (i=0; i<2; i++) PieceMoves[i] = new Array(16);

var isRotated=false, isRecording=false, isNullMove=true, RecordCount=0, RecordedMoves="", SkipRefresh=0;
var AutoPlayInterval, isAutoPlay=false, Delay=1000, BoardClicked=-1, isCapturedPieces=false, CandidateStyle="";
var PieceName = "KQRBNP", ShowPieceName = "KQRBNP";
PieceCode = new Array(6); for (i=0; i<6; i++) PieceCode[i]=PieceName.charCodeAt(i);
var StandardFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
var FenString = StandardFen;
ColorName = new Array("w","b","t"); //white, black, transparent
Castling = new Array(2); for (i=0; i<2; i++) Castling[i] = new Array(2);
Board = new Array(8); for (i=0; i<8; i++) Board[i] = new Array(8);

HalfMove = new Array(MaxMove+1);
HistMove = new Array(MaxMove);
HistCommand = new Array(MaxMove+1);
HistPiece = new Array(2);
for (i=0; i<2; i++) HistPiece[i] = new Array(MaxMove);
HistType = new Array(2);
for (i=0; i<2; i++) HistType[i] = new Array(MaxMove);
HistPosX = new Array(2);
for (i=0; i<2; i++) HistPosX[i] = new Array(MaxMove);
HistPosY = new Array(2);
for (i=0; i<2; i++) HistPosY[i] = new Array(MaxMove);
MoveArray = new Array();

PiecePic = new Array(2);
for (i=0; i<2; i++) PiecePic[i] = new Array(6);
LabelPic = new Array(5);
Annotation = new Array();
DocImg=new Array();

var ImagePathOld="-", ImagePath="", ImageOffset=0, IsLabelVisible=true, Border=1, BorderColor="rgba(254,255,254,0)", ScoreSheet=0, BGColor="";

function SetImagePath(pp)
{ ImagePath=pp;
}

function SetBorder(nn)
{ Border=parseInt(nn);
}

function SetBorderColor(cc)
{ if (cc.length==6) BorderColor="#"+cc;
  else BorderColor=cc;
}

function SetScoreSheet(nn)
{ ScoreSheet=parseInt(nn);
}

function SetBGColor(cc)
{ if (cc.charAt(0)=="#") BGColor=cc;
  else BGColor="#"+cc;
}

function SetImg(ii,oo)
{ if (DocImg[ii]==oo.src) return;
  DocImg[ii]=oo.src;
  //if (ii<64)
  if (isNaN(ii)) document.images[ii].src=oo.src;
  else document.images[ii+ImageOffset].src=oo.src;
  //else document.images[ii].src=oo.src;
}

function ShowLabels(bb)
{ IsLabelVisible=bb;
  RefreshBoard();
}

function SwitchLabels()
{ IsLabelVisible=!IsLabelVisible;
  RefreshBoard();
}

function GetValue(oo)
{ var vv="";
  eval("vv="+oo);
  return(vv);
}

function InitImages()
{ if (ImagePathOld==ImagePath) return;
  var ii, jj;
  BoardPic = new Image(); 
  BoardPic.src = ImagePath+"blank.svg";
  for (ii=0; ii<2; ii++)
  { PiecePic[ii][0] = new Image(); PiecePic[ii][0].src = ImagePath+ColorName[ii]+"k.svg";
    PiecePic[ii][1] = new Image(); PiecePic[ii][1].src = ImagePath+ColorName[ii]+"q.svg";
    PiecePic[ii][2] = new Image(); PiecePic[ii][2].src = ImagePath+ColorName[ii]+"r.svg";
    PiecePic[ii][3] = new Image(); PiecePic[ii][3].src = ImagePath+ColorName[ii]+"b.svg";
    PiecePic[ii][4] = new Image(); PiecePic[ii][4].src = ImagePath+ColorName[ii]+"n.svg";
    PiecePic[ii][5] = new Image(); PiecePic[ii][5].src = ImagePath+ColorName[ii]+"p.svg";
  }
  LabelPic[0] = new Image(); LabelPic[0].src = ImagePath+"blank.svg";
  LabelPic[1] = new Image(); LabelPic[1].src = ImagePath+"blank.svg";
  LabelPic[2] = new Image(); LabelPic[2].src = ImagePath+"blank.svg";
  LabelPic[3] = new Image(); LabelPic[3].src = ImagePath+"blank.svg";
  LabelPic[4] = new Image(); LabelPic[4].src = ImagePath+"blank.svg";
  ImagePathOld=ImagePath;
//ImageOffset=0;
  for (ii=0; ii<document.images.length; ii++)
  { if (document.images[ii]==document.images["RightLabels"])
    { if (ii>64) ImageOffset=ii-64;
    }
  }
  DocImg.length=0;
}

function sign(nn)
{ if (nn>0) return(1);
  if (nn<0) return(-1);
  return(0);
}

function OpenUrl(ss)
{ if (ss!="")
    parent.frames[1].location.href = ss;
  else
  { if (document.BoardForm.Url.value!="")  
    { var nn=document.BoardForm.OpenParsePgn.selectedIndex;
      if (((nn)||(document.BoardForm.Url.value.indexOf(".htm")>0))&&(!document.layers)) 
      { parent.frames[1].location.href = document.BoardForm.Url.value;
        if (nn) setTimeout("ParsePgn("+nn+")",400);
      }
      else parent.frames[1].location.href = "pgnframe.html?"+document.BoardForm.Url.value;
    }
    else parent.frames[1].location.href = "pgnframe.html";
  }
}

function Init(rr)
{ var cc, ii, jj, kk, ll, nn, mm;
  isInit=true;
  if (isAutoPlay) SetAutoPlay(false);
  if (rr!='')
  { FenString=rr;
    while (FenString.indexOf("|")>0) FenString=FenString.replace("|","/");
  }
  if (FenString=='standard')
    FenString=StandardFen;
  if ((document.BoardForm)&&(document.BoardForm.FEN))
      document.BoardForm.FEN.value=FenString;
  if (FenString == StandardFen)
  { for (ii=0; ii<2; ii++)
    { PieceType[ii][0]=0;
      PiecePosX[ii][0]=4;
      PieceType[ii][1]=1;
      PiecePosX[ii][1]=3;
      PieceType[ii][2]=2;
      PiecePosX[ii][2]=0;
      PieceType[ii][3]=2;
      PiecePosX[ii][3]=7;
      PieceType[ii][4]=3;
      PiecePosX[ii][4]=2;
      PieceType[ii][5]=3;
      PiecePosX[ii][5]=5;
      PieceType[ii][6]=4;
      PiecePosX[ii][6]=1;
      PieceType[ii][7]=4;
      PiecePosX[ii][7]=6;
      for (jj=0; jj<8; jj++)
      { PieceType[ii][jj+8]=5;
        PiecePosX[ii][jj+8]=jj;
      }
      for (jj=0; jj<16; jj++)
      { PieceMoves[ii][jj]=0;
        PiecePosY[ii][jj]=(1-ii)*Math.floor(jj/8)+ii*(7-Math.floor(jj/8));
      }
    }
    for (ii=0; ii<8; ii++)
    { for (jj=0; jj<8; jj++) Board[ii][jj]=0;
    }
    for (ii=0; ii<2; ii++)
    { for (jj=0; jj<16; jj++)
        Board[PiecePosX[ii][jj]][PiecePosY[ii][jj]]=(PieceType[ii][jj]+1)*(1-2*ii);
    }
    for (ii=0; ii<2; ii++)
    { for (jj=0; jj<2; jj++)
        Castling[ii][jj]=1;
    }
    EnPass=-1;
    HalfMove[0]=0;
    if (document.BoardForm)
    { RefreshBoard();
      if (document.BoardForm.Position)
        document.BoardForm.Position.value="";
      NewCommands.length=0;
      ExecCommands();
    }
    StartMove=0;
    MoveCount=StartMove;
    MoveType=StartMove%2;
    SetBoardClicked(-1);
    RecordCount=0;
    CurVar=0;
    MoveArray.length=0;
    if (TargetDocument) HighlightMove("m"+MoveCount+"v"+CurVar);
    UpdateAnnotation(true);
  }
  else
  { for (ii=0; ii<2; ii++)
    { for (jj=0; jj<16; jj++)
      { PieceType[ii][jj]=-1;
        PiecePosX[ii][jj]=0;
        PiecePosY[ii][jj]=0;
        PieceMoves[ii][jj]=0;
      }
    }
    ii=0; jj=7; ll=0; nn=1; mm=1; cc=FenString.charAt(ll++);
    while (cc!=" ")
    { if (cc=="/")
      { if (ii!=8)
        { alert("Invalid FEN [1]: char "+ll+" in "+FenString);
          Init('standard');
          return;
        }
        ii=0;
        jj--;
      }
      if (ii==8) 
      { alert("Invalid FEN [2]: char "+ll+" in "+FenString);
        Init('standard');
        return;
      }
      if (! isNaN(cc))
      { ii+=parseInt(cc);
        if ((ii<0)||(ii>8))
        { alert("Invalid FEN [3]: char "+ll+" in "+FenString);
          Init('standard');
          return;
        }
      }
      if (cc.charCodeAt(0)==PieceName.toUpperCase().charCodeAt(0))
      { if (PieceType[0][0]!=-1)
        { alert("Invalid FEN [4]: char "+ll+" in "+FenString);
          Init('standard');
          return;
        }     
        PieceType[0][0]=0;
        PiecePosX[0][0]=ii;
        PiecePosY[0][0]=jj;
        ii++;
      }
      if (cc.charCodeAt(0)==PieceName.toLowerCase().charCodeAt(0))
      { if (PieceType[1][0]!=-1)
        { alert("Invalid FEN [5]: char "+ll+" in "+FenString);
          Init('standard');
          return;
        }  
        PieceType[1][0]=0;
        PiecePosX[1][0]=ii;
        PiecePosY[1][0]=jj;
        ii++;
      }
      for (kk=1; kk<6; kk++)
      { if (cc.charCodeAt(0)==PieceName.toUpperCase().charCodeAt(kk))
        { if (nn==16)
          { alert("Invalid FEN [6]: char "+ll+" in "+FenString);
            Init('standard');
            return;
          }          
          PieceType[0][nn]=kk;
          PiecePosX[0][nn]=ii;
          PiecePosY[0][nn]=jj;
          nn++;
          ii++;
        }
        if (cc.charCodeAt(0)==PieceName.toLowerCase().charCodeAt(kk))
        { if (mm==16)
          { alert("Invalid FEN [7]: char "+ll+" in "+FenString);
            Init('standard');
            return;
          }  
          PieceType[1][mm]=kk;
          PiecePosX[1][mm]=ii;
          PiecePosY[1][mm]=jj;
          mm++;
          ii++;
        }
      }
      if (ll<FenString.length)
        cc=FenString.charAt(ll++);
      else cc=" ";
    }
    if ((ii!=8)||(jj!=0))
    { alert("Invalid FEN [8]: char "+ll+" in "+FenString);
      Init('standard');
      return;
    }
    if ((PieceType[0][0]==-1)||(PieceType[1][0]==-1))
    { alert("Invalid FEN [9]: char "+ll+" missing king");
      Init('standard');
      return;
    }
    if (ll==FenString.length)
    { FenString+=" w ";
      FenString+=PieceName.toUpperCase().charAt(0);
      FenString+=PieceName.toUpperCase().charAt(1);
      FenString+=PieceName.toLowerCase().charAt(0);
      FenString+=PieceName.toLowerCase().charAt(1);      
      FenString+=" - 0 1";
      ll++;
    }
//    { alert("Invalid FEN [10]: char "+ll+" missing active color");
//      Init('standard');
//      return;
//    }
    cc=FenString.charAt(ll++);
    if ((cc=="w")||(cc=="b"))
    { if (cc=="w") StartMove=0;
      else StartMove=1;
    }
    else
    { alert("Invalid FEN [11]: char "+ll+" invalid active color");
      Init('standard');
      return;
    }
    ll++;
    if (ll>=FenString.length)
    { alert("Invalid FEN [12]: char "+ll+" missing castling availability");
      Init('standard');
      return;
    }
    Castling[0][0]=0; Castling[0][1]=0; Castling[1][0]=0; Castling[1][1]=0;
    cc=FenString.charAt(ll++);
    while (cc!=" ")
    { cc=cc.charCodeAt(0);
      if (cc==PieceName.toUpperCase().charCodeAt(0))
        Castling[0][0]=1; 
      if (cc==PieceName.toUpperCase().charCodeAt(1))
        Castling[0][1]=1; 
      if (cc==PieceName.toLowerCase().charCodeAt(0))
        Castling[1][0]=1; 
      if (cc==PieceName.toLowerCase().charCodeAt(1))
        Castling[1][1]=1;
      if ((cc>=65)&&(cc<=72)) //A...H  for Chess960
      { if (cc>PiecePosX[0][0]+65) Castling[0][0]=1;
        if (cc<PiecePosX[0][0]+65) Castling[0][1]=1;
      }
      if ((cc>=97)&&(cc<=104)) //a...h  for Chess960
      { if (cc>PiecePosX[1][0]+97) Castling[1][0]=1;
        if (cc<PiecePosX[1][0]+97) Castling[1][1]=1;
      }
      if (ll<FenString.length)
        cc=FenString.charAt(ll++);
      else cc=" ";
    }
    if (ll==FenString.length)
    { alert("Invalid FEN [13]: char "+ll+" missing en passant target square");
      Init('standard');
      return;
    }
    EnPass=-1;
    cc=FenString.charAt(ll++);
    while (cc!=" ")
    { if ((cc.charCodeAt(0)-97>=0)&&(cc.charCodeAt(0)-97<=7))
        EnPass=cc.charCodeAt(0)-97; 
      if (ll<FenString.length)
        cc=FenString.charAt(ll++);
      else cc=" ";
    }
    if (ll==FenString.length)
    { alert("Invalid FEN [14]: char "+ll+" missing halfmove clock");
      Init('standard');
      return;
    }
    HalfMove[0]=0;
    cc=FenString.charAt(ll++);
    while (cc!=" ")
    { if (isNaN(cc))
      { alert("Invalid FEN [15]: char "+ll+" invalid halfmove clock");
        Init('standard');
        return;
      }
      HalfMove[0]=HalfMove[0]*10+parseInt(cc);
      if (ll<FenString.length)
        cc=FenString.charAt(ll++);
      else cc=" ";
    }
    if (ll==FenString.length)
    { alert("Invalid FEN [16]: char "+ll+" missing fullmove number");
      Init('standard');
      return;
    }
    cc=FenString.substring(ll++);
    if (isNaN(cc))
    { alert("Invalid FEN [17]: char "+ll+" invalid fullmove number");
      Init('standard');
      return;
    }
    if (cc<=0)
    { alert("Invalid FEN [18]: char "+ll+" invalid fullmove number");
      Init('standard');
      return;
    }
    StartMove+=2*(parseInt(cc)-1);
    for (ii=0; ii<8; ii++)
    { for (jj=0; jj<8; jj++) Board[ii][jj]=0;
    }
    for (ii=0; ii<2; ii++)
    { for (jj=0; jj<16; jj++)
      { if (PieceType[ii][jj]!=-1) 
          Board[PiecePosX[ii][jj]][PiecePosY[ii][jj]]=(PieceType[ii][jj]+1)*(1-2*ii);
      }
    }
    if (document.BoardForm)
    { RefreshBoard();
      if (document.BoardForm.Position)
      { if (StartMove%2==0)  {
        document.BoardForm.Position.value="White to move";
              $('#indicator').removeClass('black').addClass('white');
               firstmovecolor="White";
		  }
        else {
          document.BoardForm.Position.value="Black to move";
           firstmovecolor="Black";
              $('#indicator').removeClass('white').addClass('black');
              RotateBoard(! isRotated);
              }
      }
      NewCommands.length=0;
      ExecCommands();
    }
    MoveCount=StartMove;
    MoveType=StartMove%2;
    SetBoardClicked(-1);
    RecordCount=0;
    CurVar=0;
    MoveArray.length=0;
    if (TargetDocument) HighlightMove("m"+MoveCount+"v"+CurVar);
    UpdateAnnotation(true);
  }
}

function MoveBack(nn)
{ var ii, jj, cc;
  if (BoardClicked>=0) SetBoardClicked(-1);
  for (jj=0; (jj<nn)&&(MoveCount>StartMove); jj++)
  { if (RecordCount>0) RecordCount--;
    MoveCount--;
    MoveType=1-MoveType;
    cc=MoveCount-StartMove;
    ii=HistPiece[1][cc];
    if ((0<=ii)&&(ii<16)) //we must do this here because of Chess960 castling
    { Board[PiecePosX[MoveType][ii]][PiecePosY[MoveType][ii]]=0; 
      Board[HistPosX[1][cc]][HistPosY[1][cc]]=(HistType[1][cc]+1)*(1-2*MoveType);
    }
    ii=HistPiece[0][cc]; 
    Board[PiecePosX[MoveType][ii]][PiecePosY[MoveType][ii]]=0;
    Board[HistPosX[0][cc]][HistPosY[0][cc]]=(HistType[0][cc]+1)*(1-2*MoveType);
    PieceType[MoveType][ii]=HistType[0][cc];
    PiecePosX[MoveType][ii]=HistPosX[0][cc];
    PiecePosY[MoveType][ii]=HistPosY[0][cc];
    PieceMoves[MoveType][ii]--;
    ii=HistPiece[1][cc];
    if ((0<=ii)&&(ii<16))
    { PieceType[MoveType][ii]=HistType[1][cc];
      PiecePosX[MoveType][ii]=HistPosX[1][cc];
      PiecePosY[MoveType][ii]=HistPosY[1][cc];
      PieceMoves[MoveType][ii]--;
    }
    ii-=16;
    if (0<=ii)
    { Board[HistPosX[1][cc]][HistPosY[1][cc]]=(HistType[1][cc]+1)*(2*MoveType-1);
      PieceType[1-MoveType][ii]=HistType[1][cc];
      PiecePosX[1-MoveType][ii]=HistPosX[1][cc];
      PiecePosY[1-MoveType][ii]=HistPosY[1][cc];
      PieceMoves[1-MoveType][ii]--;
    }
    if (CurVar!=0)
    { if (MoveCount==ShortPgnMoveText[2][CurVar])
      { CurVar=ShortPgnMoveText[1][CurVar];
        if ((!isCalculating)&&(document.BoardForm)&&(document.BoardForm.PgnMoveText))
          document.BoardForm.PgnMoveText.value=ShortPgnMoveText[0][CurVar];
      }  
    }    
  }
  if (HistCommand[MoveCount-StartMove]) NewCommands=HistCommand[MoveCount-StartMove].split("|");
  if (isCalculating) return;
  if ((OldCommands.length>0)||(NewCommands.length>0)) ExecCommands();
  if (document.BoardForm)
  { RefreshBoard();
    if (document.BoardForm.Position)
    { if (MoveCount>StartMove)
        document.BoardForm.Position.value=TransformSAN(HistMove[MoveCount-StartMove-1]);
      else
        document.BoardForm.Position.value="";
    }    
  }
  if (TargetDocument) HighlightMove("m"+MoveCount+"v"+CurVar);
  UpdateAnnotation(false);
  if (AutoPlayInterval) clearTimeout(AutoPlayInterval);
  if (isAutoPlay) AutoPlayInterval=setTimeout("MoveBack("+nn+")", Delay);
}

function Uncomment(ss)
{ if (! ss) return(ss);
  var ii, jj, llist=ss.split("{"), ll=llist.length, uu=llist[0], tt, kk;
  for (ii=1; ii<ll; ii++)
  { tt=llist[ii];
    jj=tt.indexOf("}")+1;
    if (jj>0) uu+=tt.substring(jj);
  }
  llist=uu.split("$");
  ll=llist.length;
  uu=llist[0];
  for (ii=1; ii<ll; ii++)
  { tt=llist[ii];
    kk=tt.length;
    for (jj=0; jj<kk; jj++)
    { if (isNaN(parseInt(tt.charAt(jj))))
      //if (tt.charAt(jj)==" ")
      { uu+=tt.substring(jj+1);
        jj=kk;
      }
    }    
  }
  return(uu);
}

function GetComment(ss)
{ if (! ss) return(ss);
  var ii, jj, llist=ss.split("}"), ll=llist.length, uu="", tt, kk;
  for (ii=0; ii<ll; ii++)
  { tt=llist[ii];
    jj=tt.indexOf("{")+1;
    if (jj>0) uu+=tt.substring(jj);
  }
  return(uu);
}

function MoveForward(nn, rr)
{ var ii,ffst=0,llst,ssearch,ssub,ffull,mmove0="",mmove1="";
  if (rr);
  else
  { if ((document.BoardForm)&&(document.BoardForm.PgnMoveText))
      ShortPgnMoveText[0][CurVar]=document.BoardForm.PgnMoveText.value;
    if (BoardClicked>=0) SetBoardClicked(-1);
  }
  ffull=Uncomment(ShortPgnMoveText[0][CurVar]);
  for (ii=0; (ii<nn)&&(ffst>=0)&&(MoveCount<MaxMove); ii++)
  { ssearch=Math.floor(MoveCount/2+2)+".";
    llst=ffull.indexOf(ssearch);
    ssearch=Math.floor(MoveCount/2+1)+".";
    ffst=ffull.indexOf(ssearch);
    if (ffst>=0)
    { ffst+=ssearch.length;
      if (llst<0)
        ssub=ffull.substring(ffst);
      else
        ssub=ffull.substring(ffst, llst);
      mmove0=GetMove(ssub,MoveType);
      if (mmove0!="")
      { if (ParseMove(mmove0, true)>0)
        { mmove1=mmove0;
          if (MoveType==0)
            HistMove[MoveCount-StartMove]=Math.floor((MoveCount+2)/2)+"."+mmove1;
          else
            HistMove[MoveCount-StartMove]=Math.floor((MoveCount+2)/2)+". ... "+mmove1;
          HistCommand[MoveCount-StartMove+1]=NewCommands.join("|");
          MoveCount++;
          MoveType=1-MoveType;
        }  
        else
        { if (MoveType==1)
          { ssub=Math.floor(MoveCount/2+1);
            ssearch=ssub+"....";
            ffst=ffull.indexOf(ssearch);
            if (ffst<0) { ssearch=ssub+". ..."; ffst=ffull.indexOf(ssearch); }
            if (ffst<0) { ssearch=ssub+". .."; ffst=ffull.indexOf(ssearch); }
            if (ffst<0) { ssearch=ssub+" ..."; ffst=ffull.indexOf(ssearch); }
            if (ffst<0) { ssearch=ssub+"..."; ffst=ffull.indexOf(ssearch); }            
            if (ffst<0) { ssearch=ssub+" .."; ffst=ffull.indexOf(ssearch); }
            if (ffst>=0) 
            { ffst+=ssearch.length;
              if (llst<0) ssub=ffull.substring(ffst);
              else ssub=ffull.substring(ffst, llst);
              mmove0=GetMove(ssub,0);
              if (mmove0!="")
              { if (ParseMove(mmove0, true)>0)
                { mmove1=mmove0;
                  HistMove[MoveCount-StartMove]=Math.floor((MoveCount+2)/2)+". ... "+mmove1;
                  HistCommand[MoveCount-StartMove+1]=NewCommands.join("|");
                  MoveCount++;
                  MoveType=1-MoveType;
                }  
                else
                { ffst=-1;
                  //alert(mmove0+" is not a valid move.");
                }
              }
            }
          }
          else
          { ffst=-1;
            //alert(mmove0+" is not a valid move.");
          }
        }
      }
      else ffst=-1;
    }
  }
  if (isCalculating) return;
  if ((OldCommands.length>0)||(NewCommands.length>0)) ExecCommands();
  if (document.BoardForm)
  { if ((document.BoardForm.Position)&&(mmove1!=""))
      document.BoardForm.Position.value=TransformSAN(HistMove[MoveCount-StartMove-1]);
    if ((mmove1!="")&&(isDragDrop)&&(nn==1)&&(!dragObj)&&(dragPiece[0]>=0)&&(!rr)&&(!isAnimating)) AnimateBoard(1);
    else RefreshBoard();
  }
  if (TargetDocument) HighlightMove("m"+MoveCount+"v"+CurVar);
  UpdateAnnotation(false);
  if (AutoPlayInterval) clearTimeout(AutoPlayInterval);
  if (isAutoPlay) AutoPlayInterval=setTimeout("MoveForward("+nn+")", Delay);
}

function ParseMove(mm, sstore)
{ var ii, ffrom="", ccapt=0, ll, yy1i=-1;
  var ttype0=-1, xx0=-1, yy0=-1, ttype1=-1, xx1=-1, yy1=-1;
  if (MoveCount>StartMove)
  { CanPass=-1;
    ii=HistPiece[0][MoveCount-StartMove-1];
    if ((HistType[0][MoveCount-StartMove-1]==5)&&(Math.abs(HistPosY[0][MoveCount-StartMove-1]-PiecePosY[1-MoveType][ii])==2))
      CanPass=PiecePosX[1-MoveType][ii];
  }
  else
    CanPass=EnPass;
  ii=1;
  while (ii<mm.length)  
  { if (! isNaN(mm.charAt(ii)))
    { xx1=mm.charCodeAt(ii-1)-97;
      yy1=mm.charAt(ii)-1;
      yy1i=ii;
      ffrom=mm.substring(0, ii-1);
    }
    ii++;
  }
  if ((xx1<0)||(xx1>7)||(yy1<0)||(yy1>7))
  { if ((mm.indexOf("O")>=0)||(mm.indexOf("0")>=0))
    { if ((mm.indexOf("O-O-O")>=0)||(mm.indexOf("0-0-0")>=0)||(mm.indexOf("O朞朞")>=0)||(mm.indexOf("0𢠢")>=0)) 
      { if (EvalMove(ttype0, 6, xx0, yy0, ttype1, xx1, yy1, ccapt, sstore))
          return(1);
        return(0);
      }
      if ((mm.indexOf("O-O")>=0)||(mm.indexOf("0-0")>=0)||(mm.indexOf("O朞")>=0)||(mm.indexOf("0�0")>=0))
      { if (EvalMove(ttype0, 7, xx0, yy0, ttype1, xx1, yy1, ccapt, sstore))
          return(1);
        return(0);
      }
      return(0);
    }
    if ((mm.indexOf("---")>=0)||(mm.indexOf("枛�")>=0))
    //if (mm.indexOf("...")>=0) //is buggy
    { if (EvalMove(ttype0, 8, xx0, yy0, ttype1, xx1, yy1, ccapt, sstore))
        return(1);
      return(0);
    }
    return(0);
  }
  ll=ffrom.length;
  ttype0=5;
  if (ll>0)
  { for (ii=0; ii<5; ii++)
    { if (ffrom.charCodeAt(0)==PieceCode[ii]) 
        ttype0=ii;
    }
    if (ffrom.charAt(ll-1)=="x") ccapt=1;
    else
    { if ((ffrom.charAt(ll-1)=="-")||(ffrom.charAt(ll-1)=="�")) ll--; //Smith Notation
    }
    if (isNaN(mm.charAt(ll-1-ccapt)))
    { xx0=ffrom.charCodeAt(ll-1-ccapt)-97;
      if ((xx0<0)||(xx0>7)) xx0=-1;
    }
    else
    { yy0=ffrom.charAt(ll-1-ccapt)-1;
      if ((yy0<0)||(yy0>7)) yy0=-1;
    }
    if ((yy0>=0)&&(isNaN(mm.charAt(ll-2-ccapt)))) //Smith Notation
    { xx0=ffrom.charCodeAt(ll-2-ccapt)-97;
      if ((xx0<0)||(xx0>7)) xx0=-1;
      else
      { ttype0=Math.abs(Board[xx0][yy0])-1;
        if ((ttype0==0)&&(xx0-xx1>1)&&(yy0==yy1))
        { if (EvalMove(ttype0, 6, xx0, yy0, -1, -1, -1, 0, sstore))
            return(1);
          return(0);
        }  
        if ((ttype0==0)&&(xx1-xx0>1)&&(yy0==yy1))
        { if (EvalMove(ttype0, 7, xx0, yy0, -1, -1, -1, 0, sstore))
            return(1);
          return(0);
        }
      }
    }
  }
  if (Board[xx1][yy1]!=0) ccapt=1;
  else
  { if ((ttype0==5)&&(xx1==CanPass)&&(yy1==5-3*MoveType)) ccapt=1;
  }
  ttype1=ttype0;
  ii=mm.indexOf("=");
  if (ii<0) ii=yy1i;
  if ((ii>0)&&(ii<mm.length-1))
  { if (ttype0==5)
    { ii=mm.charCodeAt(ii+1);
      if (ii==PieceCode[1]) ttype1=1;
      if (ii==PieceCode[2]) ttype1=2;
      if (ii==PieceCode[3]) ttype1=3;
      if (ii==PieceCode[4]) ttype1=4;
    }  
  }
  if (sstore)
  { for (ii=0; ii<16; ii++)
    { if (PieceType[MoveType][ii]==ttype0)
      { if (EvalMove(ii, ttype0, xx0, yy0, ttype1, xx1, yy1, ccapt, true))
          return(1);
      }
    }
  }
  else
  { ll=0;
    for (ii=0; ii<16; ii++)
    { if (PieceType[MoveType][ii]==ttype0)
      { if (EvalMove(ii, ttype0, xx0, yy0, ttype1, xx1, yy1, ccapt, false))
          ll++;
      }
    }
    return(ll);
  }    
  return(0);
}

function CanCastleLong()
{ if (Castling[MoveType][1]==0) return(-1);
  if (PieceMoves[MoveType][0]>0) return(-1);
  var jj=0;
  while (jj<16)
  { if ((PiecePosX[MoveType][jj]<PiecePosX[MoveType][0])&&
        (PiecePosY[MoveType][jj]==MoveType*7)&&
        (PieceType[MoveType][jj]==2)&&
        (PieceMoves[MoveType][jj]==0))
      jj+=100;
    else jj++;
  }
  if (jj==16) return(-1);
  jj-=100;
  Board[PiecePosX[MoveType][0]][MoveType*7]=0;
  Board[PiecePosX[MoveType][jj]][MoveType*7]=0;
  var ff=PiecePosX[MoveType][jj];
  if (ff>2) ff=2;
  while ((ff<PiecePosX[MoveType][0])||(ff<=3))
  { if (Board[ff][MoveType*7]!=0)
    { Board[PiecePosX[MoveType][0]][MoveType*7]=1-2*MoveType;
      Board[PiecePosX[MoveType][jj]][MoveType*7]=(1-2*MoveType)*3;
      return(-1);
    }
    ff++;
  }
  Board[PiecePosX[MoveType][0]][MoveType*7]=1-2*MoveType;
  Board[PiecePosX[MoveType][jj]][MoveType*7]=(1-2*MoveType)*3;  
  return(jj);
}

function CanCastleShort()
{ if (Castling[MoveType][0]==0) return(-1);
  if (PieceMoves[MoveType][0]>0) return(-1);
  var jj=0;
  while (jj<16)
  { if ((PiecePosX[MoveType][jj]>PiecePosX[MoveType][0])&&
        (PiecePosY[MoveType][jj]==MoveType*7)&&
        (PieceType[MoveType][jj]==2)&&
        (PieceMoves[MoveType][jj]==0))
      jj+=100;
    else jj++;
  }
  if (jj==16) return(-1);
  jj-=100;
  Board[PiecePosX[MoveType][0]][MoveType*7]=0;
  Board[PiecePosX[MoveType][jj]][MoveType*7]=0;
  var ff=PiecePosX[MoveType][jj];
  if (ff<6) ff=6;
  while ((ff>PiecePosX[MoveType][0])||(ff>=5))
  { if (Board[ff][MoveType*7]!=0)
    { Board[PiecePosX[MoveType][0]][MoveType*7]=1-2*MoveType;
      Board[PiecePosX[MoveType][jj]][MoveType*7]=(1-2*MoveType)*3;
      return(-1);
    }
    ff--;
  }
  Board[PiecePosX[MoveType][0]][MoveType*7]=1-2*MoveType;
  Board[PiecePosX[MoveType][jj]][MoveType*7]=(1-2*MoveType)*3;
  return(jj);     
}
function EvalMove(ii, ttype0, xx0, yy0, ttype1, xx1, yy1, ccapt, sstore)
{ var ddx, ddy, xx, yy, jj=-1, ttype2=-1, xx2=xx1, yy2=xx1, ttype3=-1, xx3=-1, yy3=-1, ff;
  if (ttype0==6) //O-O-O with Chess960 rules
  { jj=CanCastleLong();
    if (jj<0) return(false);
    if (StoreMove(0, 0, 2, MoveType*7, jj, 2, 3, MoveType*7, sstore))
      return(true);
    else return(false);
  }
  if (ttype0==7) //O-O with Chess960 rules
  { jj=CanCastleShort();
    if (jj<0) return(false);
    if (StoreMove(0, 0, 6, MoveType*7, jj, 2, 5, MoveType*7, sstore))
      return(true);
    return(false);
  }
  if (ttype0==8) // --- NullMove
  { if (StoreMove(0, 0, PiecePosX[MoveType][0], PiecePosY[MoveType][0], -1, -1, -1, -1, sstore))
      return(true);
    return(false);
  }  
  if ((PiecePosX[MoveType][ii]==xx1)&&(PiecePosY[MoveType][ii]==yy1))
    return(false);
  if ((ccapt==0)&&(Board[xx1][yy1]!=0))
    return(false);
  if ((ccapt>0)&&(sign(Board[xx1][yy1])!=(2*MoveType-1)))
  { if ((ttype0!=5)||(CanPass!=xx1)||(yy1!=5-3*MoveType))
      return(false);
  }
  if ((xx0>=0)&&(xx0!=PiecePosX[MoveType][ii])) return(false);
  if ((yy0>=0)&&(yy0!=PiecePosY[MoveType][ii])) return(false);
  if (ttype0==0)
  { //if ((xx0>=0)||(yy0>=0)) return(false); //because of Smith Notation
    if (Math.abs(PiecePosX[MoveType][ii]-xx1)>1) return(false);
    if (Math.abs(PiecePosY[MoveType][ii]-yy1)>1) return(false);
  }
  if (ttype0==1)
  { if ((Math.abs(PiecePosX[MoveType][ii]-xx1)!=Math.abs(PiecePosY[MoveType][ii]-yy1))&&
        ((PiecePosX[MoveType][ii]-xx1)*(PiecePosY[MoveType][ii]-yy1)!=0))
      return(false);
  }
  if (ttype0==2)
  { if ((PiecePosX[MoveType][ii]-xx1)*(PiecePosY[MoveType][ii]-yy1)!=0)
      return(false);
  }
  if (ttype0==3)
  { if (Math.abs(PiecePosX[MoveType][ii]-xx1)!=Math.abs(PiecePosY[MoveType][ii]-yy1))
      return(false);
  }
  if (ttype0==4)
  { if (Math.abs(PiecePosX[MoveType][ii]-xx1)*Math.abs(PiecePosY[MoveType][ii]-yy1)!=2)
      return(false);
  }
  if ((ttype0==1)||(ttype0==2)||(ttype0==3))
  { ddx=sign(xx1-PiecePosX[MoveType][ii]);
    ddy=sign(yy1-PiecePosY[MoveType][ii]);
    xx=PiecePosX[MoveType][ii]+ddx;
    yy=PiecePosY[MoveType][ii]+ddy;
    while ((xx!=xx1)||(yy!=yy1))
    { if (Board[xx][yy]!=0) return(false);
      xx+=ddx;
      yy+=ddy;
    }
  }
  if (ttype0==5)
  { if (Math.abs(PiecePosX[MoveType][ii]-xx1)!=ccapt) return(false);
    if ((yy1==7*(1-MoveType))&&(ttype0==ttype1)) return(false);
    if (ccapt==0)
    { if (PiecePosY[MoveType][ii]-yy1==4*MoveType-2)
      { if (PiecePosY[MoveType][ii]!=1+5*MoveType) return(false);
        if (Board[xx1][yy1+2*MoveType-1]!=0) return(false);
      }
      else
      { if (PiecePosY[MoveType][ii]-yy1!=2*MoveType-1) return(false);
      }
    }
    else
    { if (PiecePosY[MoveType][ii]-yy1!=2*MoveType-1) return(false);
    }
  }
  if (ttype1!=ttype0)
  { if (ttype0!=5) return(false);
    if (ttype1>=5) return(false);
    if (yy1!=7-7*MoveType) return(false);
  }
  if ((ttype0<=5)&&(ccapt>0))
  { jj=15;
    while ((jj>=0)&&(ttype3<0))
    { if ((PieceType[1-MoveType][jj]>0)&&
          (PiecePosX[1-MoveType][jj]==xx1)&&
          (PiecePosY[1-MoveType][jj]==yy1))
        ttype3=PieceType[1-MoveType][jj];
      else
        jj--;
    }
    if ((ttype3==-1)&&(ttype0==5)&&(CanPass>=0))
    { jj=15;
      while ((jj>=0)&&(ttype3<0))
      { if ((PieceType[1-MoveType][jj]==5)&&
            (PiecePosX[1-MoveType][jj]==xx1)&&
            (PiecePosY[1-MoveType][jj]==yy1-1+2*MoveType))
          ttype3=PieceType[1-MoveType][jj];
        else
          jj--;
      }
    }
    ttype3=-1;
  }  
  if (StoreMove(ii, ttype1, xx1, yy1, jj, ttype3, xx3, yy3, sstore))
    return(true);
  return(false);
}

function StoreMove(ii, ttype1, xx1, yy1, jj, ttype3, xx3, yy3, sstore)
{ var iis_check=0, ll, cc=MoveCount-StartMove, ff=PiecePosX[MoveType][0], dd=0;
//  if ((ttype1==5)||((jj>=0)&&(ttype3<0)))
  if ((PieceType[MoveType][ii]==5)||((jj>=0)&&(ttype3<0)))
    HalfMove[cc+1]=0;
  else
    HalfMove[cc+1]=HalfMove[cc]+1;
  HistPiece[0][cc] = ii;
  HistType[0][cc] = PieceType[MoveType][ii];
  HistPosX[0][cc] = PiecePosX[MoveType][ii];
  HistPosY[0][cc] = PiecePosY[MoveType][ii];
  if (!isAnimating)
  { dragPiece[0]=PiecePosX[MoveType][ii];
    dragPiece[1]=PiecePosY[MoveType][ii];
    dragPiece[2]=xx1;
    dragPiece[3]=yy1;
    dragPiece[4]=-1;
  }
  if (jj<0) 
    HistPiece[1][cc] = -1;
  else
  { if (ttype3>=0)
    { HistPiece[1][cc] = jj;
      HistType[1][cc] = PieceType[MoveType][jj];
      HistPosX[1][cc] = PiecePosX[MoveType][jj];
      HistPosY[1][cc] = PiecePosY[MoveType][jj];
      if (!isAnimating)
      { dragPiece[4]=PiecePosX[MoveType][jj];
        dragPiece[5]=PiecePosY[MoveType][jj];
        dragPiece[6]=xx3;
        dragPiece[7]=yy3;
      }
    }
    else
    { HistPiece[1][cc] = 16+jj;
      HistType[1][cc] = PieceType[1-MoveType][jj];
      HistPosX[1][cc] = PiecePosX[1-MoveType][jj];
      HistPosY[1][cc] = PiecePosY[1-MoveType][jj];
    }
  }
  
  Board[PiecePosX[MoveType][ii]][PiecePosY[MoveType][ii]]=0;
  if (jj>=0)
  { if (ttype3<0)
      Board[PiecePosX[1-MoveType][jj]][PiecePosY[1-MoveType][jj]]=0;
    else
      Board[PiecePosX[MoveType][jj]][PiecePosY[MoveType][jj]]=0;
  }
  PieceType[MoveType][ii]=ttype1;
  if ((PiecePosX[MoveType][ii]!=xx1)||(PiecePosY[MoveType][ii]!=yy1)||(jj>=0))
  { PieceMoves[MoveType][ii]++; dd++; } //not a nullmove
  PiecePosX[MoveType][ii]=xx1;
  PiecePosY[MoveType][ii]=yy1;
  if (jj>=0)
  { if (ttype3<0)
    { PieceType[1-MoveType][jj]=ttype3;
      PieceMoves[1-MoveType][jj]++;
    }
    else
    { PiecePosX[MoveType][jj]=xx3;
      PiecePosY[MoveType][jj]=yy3;
      PieceMoves[MoveType][jj]++;
    }
  }
  if (jj>=0)
  { if (ttype3<0)
      Board[PiecePosX[1-MoveType][jj]][PiecePosY[1-MoveType][jj]]=0;    
    else
      Board[PiecePosX[MoveType][jj]][PiecePosY[MoveType][jj]]=(PieceType[MoveType][jj]+1)*(1-2*MoveType);
  }
  Board[PiecePosX[MoveType][ii]][PiecePosY[MoveType][ii]]=(PieceType[MoveType][ii]+1)*(1-2*MoveType);

  if ((ttype1==0)&&(ttype3==2)) //O-O-O, O-O
  { while (ff>xx1) 
    { iis_check+=IsCheck(ff, MoveType*7, MoveType);
      ff--;      
    }
    while (ff<xx1) 
    { iis_check+=IsCheck(ff, MoveType*7, MoveType);
      ff++;      
    } 
  }
  iis_check+=IsCheck(PiecePosX[MoveType][0], PiecePosY[MoveType][0], MoveType);

  if ((iis_check==0)&&(sstore))
  { MoveArray[cc]=String.fromCharCode(97+HistPosX[0][cc])+(HistPosY[0][cc]+1)+String.fromCharCode(97+PiecePosX[MoveType][ii])+(PiecePosY[MoveType][ii]+1);
    if (HistType[0][cc] != PieceType[MoveType][ii])
    { if (MoveType==0) MoveArray[cc]+=PieceName.charAt(PieceType[MoveType][ii]);
      else MoveArray[cc]+=PieceName.charAt(PieceType[MoveType][ii]).toLowerCase();
    }
    MoveArray.length=cc+1;
    return(true);
  }

  Board[PiecePosX[MoveType][ii]][PiecePosY[MoveType][ii]]=0;
  Board[HistPosX[0][cc]][HistPosY[0][cc]]=(HistType[0][cc]+1)*(1-2*MoveType);
  PieceType[MoveType][ii]=HistType[0][cc];
  PiecePosX[MoveType][ii]=HistPosX[0][cc];
  PiecePosY[MoveType][ii]=HistPosY[0][cc];
  PieceMoves[MoveType][ii]-=dd;
  if (jj>=0)   
  { if (ttype3>=0)
    { Board[PiecePosX[MoveType][jj]][PiecePosY[MoveType][jj]]=0;
      Board[HistPosX[0][cc]][HistPosY[0][cc]]=(HistType[0][cc]+1)*(1-2*MoveType);
      Board[HistPosX[1][cc]][HistPosY[1][cc]]=(HistType[1][cc]+1)*(1-2*MoveType);
      PieceType[MoveType][jj]=HistType[1][cc];
      PiecePosX[MoveType][jj]=HistPosX[1][cc];
      PiecePosY[MoveType][jj]=HistPosY[1][cc];
      PieceMoves[MoveType][jj]--;
    }
    else
    { Board[HistPosX[1][cc]][HistPosY[1][cc]]=(HistType[1][cc]+1)*(2*MoveType-1);
      PieceType[1-MoveType][jj]=HistType[1][cc];
      PiecePosX[1-MoveType][jj]=HistPosX[1][cc];
      PiecePosY[1-MoveType][jj]=HistPosY[1][cc];
      PieceMoves[1-MoveType][jj]--;
    }
  }
  if (iis_check==0) return(true);
  return(false);
}

function IsCheck(xx, yy, tt)
{ var ii0=xx, jj0=yy, ddi, ddj, bb;
  for (ddi=-2; ddi<=2; ddi+=4)
  { for (ddj=-1; ddj<=1; ddj+=2)
    { if (IsOnBoard(ii0+ddi, jj0+ddj))  
      { if (Board[ii0+ddi][jj0+ddj]==10*tt-5) return(1);
      }
    }
  }
  for (ddi=-1; ddi<=1; ddi+=2)
  { for (ddj=-2; ddj<=2; ddj+=4)
    { if (IsOnBoard(ii0+ddi, jj0+ddj)) 
      { if (Board[ii0+ddi][jj0+ddj]==10*tt-5) return(1);
      }
    }
  }
  for (ddi=-1; ddi<=1; ddi+=2)
  { ddj=1-2*tt;
    { if (IsOnBoard(ii0+ddi, jj0+ddj)) 
      { if (Board[ii0+ddi][jj0+ddj]==12*tt-6) return(1);
      }
    }
  }
  if ((Math.abs(PiecePosX[1-tt][0]-xx)<2)&&(Math.abs(PiecePosY[1-tt][0]-yy)<2)) 
    return(1);
  for (ddi=-1; ddi<=1; ddi+=1)
  { for (ddj=-1; ddj<=1; ddj+=1)
    { if ((ddi!=0)||(ddj!=0))
      { ii0=xx+ddi; 
        jj0=yy+ddj;
        bb=0;
        while ((IsOnBoard(ii0, jj0))&&(bb==0))
        { bb=Board[ii0][jj0];
          if (bb==0)
          { ii0+=ddi;
            jj0+=ddj;
          }
          else
          { if (bb==4*tt-2) return(1); 
            if ((bb==6*tt-3)&&((ddi==0)||(ddj==0))) return(1); 
            if ((bb==8*tt-4)&&(ddi!=0)&&(ddj!=0)) return(1); 
          }  
        }
      }
    }
  }
  return(0);
}

function IsOnBoard(ii, jj)
{ if (ii<0) return(false);
  if (ii>7) return(false);
  if (jj<0) return(false);
  if (jj>7) return(false);
  return(true);
}

function GetMove(tt,nn)
{ var ii=0, jj=0, mm="", ll=-1, cc, ss=tt;
  while (ss.indexOf("<br />")>0) ss=ss.replace("<br />","");
  var kk=ss.length;
  while (ii<kk)
  { cc=ss.charCodeAt(ii);
    if ((cc<=32))//||(cc==46)) //||(cc>=127))
    { if (ll+1!=ii) jj++;
      ll=ii;
    }
    else
    { if (jj==nn) 
      { if ((cc==46)&&(!isNaN(mm))) { mm=""; ll=ii; }
        else mm+=ss.charAt(ii);
      }
    }    
    ii++;
  }
  if ((nn==1)&&(mm=="")&&(ss.charAt(0)=="."))
  { ii=0;
    while (ii<kk)
    { cc=ss.charAt(ii);
      if ((cc!=".")&&(cc!=" ")) mm+=cc;
      ii++;
    }
  }
  if (mm!="")
  { ii=mm.indexOf("<");
    jj=mm.indexOf(">");
    ll=0; NewCommands.length=0;
    while ((ii>=0)&&(jj>=0)&&(ii<jj))
    { NewCommands[ll++]=mm.substr(ii+1,jj-ii-1);
      mm=mm.substr(0,ii)+mm.substr(jj+1);
      ii=mm.indexOf("<");
      jj=mm.indexOf(">");
    }
  }
  return(mm);
}

function ExecCommand(bb)
{ isExecCommand=bb;
}

function ExecCommands(nnc, hh)
{ var ii, jj, kk, nn, mm, cc, tt, bb0, bb1, xx0, yy0, xx1, yy1, aa="";
  if (!isExecCommand) return;
  if (document.layers) return;
  if (!document.getElementById("Board")) return;
  if (nnc)
  { NewCommands.length=0;
    if (nnc.indexOf(",")>0) NewCommands=nnc.replace(/ /g,'').split(",");
    else NewCommands[0]=nnc.replace(/ /g,'');
    if (hh);
    else HistCommand[MoveCount-StartMove]=NewCommands.join("|");
    setTimeout("ExecCommands()",100);
    return;
  }
  var dd=parseInt(document.getElementById("Board").offsetHeight);
  var dd32=Math.round(dd/32);
  for (ii=0; ii<OldCommands.length; ii++)
  { tt=OldCommands[ii].charAt(0);
    if ((tt=="B")||(tt=="C"))
    { nn=OldCommands[ii].charCodeAt(1)-97+(8-parseInt(OldCommands[ii].charAt(2)))*8;
      if (isRotated) nn=63-nn;
      if ((nn>=0)&&(nn<=63))
      { if (tt=="B") document.images[ImageOffset+nn].style.borderColor=BorderColor;
        else document.images[ImageOffset+nn].style.backgroundColor="transparent";
      }
    }
    if (tt=="A") document.getElementById("Canvas").innerHTML="<div style='position:absolute;top:0px;left:0px;width:0px;height:0px;'></div>";
  }
  if (NewCommands.length>0) SetAutoPlay(false);
  for (ii=0; ii<NewCommands.length; ii++)
  { tt=NewCommands[ii].substr(1,4);
    if ((tt=="this")||(tt=="last"))
    { if (tt=="this") { kk=MoveCount-StartMove-1; ll=0; }
      else  { kk=MoveCount-StartMove-2; ll=1; }
      if (kk>=0)
      { tt=NewCommands[ii].charAt(0);
        cc=NewCommands[ii].substr(5,6);
        nn=NewCommands.length;   
        if ((tt=="B")||(tt=="C"))
        { NewCommands[nn]=tt+String.fromCharCode(97+HistPosX[0][kk])+(1+HistPosY[0][kk])+cc;
          NewCommands[nn+1]=tt+String.fromCharCode(97+PiecePosX[(MoveType+ll+1)%2][HistPiece[0][kk]])+(1+PiecePosY[(MoveType+ll+1)%2][HistPiece[0][kk]])+cc;
        }
        if (tt=="A")
        { NewCommands[nn]=tt+String.fromCharCode(97+HistPosX[0][kk])+(1+HistPosY[0][kk]);
          NewCommands[nn]+=String.fromCharCode(97+PiecePosX[(MoveType+ll+1)%2][HistPiece[0][kk]])+(1+PiecePosY[(MoveType+ll+1)%2][HistPiece[0][kk]])+cc;
        }
        NewCommands[ii]="X";
      }
    }
    else
    { tt=NewCommands[ii].charAt(0);
      if ((tt=="B")||(tt=="C"))
      { nn=NewCommands[ii].charCodeAt(1)-97+(8-parseInt(NewCommands[ii].charAt(2)))*8;
        if ((nn>=0)&&(nn<=63))
        { if (isRotated) nn=63-nn;
          cc=NewCommands[ii].substr(3,6);
          if (cc=="R") cc="FF0000";
// this is the "hint" piece border color
          if (cc=="G") cc="ff9900";
          if (cc=="B") cc="0000FF";
          if (cc.length!=6) cc="#FFFFFF";
          else cc="#"+cc;
          if (tt=="B") document.images[ImageOffset+nn].style.borderColor=cc;
          else document.images[ImageOffset+nn].style.backgroundColor=cc;   
        }
      }
      if ((tt=="A")&&(dd>0))
      { kk=NewCommands[ii].charCodeAt(1)-97;
        jj=parseInt(NewCommands[ii].charAt(2));
        nn=kk+(8-jj)*8;
        if ((nn>=0)&&(nn<=63)) bb0=Board[kk][jj-1];
        kk=NewCommands[ii].charCodeAt(3)-97;
        jj=parseInt(NewCommands[ii].charAt(4));
        mm=kk+(8-jj)*8;
        if ((mm>=0)&&(mm<=63)) bb1=Board[kk][jj-1];
        if ((nn>=0)&&(nn<=63)&&(mm>=0)&&(mm<=63)&&(nn!=mm))
        { if (isRotated) { nn=63-nn; mm=63-mm; }
          xx0=nn%8; yy0=(nn-xx0)/8;
          xx1=mm%8; yy1=(mm-xx1)/8;
          nn=0; mm=0;        
          if (xx0<xx1) nn=1;
          if (xx0>xx1) nn=-1;
          if (yy0<yy1) mm=1;
          if (yy0>yy1) mm=-1;
          xx0=Math.round((2*xx0+1)*dd/16);
          yy0=Math.round((2*yy0+1)*dd/16);
          if (bb0!=0)
          { xx0+=nn*dd32;
            yy0+=mm*dd32;
          }
          xx1=Math.round((2*xx1+1)*dd/16);
          yy1=Math.round((2*yy1+1)*dd/16);
          if (bb1!=0)
          { xx1-=nn*dd32;
            yy1-=mm*dd32;
          }
          cc=NewCommands[ii].substr(5,6);
          if (cc=="R") cc="FF0000";
          if (cc=="G") cc="00FF00";
          if (cc=="B") cc="0000FF";
          if (cc.length!=6) cc="#FFFFFF";
          else cc="#"+cc;
          aa+=GetArrow(xx0,yy0,xx1,yy1,cc);
        }
      }
    }
  }
  if (aa!="") 
  { document.getElementById("Canvas").style.top=-dd+"px";
    document.getElementById("Canvas").innerHTML=aa;
  }
  OldCommands.length=0;
  for (ii=0; ii<NewCommands.length; ii++) OldCommands[ii]=NewCommands[ii];
  NewCommands.length=0;
}

function SkipRefreshBoard(nn)
{ SkipRefresh=nn;
}

function RefreshBoard(rr)
{ if (SkipRefresh>0) return;
  InitImages();
  if (rr) DocImg.length=0;
  var ii, jj, kk, kk0, ll, mm=1;
  if (document.images["RightLabels"])
  { if (IsLabelVisible)
    { if (isRotated) SetImg("RightLabels",LabelPic[2]);
      else SetImg("RightLabels",LabelPic[0]);
    }
    else SetImg("RightLabels",LabelPic[4]);
  }
  if (document.images["BottomLabels"])
  { if (IsLabelVisible)
    { if (isRotated) SetImg("BottomLabels",LabelPic[3]);
      else SetImg("BottomLabels",LabelPic[1]);
    }
    else SetImg("BottomLabels",LabelPic[4]); 
  }
  if (isSetupBoard)
  { if (isRotated)
    { for (ii=0; ii<8; ii++)
      { for (jj=0; jj<8; jj++)
        { if (Board[ii][jj]==0)
            SetImg(63-ii-(7-jj)*8,BoardPic);
          else
            SetImg(63-ii-(7-jj)*8,PiecePic[(1-sign(Board[ii][jj]))/2][Math.abs(Board[ii][jj])-1]);
        }
      }
    }
    else
    { for (ii=0; ii<8; ii++)
      { for (jj=0; jj<8; jj++)
        { if (Board[ii][jj]==0)
            SetImg(ii+(7-jj)*8,BoardPic);
          else
            SetImg(ii+(7-jj)*8,PiecePic[(1-sign(Board[ii][jj]))/2][Math.abs(Board[ii][jj])-1]);
        }
      }
    }
  }
  else
  { for (ii=0; ii<8; ii++)
    { for (jj=0; jj<8; jj++)
      { if (Board[ii][jj]==0)
        { if (isRotated)
            SetImg(63-ii-(7-jj)*8,BoardPic);
          else
            SetImg(ii+(7-jj)*8,BoardPic);
        }
      }
    }
    for (ii=0; ii<2; ii++)
    { for (jj=0; jj<16; jj++)
      { if (PieceType[ii][jj]>=0)
        { kk=PiecePosX[ii][jj]+8*(7-PiecePosY[ii][jj]);
          if (isRotated)
            SetImg(63-kk,PiecePic[ii][PieceType[ii][jj]]);  
          else
            SetImg(kk,PiecePic[ii][PieceType[ii][jj]]);
        }
      }
    }
    if (isCapturedPieces)
    { var pp0=new Array(0,1,1,2,2,2,8);
      kk0=0;
      if (document.images["RightLabels"]) kk0++;
      kk=0;
      ii=0;
      if (isRotated) ii=1;
      for (jj=0; jj<16; jj++) pp0[PieceType[ii][jj]+1]--;
      for (jj=1; jj<5; jj++)
      { for (ll=0; ll<pp0[jj+1]; ll++)
        { SetImg(64+kk0+(kk-kk%4)/4+(kk%4)*4,PiecePic[ii][jj]);
          kk++;
          pp0[0]++;
        }
      }
      for (ll=0; ll>pp0[0]; ll--)
      { SetImg(64+kk0+(kk-kk%4)/4+(kk%4)*4,PiecePic[ii][5]);
        kk++;
      }
      if (mm<kk) mm=kk;
      while (kk<4) { SetImg(64+kk0+(kk-kk%4)/4+(kk%4)*4,BoardPic); kk++; }
      while (kk<16){ SetImg(64+kk0+(kk-kk%4)/4+(kk%4)*4,LabelPic[4]); kk++; }
      var pp1=new Array(0,1,1,2,2,2,8);
      kk=0;
      ii=1-ii;
      for (jj=0; jj<16; jj++) pp1[PieceType[ii][jj]+1]--;
      for (jj=1; jj<5; jj++)
      { for (ll=0; ll<pp1[jj+1]; ll++)
        { SetImg(92+kk0+(kk-kk%4)/4-(kk%4)*4,PiecePic[ii][jj]);
          kk++;
          pp1[0]++;
        }
      }
      for (ll=0; ll>pp1[0]; ll--)
      { SetImg(92+kk0+(kk-kk%4)/4-(kk%4)*4,PiecePic[ii][5]);
        kk++;
      }
      if (mm<kk) mm=kk;
      while (kk<4) { SetImg(92+kk0+(kk-kk%4)/4-(kk%4)*4,BoardPic); kk++; }
      while (kk<16){ SetImg(92+kk0+(kk-kk%4)/4-(kk%4)*4,LabelPic[4]); kk++; }
      mm=Math.ceil(mm/4);
      if ((parent)&&(parent.ChangeColWidth)) parent.ChangeColWidth(mm);
    }
  }
}

function SetCandidateStyle(ss)
{ CandidateStyle=ss;
}

function HighlightCandidates(nn, ccs)
{alert(arguments.callee.name); if (nn<0) { ExecCommands('',1); return; }
  var ii0=nn%8;
  var jj0=7-(nn-ii0)/8;
  var pp=Board[ii0][jj0];
  var cc=sign(pp);
  var tt=(1-cc)/2;
  var dd, ddi, ddj, bb, jj, aa=new Array();
  var nna=0, ddA=0;
  if (ccs.charAt(0)=="A") ddA=1;

  if (Math.abs(pp)==6)
  { Board[ii0][jj0]=0;
    if (IsOnBoard(ii0, jj0+cc))
    { bb=Board[ii0][jj0+cc];
      if (bb==0)
      { Board[ii0][jj0+cc]=pp;
        if (!IsCheck(PiecePosX[tt][0], PiecePosY[tt][0], tt))
          aa[nna++]=String.fromCharCode(ii0+97)+(jj0+cc+1);
        Board[ii0][jj0+cc]=bb;
        if (2*jj0+5*cc==7)
        { bb=Board[ii0][jj0+2*cc];
          if (bb==0)
          { Board[ii0][jj0+2*cc]=pp;
            if (!IsCheck(PiecePosX[tt][0], PiecePosY[tt][0], tt))
            { nna-=ddA;
              aa[nna++]=String.fromCharCode(ii0+97)+(jj0+2*cc+1);
            }
            Board[ii0][jj0+2*cc]=bb;
          }	
        }
      }
    }
    for (ddi=-1; ddi<=1; ddi+=2)
    { if (IsOnBoard(ii0+ddi, jj0+cc))  
      { bb=Board[ii0+ddi][jj0+cc];
        if (bb*cc<0)
        { Board[ii0+ddi][jj0+cc]=pp;
          if (!IsCheck(PiecePosX[tt][0], PiecePosY[tt][0], tt))
            aa[nna++]=String.fromCharCode(ii0+ddi+97)+(jj0+cc+1);
          Board[ii0+ddi][jj0+cc]=bb;
        }
      }
      if (2*jj0-cc==7)
      { if (IsOnBoard(ii0+ddi, jj0))
        { if (Board[ii0+ddi][jj0]==-cc*6) 
      	  { bb=Board[ii0+ddi][jj0+cc];
            if (bb==0)
            { if (MoveCount>StartMove)
              { CanPass=-1;
                dd=HistPiece[0][MoveCount-StartMove-1];
                if ((HistType[0][MoveCount-StartMove-1]==5)&&(Math.abs(HistPosY[0][MoveCount-StartMove-1]-PiecePosY[1-MoveType][dd])==2))
                  CanPass=PiecePosX[1-MoveType][dd];
              }
              else 
                CanPass=EnPass;
              if (CanPass==ii0+ddi)
              { Board[ii0+ddi][jj0+cc]=pp;
                if (!IsCheck(PiecePosX[tt][0], PiecePosY[tt][0], tt))
                  aa[nna++]=String.fromCharCode(ii0+ddi+97)+(jj0+cc+1);
                Board[ii0+ddi][jj0+cc]=bb;
              }
            }
          }
        }
      }
    }
    Board[ii0][jj0]=pp;
  }
  
  if (Math.abs(pp)==5)
  { Board[ii0][jj0]=0;
    for (ddi=-2; ddi<=2; ddi+=4)
    { for (ddj=-1; ddj<=1; ddj+=2)
      { if (IsOnBoard(ii0+ddi, jj0+ddj))  
        { bb=Board[ii0+ddi][jj0+ddj];
          if (bb*cc<=0)
          { Board[ii0+ddi][jj0+ddj]=pp;
            if (!IsCheck(PiecePosX[tt][0], PiecePosY[tt][0], tt))
              aa[nna++]=String.fromCharCode(ii0+ddi+97)+(jj0+ddj+1);
            Board[ii0+ddi][jj0+ddj]=bb;
          }
        }
      }
    }
    for (ddi=-1; ddi<=1; ddi+=2)
    { for (ddj=-2; ddj<=2; ddj+=4)
      { if (IsOnBoard(ii0+ddi, jj0+ddj))  
        { bb=Board[ii0+ddi][jj0+ddj];
          if (bb*cc<=0)
          { Board[ii0+ddi][jj0+ddj]=pp;
            if (!IsCheck(PiecePosX[tt][0], PiecePosY[tt][0], tt))
              aa[nna++]=String.fromCharCode(ii0+ddi+97)+(jj0+ddj+1);
            Board[ii0+ddi][jj0+ddj]=bb;
          }
        }
      }
    }
    Board[ii0][jj0]=pp;
  }
  
  if ((Math.abs(pp)==2)||(Math.abs(pp)==4))
  { Board[ii0][jj0]=0;
    dd=1;
    bb=0;
    while ((IsOnBoard(ii0+dd,jj0+dd))&&(bb==0))  
    { bb=Board[ii0+dd][jj0+dd];
      if (bb*cc<=0)
      { Board[ii0+dd][jj0+dd]=pp;
        if (!IsCheck(PiecePosX[tt][0], PiecePosY[tt][0], tt))
        { aa[nna++]=String.fromCharCode(ii0+dd+97)+(jj0+dd+1);
          nna-=ddA;
        }
        Board[ii0+dd][jj0+dd]=bb;
      }
      dd++;
    }
    if (dd>1) nna+=ddA;
    dd=-1;
    bb=0;
    while ((IsOnBoard(ii0+dd,jj0+dd))&&(bb==0))  
    { bb=Board[ii0+dd][jj0+dd];
      if (bb*cc<=0)
      { Board[ii0+dd][jj0+dd]=pp;
        if (!IsCheck(PiecePosX[tt][0], PiecePosY[tt][0], tt))
        { aa[nna++]=String.fromCharCode(ii0+dd+97)+(jj0+dd+1);
          nna-=ddA;
        }
        Board[ii0+dd][jj0+dd]=bb;
      }
      dd--;
    }
    if (dd<-1) nna+=ddA;
    dd=1;
    bb=0;
    while ((IsOnBoard(ii0+dd,jj0-dd))&&(bb==0))  
    { bb=Board[ii0+dd][jj0-dd];
      if (bb*cc<=0)
      { Board[ii0+dd][jj0-dd]=pp;
        if (!IsCheck(PiecePosX[tt][0], PiecePosY[tt][0], tt))
        { aa[nna++]=String.fromCharCode(ii0+dd+97)+(jj0-dd+1);
          nna-=ddA;
        }
        Board[ii0+dd][jj0-dd]=bb;
      }
      dd++;
    }
    if (dd>1) nna+=ddA;
    dd=-1;
    bb=0;
    while ((IsOnBoard(ii0+dd,jj0-dd))&&(bb==0))  
    { bb=Board[ii0+dd][jj0-dd];
      if (bb*cc<=0)
      { Board[ii0+dd][jj0-dd]=pp;
        if (!IsCheck(PiecePosX[tt][0], PiecePosY[tt][0], tt))
        { aa[nna++]=String.fromCharCode(ii0+dd+97)+(jj0-dd+1);
          nna-=ddA;
        }
        Board[ii0+dd][jj0-dd]=bb;
      }
      dd--;
    }
    if (dd<-1) nna+=ddA;
    Board[ii0][jj0]=pp;
  }
  
    
  if ((Math.abs(pp)==2)||(Math.abs(pp)==3))
  { Board[ii0][jj0]=0;
    dd=1;
    bb=0;
    while ((IsOnBoard(ii0+dd,jj0))&&(bb==0))  
    { bb=Board[ii0+dd][jj0];
      if (bb*cc<=0)
      { Board[ii0+dd][jj0]=pp;
        if (!IsCheck(PiecePosX[tt][0], PiecePosY[tt][0], tt))
        { aa[nna++]=String.fromCharCode(ii0+dd+97)+(jj0+1);
          nna-=ddA;
        }
        Board[ii0+dd][jj0]=bb;
      }
      dd++;
    }
    if (dd>1) nna+=ddA;
    dd=-1;
    bb=0;
    while ((IsOnBoard(ii0+dd,jj0))&&(bb==0))  
    { bb=Board[ii0+dd][jj0];
      if (bb*cc<=0)
      { Board[ii0+dd][jj0]=pp;
        if (!IsCheck(PiecePosX[tt][0], PiecePosY[tt][0], tt))
        { aa[nna++]=String.fromCharCode(ii0+dd+97)+(jj0+1);
          nna-=ddA;
        }
        Board[ii0+dd][jj0]=bb;
      }
      dd--;
    }
    if (dd<-1) nna+=ddA;
    dd=1;
    bb=0;
    while ((IsOnBoard(ii0,jj0+dd))&&(bb==0))  
    { bb=Board[ii0][jj0+dd];
      if (bb*cc<=0)
      { Board[ii0][jj0+dd]=pp;
        if (!IsCheck(PiecePosX[tt][0], PiecePosY[tt][0], tt))
        { aa[nna++]=String.fromCharCode(ii0+97)+(jj0+dd+1);
          nna-=ddA;
        }
        Board[ii0][jj0+dd]=bb;
      }
      dd++;
    }
    if (dd>1) nna+=ddA;
    dd=-1;
    bb=0;
    while ((IsOnBoard(ii0,jj0+dd))&&(bb==0))  
    { bb=Board[ii0][jj0+dd];
      if (bb*cc<=0)
      { Board[ii0][jj0+dd]=pp;
        if (!IsCheck(PiecePosX[tt][0], PiecePosY[tt][0], tt))
        { aa[nna++]=String.fromCharCode(ii0+97)+(jj0+dd+1);
          nna-=ddA;
        }
        Board[ii0][jj0+dd]=bb;
      }
      dd--;
    }
    if (dd<-1) nna+=ddA;
    Board[ii0][jj0]=pp;
  }
  
  if (Math.abs(pp)==1)
  { Board[ii0][jj0]=0;
    for (ddi=-1; ddi<=1; ddi++)
    { for (ddj=-1; ddj<=1; ddj++)
      { if (((ddi!=0)||(ddj!=0))&&(IsOnBoard(ii0+ddi, jj0+ddj)))  
        { bb=Board[ii0+ddi][jj0+ddj];
          if (bb*cc<=0)
          { Board[ii0+ddi][jj0+ddj]=pp;
            if (!IsCheck(ii0+ddi, jj0+ddj, tt))
              aa[nna++]=String.fromCharCode(ii0+ddi+97)+(jj0+ddj+1);
            Board[ii0+ddi][jj0+ddj]=bb;
          }
        }
      }
    }
    Board[ii0][jj0]=pp;
    jj=CanCastleLong();//O-O-O with Chess960 rules
    if (jj>=0)
    { Board[ii0][jj0]=0;
      Board[PiecePosX[MoveType][jj]][PiecePosY[MoveType][jj]]=0;
      Board[2][tt*7]=1-2*tt;
      Board[3][tt*7]=3*(1-2*tt);
      ddi=ii0;
      bb=0;
      { while (ddi>2) 
        { bb+=IsCheck(ddi, tt*7, tt);
          ddi--;      
        }
        while (ddi<2) 
        { bb+=IsCheck(ddi, tt*7, tt);
          ddi++;
        }
      }
      bb+=IsCheck(PiecePosX[tt][0], PiecePosY[tt][0], MoveType);
      if (bb==0) aa[nna++]=String.fromCharCode(2+97)+(tt*7+1);
      Board[2][tt*7]=0;
      Board[3][tt*7]=0;
      Board[ii0][jj0]=pp;
      Board[PiecePosX[tt][jj]][PiecePosY[tt][jj]]=cc*3;
    }
    jj=CanCastleShort();//O-O with Chess960 rules
    if (jj>=0)
    { Board[ii0][jj0]=0;
      Board[PiecePosX[MoveType][jj]][PiecePosY[MoveType][jj]]=0;
      Board[6][tt*7]=1-2*tt;
      Board[5][tt*7]=3*(1-2*tt);
      ddi=ii0;
      bb=0;
      { while (ddi>2) 
        { bb+=IsCheck(ddi, tt*7, tt);
          ddi--;      
        }
        while (ddi<2) 
        { bb+=IsCheck(ddi, tt*7, tt);
          ddi++;
        }
      }
      bb+=IsCheck(PiecePosX[tt][0], PiecePosY[tt][0], MoveType);
      if (bb==0) aa[nna++]=String.fromCharCode(6+97)+(tt*7+1);
      Board[6][tt*7]=0;
      Board[5][tt*7]=0;
      Board[ii0][jj0]=pp;
      Board[PiecePosX[tt][jj]][PiecePosY[tt][jj]]=cc*3;
    }
  }

  if ((nna>0)&&(ccs!=" "))
  { tt=ccs.charAt(0);
    cc=ccs.substr(1,6);
    if (tt=="A")
    { bb=tt+String.fromCharCode(ii0+97)+(jj0+1)+aa[0]+cc;
      for (jj=1; jj<nna; jj++) bb+=","+tt+String.fromCharCode(ii0+97)+(jj0+1)+aa[jj]+cc;
    }
    else
    { bb=tt+aa[0]+cc;
      for (jj=1; jj<nna; jj++) bb+=","+tt+aa[jj]+cc;
    }
    ExecCommands(bb,1);
  }  
  else return(aa);
}

function SetBoardClicked(nn)
{ if (! document.BoardForm) return;
  if (! document.images[ImageOffset].style) { BoardClicked=nn; return; }
  if (CandidateStyle!="") HighlightCandidates(nn,CandidateStyle);
  if (isDragDrop) { BoardClicked=nn; return; }
  if (BoardClicked>=0) 
  { if (BoardClicked<64)
    { if (isRotated) {
      // alert("a "+[ImageOffset+63-BoardClicked]);
      $('.square'+(63-BoardClicked)).addClass('coloroff');
      $('.square'+(63-BoardClicked)).removeClass('coloron');
        // document.images[ImageOffset+63-BoardClicked].style.backgroundColor="rgba(0,174,239,0.5)";
      }
      else {
        // this is the color of the unselected pieces (on second tap)
        // alert("b "+[ImageOffset+BoardClicked]);
        $('.square'+BoardClicked).addClass('coloroff');
        $('.square'+BoardClicked).removeClass('coloron');
        // document.images[ImageOffset+BoardClicked].style.backgroundColor="rgba(0,174,239,0.1)"; 
      }
    }
    else {
      // alert("c "+[ImageOffset+BoardClicked+3]);
      // document.images[ImageOffset+BoardClicked+3].style.backgroundColor="rgba(0,174,239,0.5)";
    }
  }  
  BoardClicked=nn;
  if (BoardClicked>=0) 
  { if (BoardClicked<64)
    { if (isRotated) {
        // alert("op1 "+[ImageOffset+63-BoardClicked]);
        $('.square'+(63-BoardClicked)).addClass('coloron');
        $('.square'+(63-BoardClicked)).removeClass('coloroff');
        // document.images[ImageOffset+63-BoardClicked].style.backgroundColor="rgba(0,174,239,0.9)";
    }
      else {
        // this is the color of the selected pieces
        // alert("op2 "+[ImageOffset+BoardClicked]);
        $('.square'+BoardClicked).addClass('coloron');
        $('.square'+BoardClicked).removeClass('coloroff');
        // document.images[ImageOffset+BoardClicked].style.backgroundColor="rgba(0,174,239,0.9)"; 
      }
    }
    else {
        // this used to be #ff0000 or #ff9900  
        alert("op3 "+[ImageOffset+BoardClicked+3]);
        // document.images[ImageOffset+BoardClicked+3].style.backgroundColor="rgba(0,174,239,0.5)"; 
    }
  }
}

function BoardClickMove(nn)
{ var ii0, jj0, ii1, jj1, iiv, jjv, nnn=nn, mm, pp=0;
  if (BoardClicked>=0) return(false);
  if (isRotated) nnn=63-nn; 
  ii1=nnn%8;
  jj1=7-(nnn-ii1)/8;
  if (sign(Board[ii1][jj1])==((MoveCount+1)%2)*2-1) return(false);
  for (ii0=0; ii0<8; ii0++)
  { for (jj0=0; jj0<8; jj0++)
    { if (sign(Board[ii0][jj0])==((MoveCount+1)%2)*2-1) 
      { if (Math.abs(Board[ii0][jj0])==6)
        { mm=String.fromCharCode(ii0+97)+eval(jj0+1);
          if (ii0!=ii1) mm+="x";
        }
        else
        { mm=PieceName.charAt(Math.abs(Board[ii0][jj0])-1)+String.fromCharCode(ii0+97)+eval(jj0+1);
          if (Board[ii1][jj1]!=0) mm+="x";
        }
        mm+=String.fromCharCode(ii1+97)+eval(jj1+1);
        if ((jj1==(1-MoveType)*7)&&(Math.abs(Board[ii0][jj0])==6)&&(Math.abs(jj0-jj1)<=1)&&(Math.abs(ii0-ii1)<=1))
        { mm=mm+"="+PieceName.charAt(1);
        }
        if (ParseMove(mm, false))
        { pp++;
          iiv=ii0;
          jjv=jj0;
        }
      }
    }
  }
  if (pp==1)
  { SetBoardClicked(iiv+8*(7-jjv));
    BoardClick(nn);
    return(true);
  }
  return(false);
}

function BoardClick(nn,bb)
{ 
  // alert(nn+" "+bb);
  // pieceID="#x"+nn;
  pieceID=".square"+nn;
  // alert(pieceID);
  $(pieceID).removeClass('unhighlight');
  $(pieceID).addClass('highlight');
  setInterval(function(){
    $(pieceID).addClass('unhighlight');
    $(pieceID).removeClass('highlight');
    },750);
  
  var ii0, jj0, ii1, jj1, mm, nnn, vv, ffull, ssearch, llst, ffst, ttmp, mmove0;
  var pp, ffst=0, ssearch, ssub;
  if (isSetupBoard) { SetupBoardClick(nn); return; }
  if (! isRecording) return;
  if (isAutoPlay) SetAutoPlay(false);
  if (MoveCount==MaxMove) return;
  if (BoardClickMove(nn)) return;
  if (isDragDrop&&(!bb)) return;
  if (isRotated) nnn=63-nn;
  else nnn=nn;
  if (BoardClicked==nnn) { SetBoardClicked(-1); return; }
  if (BoardClicked<0) 
  { ii0=nnn%8;
    jj0=7-(nnn-ii0)/8;
    if (sign(Board[ii0][jj0])==0) return;
    if (sign(Board[ii0][jj0])!=((MoveCount+1)%2)*2-1) 
    { mm="---";
      if ((document.BoardForm)&&(document.BoardForm.PgnMoveText))
        ShortPgnMoveText[0][CurVar]=Uncomment(document.BoardForm.PgnMoveText.value);
      ssearch=Math.floor(MoveCount/2+1)+".";
      ffst=ShortPgnMoveText[0][CurVar].indexOf(ssearch);
      if (ffst>=0)
        ssub=ShortPgnMoveText[0][CurVar].substring(0, ffst);
      else
        ssub=ShortPgnMoveText[0][CurVar]; 
      if (ParseMove(mm, false)==0) { SetBoardClicked(-1); return; }
      if (!isNullMove) return;
      if (MoveCount%2==0) { if (!confirm("White nullmove?")) return; }
      else { if (!confirm("Black nullmove?")) return; }
      for (vv=CurVar; vv<ShortPgnMoveText[0].length; vv++)
      { if ((vv==CurVar)||((ShortPgnMoveText[1][vv]==CurVar)&&(ShortPgnMoveText[2][vv]==MoveCount)))
        { ffull=Uncomment(ShortPgnMoveText[0][vv]);
          ssearch=Math.floor(MoveCount/2+2)+".";
          llst=ffull.indexOf(ssearch);
          ssearch=Math.floor(MoveCount/2+1)+".";
          ffst=ffull.indexOf(ssearch);
          if (ffst>=0)
          { ffst+=ssearch.length;
            if (llst<0) ttmp=ffull.substring(ffst);
            else ttmp=ffull.substring(ffst, llst);
            mmove0=GetMove(ttmp,MoveType);
            if ((mmove0.indexOf(mm)<0)&&(MoveType==1))
            { ttmp=Math.floor(MoveCount/2+1);
              ssearch=ttmp+"....";
              ffst=ffull.indexOf(ssearch);
              if (ffst<0) { ssearch=ttmp+". ..."; ffst=ffull.indexOf(ssearch); }
              if (ffst<0) { ssearch=ttmp+". .."; ffst=ffull.indexOf(ssearch); }
              if (ffst<0) { ssearch=ttmp+" ..."; ffst=ffull.indexOf(ssearch); }
              if (ffst<0) { ssearch=ttmp+"..."; ffst=ffull.indexOf(ssearch); }            
              if (ffst<0) { ssearch=ttmp+" .."; ffst=ffull.indexOf(ssearch); }
              if (ffst>=0) 
              { ffst+=ssearch.length;
                if (llst<0) ttmp=ffull.substring(ffst);
                else ttmp=ffull.substring(ffst, llst);
                mmove0=GetMove(ttmp,0);
              }
            }
            if (mmove0.indexOf(mm)==0)
            { SetMove(MoveCount+1, vv);
              vv=ShortPgnMoveText[0].length+1;
              if (window.UserMove) setTimeout("UserMove(1,'"+mmove0+"')",Delay/2);
            }  
          }  
        }  
      }
      if (vv<ShortPgnMoveText[0].length+1)
      { if ((RecordCount==0)&&(!((document.BoardForm)&&(document.BoardForm.PgnMoveText))))
        { vv=ShortPgnMoveText[0].length;
          ShortPgnMoveText[0][vv]="";
          ShortPgnMoveText[1][vv]=CurVar;
          ShortPgnMoveText[2][vv]=MoveCount;
          CurVar=vv;
        }  
        ParseMove(mm,true);
        if (window.UserMove) setTimeout("UserMove(0,'"+mm+"')",Delay/2);
        if (MoveType==0)
        { HistMove[MoveCount-StartMove]=Math.floor((MoveCount+2)/2)+"."+mm;
          ssub+=Math.floor((MoveCount+2)/2)+".";
        }  
        else
        { HistMove[MoveCount-StartMove]=Math.floor((MoveCount+2)/2)+". ... "+mm;
          if (MoveCount==StartMove) ssub+=Math.floor((MoveCount+2)/2)+". ... ";
          else ssub+=HistMove[MoveCount-StartMove-1]+" ";
        }
        if (RecordCount==0) RecordedMoves=HistMove[MoveCount-StartMove];
        else
        { ttmp=RecordedMoves.split(" ");
          ttmp.length=RecordCount+((MoveCount-RecordCount)%2)*2;
          RecordedMoves=ttmp.join(" ");
          if (MoveType==0) RecordedMoves+=" "+HistMove[MoveCount-StartMove];
          else RecordedMoves+=" "+mm;
        }
        RecordCount++;
        MoveCount++;
        MoveType=1-MoveType;
        if (document.BoardForm)
        { if (document.BoardForm.PgnMoveText) document.BoardForm.PgnMoveText.value=ssub+mm+" ";
          if (document.BoardForm.Position)
            document.BoardForm.Position.value=TransformSAN(HistMove[MoveCount-StartMove-1]);
          NewCommands.length=0;
          ExecCommands();
          RefreshBoard();
        }
      }
    }
    SetBoardClicked(nnn); 
    return; 
  } 
  ii0=BoardClicked%8;
  jj0=7-(BoardClicked-ii0)/8;
  ii1=nnn%8;
  jj1=7-(nnn-ii1)/8;
  if (Math.abs(Board[ii0][jj0])==6)
  { if (ii0!=ii1) mm=String.fromCharCode(ii0+97)+"x";
    else mm="";
  }
  else
  { mm=PieceName.charAt(Math.abs(Board[ii0][jj0])-1);
    if (Board[ii1][jj1]!=0) mm+="x";
  }
  SetBoardClicked(-1);
  mm+=String.fromCharCode(ii1+97)+eval(jj1+1);
  if (Math.abs(Board[ii0][jj0])==1)
  { if (PiecePosY[MoveType][0]==jj1)
    { if (PiecePosX[MoveType][0]+2==ii1) mm="O-O";
      if (PiecePosX[MoveType][0]-2==ii1) mm="O-O-O";
      if (Board[ii1][jj1]==(1-2*MoveType)*3) //for Chess960
      { if (ii1>ii0) mm="O-O";
        if (ii1<ii0) mm="O-O-O";
      }
    }  
  } 
  if ((document.BoardForm)&&(document.BoardForm.PgnMoveText))
    ShortPgnMoveText[0][CurVar]=Uncomment(document.BoardForm.PgnMoveText.value);
  ssearch=Math.floor(MoveCount/2+1)+".";
  ffst=ShortPgnMoveText[0][CurVar].indexOf(ssearch);
  if (ffst>=0)
    ssub=ShortPgnMoveText[0][CurVar].substring(0, ffst);
  else
    ssub=ShortPgnMoveText[0][CurVar]; 
  if ((jj1==(1-MoveType)*7)&&(Math.abs(Board[ii0][jj0])==6)&&(Math.abs(jj0-jj1)<=1)&&(Math.abs(ii0-ii1)<=1))
  { pp=0;
    while(pp==0)
// AH: these lines used to say:
    // { if (pp==0) { if (confirm("Queen "+PieceName.charAt(1)+" ?")) pp=1; }
    //   if (pp==0) { if (confirm("Rook "+PieceName.charAt(2)+" ?")) pp=2; }
    //   if (pp==0) { if (confirm("Bishop "+PieceName.charAt(3)+" ?")) pp=3; }
    //   if (pp==0) { if (confirm("Knight "+PieceName.charAt(4)+" ?")) pp=4; }            
    { if (pp==0) { if ("Queen "+PieceName.charAt(1)+" ?") pp=1; }
      if (pp==0) { if ("Rook "+PieceName.charAt(2)+" ?") pp=2; }
      if (pp==0) { if ("Bishop "+PieceName.charAt(3)+" ?") pp=3; }
      if (pp==0) { if ("Knight "+PieceName.charAt(4)+" ?") pp=4; }
    }
    mm=mm+"="+PieceName.charAt(pp);
  }
  pp=ParseMove(mm, false);
  if (pp==0) return;
  if (Math.abs(Board[ii0][jj0])!=1)
  { var mmm;
    if (Math.abs(Board[ii0][jj0])==6)
    { if (mm.charAt(1)=="x") mmm=mm.substr(0,1)+eval(jj0+1)+mm.substr(1,11);
      else mmm=String.fromCharCode(ii0+97)+eval(jj0+1)+mm;
    }
    else mmm=mm.substr(0,1)+String.fromCharCode(ii0+97)+eval(jj0+1)+mm.substr(1,11);
    if (ParseMove(mmm, false)==0) return;
  }
  if (pp>1)
  { mm=mm.substr(0,1)+String.fromCharCode(ii0+97)+mm.substr(1,11);
    if (ParseMove(mm, false)!=1)
    { mm=mm.substr(0,1)+eval(jj0+1)+mm.substr(2,11);
      if (ParseMove(mm, false)!=1)
        mm=mm.substr(0,1)+String.fromCharCode(ii0+97)+eval(jj0+1)+mm.substr(2,11);
    }  
  }
  for (vv=CurVar; vv<ShortPgnMoveText[0].length; vv++)
  { if ((vv==CurVar)||((ShortPgnMoveText[1][vv]==CurVar)&&(ShortPgnMoveText[2][vv]==MoveCount)))
    { ffull=Uncomment(ShortPgnMoveText[0][vv]);
      ssearch=Math.floor(MoveCount/2+2)+".";
      llst=ffull.indexOf(ssearch);
      ssearch=Math.floor(MoveCount/2+1)+".";
      ffst=ffull.indexOf(ssearch);
      if (ffst>=0)
      { ffst+=ssearch.length;
        if (llst<0)
          ttmp=ffull.substring(ffst);
        else
          ttmp=ffull.substring(ffst, llst);  
        mmove0=GetMove(ttmp,MoveType);
        if ((mmove0.indexOf(mm)<0)&&(MoveType==1))
        { ttmp=Math.floor(MoveCount/2+1);
          ssearch=ttmp+"....";
          ffst=ffull.indexOf(ssearch);
          if (ffst<0) { ssearch=ttmp+". ..."; ffst=ffull.indexOf(ssearch); }
          if (ffst<0) { ssearch=ttmp+". .."; ffst=ffull.indexOf(ssearch); }
          if (ffst<0) { ssearch=ttmp+" ..."; ffst=ffull.indexOf(ssearch); }
          if (ffst<0) { ssearch=ttmp+"..."; ffst=ffull.indexOf(ssearch); }            
          if (ffst<0) { ssearch=ttmp+" .."; ffst=ffull.indexOf(ssearch); }
          if (ffst>=0) 
          { ffst+=ssearch.length;
            if (llst<0) ttmp=ffull.substring(ffst);
            else ttmp=ffull.substring(ffst, llst);
            mmove0=GetMove(ttmp,0);
          }
        }
        if ((mmove0.indexOf(mm)==0)&&(mmove0.indexOf(mm+mm.substr(1))!=0))
        { SetMove(MoveCount+1, vv);
          if (window.UserMove) setTimeout("UserMove(1,'"+mmove0+"')",Delay/2);
          return;
        }  
      }  
    }  
  }
  if ((RecordCount==0)&&(!((document.BoardForm)&&(document.BoardForm.PgnMoveText))))
  { vv=ShortPgnMoveText[0].length;
    ShortPgnMoveText[0][vv]="";
    ShortPgnMoveText[1][vv]=CurVar;
    ShortPgnMoveText[2][vv]=MoveCount;
    CurVar=vv;
  }   
  ParseMove(mm,true);
  if (IsCheck(PiecePosX[1-MoveType][0], PiecePosY[1-MoveType][0], 1-MoveType)) mm+="+";
  if (window.UserMove) setTimeout("UserMove(0,'"+mm+"')",Delay/2);
  if (MoveType==0)
  { HistMove[MoveCount-StartMove]=Math.floor((MoveCount+2)/2)+"."+mm;
    ssub+=Math.floor((MoveCount+2)/2)+".";
  }  
  else
  { HistMove[MoveCount-StartMove]=Math.floor((MoveCount+2)/2)+". ... "+mm;
    if (MoveCount==StartMove) ssub+=Math.floor((MoveCount+2)/2)+". ... ";
    else ssub+=HistMove[MoveCount-StartMove-1]+" ";
  }
  if (RecordCount==0) RecordedMoves=HistMove[MoveCount-StartMove];
  else
  { ttmp=RecordedMoves.split(" ");
    ttmp.length=RecordCount+((MoveCount-RecordCount)%2)*2;
    RecordedMoves=ttmp.join(" ");
    if (MoveType==0) RecordedMoves+=" "+HistMove[MoveCount-StartMove];
    else RecordedMoves+=" "+mm;
  }
  RecordCount++;
  MoveCount++;
  MoveType=1-MoveType;
  if (document.BoardForm)
  { if (document.BoardForm.PgnMoveText) document.BoardForm.PgnMoveText.value=ssub+mm+" ";
    if (document.BoardForm.Position)
      document.BoardForm.Position.value=TransformSAN(HistMove[MoveCount-StartMove-1]);
    NewCommands.length=0;
    ExecCommands();
    RefreshBoard();
  }
}

function SwitchAutoPlay()
{ if (isAutoPlay) SetAutoPlay(false);
  else SetAutoPlay(true);
}

function SetAutoPlay(bb)
{ isAutoPlay=bb;
  if (AutoPlayInterval) clearTimeout(AutoPlayInterval);
  if (isAutoPlay)
  { if ((document.BoardForm)&&(document.BoardForm.AutoPlay))
      document.BoardForm.AutoPlay.value="stop";
    MoveForward(1);
  }
  else
  { if ((document.BoardForm)&&(document.BoardForm.AutoPlay))
      document.BoardForm.AutoPlay.value="play";
  }
}

function SetDelay(vv)
{ Delay=vv;
}

function RotateBoard(bb)
{ SetBoardClicked(-1);
  var ii, cc=new Array();
  for (ii=0; ii<OldCommands.length; ii++) cc[ii]=OldCommands[ii];
  NewCommands.length=0;
  ExecCommands();
  isRotated=bb;
  if ((document.BoardForm)&&(document.BoardForm.Rotated))
    document.BoardForm.Rotated.checked=bb;
  RefreshBoard();
  for (ii=0; ii<cc.length; ii++) NewCommands[ii]=cc[ii];
  ExecCommands();
}

function AllowRecording(bb)
{ if ((document.BoardForm)&&(document.BoardForm.Recording))
    document.BoardForm.Recording.checked=bb;
  isRecording=bb;
  SetBoardClicked(-1);
}

function AllowNullMove(bb)
{ isNullMove=bb;
}

function ShowCapturedPieces(bb)
{ isCapturedPieces=bb;
  if (isCapturedPieces) RefreshBoard();
  else
  { var kk, kk0=0;
    if (document.images["RightLabels"]) kk0++;
    for (kk=0; kk<32; kk++) SetImg(64+kk0+kk,LabelPic[4]);
    if ((parent)&&(parent.ChangeColWidth)) parent.ChangeColWidth(0);
  }
}

function Is3FoldRepetition()
{ if (MoveCount<8) return(false);
  var ss=GetFENList();
  ss=ss.split("\n");
  var ii, jj, kk=0, ll=ss.length-1;
  var tt=new Array(ll+1);
  for (ii=0; ii<=ll; ii++) tt[ii]=ss[ii].split(" ");    
  for (ii=ll-2; ii>=0; ii-=2)
  { if ((tt[ii][0]==tt[ll][0])&&(tt[ii][2]==tt[ll][2])) 
    { kk++;
      jj=ii;
    }
  }
  if (kk<2) return(false);
  if (kk>3) return(true);
  ii=tt[jj][3];
  if (ii=="-") return(true);
  ss=tt[jj][0].split("/");
  if (ii.indexOf("3")>0)
  { jj=ii.charCodeAt(0)-97;
    kk=0;
    for (ii=0; ii<ss[4].length; ii++)
    { if (ss[4].charAt(ii)=="p")
      { if (Math.abs(kk-jj)==1) return(false);
        kk++;
      }
      else
      { if (isNaN(ss[4].charAt(ii))) kk++;
        else kk+=parseInt(ss[4].charAt(ii));
      }
    }
  }
  if (ii.indexOf("6")>0)
  { jj=ii.charCodeAt(0)-97;
    kk=0;
    for (ii=0; ii<ss[3].length; ii++)
    { if (ss[3].charAt(ii)=="P")
      { if (Math.abs(kk-jj)==1) return(false);
        kk++;
      }
      else
      { if (isNaN(ss[3].charAt(ii))) kk++;
        else kk+=parseInt(ss[3].charAt(ii));
      }
    }
  }  
  return(true);
}

function IsInsufficientMaterial()
{ var ss=GetFEN(true);
  if (ss.indexOf("Q")>=0) return(false);
  if (ss.indexOf("q")>=0) return(false);
  if (ss.indexOf("R")>=0) return(false);
  if (ss.indexOf("r")>=0) return(false);
  if (ss.indexOf("P")>=0) return(false);
  if (ss.indexOf("p")>=0) return(false);  
  var ii_B=false, ii_b=false, ii_N=false, ii_n=false;
  if (ss.indexOf("B")>=0) ii_B=true;
  if (ss.indexOf("b")>=0) ii_b=true;
  if (ss.indexOf("N")>=0) ii_N=true;
  if (ss.indexOf("n")>=0) ii_n=true;
  if ((!ii_B)&&(!ii_B)&&(!ii_N)&&(!ii_n)) return(true);
  if ((ii_N)&&(ii_B)&&(!ii_n)&&(!ii_b)) return(false); 
  if ((ii_n)&&(ii_b)&&(!ii_N)&&(!ii_B)) return(false);   
  if (ii_N)
  { if ((ii_n)||(ii_b)) return(false);
    else return(true);
  }
  if (ii_n)
  { if ((ii_N)||(ii_B)) return(false);
    else return(true);
  }  
  var ii, jj, ww=0, bb=0;
  for (ii=0; ii<8; ii++)
  { for (jj=0; jj<8; jj++)
    { if (Math.abs(Board[ii][jj])==4)
      { if ((ii+jj)%2==0) ww++;
        else bb++;
      }
    }
  }
  if ((ww>0)&&(bb>0)) return(false);
  return(true);
}

function IsMate()
{ var aa, ii0, jj0, nn=0, ii=IsCheck(PiecePosX[MoveType][0], PiecePosY[MoveType][0], MoveType);
  for (ii0=0; (nn==0)&&(ii0<8); ii0++)
  { for (jj0=0; (nn==0)&&(jj0<8); jj0++)
    { if (sign(Board[ii0][jj0])==((MoveCount+1)%2)*2-1)
      { nn=(7-jj0)*8+ii0;
      	aa=HighlightCandidates(nn," ");
      	if (aa.length>0) nn=aa[0];
      	else nn=0;
      }
    }
  }
  if (nn==0)
  { if(ii) return("Checkmate.");
    else return("Stalemate.");
  }
  return(false);
}

function IsDraw()
{ ff=GetFEN().split(" ");
  if (parseInt(ff[4])>=100) return("Draw by 50 move rule.");
  if (Is3FoldRepetition()) return("Draw by 3-fold repetition.");
  if (IsInsufficientMaterial()) return("Draw by insufficient material.");
  return(false);
}

function SetPgnMoveText(ss, vvariant, rroot, sstart)
{ if ((document.BoardForm)&&(document.BoardForm.PgnMoveText))
    document.BoardForm.PgnMoveText.value=ss;
  if (vvariant)
  { ShortPgnMoveText[0][vvariant]=ss;
    ShortPgnMoveText[1][vvariant]=rroot;
    ShortPgnMoveText[2][vvariant]=sstart;
  }
  else ShortPgnMoveText[0][0]=ss;
}



function TransformSAN(ss)
{ if (ss=="") return("");
  if ((ShowPieceName=="")||(ShowPieceName==PieceName)) return(ss);
  var jj, rr, tt="";
  for (jj=0; jj<ss.length; jj++)
  { rr=PieceName.indexOf(ss.charAt(jj));
    if (rr>=0) tt+=ShowPieceName.charAt(rr);
    else tt+=ss.charAt(jj);
  }
  return(tt);
}


function SetTitle(tt)
{ top.document.title=tt;
}

function EvalUrlString(ss,moves)
{ 
checkLevelLocks();

  $('#Board table').removeClass('solved');
  if (moves=="?comment=You Got it!&gamenumber=0&Init=rnbqkbnr/ppppp2p/5p2/6p1/8/4P3/PPPP1PPP/RNBQKBNR w - - 0 1&ApplyPgnMoveText=1.Qh5# 1-0") {
    // $('#Board table').addClass('tutorialArrow');
    $('.square59').addClass('tutorialHighlight');
    $('.square31').addClass('tutorialHighlight');
  }
  else {
    // $('#Board table').removeClass("tutorialArrow");
    $('.square59').removeClass('tutorialHighlight');
    $('.square31').removeClass('tutorialHighlight');
  }
	// AH: this line used to say
	// var ii, jj, aa, uurl = window.location.search;
var ii, jj, aa, uurl = moves;
  if (uurl != "")
  { uurl = uurl.substring(1, uurl.length);
    while (uurl.indexOf("|")>0) uurl=uurl.replace("|","/");
    while (uurl.indexOf("%7C")>0) uurl=uurl.replace("%7C","/");
    var llist = uurl.split("&");
    for (ii=0; ii<llist.length; ii++)
    { tt = llist[ii].split("=");
      aa=tt[1];
      for (jj=2; jj<tt.length; jj++) aa+="="+tt[jj];
      if (ss)
      { if (ss==tt[0]) eval(tt[0]+"('"+unescape(aa)+"')");
      }
      else 
      { 
        if(eval("window."+tt[0])) 
        eval(tt[0]+"('"+unescape(aa)+"')");
      }
    }
  }
}

function SetMove(mmove, vvariant)
{ if (isNaN(mmove)) return;
  var ii=isCalculating;
  isCalculating=true;
  if (RecordCount>0) MoveBack(MaxMove);
  if (vvariant)
  { if (vvariant>=ShortPgnMoveText[0].length) { isCalculating=ii; return; }
    if (CurVar!=vvariant) 
    { SetMove(ShortPgnMoveText[2][vvariant], ShortPgnMoveText[1][vvariant]);
      CurVar=vvariant;
    }  
  }
  else
  { while (CurVar!=0)
    { if (MoveCount==ShortPgnMoveText[2][CurVar])
      { CurVar=ShortPgnMoveText[1][CurVar];
        if ((!isCalculating)&&(document.BoardForm)&&(document.BoardForm.PgnMoveText))
          document.BoardForm.PgnMoveText.value=ShortPgnMoveText[0][CurVar];
      }  
      else MoveBack(1);
    }
  }  
  isCalculating=ii;
  var dd=mmove-MoveCount;
  if (dd<=0) MoveBack(-dd);
  else MoveForward(dd, 1);
  if (isCalculating) return;
  if ((document.BoardForm)&&(document.BoardForm.PgnMoveText))
    document.BoardForm.PgnMoveText.value=ShortPgnMoveText[0][CurVar];
  if (AutoPlayInterval) clearTimeout(AutoPlayInterval);
  if (isAutoPlay) AutoPlayInterval=setTimeout("MoveForward(1)", Delay);
}

function ApplyPgnMoveText(ss, rroot, ddocument, ggame)
{ var vv=0;
  if (! isNaN(rroot)) 
  { vv=ShortPgnMoveText[0].length; 
    ShortPgnMoveText[0][vv]=""; 
  }
  else 
  { ShortPgnMoveText[0].length=1;
    if (ddocument) TargetDocument=ddocument;
    else TargetDocument=window.document;
    if (rroot) activeAnchorBG=rroot;
    if (ggame) startAnchor=ggame;
    else startAnchor=-1;
  }  
  var ii, uu="", uuu="", cc, bb=0, bbb=0, ll=ss.length;
  for (ii=0; ii<ll; ii++)  
  { cc=ss.substr(ii,1);
    if (cc=="{") bbb++;
    if (cc=="}") bbb--; 
    if (((cc==")")||(cc=="]"))&&(bbb==0)) 
    { bb--;
      if (bb==0)
      { if (bbb==0) uu+=ApplyPgnMoveText(uuu, vv);
        else uu+=uuu;
        uuu="";
      }  
    }  
    if (bb==0) uu+=cc;
    else uuu+=cc;
    if (((cc=="(")||(cc=="["))&&(bbb==0)) bb++; 
  }
  if (! isNaN(rroot))
  { ii=0, jj=0, bb=0;
    var uuc=Uncomment(uu);
    while ((ii<uuc.length-1)&&(((ii>0)&&(uuc.charAt(ii-1)!=" "))||(isNaN(parseInt(uuc.charAt(ii)))))) ii++;
    while ((ii<uuc.length-1)&&(! isNaN(parseInt(uuc.charAt(ii))))) { bb=10*bb+parseInt(uuc.charAt(ii)); ii++; }
    if (ii<uuc.length-1)
    { uuu=uuc.substr(ii, 3);
      switch (uuu)
      { case "...": jj=1; break;
        case " ..": jj=1; break;
      }
      if (jj==0)  
      { uuu=uuc.substr(ii, 4);
        switch (uuu)
        { case "....": jj=1; break;
          case ". ..": jj=1; break;
          case " ...": jj=1; break;
        }
      }
      if (jj==0)  
      { uuu=uuc.substr(ii, 5);
        if (uuu==". ...") jj=1;
      }
    }  
    bb=2*(bb-1)+jj;
    //if (bb<0) bb=MoveCount;
    SetPgnMoveText(uu, vv, rroot, bb);
  }
  else SetPgnMoveText(uu);
  return(vv);
}

function GetHTMLMoveText(vvariant, nnoscript, ccommenttype, sscoresheet)
{ var vv=0, tt, ii, uu="", uuu="", cc, bb=0, bbb=0;
  var ss="", sstart=0, nn=MaxMove, ffst=0,llst,ssearch,ssub,ffull,mmove0="",mmove1="", gg="";
  if (sscoresheet) Annotation.length=0;
  if (startAnchor!=-1) gg=",'"+startAnchor+"'";
  isCalculating=true;
  if (vvariant) 
  { vv=vvariant;
    if (! isNaN(ShortPgnMoveText[0][vv]))
    { SetMove(ShortPgnMoveText[0][vv], ShortPgnMoveText[1][vv]);
      if (MoveCount!=ShortPgnMoveText[0][vv]) return("("+ShortPgnMoveText[0][vv]+")");
      //CurVar=ShortPgnMoveText[1][vv];
      if (ShortPgnMoveText[0][vv].indexOf(".0")>0) return(GetDiagram(1));
      return(GetDiagram());
    }  
    if (ShortPgnMoveText[2][vv]<0) return(ShortPgnMoveText[0][vv]);
    SetMove(ShortPgnMoveText[2][vv], ShortPgnMoveText[1][vv]);
    if (MoveCount!=ShortPgnMoveText[2][vv]) return(ShortPgnMoveText[0][vv]);
    CurVar=vvariant;
  }  
  else MoveBack(MaxMove);
  tt=ShortPgnMoveText[0][vv];
  
  ffull=Uncomment(ShortPgnMoveText[0][CurVar]);
  for (ii=0; (ii<nn)&&(ffst>=0)&&(MoveCount<MaxMove); ii++)
  { ssearch=Math.floor(MoveCount/2+2)+".";
    llst=ffull.indexOf(ssearch);
    ssearch=Math.floor(MoveCount/2+1)+".";
    ffst=ffull.indexOf(ssearch);
    mmove1=""
    if (ffst>=0)
    { ffst+=ssearch.length;
      if (llst<0)
        ssub=ffull.substring(ffst);
      else
        ssub=ffull.substring(ffst, llst);
      mmove0=GetMove(ssub,MoveType);
      if (mmove0!="")
      { if (ParseMove(mmove0, true)>0)
        { mmove1=mmove0;
          if (MoveType==0)
            HistMove[MoveCount-StartMove]=Math.floor((MoveCount+2)/2)+"."+mmove1;
          else
            HistMove[MoveCount-StartMove]=Math.floor((MoveCount+2)/2)+". ... "+mmove1;
          HistCommand[MoveCount-StartMove+1]=NewCommands.join("|");
          MoveCount++;
          MoveType=1-MoveType;
        }  
        else
        { if (MoveType==1)
          { ssub=Math.floor(MoveCount/2+1);
            ssearch=ssub+"....";
            ffst=ffull.indexOf(ssearch);
            if (ffst<0) { ssearch=ssub+". ..."; ffst=ffull.indexOf(ssearch); }
            if (ffst<0) { ssearch=ssub+". .."; ffst=ffull.indexOf(ssearch); }
            if (ffst<0) { ssearch=ssub+" ..."; ffst=ffull.indexOf(ssearch); }
            if (ffst<0) { ssearch=ssub+"..."; ffst=ffull.indexOf(ssearch); }
            if (ffst<0)
            { ssearch=ssub+" ..";
              ffst=ffull.indexOf(ssearch);
            }
            if (ffst>=0) 
            { ffst+=ssearch.length;
              if (llst<0) ssub=ffull.substring(ffst);
              else ssub=ffull.substring(ffst, llst);
              mmove0=GetMove(ssub,0);
              if (mmove0!="")
              { if (ParseMove(mmove0, true)>0)
                { mmove1=mmove0;
                  HistMove[MoveCount-StartMove]=Math.floor((MoveCount+2)/2)+". ... "+mmove1;
                  HistCommand[MoveCount-StartMove+1]=NewCommands.join("|");
                  MoveCount++;
                  MoveType=1-MoveType;
                }  
                else
                { ffst=-1;
                  //alert(mmove0+" is not a valid move.");
                }
              }
            }
          }
          else
          { ffst=-1;
            //alert(mmove0+" is not a valid move.");
          }
        }
      }
      else ffst=-1;
    }
    if (mmove1!="")
    { sstart=-1;
      do sstart=tt.indexOf(mmove1, sstart+1);
      while ((sstart>0)&&(IsInComment(tt, sstart)));
      if (sstart>=0)
      { if (sscoresheet)
        { Annotation[MoveCount-1]=GetComment(tt.substr(0,sstart));
          if (ss=="")
          { if (sscoresheet==2) ss+="<table width='100%' cellpadding=0 cellspacing=0><tr><td width='50%'>";
            if (MoveCount%2==1) ss+="<table width='100%' cellpadding=0 cellspacing=0><colgroup><col width='20%'><col width='40%'><col width='40%'></colgroup><tr><th>"+eval((MoveCount+1)/2)+".</th>";
            else ss+="<table width='100%' cellpadding=0 cellspacing=0><colgroup><col width='20%'><col width='40%'><col width='40%'></colgroup><tr><th>"+eval(MoveCount/2)+".</th><th>&nbsp;</th>";
          }
          else
          { if (MoveCount%2==1) ss+="<tr><th>"+eval((MoveCount+1)/2)+".</th>";
          }
          ss+="<th>";
        }
        else ss+=tt.substr(0,sstart);
        if (! nnoscript) ss+="<a href=\"javascript:SetMove{{"+MoveCount+","+vv+gg+"}}\" name=\"m"+MoveCount+"v"+vv+"\">";
        if (vv==0) ss+="<b>";
        ss+=TransformSAN(mmove1);
        if (vv==0) ss+="</b>";
        if (! nnoscript) ss+="</a>";
        tt=tt.substr(sstart+mmove1.length);
        if (sscoresheet)
        { ss+="</th>";
          if (MoveCount%2==0) ss+="</tr>";
          if (sscoresheet==2)
          { if (MoveCount%80==0) ss+="</table></td></tr></table><table width='100%' cellpadding=0 cellspacing=0><tr><td width='50%'><table width='100%' cellpadding=0 cellspacing=0><colgroup><col width='20%'><col width='40%'><col width='40%'></colgroup>";
            else
            { if (MoveCount%40==0) ss+="</table></td><td width='50%'><table width='100%' cellpadding=0 cellspacing=0><colgroup><col width='20%'><col width='40%'><col width='40%'></colgroup>";
            }
          }
        }
      }
      else ffst=-1;
    }
  }
  if (sscoresheet)
  { Annotation[MoveCount]=GetComment(tt);
    if (MoveCount%2==1) ss+="<th>&nbsp;</th>";
    ss+="</tr></table>";
    if (sscoresheet==2)
    { if (MoveCount%80<40) ss+="</td><td width='50%'>&nbsp;";
      ss+="</td></tr></table>";
    }
  }  
  else ss+=tt;

  var ll=ss.length;
  for (ii=0; ii<ll; ii++)  
  { cc=ss.substr(ii,1);
    if (cc=="{") bbb++;
    if (cc=="}") bbb--; 
    if (((cc==")")||(cc=="]"))&&(bbb==0)) 
    { bb--;
      if (bb==0)
      { if (bbb==0)
        { if (! isNaN(ShortPgnMoveText[0][uuu]))
          { cc=uu.length-1;
            uu=uu.substr(0,cc);
            cc="";
          }
          if (sscoresheet) uu+=GetHTMLMoveText(uuu, true);
          else uu+=GetHTMLMoveText(uuu, nnoscript);
          isCalculating=true;
        }
        else uu+=uuu;
        uuu="";
      }  
    }  
    if (bb==0) uu+=cc;
    else uuu+=cc;
    if (((cc=="(")||(cc=="["))&&(bbb==0)) bb++; 
  }  
   
  if (! vvariant) 
  { SetMove(0,0);
    tt=uu.split("{{");
    ll=tt.length;
    uu=tt[0];
    for (ii=1; ii<ll; ii++) uu+="("+tt[ii];
    tt=uu.split("}}");
    ll=tt.length;
    uu=tt[0];
    for (ii=1; ii<ll; ii++) uu+=")"+tt[ii];
    if ((ccommenttype==1)||(ccommenttype==true))
    { tt=uu.split("{");
      ll=tt.length;
      uu=tt[0];
      for (ii=1; ii<ll; ii++) uu+="<i>"+tt[ii];
      tt=uu.split("}");
      ll=tt.length;
      uu=tt[0];
      for (ii=1; ii<ll; ii++) uu+="</i>"+tt[ii];
    }
    if (ccommenttype>=1)
    { tt=uu.split("{");
      ll=tt.length;
      uu=tt[0];
      for (ii=1; ii<ll; ii++) uu+="<a href=\"javascript:SetMove()\"><span title=\""+tt[ii];
      tt=uu.split("}");
      ll=tt.length;
      uu=tt[0];
      for (ii=1; ii<ll; ii++) uu+="\" ontouchstart=\"if (this.innerHTML==\'{\'+this.title+\'}\') this.innerHTML=\'<I>{...}</I>\'; else this.innerHTML=\'{\'+this.title+\'}\';\"><I>{...}</I></span></a>"+tt[ii];
    }
  }
  isCalculating=false;
  return(uu);
}

function IsInComment(ss, nn)
{ var ii=-1, bb=0;
  do { ii=ss.indexOf("{",ii+1); bb++; }  
  while ((ii>=0)&&(ii<nn));
  ii=-1;
  do { ii=ss.indexOf("}",ii+1); bb--; }  
  while ((ii>=0)&&(ii<nn));  
  return(bb);
}

function HighlightMove(nn)
{ var ii, cc, bb, jj=0, ll=TargetDocument.anchors.length;
  if (ll==0) return;
  if (! TargetDocument.anchors[0].style) return;
  if ((activeAnchor>=0)&&(ll>activeAnchor))
  { TargetDocument.anchors[activeAnchor].style.backgroundColor="transparent";
    activeAnchor=-1;
  }
  if (isNaN(startAnchor))
  { while ((jj<ll)&&(TargetDocument.anchors[jj].name!=startAnchor)) jj++;
  }
  for (ii=jj; ((ii<ll)&&(activeAnchor<0)); ii++)
  { if (TargetDocument.anchors[ii].name==nn)
    { activeAnchor=ii;
      TargetDocument.anchors[activeAnchor].style.backgroundColor=activeAnchorBG;
      if ((document!=TargetDocument)&&(parent.document!=TargetDocument)&&(TargetDocument.anchors[activeAnchor].scrollIntoView)) 
      { if (parent.document==parent.parent.document)
      	  TargetDocument.anchors[activeAnchor].scrollIntoView(false);
      }
      return;
    }
  }
}

function UpdateAnnotation(bb)
{ if (Annotation.length==0) return;
  if (! parent.frames["annotation"]) return;
  if(bb)
  { with (parent.frames["annotation"].document)
    { open();
      writeln("<html><head></head><body><form>"); 
      writeln("<input type='hidden' name='MoveCount' value='"+MoveCount+"'>");
      write("<textarea rows=8 style='width:100%' name='Annotation'>");
      if (Annotation[MoveCount]) write(Annotation[MoveCount]);
      writeln("</textarea>");
      if (AnnotationFile) writeln("<input type='button' value='Save Annotation' onclick='parent.frames[\"board\"].SaveAnnotation(this.form)'>");
      writeln("</form></body></html>");
      close();
    }  
  }
  else
  { parent.frames["annotation"].document.forms[0].MoveCount.value=MoveCount;
    if (Annotation[MoveCount])
      parent.frames["annotation"].document.forms[0].Annotation.value=Annotation[MoveCount];
    else
      parent.frames["annotation"].document.forms[0].Annotation.value="";
  }  
}

function IsComplete()
{ return(isInit);
}