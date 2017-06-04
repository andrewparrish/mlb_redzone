/*
 Priority Model:
 {
 val: str,
 text: str,
 priority: int,
 type: 'player || team'
 }
 */


function addTeamsToSelect(select_id) {
    $.getJSON("../mappings/teams.json", function(teams) {
        $.each(teams, function(val, name) {
            $(select_id).append($("<option>", { "value": val, "text": name }));
        });
    });
}

function addBlackoutTeams() {
    $.getJSON("../mappings/teams.json", function(teams) {
        $.each(teams, function(val) {
            Team.findById(val, updateBlackoutTeam);
        });
    });
}

function addPriorityToSelect() {
    for(i = 1; i <= $('#priority-list').children().length; i++) {
        $(select_id).append($("<option>", { value: i, text: i }));
    }
}

function listItemForPriority(priority) {
    return "<li class='child'>" + priority.text + "</li>";
}

function listItemForBlackout(team) {
    var id = "team_" + team.id;
    return "<li id=\'" + id + "\'" + "class='child'>" + team.displayName + "</li>";
}

function updatePriorityList(list) {
    $('#priority-list').empty();
    $('#add-team-priority').append($("<option>", { value: (list.length + 1), text: (list.length + 1) }));
    list.forEach(function(item) {
        $('#priority-list').append(listItemForPriority(item));
    });
}

function buildTeamPriority() {
    var select = $('#add-team-select');
    return {
        val: select.find(":selected").val(),
        text: select.find(":selected").text(),
        priority: parseInt($('#add-team-priority').val()),
        type: 'team'
    }
}

function updateBlackoutTeam(team) {
    if ($('#team_' + team.id).length === 0) {
        $('#blackout-list').append(listItemForBlackout(team));
    }
}

function saveTeam() {
    PriorityList.addPriority(buildTeamPriority(), updatePriorityList);
}

function saveBlackout() {
    var select = $('#add-ignore-select');
    var team = new Team(select.find(":selected").val(), select.find(':selected').text(), true);
    team.saveTeam(addBlackoutTeams);
}

$(document).ready(function() {
    addTeamsToSelect('#add-team-select');
    addTeamsToSelect('#add-ignore-select');
    addBlackoutTeams();
    addPriorityToSelect();
    PriorityList.setInitialPriorities(updatePriorityList);

    $("#add-team-button").click(saveTeam);
    $("#add-ignore-button").click(saveBlackout);
});
