delete from catch
where catch_id = $1;

select * from catch
where user_name = $2;