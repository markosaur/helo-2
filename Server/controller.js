const bcrypt = require('bcryptjs')

module.exports = { 
    async register(req, res) {
        const db = req.app.get('db')
        const {username, password} = req.body
        console.log(username, password)

        //check to see if the user has already registered a username
        const user = await db.find_username(username)
        // console.log(user)
        // if the username is already registered, stop the function
        if(user[0]){
            return res.status(200).send({message: 'Username is already in use, please try again'})
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        //Store the new user in the database
        const profile_pic = `https://robohash.org/${username}`
        const userId = await db.add_user({ username, profile_pic })
        // console.log(userId)
        db.add_hash({users_id:userId[0].users_id, hash}).catch(err => {
            console.log(err)
            return res.sendStatus(503)
        })

        //store the new user in sessions
        req.session.user = {
            id: userId[0].users_id,
            username,
            profile_pic: userId[0].profile_pic
        }
        console.log(req.session.user)
        res.status(201).send({message: 'Welcome', user: req.session.user, loggedIn: true})

    },

    async login(req, res) {
      const db = req.app.get('db')
      const {username, password} = req.body

      //check to see if username exists
      const user = await db.find_user(username)
      if(!user[0]){
        return res.status(200).send({message: 'username not found'})        
      }
      // compare the password with the hash in the db
      const result = bcrypt.compareSync(password, user[0].hash)
      if(!result) return res.status(200).send({message: 'Incorrect Password'})
      //if they do match, add user to sessions
      //decontruct the username and the users_id from user[0]
      const {users_id: userId, profile_pic} = user[0]
      //we are then going to use these deconstructed values to add them to req.session.user
      req.session.user = {id:userId, username, profile_pic}
      console.log(req.session.user)
      //now to send it back to the front end
      res.status(200)
      .send({message: 'Logged In', user: req.session.user, loggedIn: true})

    },

    logout(req, res) {
      req.session.destroy()
      // console.log(req.session.user)
      res.status(200)
      .send({message: 'Logged out'})
  },

  myposts: async (req, res) => {
    const db = await req.app.get('db')
    const {id} = req.params
    // console.log(req.params)
    const posts = await db.get_my_posts({id})

    if(posts){
      res.status(200).send(posts)
    }else {
      res.status(404).send('posts not found')
    }   
  },

  new: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    const author_id = id
    console.log(author_id)
    // const new = await.
    const {title, img, content} = req.body
    console.log(title, img, content)
    db.add_post({title, img, content, author_id})
    .then(result=> {
      res.status(200).send(result)
    })
    .catch(err=>{
      res.status(500).send("This did not add the post")
      console.log(err)
    })
  }
  }