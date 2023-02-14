const express = require('express')
const router = express.Router()
const LoginController = require('./login/login')
const CourseController = require('./courses/courses')
const UsersController = require('./users/users')
const GroupController = require('./groups/groups')
const StudentGroupController = require('./student-groups/student-group')
const HomeWorkController = require('./home-works/homeWorks')
const userMiddlewares = require('../middlewares/usersMiddlewares')
const courseMiddlewares = require('../middlewares/courseMiddlewares')
const GroupMiddlewares = require('../middlewares/groupsMiddlewares')
const groupsMiddlewares = require('../middlewares/groupsMiddlewares')
const verify = require('../middlewares/verify')
// const verifyAccess = require('../middlewares/verify-access')

router
    .post('/login', LoginController.LOGIN)
    .get('/students', UsersController.GET_STUDENTS)
    .get('/courses', CourseController.GET)
    .get('/teachers', UsersController.GET_TEACHERS)
    .get('/courseTeachers/:course_id', UsersController.GET_COURSE_TEACHERS)
    .get('/groups', GroupController.GET)
    .get('/teacherGroups', verify.verify_token, UsersController.TEACHER_GROUPS)
    .get('/studentGroups', verify.verify_token, GroupController.STUDENT_GROUPS)
    .get('/groupHomeworks/:group_id', HomeWorkController.GROUP_HOMEWORKS)
    .post('/users', userMiddlewares.addStudent, UsersController.POST_STUDENT)
    .post('/courses', courseMiddlewares.coursePost, CourseController.POST)
    .post('/teachers', userMiddlewares.addTeacher, UsersController.POST_TEACHER)
    .post('/groups', groupsMiddlewares.verify, GroupController.POST)
    .post('/studentGroups', StudentGroupController.POST_STUDENT_GROUP)
    .post('/homeworks', HomeWorkController.POST)
    .delete('/courses/:id', CourseController.DELETE)
    .put('/courses/:id', CourseController.UPDATE)

module.exports = router