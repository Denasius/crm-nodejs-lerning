const position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getByCategoryId = async function (request, response) {
	try{
		const positions = await position.find({
			category: request.params.categoryId,
			user: request.user.id
		})
		response.status(200).json(positions)
	}catch(error){
		errorHandler(response, error)
	}
}

module.exports.create = function (request, response) {
	try{}catch(error){
		errorHandler(response, error)
	}
}

module.exports.remove = function (request, response) {
	try{}catch(error){
		errorHandler(response, error)
	}
}

module.exports.update = function (request, response) {
	try{}catch(error){
		errorHandler(response, error)
	}
}