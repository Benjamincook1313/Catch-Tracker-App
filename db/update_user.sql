update users
set user_name = $3, state = $2, email = $4
where user_id = $1;

select * 
from users
where user_id = $1;