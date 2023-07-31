--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists items;
SET foreign_key_checks = 1;

--
-- Create Tables
--
CREATE TABLE items(
    id INT NOT NULL AUTO_INCREMENT, 
    text VARCHAR(40) not null, 
    complete BOOLEAN, PRIMARY KEY (id)
    );

INSERT INTO items(text, complete) VALUES('cleaning',false), ('painting',false), ('cooking',false), ('washing',false), ('studying',false), ('playing music',false), ('training',false) ;