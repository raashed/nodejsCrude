var express = require('express');
var router = express.Router();
var Note = require('../models/note');

router.get('/', function (req, res) {
    Note.find({}, function(err, data) {
        if (err) throw err;
        res.render('user',{data:data});

    });
});

router.get('/one', function (req, res) {
    res.render('user_one');
});

router.get('/two', function (req, res) {
    res.render('user_two');
});

router.post('/userInsert',function (req,res) {
    var name = req.body.name;
    var email = req.body.email;
    var address = req.body.address;
    var newNote = new Note({
        name: name,
        email: email,
        address: address
    });
    Note.createNote(newNote, function (err, note) {
        if(err) throw err;
        res.redirect('/users');
    });
});

router.get('/edit/:_id', function (req, res) {
    Note.find({}, function(err, data) {
        if (err) throw err;
        Note.getNoteById(req.params._id,function (err,noteSingleData) {
            if (err) throw err;
            res.render('user',{data:data,noteSingleData:noteSingleData});

        });
    });
});

router.post('/update/:_id', function (req, res) {
    var id = req.params._id
    var name = req.body.name;
    var email = req.body.email;
    var address = req.body.address;

    var notedata = {
        name: name,
        email: email,
        address: address
    };

    Note.updateNote({_id:id},notedata, function (err, note) {
        if(err) throw err;
        res.redirect('/users/edit/'+id);
    });

});

router.get('/delete/:_id', function (req, res) {
    var note = new Note({
        _id: req.params._id
    });
    Note.deleteNoteById(note, function (err, note) {
        if(err) throw err;
        res.redirect('/users');
    });

});

module.exports = router;