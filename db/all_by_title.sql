SELECT p.id, p.title, p.content, p.img, p.author_id, u.username, u.profile_pic
FROM posts p
JOIN users u ON p.author_id = u.users_id
WHERE p.title = $1