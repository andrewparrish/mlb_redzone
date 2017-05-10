function addTeamsToSelect(select_id) {
    $.getJSON("../mappings/teams.json", function(teams) {
        $.each(teams, function(val, name) {
            console.log(val + " " + name);
            $(select_id).append($("<option>", { "value": val, "text": name }));
        });
    });
}

$(document).ready(function() {
    addTeamsToSelect('#add-team-select');
});
