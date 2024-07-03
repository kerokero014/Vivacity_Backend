import express from 'express';
const router = express.Router();

import userRoutes from './userRoute';

router.use('/applicant', userRoutes);

export default router;
