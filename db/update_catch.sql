update catch
set date=$3, tod=$4, water_name=$5, water_type=$6, us_state=$7, temperature=$8, weather=$9, image_url=$10, 
length=$11, species=$12, fish_type=$13, size=$14, fly=$15, fly_type=$16, color=$17, details=$18
where user_id=$2 and catch_id=$1;

select * from catch
where user_id = $2
order by date asc; 