var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

let title = "titolo";
/* GET home page. */
router.get('/:percorso', function(req, res, next) {
    let comments = require ('../models/comments.js');
    let users = require ('../models/user.js')
    comments.find({id: req.params.percorso}, function(err, comment){// tutti i percorsi
        if (err){console.log(err);}
        else{
            var comms = [];
            var load = new Promise((resolve, reject) =>{
                if (comment.length == 0){ // se non ho commenti, skippo subito
                    resolve();
                }
                comment.forEach(comm => {
                    users.find({_id : comm.author}, function(err, user){
                        let com = {};
                        com['_id'] = comm._id
                        com['id'] = comm.id;
                        com['body']= comm.body;
                        com['author'] = comm.author;
                        com['username'] = user[0].username;
                        com['date'] = comm.date;
                        comms.push(com);
                        if (comms.length == comment.length) {
                            resolve();
                            console.log(comms)
                            console.log("solved"+com.body)
                        }
                    });
                })
            })
            load.then(()=>{ // uso promise per aspettare che vengano caricati i dati dell'username sui commenti
                console.log(comms)
                res.render('percorso', {
                    title : title,
                    percorso: req.params.percorso,
                    comment: comms
                });
            })
        }
    })

  });

router.post('/:percorso', ensureAuthenticated, function(req, res, next){
    console.log(req.body);
    let Comment = require ('../models/comments.js');
    let comment = new Comment();
    comment.id = req.params.percorso;
    comment.body = req.body.comment;
    comment.author = req.user.id;
    comment.date = Date.now();
    
    comment.save(function(err){
        if (err){
            console.log(err);
            return;
        }else{
            res.redirect('/percorso/'+req.params.percorso);
        }
    })
})

// access control per post dei commenti
function ensureAuthenticated (req,res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.redirect('/users/login');
    }
}

module.exports = router;