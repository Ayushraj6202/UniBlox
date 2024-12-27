import express from 'express'
import getStatics from '../controllers/admin.js';

const adminrouter = express.Router();

adminrouter.get('/get-stats',getStatics);

export default adminrouter;