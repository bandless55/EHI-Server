$(function() {
    callback = function(data){
        var temp_ctrl = data.temp_ctrl
        var temp_curr = data.temp_curr
        var hvac_mode = data.hvac_mode
        var hvac_stat = data.hvac_stat

        $("#result_temp_ctrl").text(temp_ctrl+"\u00B0F");
        $("#result_temp_curr").text(temp_curr+"\u00B0F");
        switch(hvac_mode){
            case "off":
                $("#result_hvac_mode").text("Off");
                $("#hvac_mode").css("background", "#ffffff");
                break;
            case "heat":
                $("#result_hvac_mode").text("Heat");
                $("#hvac_mode").css("background", "#DD2129");
                break;
            case "cool":
                $("#result_hvac_mode").text("Cool");
                $("#hvac_mode").css("background", "#414AE5");
                break;
        }
        switch(hvac_stat){
            case "on":
                $("#result_hvac_stat").text("Active");
                $("#hvac_status").css("background", "#419528");
                break;
            case "off":
                $("#result_hvac_stat").text("Off");
                $("#hvac_status").css("background", "#BF3811");
                break;
        }
    };
    fetchData = function() { $.getJSON('/get_data', callback) };
    fetchData();
    setInterval(fetchData, 2000);
});
