var mongoose = require('mongoose');

//User Schema
var NoteSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    }
});

var Note = module.exports = mongoose.model('Note', NoteSchema);

module.exports.createNote = function(newNote, callback){
    newNote.save(callback);
};

module.exports.updateNote = function(id,notedata, callback){
    Note.findById(id, function (err, note) {
        if (err) return handleError(err);

        note.name = notedata.name;
        note.email = notedata.email;
        note.address = notedata.address;
        note.save(callback);
    });
    ///notedata.update({ _id: id },callback);
};

module.exports.getNotes = function(callback){
    Note.find(callback).sort( { _id: -1 } );
};

module.exports.deleteNoteById = function(note, callback){
	note.remove(callback);
};

module.exports.getNoteById = function(id, callback){
    Note.findById(id,callback);
};
