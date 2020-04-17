const {Note} = require('../model/index');

exports.getNote = async (req,res)=>{
    const notes = await Note.find({user_id:req.user._id}).sort({'createdAt':-1});
    res.render('notes/renderNote', {notes:notes});
}

exports.addNote = (req,res)=>{
   res.render('notes/addNote');
}

exports.createNote = async(req,res)=>{
  const {title, description}= req.body;
  const newNote = {
      title,
      description,
      user_id:req.user._id
  };
  
  const notes = new Note(newNote);
  await notes.save();
  req.flash('success','note was created')
  res.redirect('/notes')
}

exports.deleteNote = async(req,res)=>{
  const id = req.params.id;
  await Note.deleteOne({_id:id})
  req.flash('success','note was deleted')
  res.redirect('/notes');
}

exports.editNote = async(req,res)=>{
  const note = await Note.findOne({_id:req.params.id});
  if(note.user_id !== req.user.id){
    return res.redirect('/notes');
  }
  res.render('notes/editNote',{note:note})
}

exports.updateNote = async(req,res)=>{
  const {id}= req.params
  const {title, description}= req.body;
  const newNote = {
      title,
      description
  };

  await Note.updateOne({_id:id}, newNote);
  req.flash('success','note was updated successfully')
  res.redirect('/notes')
}


