-- user_id, day, tod, waterName, waterType, state, temp, 
-- weather, image, length, species, fishType, size, fly, flyType, color, details
insert into catch(
  user_id, date, tod, water_name, water_type, 
  us_state, temperature, weather, image_url, length, 
  species, fish_type, size, fly, fly_type, color, details
)
values(
  $1, $2, $3, $4, $5, $6, $7, $8, $9, 
  $10, $11, $12, $13, $14, $15, $16, $17
);

select * from catch
where user_id = $1
order by date asc;