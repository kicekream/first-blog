const {User} = require('../models/user')
module.exports = async function auth(req, res, next) {
    const user = await User.findById(req.session.userId);
    try{
        if(!user) {return res.redirect('/')};
        next();
    }
    catch(err) {
        console.log(err);
    }
};