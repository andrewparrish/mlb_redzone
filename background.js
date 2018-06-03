// var checker = new GameChecker();
// setInterval(function() {
//     checker.updateCurrentGames(checker.checkForGameChange);
// }, 10000);
// $(function() {
//     var checker;
//
//     var updateChecker = function() {
//         if(!checker) { checker = new GameChecker(); }
//         if(!checker.active) { checker.isMonitorActive() }
//     }.bind(this);
//
//     chrome.tabs.onCreated.addListener(updateChecker);
//     chrome.tabs.onUpdated.addListener(updateChecker);
// });

var checker = new GameChecker();


//
// chrome.storage.onChanged.addListener(function(changes, namespace) {
//     for (key in changes) {
//         var storageChange = changes[key];
//         console.log('Storage key "%s" in namespace "%s" changed. ' +
//             'Old value was "%s", new value is "%s".',
//             key,
//             namespace,
//             storageChange.oldValue,
//             storageChange.newValue);
//     }
// });