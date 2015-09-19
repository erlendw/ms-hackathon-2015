var router = require('express').Router()

var Twitter = require('twitter')
var client = new Twitter({
	consumer_key: 'GBwZIgehMl74jFybYaXA',
	consumer_secret: '8S6S6e2WSZPpJXhTZvuMklRtiIEhooX8ufuqb3E',
	access_token_key: '91752953-b0WBTmCRDf6zPCEDU3DAuEvOvfhGJQ0qXQowsqJP4',
	access_token_secret: 'qwer2Ez86FimIivNMWVfXqUC4KaAFOgiuVpBOtec'
})

var params = {screen_name: 'microsoftnorge', count: 200}

function get_most_popular_tweet(params, callback){
	client.get('statuses/user_timeline', params, function(error, tweets, response){
		var most_pop = 0
		var most_pop_tweet = {}
		for(var i in tweets){
			var tweet = tweets[i]
			console.log(tweet.retweet_count)
			//console.log(tweet['retweet_count'])
			if (tweet.favorite_count + tweet.retweet_count > most_pop){
				most_pop = tweet.retweet_count + tweet.retweet_count
				most_pop_tweet = tweet
			}
		}
		callback(most_pop_tweet)
	})
}

router.get('/api/tweet', function (req, res) {
	res.type('text/plain')
	get_most_popular_tweet(params, function(tweet){
		res.send(tweet)
	})
})

module.exports = router
