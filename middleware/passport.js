const 		JWTStrategy = require('passport-jwt').Strategy
const		ExtractJwt = require('passport-jwt').ExtractJwt
const		keys = require('../config/keys')
const		mongoose = require('mongoose')
const		User = mongoose.model('users')

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: keys.jwt
}

module.exports = passport => {
	passport.use(new JWTStrategy(options, async (payload, done) => {
		console.log(payload)
		try{
			const user = await User.findById(payload.userID).select('email id')

			if ( user ){
				done(null, user)
			}else{
				done(null, false)
			}
		}catch(error){
			console.log(error)
		}
	} ))
}
