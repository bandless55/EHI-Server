$(function() {
    var spinner = $("#spinner").spinner({ min:40, max:80});
    var radio   = null;
    var button  = $("#temp_set").button();
    var hvac_mode = "off";

    $.getJSON('get_data', function(data){
        spinner.spinner("value", data.temp_ctrl);
        hvac_mode = data.hvac_mode;
        $("#"+hvac_mode).attr('checked', true);
        radio = $("#radios").buttonset()
    });
});
