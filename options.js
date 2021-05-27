const express = require('express');
const router = express.Router(); 
const elastic = require('elasticsearch'); 
const bodyParser = require('body-parser').json(); 
const elasticClient = elastic.Client({
    host: 'localhost:5601',
});
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
    elasticClient.index({
        index: 'donations2', 
        body: {
            charity_name: "doctors w/o borders", 
            amount: 500,
            tag: "health", 
            date: "5/03/2021"
        }
    })
