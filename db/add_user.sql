INSERT INTO users 
(username, profile_pic)
VALUES 
(${username}, ${profile_pic})
RETURNING users_id, username, profile_pic ;