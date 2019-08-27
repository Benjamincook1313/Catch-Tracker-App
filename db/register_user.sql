insert into users(state, firstname, lastname,, user_name, email, hash)
values($1, $2, $3, $4, $5, $6)
returning *;