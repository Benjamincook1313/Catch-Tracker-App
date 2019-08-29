create table users(
	state varchar(80) not null,
	user_name varchar(80) primary key, 
	email varchar(200) not null,
	hash varchar not null,
	friends varchar(80),
)

create table catch(
	user_name int references users(user_name),
	date varchar(20),
	time varchar(50),
	location varchar(100),
	weather varchar(50),
	fish varchar(100),
	fly varchar(100),
	comments varchar(250)
)