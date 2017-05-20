function getTime() {
  var time = new Date();
  var month = toTwoDigit(time.getUTCMonth().toString() + 1);
  var day = toTwoDigit(time.getUTCDate().toString());
  var hour = toTwoDigit(time.getUTCHours().toString());
  var minute = toTwoDigit(time.getUTCMinutes().toString());
  var second = toTwoDigit(Math.round(time.getSeconds() / 10) * 10);
  return "" + time.getFullYear() + month + day + "_"+ hour + minute + second;
}

function toTwoDigit(str) {
  if (str.length == 1) {
    str = "0" + str;
  }
  return str;
}

// http://lwsa.mlb.com/tfs/tfs?file=/components/game/mlb/year_2017/month_05/day_14/gid_2017_05_14_atlmlb_miamlb_1/plays.xml&timecode=20170514_182100

function getData() {
  var xhr = new XMLHttpRequest();
  var serviceUrl = "http://lwsa.mlb.com/tfs/tfs?file=/components/game/mlb/year_2017/month_05/day_14/gid_2017_05_14_atlmlb_miamlb_1/plays.xml&timecode=" + getTime();
  console.log(serviceUrl);

  $.ajax({
    type: "GET",
    url: serviceUrl,
    success: function(msg){
      console.log(msg);
      $(msg).find("game").each(function(index, el) {
        console.log(el);
      });
    },
    error: function(err){
      console.log(err);   
    }
  });
}

// setInterval(function() { getData(); }, 10000);
// setInterval(function() { chrome.tabs.executeScript(null, { file: "check_game.js" })}, 1000);