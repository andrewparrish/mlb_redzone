function Player(playerData) {
    this.id = playerData.id;
    this.batterPitcher = playerData.batterPitcher;
    this.name = playerData.name;
    this.position = playerData.position;
    this.rightLeft = playerData.rightLeft;
    this.shirtNum = playerData.shirtNum;


    // Models should be able to inherit this
    this.savePlayer = function(afterSave) {
        var data = {};
    };
}

function urlForGameId(gameId) {
    return "http://gdx.mlb.com/gdcross/components/game/mlb/year_2017/month_06/day_11/" + gameId + "/players.xml"
}

Player.prototype.save_all_players = function(playersData) {
    Object.keys(playersData).forEach(function(player) {
        Player.new(player);
    });
};
