const bcrypt = require('bcryptjs')

module.exports = {
    async register(req, res) {
        const db = req.app.get('db')
        const {username, password} = req.body

        //check to see if the user has already registered
        const user = await db.find_username(username)
        // if the username exists, stop the function
        if (user[0])
            return res.status(200).send({message: 'Username is already in use'})
            
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        // const userId = await db.add_user({ email, name })
        // db.add_hash({ user_id: userId[0].user_id, hash }).catch(err => {
        //   return res.sendStatus(503)
        })
}
}