INSERT INTO users 
(username)
VALUES (${username})
RETURNING id;