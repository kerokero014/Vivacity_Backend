import express from 'express';
const router = express.Router();

import * as user from '../controllers/personalController';

router.get('/:id', user.getUser); // /awesome/applicant/:id
router.get('/', user.getUsers); // /awesome/applicant
router.post('/', user.createUser); // /awesome/applicant
router.put('/:id', user.updateUser); // /awesome/applicant/:id
router.delete('/:id', user.deleteUser); // /awesome/applicant/:id

export default router;





  