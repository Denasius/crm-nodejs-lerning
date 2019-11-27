const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function (request, response) {
	const candidate = await User.findOne({email:request.body.email})

	if ( candidate ) {
		/*
		** 1. Проверка пароля
		** 2. Проверка пользователя
		*/

		const userPassword = bcrypt.compareSync(request.body.password, candidate.password)

		if ( userPassword ) {
			/*
			** 3. Генерация токена
			*/

			const token = jwt.sign({
				email: candidate.email,
				userID: candidate._id
			}, keys.jwt, {
				expiresIn: 60 * 60 * 2
			})

			response.status(200).json({
				token: `Bearer ${token}`
			})

		}else{
			/*
			** 4. Не совпадают пароли
			*/
			response.status(401).json({
				message: 'Пароли не совпадают. Попробуйте еще раз'
			})
		}
	}else{
		 response.status(404).json({
		 	message: 'Такого пользователя не существует.'
		 })
	}
}

module.exports.register = async function (request, response) {
	const userCandidate = await User.findOne({email:request.body.email})

	if ( userCandidate ){
		// status 409 is CONFLICT
		response.status(409).json({
			message: 'Такой Email уже занят. Попробуйте другой.'
		})
	}else{
		const salt = bcrypt.genSaltSync(10)
		const newUser = new User({
			email: request.body.email,
			password: bcrypt.hashSync(request.body.password, salt)
		})

		try{
			await newUser.save()

			// status 201 is CREATED
			response.status(201).json(newUser)
		}catch(e){
			errorHandler(response, e)
		}
	}
}