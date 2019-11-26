const bcrypt = require('bcryptjs')
const User = require('../models/User')

module.exports.login = function (request, response) {
	response.status(200).json({
		login : {
			email: request.body.email,
			password: request.body.password
		}
	})
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
		}catch(e){}
	}
}