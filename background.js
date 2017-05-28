var checker = new GameChecker();
checker.getCurrentGame();
setInterval(function() {
  checker.getCurrentGames()
}, 10000);