CREATE DATABASE project1;
\c project1;
CREATE USER user1 WITH PASSWORD 'password1';
GRANT ALL PRIVILEGES ON DATABASE "project1" to user1;
GRANT ALL ON SCHEMA public TO user1;
CREATE extension hstore;