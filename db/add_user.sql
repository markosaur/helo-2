INSERT INTO users 
(username, profile_pic)
VALUES 
(${username}, 'https://robohash.org/new')
RETURNING users_id, username, profile_pic ;