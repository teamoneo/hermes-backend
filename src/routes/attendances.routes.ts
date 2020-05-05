import { Router } from 'express';

import ValidateUrl from '../middlewares/validateURL';

const AttendancesController = require('../controller/attendances');

const attendancesRoutes = Router();

attendancesRoutes.post('/', ValidateUrl, AttendancesController.getResponse);

export default attendancesRoutes;
