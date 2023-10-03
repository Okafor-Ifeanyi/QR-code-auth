import jwt from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'
import {} from 'dotenv/config'

const encode_jwt = function (obj) {
	// 1 hour
    const jwtToken = jwt.sign( obj, process.env.JWT_SECRET, { expiresIn: '1h' } );

	return jwtToken;
}

const verifyToken = (token) => {
	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		return {
		  expired: false,
		  decoded,
	};
	} catch (e) { 
			return {
				expired: e.message === 'jwt expired',
				decoded: null,
	  	};
	}
}
  
const decodeToken = (token) => {
	const id = jwt_decode(token)._id
	return id
}

export{ encode_jwt, verifyToken, decodeToken } 