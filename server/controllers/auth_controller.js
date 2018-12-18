const user = require('../models/users');
const users = [...user]
var id = 1

const login = (req,res,next) => {
	for(let i =0;i<users.length; i++){
		if(users[i].username===req.body.username&&users[i].password===req.body.password){
			var userid =  users[i].id
		}
	}
	console.log(userid)
	if(userid){
		req.session.user.username = req.body.username;
		res.status(200).json(req.session.user)
	}
	else{
		res.status(500).send("check your login info and try again")
	}
}

const register = (req,res,next) => {
	users.push({id,username:req.body.username,password:req.body.password})
	console.log(users)
	id++
	req.session.user.username = req.body.username
	res.status(200).send(req.session.user)
}

const signout = (req,res,next) => {
	req.session.destroy()
	res.send(req.session)
}

const getUser = (req,res,next) => {
	res.status(200).json(req.session.user)
}

module.exports={
	login,
	register,
	signout,
	getUser
}