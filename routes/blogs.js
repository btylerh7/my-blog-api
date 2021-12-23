const express = require('express')
const router = express.Router()
const cors = require('cors')
const Blog = require('../models/blog')
const marked = require('marked')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const domPurify = createDomPurify(new JSDOM().window)

router.use(cors())

router.get('/', (req, res) => {
    Blog.find()
        .then(result => {
            res.json(result)
        })
})

router.get('/:id', (req, res) => {
    Blog.findById(req.params.id)
        .then(response => {
            return res.json(response)
        })
        .catch(err => {
            console.log(err)
            return {"error": "something went wrong"}
        })
})


router.post('/', (req,res) => {
    let blog = new Blog(req.body)
    blog.save()
        .then(result => {
            res.send(result)
        })
        .catch(err => {console.log(err)})
})


router.post('/update/:id',(req,res) => {
    const blog = new Blog({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        body: req.body.body,
        sanitizedHtml: domPurify.sanitize(marked.parse(req.body.body))
    })

    Blog.updateOne({ _id:req.params.id }, blog)
        .then(result => {
            res.send(result)
        })

})




router.delete('/:id', (req, res) => {
    Blog.deleteOne({ _id: req.params.id })
        .then(result => {
            res.redirect('/blogs')
        })
})

module.exports = router