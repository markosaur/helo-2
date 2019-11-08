SELECT p.title, p.img, p.content, u.username, u.profile_pic
FROM posts p
JOIN users u ON p.author_id = u.users_id
WHERE p.id = $1