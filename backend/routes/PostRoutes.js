const express = require('express');
 const router = express();

router.post('/api/v1/blog',create);
router.put('/api/v1/blog',update);
router.get('/api/v11/blog/:id',reaad);
router.get('/ai/v1/blog/bulk',readall);
export default router;