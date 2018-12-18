const swag =require('../models/swag')
const swagarray = [...swag]

const add = (req,res,next) => {
	if(req.query.id){
		var swagitem;
		for (let i = 0; i < swagarray.length; i++) {
			if (swagarray[i].id == req.query.id) {
				swagitem = swagarray[i]
			}
		}
		if (req.session.user.cart.find(obj => obj.id == req.query.id)){
			res.status(200).send(req.session.user)
		}
		else{
			req.session.user.cart.push(swagitem)
			req.session.user.total+=swagitem.price
			res.status(200).json(req.session.user)
		}
	}
	else {
		res.status(500).send("No id")
	}
}

const remove = (req,res,next) => {
	if(req.query.id){
		var cartlocation;
		for(let i=0;i<req.session.user.cart.length;i++){
			if(req.session.user.cart[i].id==req.query.id){
				cartlocation = i
			}
		}
		if(cartlocation>=0){
		req.session.user.total-req.session.user.cart[cartlocation].price
		req.session.user.cart.splice(cartlocation,1)
		res.status(200).send(req.session.user)
		}
		else{
		res.status(200).send(req.session.user)
		}
	}
	else {
		res.status(500).send("No id")
	}
}

const checkout = (req,res,next) => {
	req.session.user.cart=[];
	req.session.user.total=0;
	res.status(200).send(req.session.user)
}

module.exports = {
	add,
	remove,
	checkout
}