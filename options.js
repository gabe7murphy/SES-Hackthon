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
const data = {
    charity_name: "doctors w/o borders",
    amount: 500,
    tag: "health",
    date: "5/03/2021"
}
axios.post('http://localhost:9200/donations2/_doc',

    data, { headers: headers }
).then((response) => {
    console.log(response)
})
    .catch((error) => {
        console.log(error)
    })




/*
    elasticClient.index({
        index: 'logs', 
        body: {

            url: req.url, 
            method: req.method,
        }
    })
    .then(res=>{
        console.log('Logs indexed') 
    })
    .catch(err=>{
        console.log(err)
    })
    next(); 
*/

/*
elasticClient.index({
    index: 'donations2',
    body: {
        charity_name: "doctors w/o borders",
        amount: 500,
        tag: "health",
        date: "5/03/2021"
    }
})
*/