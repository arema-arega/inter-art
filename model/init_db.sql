--
-- Drop Tables
--  CREATE DATABASE music;

SET foreign_key_checks = 0;
DROP TABLE if exists music;
SET foreign_key_checks = 1;

--
-- Create Tables 
--
CREATE TABLE songs(
    id INT NOT NULL AUTO_INCREMENT, 
    name VARCHAR (4000) not null, 
    size INT(255), PRIMARY KEY (id)
    );

INSERT INTO songs(name, size ) VALUES('Maria - Dana Hill', 20), ('Hold me - Eleonor',15), ('Donwn down - Nora Hagse',21);