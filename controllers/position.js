const Position = require('../models/Position')
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

module.exports.create = async function (request, response) {
	try{
		const position = await new Position({
			name: request.body.name,
			cost: request.body.cost,
			category: request.body.categoryId,
			user: request.user.id
		}).save()
		response.status(201).json(position)
	}catch(error){
		errorHandler(response, error)
	}
}

module.exports.remove = async function (request, response) {
	try{
		await Position.remove({_id: request.params.id})
		response.status(200).json({
			message: 'Запись успешно удалена.'
		})
	}catch(error){
		errorHandler(response, error)
	}
}

module.exports.update = async function (request, response) {
	try{
		const position = await Position.findOneAndUpdate(
			{_id: request.params.id},
			{$set: request.body},
			{new: true}
		)
		response.status(200).json(position)
	}catch(error){
		errorHandler(response, error)
	}
}