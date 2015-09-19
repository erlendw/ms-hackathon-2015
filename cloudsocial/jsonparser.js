/**
 * Created by erlendwestbye on 19/09/15.
 */
function parseTweetsJson(callback){

    var twitterdata;






    $.getJSON( "twitterdata.json", function( data ) {
        twitterdata = (data);





        var timeOfDay = [];
        var numberOfTweets = [];

        for (i = 0; i < 24; i++) {

            timeOfDay[i] = 0;
            numberOfTweets[i] = 0;

        }


        for(var count in twitterdata){


            var favourites = twitterdata[count].favorite_count;
            var retweets = twitterdata[count].retweet_count;


            timeOfDay[parseInt(twitterdata[count].created_at.split(" ")[3].split(":")[0])] += parseInt(favourites)+parseInt(retweets);

            numberOfTweets[parseInt(twitterdata[count].created_at.split(" ")[3].split(":")[0])] += 1;

            console.log(parseInt(twitterdata[count].created_at.split(" ")[3].split(":")[0]) + " " + favourites + ":" +retweets);
        }

        var normdata = [];

        for(var count in timeOfDay){

            if(numberOfTweets[count] == 0){

                normdata[count] = 0;

            }

            else{

                normdata[count] = parseFloat((timeOfDay[count] / numberOfTweets[count]).toFixed(2))

            }


        }

        callback(normdata)
    });

}


function parseLove(callback){


    //$.getJSON("http://cloudsocial.azurewebsites.net/api/followers/", function( data ) {
    $.getJSON("twitterlol.json", function( data ) {

        var twitter = data.twitter;

        var facebook = data.facebook;

        callback(twitter,facebook)

    });

}

function parseTwitter(){


    //$.getJSON("http://cloudsocial.azurewebsites.net/api/followers/", function( data ) {
    $.getJSON("mvptweet.json", function( data ) {

        alert(data.created_at)

    });

}



