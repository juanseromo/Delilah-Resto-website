const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const publicKey = fs.readFileSync('./public/public.key','utf8')


function autenticarUsuario (req, res, next) {
    try {
     const token = req.cookies.jwtTok
     const admin = req.cookies.adm
  
     if (typeof token !== 'undefined') {
       if (admin === 'admin') {
         jwt.verify(token, publicKey, { expiresIn: '10', algorithm:  ["RS256"]  }, function(err, decoded){ 
           return decoded
         })
         next()
       }
       else {
         res.send('sitio web visible solo para admins')
       }
     } else {
       res.send('No ha podido ser autorizado, no hay tokens existentes')
     }   
   } catch (err) {
     console.log(err)
     res.status(404).json({err, error: 'usuario no autorizado'})
   }
  }

module.exports = exports = autenticarUsuario
  //module.exports = autenticarUsuario;
   