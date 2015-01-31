$(document).ready(function () {
    var data = [];
    var g = new Dygraph($('#graph'), data, 
                        {
                            drawPoints: true,
                            showRoller: true,
                            valueRange: [0.0, 1.2],
                            labels: ['Time', 'Random']
                          });
    
    callback = function(data){
        g.updateOptions({'file' : data});
    };
    
    fetchData = function() {
        $.getJSON('/thermostatData', callback);
    };
    
    fetchData();
    setInterval(fetchData, 10000);
});