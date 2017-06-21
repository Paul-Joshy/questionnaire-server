var mongoose = require('mongoose');

var sectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name cannot be left blank"
    },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'sections' }],
    hasChildren: Boolean
});

module.exports = mongoose.model('section', sectionSchema);
