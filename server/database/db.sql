create database appmessenger;
use appmessenger;

create table user(
user_id bigint not null auto_increment,
user_name varchar(45) not null,
user_email varchar(45) not null,
user_password varchar(45) not null,
user_image varchar(45) not null,
constraint user_pk primary key (user_id));

create table messages (
message_id bigint(11) not null auto_increment,
message_body varchar(500) not null,
message_id_user bigint not null,
message_date datetime not null,
constraint message_pk primary key (message_id),
constraint message_user foreign key (message_id_user) references user (user_id));
