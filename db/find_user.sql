select u.users_id, username, profile_pic, hash
from users u
join users_login ul on u.users_id = ul.users_id
where username = $1;