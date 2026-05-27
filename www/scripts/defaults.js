var ImagePath = "images/";
if (navigator.userAgent.match(/iPad/i) != null) {
  var ImagePath = "images/ipad/";
}
var ImageStyle = "";
var movecountcalculate="";
var currenttheme="";

var jQT = new $.jQTouch({
    addGlossToIcon: false,
    backSelector: '.back, .cancel, .goback',
    touchSelector: '.swipe',
    preloadImages: [
  'images/bamboo.svg',
  'images/bamboo-large.svg',
  'images/help.svg',
  'images/error.svg',
  'images/success.svg'
        ],
    slideleftSelector: '#jqt > ul > li > a, #jqt > ol > li > a, body > * > a, .arrow, .back, .button, .navslide, #settingslink, #gameslink',
    useFastTouch: true
});

// when game loads, figure out what the current game is
currentgame=0;
currentgame=localStorage.getItem('currentgame');
if (currentgame==undefined) {
  currentgame=0;
  localStorage.setItem("currentgame",currentgame);
}
localStorage.setItem("currentgame",currentgame);

// if these items aren't set in local storage then they get set to these defaults -->

// for testing, this lists all puzzles if you say "on". If "off" then it will only show games that have been solved
var testing="off";

var firstmovecolor="White";

var totalsolved = localStorage.getItem('totalsolved');
if (totalsolved==undefined) {
localStorage.setItem('totalsolved','0');
 totalsolved = "0"; }

var perfectgamestreak = localStorage.getItem('perfectgamestreak');
if (perfectgamestreak==undefined) {
localStorage.setItem('perfectgamestreak','0');
 perfectgamestreak = "0"; }

var perfectgamestreakrecord = localStorage.getItem('perfectgamestreakrecord');
if (perfectgamestreakrecord==undefined) {
localStorage.setItem('perfectgamestreakrecord','0');
 perfectgamestreakrecord = "0"; }

var puzzlelevel=localStorage.getItem('highestlevel'); 
// don't forget the puzzle number ends up being one less than the current level
var newlevelmessage = "";

var currentgamesolvedstreak = localStorage.getItem('currentgamesolvedstreak');
if (currentgamesolvedstreak==undefined) {
localStorage.setItem('currentgamesolvedstreak','0');
 currentgamesolvedstreak = "0"; }

var longestgamesolvedstreak = localStorage.getItem('longestgamesolvedstreak');
if (longestgamesolvedstreak==undefined) {
localStorage.setItem('longestgamesolvedstreak','0');
 longestgamesolvedstreak = "0"; }

var longestcorrectmovestreak = localStorage.getItem('longestcorrectmovestreak');
if (longestcorrectmovestreak==undefined) {
localStorage.setItem('longestcorrectmovestreak','0');
 longestcorrectmovestreak = "0"; }

var currentcorrectmovestreak = localStorage.getItem('currentcorrectmovestreak');
if (currentcorrectmovestreak==undefined) {
localStorage.setItem('currentcorrectmovestreak','0');
 currentcorrectmovestreak = "0"; }

var cheatbuttonclicks = localStorage.getItem('cheatbuttonclicks');
if (cheatbuttonclicks==undefined) {
localStorage.setItem('cheatbuttonclicks','0');
 cheatbuttonclicks = "0"; }

var perfectgamecount = localStorage.getItem('perfectgamecount');
if (perfectgamecount==undefined) {
localStorage.setItem('perfectgamecount','0');
 perfectgamecount = "0"; }

var puzzlesattempted = localStorage.getItem('puzzlesattempted');
if (puzzlesattempted==undefined) {
localStorage.setItem('puzzlesattempted','0');
 puzzlesattempted = "0"; }

var totalcorrectmoves = localStorage.getItem('totalcorrectmoves');
if (totalcorrectmoves==undefined) {
localStorage.setItem('totalcorrectmoves','0');
 totalcorrectmoves = "0"; }

var totalwrongmoves = localStorage.getItem('totalwrongmoves');
if (totalwrongmoves==undefined) {
localStorage.setItem('totalwrongmoves','0');
 totalwrongmoves = "0"; }

var correctmoveratio = localStorage.getItem('correctmoveratio');
if (correctmoveratio==undefined) {
localStorage.setItem('correctmoveratio','0');
 correctmoveratio = 0; }

var puzzlessolved = localStorage.getItem('puzzlessolved');
if (puzzlessolved==undefined) {
localStorage.setItem('puzzlessolved','0');
 puzzlessolved = "0"; }

var yourrank = localStorage.getItem('yourrank');
if (yourrank==undefined) {
localStorage.setItem('yourrank','pawn');
 yourrank = "pawn"; }

var currentgamesolvedstreakmessage = localStorage.getItem('currentgamesolvedstreakmessage');
if (currentgamesolvedstreakmessage==undefined) {
localStorage.setItem("currentgamesolvedstreakmessage","");
 currentgamesolvedstreakmessage = ""; }

var audiocontrol = localStorage.getItem('audiocontrol');
if (audiocontrol==undefined) {
localStorage.setItem("audiocontrol","off");
audiocontrol = "off";
}


