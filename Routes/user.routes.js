const router =require('express').Router();
const { login_User,add_membre,add_office_member,delete_membre }=require('../Controllers/user.controller');

router.post('/login_User',login_User)
router.post('/add_membre',add_membre)
router.post('/add_office_member',add_office_member)
router.delete('/delete_membre',delete_membre)
module.exports = router