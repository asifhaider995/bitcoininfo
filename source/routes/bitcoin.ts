import express from 'express';
import controller from '../controllers/bitcoin';
const router = express.Router();

router.get('/getbitcoininfo', controller.getBitCoinInfo);

export = router;