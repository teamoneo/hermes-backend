import { Router } from 'express';

import attendancesRoutes from './attendances.routes';

const routes = Router();

routes.use('/attendances', attendancesRoutes);

export default routes;
