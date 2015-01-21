$(document).ready(function (){
    var totalPoints = 300;
    var res2 = [];
    for(var i = 0; i < totalPoints; i++){
        res2.push(null);
    }

    function getRandomData(curr_val) {
        res2 = res2.slice(1);
        res2.push([0, curr_val])

        for(var i = 0; i < totalPoints, i++){
            if(res2[i] != null){
                res2[i] = [i, curr_val];
            }
        }
    }

    var plot = $.plot("#placeholder", [ getRandomData() ], {
        series: {
            shadowSize: 0	// Drawing is faster without shadows
        },
        yaxis: {
            min: 0,
            max: 100
        },
        xaxis: {
            show: false
        }
    });

    function update() {

        plot.setData([getRandomData()]);

        // Since the axes don't change, we don't need to call plot.setupGrid()

        plot.draw();
        setTimeout(update, updateInterval);
    }

    update();
});
