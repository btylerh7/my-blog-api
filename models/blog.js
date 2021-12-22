const mongoose = require('mongoose')
const marked = require('marked')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const domPurify = createDomPurify(new JSDOM().window)

const Schema = mongoose.Schema;
const postSchema = new Schema ({
    title: {type: String, required: true},
    description: {type: String, required: true},
    body: {type: String, required: true},
    sanitizedHtml: {type: String, required: true}
}, { timestamps: true})

postSchema.pre('validate', function(next) {
    if (this.body) {
        this.sanitizedHtml = domPurify.sanitize(marked.parse(this.body))
    }
    next()
})
const Blog = mongoose.model('Blog', postSchema)

module.exports = Blog