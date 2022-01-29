const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact')

const app = express();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/',function(req,res){

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home',{
            title:"My Contact List",
            contact_list : contacts
        });
    });
});

app.post('/create-contact',function(req,res){
    // contactList.push(req.body);
    // return res.redirect('/');
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){console.log('error in creating a contact!');
    return;}

    console.log('**********', newContact);
    return res.redirect('back');
    });
});

app.get('/delete-contact',function(req,res){
    let id = req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });
});

app.listen(port, function(err){
    if(err){console.log('Error in running the server', err);}

    console.log('Express Server is running on Port:', port);
});