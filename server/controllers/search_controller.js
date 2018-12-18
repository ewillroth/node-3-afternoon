const swag = require('../models/swag')
const swagarray = [...swag]

const search = (req,res,next) => {
	if(req.query.category){
		const filteredSwag = swagarray.filter(swag => swag.category ===req.query.category)
		res.status(200).send(filteredSwag)
	}
	else{
		res.status(200).send(swagarray)
	}
}

module.exports = {
	search
}