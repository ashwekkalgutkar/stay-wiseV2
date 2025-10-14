import { Router } from 'express';
import { listProperties, getProperty, createProperty } from '../controllers/propertyController.js';
import { authenticateJWT } from '../middleware/auth.js';
const router = Router();
router.get('/', listProperties);
router.get('/:id', getProperty);
router.post('/', authenticateJWT, createProperty);
export default router;
//# sourceMappingURL=property.js.map