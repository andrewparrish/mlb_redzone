function addTeamsToSelect(select_id) {
    $.getJSON("../mappings/teams.json", function(teams) {
        $.each(teams, function(val, name) {
            $(select_id).append($("<option>", { "value": val, "text": name }));
        });
    });
}

function addPriorityToSelect(select_id) {
    for(i = 1; i <= $('#priority-list').length; i++) {
        $(select_id).append($("<option>", { value: i, text: i }));
    }
}

$(document).ready(function() {
    addTeamsToSelect('#add-team-select');
    addPriorityToSelect('#add-team-priority');

    var saveTeam = function() {
        chrome.storage.sync.get('priorities', function(list) {
            var priorityList = list;
            if (priorityList.toString() === {}.toString()) { priorityList = [] }
            priorityList.push({
            
            });
        });
    };

    $("#add-team-button").click(saveTeam);
});
