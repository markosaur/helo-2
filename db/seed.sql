-- Users Table creation
create table users (
users_id serial primary key,
username varchar(20),
password varchar(20),
profile_pic text
);

select * from users;

-- Posts table creation
create table posts (
id serial primary key,
title varchar(45),
img text,
content text,
author_id integer references users(id)
);

select * from posts;


insert into posts
(title, img, content, author_id)
values
('hello', 'https://images.app.goo.gl/a7ExWUoqhUqWffpu8', 'cinnamon rolls', 51 );

select * from posts p
join users u on u.users_id = p.author_id
where u.users_id = 51;