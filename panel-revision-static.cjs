'use strict';
const express=require('express');
const path=require('node:path');
const router=express.Router();
const files=new Map([['/',['index.html','text/html; charset=utf-8']],['/index.html',['index.html','text/html; charset=utf-8']],['/panel.js',['panel.js','text/javascript; charset=utf-8']],['/panel.css',['panel.css','text/css; charset=utf-8']]]);
for(const [route,name,type] of [['/conciliacion.html','conciliacion.html','text/html; charset=utf-8'],['/conciliacion.js','conciliacion.js','text/javascript; charset=utf-8'],['/conciliacion.css','conciliacion.css','text/css; charset=utf-8']])files.set(route,[name,type]);
const csp="default-src 'none'; script-src 'self'; style-src 'self'; connect-src https://kblrsjznbqjpexvrlwht.supabase.co; img-src 'none'; form-action 'none'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'";
router.use((req,res)=>{
 res.set({'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','X-Frame-Options':'DENY','Referrer-Policy':'no-referrer','Content-Security-Policy':csp});
 if(!['GET','HEAD'].includes(req.method))return res.sendStatus(405);
 if(req.originalUrl==='/revision')return res.redirect(308,'/revision/');
 const file=files.get(req.path);if(!file)return res.sendStatus(404);
 res.set('Content-Type',file[1]);return res.sendFile(path.join(__dirname,'panel-revision',file[0]),{cacheControl:false,dotfiles:'deny'});
});
module.exports=router;
