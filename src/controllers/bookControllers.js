const Book = require('../models/book')

exports.createNewBook = (req,res)=> {
    
    // create new book
    Book.create({
        ...req.body

    }, (err, newBook)=>{
        if(err) {
            return res.status(500).json({message:err})
        } else{
            return res.status(200).json({message:"New Book Created", newBook})
        }
    })
}

exports.fetchAllBooks = (req,res)=> {
    let conditions = {};
    if (req.query.category) {
        conditions.category = req.query.category
        }
    if (req.query.author) {
        conditions.author = req.query.author
    }
    if (req.query.title) {
        conditions.title = req.query.title
    }
    // check req.query for filters
    console.log(req.query)
    // use filters in model.find query
    Book.find(conditions, (err, books)=>{  //  mongoose methods = Model.find, Model.findOne, Model.findById
        if(err) {
            return res.status(500).json({message:err})
        } else{
            return res.status(200).json({ books })
        }
    })
}

exports.fetchSingleBook = (req,res)=> {
    Book.findById(req.params.id, (err, book)=>{
        if(err) {
            return res.status(500).json({message:err})
        }  else {
            return res.status(200).json({ book })
        }
    })
}

exports.deleteSingleBook = (req,res)=> {
    // Model.findOneAndDelete, Model.findByIdAndDelete
       Book.findByIdAndDelete(req.params.id, (err,book)=>{
           if(err){
               return res.status(500).json({message: err})
           } else if(!book){
               return res.status(404).json({message: "book not found"})
           }else{
               return res.status(200).json({message: "book deleted successfuly"})
           }
       })
}
exports.updateSingleBook = (req, res)=> {
    Book.findByIdAndUpdate(req.params.id, {
       title: req.body.title,
       category: req.body.category
    }, (err, book)=>{
       if(err) {
           return res.status(500).json({message:err})
       } else if (!book){
           return res.status(404).json({message:"Book not found"})
       } else{
           book.save((err, savedBook)=>{
               if(err){
                   return res.status(400).json({message: err})
               } else{
                   return res.status(200).json({message:"Book updated sucessfuly"})
               }
           })
       }

    })
}

