var express = require('express');
var router = express.Router();
const colleges = require('../models/college');
const students = require('../models/students');


router.route('/:id')
.get((req,res,next)=>{
  colleges.findOne({id:req.params.id})
  .then(college=>{
    if (college==null){
      res.json({college:null})
    }
    else{
      students.find({college:college.name})
      .then(students=>{
        
        colleges.find({state:college.state})
        .then((simstate)=>{
            if (simstate.length == 1){
              if (college.students){
                colleges.find({students:{$lte: college.students+500, $gte:college.students-500}})
              .then(simstud=>{
                if (simstud.lenght==1){
                  simstud=[]
                }
                res.json({college:college,students:students,simcollege:simstud})
              },err=>{
                console.log(err)
              })
              }
              else{

                res.json({college:college,students:students,simcollege:simstate})
              }
            }
            else{

              res.json({college:college,students:students,simcollege:simstate})
            }
            
        })
    })
    }
    
    
  })
})



module.exports = router;