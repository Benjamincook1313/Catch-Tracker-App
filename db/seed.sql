create table users(
	state varchar(80) not null,
	user_name varchar(80) primary key, 
	email varchar(200) not null,
	hash varchar not null,
	friends varchar(80),
)

create table catch(
  catch_id serial,
  user_name varchar references users(user_name), 
  date varchar(20),
  tod varchar(50), 
  water_name varchar(150),
  water_type varchar(50),
  state varchar(100),
  temperature varchar(50),
  weather varchar(50),
  image_name varchar,
  length varchar(10),
  species varchar(100),
  fish_type varchar(50),
  size varchar(5),
  fly varchar(100),
  fly_type varchar(50),
  comments varchar(350)
)