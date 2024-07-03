import express from 'express';
const router = express.Router();

import awesomeRouter from './awesome';

router.use('/awesome', awesomeRouter);

//swagger
router.use('/', require('./swagger'));


export default router;
