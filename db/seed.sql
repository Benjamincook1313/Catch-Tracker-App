create table users(
	user_id serial primary key,
	first_name varchar(200),
	last_name varchar(200),
	state varchar(80) not null,
	email varchar(200) not null,
	user_name varchar(80) not null, 
	hash varchar not null,
	friends varchar(80),
)

create table catch(
	user_id int references users(user_id),
	catch_id serial primary key,
	date varchar(20),
	time varchar(50),
	location varchar(100),
	weather varchar(50),
	fish varchar(100),
	fly varchar(100),
	comments varchar(250)
)