$(document).ready(function () {

var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck",
 "habathcx", "RobotCaleb", "noobs2ninjas", "comster404"];

for (i = 0; i < channels.length; i++){

var api_url = 'https://api.twitch.tv/kraken/streams/' + channels[i] + '?callback=?';
//var offline_url = 'https://api.twitch.tv/kraken/channels/' + channels[i] + '?callback=?';

    $.ajax({
        type: "GET",
        url: api_url,
        dataType: "json",
        success: function(data) {
            console.log(data);

            if (data.status == 422) {
                    $(".userInfo").append('<div class="row user-row offline"><div class="col-xs-3"><img src= "images/unavailable-user.jpg" /></div><div class="col-xs-3">' + 
                    data.message + '</div><div class="col-xs-6"><p>Account no longer available</p></div></div>');
            } else if (data.stream == null ) {

                    $.ajax({
                        type: "GET",
                        url: data._links.channel,
                        dataType: "json",
                        success: function(data2) {
                        console.log(data2);
                        $(".userInfo").append('<div class="row user-row offline"><div class="col-xs-3"><img src="' + 
                            data2.logo + '"/></div><div class="col-xs-3"><a href="' + 
                            data2.url + '" target="_blank">' + 
                            data2.display_name + '</a></div><div class="col-xs-6"><p>Offline</p></div></div>');
                    } // data2 function
                }); //inside ajax call for offline users

            } else {
                $(".userInfo").append('<div class="row user-row online"><div class="col-xs-3"><img src="' + 
                            data.stream.channel.logo + '"/></div><div class="col-xs-3"><a href="' + 
                            data.stream.channel.url + '" target="_blank">' + 
                            data.stream.channel.display_name + '</a></div><div class="col-xs-6">' + 
                            data.stream.channel.status + '</div></div>');
            }
            
            //outside ajax call

        },
        // error: function(errorMessage) {
        //     alert("error");
        // }

    }); //ajax call

} //for loop
        console.log('loop finished');   

        $("#online").click(function() {
            $(".offline").hide();
            $(".online").show();
        });

        $("#offline").click(function() {
            $(".online").hide();
            $(".offline").show();
        });

        $("#all").click(function() {
            $(".online").show();
            $(".offline").show();
        });


 
}); // ready
