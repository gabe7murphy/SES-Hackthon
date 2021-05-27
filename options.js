const express = require('express');
const router = express.Router(); 
const elastic = require('elasticsearch'); 
const bodyParser = require('body-parser').json(); 
const elasticClient = elastic.Client({
    host: 'localhost:5600',
});

router.use((req,res,next)=>{

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
});

router.post('/donations2/_doc', bodyParser, (req,res)=>{
    elasticClient.index({
        index: 'donations2', 
        body: {
            charity_name: "doctors w/o borders", 
            amount: 500,
            tag: "health", 
            date: "5/03/2021"
        }
    })
    .then(resp=>{
        return res.status(200).json({
            msg:'donation indexed'
        });
    })
    .catch(err=>{
        return res.status(500).json({
            msg: 'Error',
            err
        }); 
    }) 
});
