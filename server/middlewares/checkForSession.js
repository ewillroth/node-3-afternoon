
const checkForSession = (req,res,next)=> {
	if (req.session.user) {
		next()
	}
	else {
		req.session.user = {username: '', cart: [], total: 0}
		next()
	}
}

module.exports={
	checkForSession
}