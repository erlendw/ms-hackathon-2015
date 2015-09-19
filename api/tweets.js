var router = require('express').Router()

var Twitter = require('twitter')
var client = new Twitter({
	consumer_key: 'GBwZIgehMl74jFybYaXA',
	consumer_secret: '8S6S6e2WSZPpJXhTZvuMklRtiIEhooX8ufuqb3E',
	access_token_key: '91752953-b0WBTmCRDf6zPCEDU3DAuEvOvfhGJQ0qXQowsqJP4',
	access_token_secret: 'qwer2Ez86FimIivNMWVfXqUC4KaAFOgiuVpBOtec'
})

var params = {screen_name: 'microsoftnorge', count: 200}

function get_twitter_followers(params, callback){
	client.get('statuses/user_timeline', params, function(error, result, response){
		callback(result)
	})
}

router.get('/api/tweets', function (req, res) {
	res.type('text/plain')
	get_twitter_followers(params, function(tweets){
		res.send(tweets)
	})
})

module.exports = router
