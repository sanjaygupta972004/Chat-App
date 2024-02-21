import {Router} from 'express';

const router = Router();

import { createMessage, getAllMessages } from '../controllers/message.controller.js';

import {jwtVerify} from '../middleware/auth.middleware.js';

router.use(jwtVerify);

router.route('/getAllMessages/c/:chatId').get(getAllMessages)

router.route('/createMessage/c/:chatId').post(createMessage)
 


export default router;