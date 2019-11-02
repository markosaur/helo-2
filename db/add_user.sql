INSERT INTO users 
(username)
VALUES 
(${username})
RETURNING users_id;