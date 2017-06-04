var checker = new GameChecker();
setInterval(function() {
  checker.updateCurrentGames(checker.checkForGameChange);
}, 10000);