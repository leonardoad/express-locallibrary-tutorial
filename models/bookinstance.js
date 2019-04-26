var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

const status = ['Available', 'Maintenance', 'Loaned', 'Reserved'];

var BookInstanceSchema = new Schema(
    {
        book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, //reference to the associated book
        imprint: { type: String, required: true },
        status: { type: String, required: true, enum: status, default: 'Maintenance' },
        due_back: { type: Date, default: Date.now }
    }
);

// Virtual for bookinstance's URL
BookInstanceSchema
    .virtual('url')
    .get(function () {
        return '/catalog/bookinstance/' + this._id;
    });
// Virtual for bookinstance's due_back
BookInstanceSchema
    .virtual('due_back_formatted')
    .get(function () {
        return moment(this.due_back).format('MMMM Do, YYYY');
    });

//Export model
module.exports.bookInstanceStatus = status;
module.exports.BookInstance = mongoose.model('BookInstance', BookInstanceSchema);
