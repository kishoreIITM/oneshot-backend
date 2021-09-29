var express = require('express');
var router = express.Router();
const colleges = require('../models/college');
const students = require('../models/students');


router.route('/:college/:id')
.get((req,res,next)=>{
  colleges.findOne({id:req.params.college})
        .then(college=>{
          if (college==null){
            res.json({students:null,collegeid:null})
          }
          else{
            students.findOne({id:req.params.id,college:college.name})
        .then(student=>{
          res.json({students:student,collegeid:college.id})
        })
          }
          
        })
})



module.exports = router;