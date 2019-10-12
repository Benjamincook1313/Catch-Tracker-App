create table users(
	state varchar not null,
	user_name varchar primary key, 
	email varchar not null,
	hash varchar not null,
	friends varchar,
)

create table catch(
  catch_id serial,
  user_name varchar references users(user_name), 
  date varchar,
  tod varchar, 
  water_name varchar,
  water_type varchar,
  us_state varchar,
  temperature varchar,
  weather varchar,
  image_name text,
  length varchar,
  species varchar,
  fish_type varchar,
  size varchar,
  color varchar,
  fly varchar,
  fly_type varchar,
  details varchar
)