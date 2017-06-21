var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    section_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sections',
        required: "Question needs a section ID"
    },
    text: {
        type: String,
        required: "Question needs a text"
    },
    type: {
        type: String,
        enum: ['radio', 'checkBox', 'textArea'],
        required: "Question type needed"
    },
    options: [{
        type: String,
        trim: true
    }]
});

module.exports = mongoose.model('questions', questionSchema);
