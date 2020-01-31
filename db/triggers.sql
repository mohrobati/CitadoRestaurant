delimiter $$
create trigger after_MenuItem_insert after insert 
    on MenuItem for each row
        begin
            insert into Logs(type, log, mod_table)
            values ('insert', new.id, 'MenuItem');
        end; 

create trigger after_MenuItem_update after update
    on MenuItem for each row
        begin
            insert into Logs(type, log, mod_table)
            values ('update', old.id, 'MenuItem');
        end; 

create trigger after_MenuItem_delete after delete
    on MenuItem for each row
        begin
            insert into Logs(type, log, mod_table)
            values ('delete', old.id, 'MenuItem');
        end; 

create trigger after_Customer_insert after insert 
    on Customer for each row
        begin
            insert into Logs(type, log, mod_table)
            values ('insert', new.code, 'Customer');
        end;

create trigger after_Customer_update after update
    on Customer for each row
        begin
            insert into Logs(type, log, mod_table)
            values ('update', old.code, 'Customer');
        end; 

create trigger after_Customer_delete after delete
    on Customer for each row
        begin
            insert into Logs(type, log, mod_table)
            values ('delete', old.code, 'Customer');
        end; 

create trigger after_Address_insert after insert 
    on Address for each row
        begin
            insert into Logs(type, log, mod_table)
            values ('insert', new.content, 'Address');
        end;

create trigger after_Address_update after update
    on Address for each row
        begin
            insert into Logs(type, log, mod_table)
            values ('update', old.content, 'Address');
        end; 

create trigger after_Address_delete after delete
    on Address for each row
        begin
            insert into Logs(type, log, mod_table)
            values ('delete', old.content, 'Address');
        end; 

create trigger after_Delivery_insert after insert 
    on Delivery for each row
        begin
            insert into Logs(type, log, mod_table)
            values ('insert', new.code, 'Delivery');
        end;

create trigger after_Delivery_update after update
    on Delivery for each row
        begin
            insert into Logs(type, log, mod_table)
            values ('update', old.code, 'Delivery');
        end; 

create trigger after_Delivery_delete after delete
    on Delivery for each row
        begin
            insert into Logs(type, log, mod_table)
            values ('delete', old.code, 'Delivery');
        end; 

create trigger after_Store_insert after insert 
    on Store for each row
        begin
            insert into Logs(type, log, mod_table)
            values ('insert', new.id, 'Store');
        end;

create trigger after_Store_update after update
    on Store for each row
        begin
            insert into Logs(type, log, mod_table)
            values ('update', old.id, 'Store');
        end; 

create trigger after_Store_delete after delete
    on Store for each row
        begin
            insert into Logs(type, log, mod_table)
            values ('delete', old.id, 'Store');
        end; 

create trigger after_GoodsItem_insert after insert 
    on GoodsItem for each row
        begin
            insert into Logs(type, log, mod_table)
            values ('insert', new.id, 'GoodsItem');
        end;

create trigger after_GoodsItem_update after update
    on GoodsItem for each row
        begin
            insert into Logs(type, log, mod_table)
            values ('update', old.id, 'GoodsItem');
        end; 

create trigger after_GoodsItem_delete after delete
    on GoodsItem for each row
        begin
            insert into Logs(type, log, mod_table)
            values ('delete', old.id, 'GoodsItem');
        end; 

create trigger after_StoreOrder_insert after insert 
    on StoreOrder for each row
        begin
            insert into Logs(type, log, mod_table)
            values ('insert', new.id, 'StoreOrder');
        end;

create trigger after_StoreOrder_update after update
    on StoreOrder for each row
        begin
            insert into Logs(type, log, mod_table)
            values ('update', old.id, 'StoreOrder');
        end; 

create trigger after_StoreOrder_delete after delete
    on StoreOrder for each row
        begin
            insert into Logs(type, log, mod_table)
            values ('delete', old.id, 'StoreOrder');
        end;

create trigger after_CustomerOrder_insert after insert 
    on CustomerOrder for each row
        begin
            insert into Logs(type, log, mod_table)
            values ('insert', new.id, 'CustomerOrder');
        end;

create trigger after_CustomerOrder_update after update
    on CustomerOrder for each row
        begin
            insert into Logs(type, log, mod_table)
            values ('update', old.id, 'CustomerOrder');
        end; 

create trigger after_CustomerOrder_delete after delete
    on CustomerOrder for each row
        begin
            insert into Logs(type, log, mod_table)
            values ('delete', old.id, 'CustomerOrder');
        end; $$

delimiter ;

delimiter $$
create procedure delete_old_log()
    begin
        DELETE FROM Logs WHERE TIMEDIFF(NOW(), Logs.date) > '72:00:00';
    end; $$
delimiter ;
