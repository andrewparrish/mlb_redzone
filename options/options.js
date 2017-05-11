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

function sortPriorities(priorities) {
    return priorities.sort(function(a, b) {
       return a.priority - b.priority;
    });
}

function addPriority(priorityList, priority) {
    if (priorityList.length === 0) {
        priorityList.push(priority);
        return priorityList;
    } else {
        var sortedList = sortPriorities(priorityList);
    }
}

function listItemForPriority(priority) {
    return "<li class='child'>" + priority.text + "</li>";
}

function updatePriorityList() {
    $('#priority-list').empty();
    chrome.storage.sync.get('priorities', function(result) {
        var list = result.priorities || {};
        if (list.toString() === {}.toString()) { return }
        list.each((function(item) {
            $('#priority-list').append(listItemForPriority(item));
        }));
    });
}

$(document).ready(function() {
    addTeamsToSelect('#add-team-select');
    addPriorityToSelect('#add-team-priority');
    updatePriorityList();

    var saveTeam = function() {
        chrome.storage.sync.get('priorities', function(list) {
            var priorityList = list;
            if (priorityList.toString() === {}.toString()) { priorityList = [] }
            var updatedList = addPriority(priorityList, /* ADD PRIORITY HERE*/);

            chrome.storage.sync.set({'priorities': updatedList }, updatePriorityList);
        });
    };

    $("#add-team-button").click(saveTeam);
});
