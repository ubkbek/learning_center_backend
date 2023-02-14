-- 1 - student
-- 2 - teacher
-- 3 - admin



    INSERT INTO users(user_name, user_password, user_phone, user_status)
    VALUES('ulugbek', 'ulugbek123', '883880118', 3);


-- COURSES
DROP TABLE IF EXISTS courses;
CREATE TABLE courses(
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(64) NOT NULL,
    price VARCHAR(64) NOT NULL
);
INSERT INTO courses(title, price) VALUES('Web standart', '800000');
INSERT INTO courses(title, price) VALUES('Android', '900000');
INSERT INTO courses(title, price) VALUES('Smm', '1300000');
INSERT INTO courses(title, price) VALUES('Grafik dizayn', '700000');
-- ------------------------------------------------------------------------------------------------------------------------

-- GROUPS
DROP TABLE IF EXISTS groups;
CREATE TABLE groups(
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(64) NOT NULL,
    teacher_id INT,
    course_id INT,
    FOREIGN KEY(teacher_id)
    REFERENCES users(user_id)
    ON DELETE SET NULL,
    FOREIGN KEY(course_id)
    REFERENCES courses(id)
    ON DELETE SET NULL
);

SELECT
    g.id,
    g.title,
    c.title
FROM
    groups g
INNER JOIN
    users u
ON
    g.teacher_id = u.user_id
INNER JOIN
    courses c
ON
    c.id = g.course_id
WHERE
    user_id = 16;


SELECT
    g.id AS id,
    g.title AS groups,
    u.user_name AS teacher,
    u.user_phone AS phone,
    c.title AS course,
    c.price AS price
FROM
    groups g
INNER JOIN
    users u
ON
    g.teacher_id = u.user_id
INNER JOIN
    courses c
ON
    g.course_id = c.id
ORDER BY g.title;

---------------------------------------------------------------------------------------------------------------------------------------------

-- HOMEWORKS
DROP TABLE IF EXISTS homeworks;
CREATE TABLE homeworks(
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(64) NOT NULL,
    content TEXT NOT NULL,
    group_id INT,
    FOREIGN KEY(group_id) REFERENCES groups(id) ON DELETE CASCADE
);



-- INSERT INTO homeworks(title, content, group_id) VALUES('homework1', '1-darsda otilganlarni takrorlab kelish', '940eed8b-182f-46a8-89bb-2a293c69832c');
-- INSERT INTO homeworks(title, content, group_id) VALUES('homework2', '2-darsda otilganlarni takrorlab kelish', '940eed8b-182f-46a8-89bb-2a293c69832c');
-- INSERT INTO homeworks(title, content, group_id) VALUES('homework3', '3-darsda otilganlarni takrorlab kelish', '940eed8b-182f-46a8-89bb-2a293c69832c');
-- INSERT INTO homeworks(title, content, group_id) VALUES('pgcrypto', 'pgCrypto ni organib kelish crud', 'c5f01fd2-7390-4b86-988b-97ef35cf79dd');
-- INSERT INTO homeworks(title, content, group_id) VALUES('Postgressda CRUD', 'crud hosil qilish', 'c5f01fd2-7390-4b86-988b-97ef35cf79dd');
-- INSERT INTO homeworks(title, content, group_id) VALUES('css', 'Trafalgar maketini bitirb kelish', 'c5f01fd2-7390-4b86-988b-97ef35cf79dd');
-- INSERT INTO homeworks(title, content, group_id) VALUES('homework1', 'takrorlash', 'ae565d89-85ad-48d1-8e04-10775901702a');
----------------------------------------------------------------------------------------------------------------------------------------------------

-- users
DROP TABLE IF EXISTS users;
CREATE TABLE users(
    user_id SERIAL NOT NULL PRIMARY KEY,
    user_name VARCHAR(64) NOT NULL,
    user_password VARCHAR(256) NOT NULL,
    user_phone VARCHAR(16) NOT NULL,
    user_status INT  DEFAULT 1,
    course_id INT,
    FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE,
    user_created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO users(user_name, user_password, user_phone, user_status)
VALUES('ulugbek', 'ulugbek123', '998-88-388-01-18', 3);

SELECT
    u.user_id as id,
    u.user_name as name,
    u.user_password as password,
    u.user_phone as phone,
    u.user_created_at as created_at,
    g.title as group
FROM
    users u
INNER JOIN
    student_groups sg
ON
    u.user_id = sg.student_id
INNER JOIN
    groups g
ON
    sg.group_id = g.id
WHERE user_status = 1;

-- INSERT INTO users(user_name, user_password, user_phone, user_status) VALUES('ulugbek', '1', '883880118', 3);
-- INSERT INTO users(user_name, user_password, user_phone, user_status, course_id) VALUES('jamoliddin', '1', '943243213', 2, 'cd99b7fe-788e-4e29-b072-3a38e1b2e6a2');
-- INSERT INTO users(user_name, user_password, user_phone, user_status, course_id) VALUES('Rustam', '1', '883880118', 2, 'cd99b7fe-788e-4e29-b072-3a38e1b2e6a2');
-- INSERT INTO users(user_name, user_password, user_phone) VALUES('jamol', '1', '883880118');
-- INSERT INTO users(user_name, user_password, user_phone) VALUES('amirshoh', '1', '883880118');
-- INSERT INTO users(user_name, user_password, user_phone) VALUES('sagindiq', '1', '883880118');
------------------------------------------------------------------------------------------------------------------------------------------------------

DROP TABLE IF EXISTS student_groups;
CREATE TABLE student_groups(
    student_group_id SERIAL NOT NULL PRIMARY KEY,
    student_id INT,
    group_id INT,
    FOREIGN KEY(student_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE,
    FOREIGN KEY(group_id)
    REFERENCES groups(id)
    on DELETE CASCADE
);

-- INSERT INTO student_groups(student_id, group_id) VALUES('803adef7-6066-46b1-bcd7-b2755c476233', '940eed8b-182f-46a8-89bb-2a293c69832c');
-- INSERT INTO student_groups(student_id, group_id) VALUES('803adef7-6066-46b1-bcd7-b2755c476233', 'c5f01fd2-7390-4b86-988b-97ef35cf79dd');
-- INSERT INTO student_groups(student_id, group_id) VALUES('f67c20a6-91a3-49e6-bf8c-56d97356f7c2', '940eed8b-182f-46a8-89bb-2a293c69832c');
-- INSERT INTO student_groups(student_id, group_id) VALUES('f67c20a6-91a3-49e6-bf8c-56d97356f7c2', 'ae565d89-85ad-48d1-8e04-10775901702a');
-- INSERT INTO student_groups(student_id, group_id) VALUES('ca4aa1e7-aee9-4eb4-8a03-e7ba6cd3e973', 'ae565d89-85ad-48d1-8e04-10775901702a');


select
    u.user_id as id,
    g.title,
    g.id as group_id
from
    student_groups sg
JOIN
    users u
ON
    sg.student_id = u.user_id
JOIN
    groups g
ON
    sg.group_id = g.id
where
    u.user_id = 100;