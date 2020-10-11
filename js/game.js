$(document).ready(init);
const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;

function round() {
  $('.game-field').removeClass("target");
  $('.game-field').removeClass("miss");


  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером

  if (hits === 0) {
    firstHitTime = getTimestamp();
  }

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $(".game-field").addClass("d-none");

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
  $("#button-start").addClass("d-none");
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    $(event.target).text("");
    hits = hits + 1;
    round();
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
  $("#button-start").click(function() {
    round();
  });
}