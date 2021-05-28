const express = require('express');
const router = express.Router();
const axios = require('axios');
const elastic = require('elasticsearch');
const bodyParser = require('body-parser').json();
const elasticClient = elastic.Client({
    host: 'localhost:5601',
});

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Q3Uzd3Jua0JXZkFhN3lpc2xMMkw6emxWOGNhZUFUSXU4eW5zaEkzVnF3QQ'
}
