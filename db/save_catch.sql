insert into catch(
  user_name, date, tod, water_name, water_type, 
  state, temperature, weather, image_name, length, 
  species, fish_type, size, fly, fly_type, comments
)
values($1, $2, $3, $4, $5, $6, $7, $8, $9, 
  $10, $11, $12, $13, $14, $15, $16
);