const bcrypt = require('bcryptjs')

module.exports = { 
    async register(req, res) {
        const db = req.app.get('db')
        const {username, password} = req.body
        console.log(username, password)

        //check to see if the user has already registered a username
        const user = await db.find_username(username)
        console.log(user)
        // if the username is already registered, stop the function
        if(user[0]){
            return res.status(200).send({message: 'Username is already in use, please try again'})
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        //Store the new user in the database
        const userId = await db.add_user({ username })
        console.log('hello')
        db.add_hash({users_id:userId[0].users_id, hash}).catch(err => {
            console.log(err)
            return res.sendStatus(503)
        })

        //store the new user in sessions
        req.session.user = {
            username,
            userId: userId[0].users_id
        }
        console.log(req.session.user)
        res.status(201).send({message: 'Welcome', user: req.session.user, loggedIn: true})

    },



    logout(req, res) {
      req.session.destroy()
      console.log(req.session.user)
      res.status(200).send({message: 'Logged out', loggedIn: false})
  }
  }