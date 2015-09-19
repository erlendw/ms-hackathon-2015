/**
 * Created by erlendwestbye on 19/09/15.
 */


function getMyJson(){


    var twitterdata;

    $.getJSON( "twitterdata.json", function( data ) {

        twitterdata = (data);

        alert(twitterdata[0].created_at)

    });





}
