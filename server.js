// server.js

const express = require('express');
const { getCompanyInfo } = require('./utils/db');

//const app = express();
//const port = 3000;

app.use(express.static('public'));

app.get('/api/company-info', async (req, res) => {
    try {
        const companyInfo = await getCompanyInfo();
        res.json(companyInfo);
    } catch (error) {
        console.error('Error retrieving company info:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});