$(function() {
    var d1 = [];
    for (var i = 0; i < 14; i += 0.5) {
        d1.push([i, Math.sin(i)]);
    }
    var d2 = [[0, 3], [4, 8], [8, 5], [9, 13]];
    // A null signifies separate line segments
    $.plot("#placeholder", [ d1, d2 ]);
    // Add the Flot version string to the footer
    $("#footer").prepend("Flot " + $.plot.version + " &ndash; ");
});