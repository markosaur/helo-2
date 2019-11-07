select * from posts p
join users u on u.users_id = p.author_id
where u.users_id = $(id);
