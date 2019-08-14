insert into users(firstname, lastname, email, hash)
values($1, $2, $3, $4)
returning *;