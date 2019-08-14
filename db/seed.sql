create table users(
	user_id serial primary key,
	first_name varchar(200) not null,
	last_name varchar(200) not null,
	email varchar(200) not null,
	hash varchar
)

create table catch(
  catch_id serial primary key,
  user_id int references users(user_id),
  location varchar(200),
  river varchar(200),
  species varchar(200),
  fly varchar(200),
  wheather varchar(200),
  image text,
  date varchar(10),
  tod varchar
)