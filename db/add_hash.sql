CREATE TABLE users_login (
	user_login_id SERIAL PRIMARY KEY,
	user_id INT REFERENCES users(id),
	hash TEXT
);