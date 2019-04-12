const {User} = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = async(req, res)=>{
    let user = await User.findOne( {email: req.body.email} )
    if(!user) return res.status(400).send('Invalid email or password')
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password');

    req.session.userId = user._id;
    res.redirect('/');

  
}