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

function addPriorityToSelect(select_id) {
    for(i = 1; i <= $('#priority-list').length; i++) {
        $(select_id).append($("<option>", { value: i, text: i }));
    }
}

function listItemForPriority(priority) {
    return "<li class='child'>" + priority.text + "</li>";
}

function updatePriorityList(list) {
    $('#priority-list').empty();
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

function saveTeam() {
    PriorityList.addPriority(buildTeamPriority(), updatePriorityList);
}

$(document).ready(function() {
    addTeamsToSelect('#add-team-select');
    addPriorityToSelect('#add-team-priority');
    PriorityList.setInitialPriorities(updatePriorityList);

    $("#add-team-button").click(saveTeam);
});
