select * from catch
where user_id = $1
order by date asc;