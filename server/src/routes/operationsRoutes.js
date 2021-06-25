import {Router} from 'express';
import operationsController from '../controllers/operationsController';
// import authToken from '../middlewares/authToken';

const router = Router();

router.get('/api', operationsController.index);

router.post('/api', operationsController.save);

// router.get('/api/filter', operationsController.filterOperation);

router.get('/api/:id', operationsController.find);

router.put('/api/:id', operationsController.edit);

router.delete('/api/:id', operationsController.destroy);

export default router;