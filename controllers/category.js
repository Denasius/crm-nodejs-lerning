const Category = require('../models/Category')
const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (request, response) {
	try{
		const categories = await Category.find({user:request.user.id})
		response.status(200).json(categories)
	}catch(error){
		errorHandler(response, error)
	}
}

module.exports.getById = async function (request, response) {
	try{
		const category = await Category.findById(request.params.id)
		response.status(200).json(category)
	}catch(error){
		errorHandler(response, error)
	}
}

module.exports.remove = async function (request, response) {
	try{
		await Category.remove({_id: request.user.id})
		await Position.remove({category: request.body.id})
		response.status(200).json({
			message: 'Категория удалена'
		})
	}catch(error){
		errorHandler(response, error)
	}
}

module.exports.create = async function (request, response) {
	const category = new Category({
		name: request.body.name,
		user: request.user.id,
		imageSrc: request.file ? request.file.path : ''
	})
	try{
		await category.save()
		response.status(200).json(category)
	}catch(error){
		errorHandler(response, error)
	}
}

module.exports.update = async function (request, response) {
	const updatedCategory = {
		name: request.body.name
	}
	if ( request.file )
		updatedCategory.imageSrc = request.file.path
	
	try{
		const category = await Category.findOneAndUpdate(
			{_id: request.params.id},
			{$set: updatedCategory},
			{new: true}
		)
		response.status(200).json(category)
	}catch(error){
		errorHandler(response, error)
	}
}