module.exports.login = function (request, response) {
	response.status(200).json({
		login : 'login controller'
	})
}

module.exports.register = function (request, response) {
	response.status(200).json({
		register: 'register controller'
	})
}