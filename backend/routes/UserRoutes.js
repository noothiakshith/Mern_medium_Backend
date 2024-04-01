const express = require('express');
export const router = express();

router.post('/api/v1/user/signup',signup);
router.post('/api/v1/user/signin',signin);