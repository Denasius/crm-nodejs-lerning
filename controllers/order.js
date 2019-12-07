const order = require('../models/Order')
const errorhandler = require('../utils/errorHandler')

module.exports.getAll = async function (request, response) {
	const query = {
		user: request.user.id
	}

	if (request.query.start){
		query.date = {
			$gte: request.query.start // $gte - Больше или равно
		}
	}

	if (request.query.end) {
		if (!query.date){
			query.date = {}
		}

		query.date['$lte'] = request.query.end
	}

	if (request.query.order){
		query.order = +request.query.order
	}

	try{
		const orders = await Order
			.find(query)
			.sort({date: -1})
			.skip(+request.query.offset) // Для бесконечной пагинации при прокрутке
			.limit(+request.query.limit) // Для лимита товаров в пагинации

		response.status(200).json(orders)
	}catch(error){
		errorhandler(response, error)
	}
}

module.exports.create = async function (request, response) {
	try{
		const lastOrder = await Order
			.findOne({user:request.user.id})
			.sort({date: -1}) // Сортирую по последнему добавленному

		const maxOrder = lastOrder ? lastOrder.order : 0
		const order = await new Order({
			list: request.body.list,
			user: request.user.id,
			order: maxOrder + 1
		}).save()
	response.status(201).json(order)
	}catch( error ){
		errorhandler(response, error)
	}
}