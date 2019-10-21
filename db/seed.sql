create table users(
  user_id serial primary key,
	state varchar not null,
	user_name varchar not null, 
	email varchar not null,
	hash varchar not null
)

create table catch(
  catch_id serial,
  user_id int references users(user_id), 
  date varchar,
  tod varchar, 
  water_name varchar,
  water_type varchar,
  us_state varchar,
  temperature varchar,
  weather varchar,
  image_url text,
  length varchar,
  species varchar,
  fish_type varchar,
  size varchar,
  color varchar,
  fly varchar,
  fly_type varchar,
  details varchar
)