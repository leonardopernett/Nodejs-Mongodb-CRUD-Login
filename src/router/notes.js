const {Router}= require('express');
const {checkAuthentication} = require('../config/auth')
const router = Router();
const {
    getNote, 
    createNote, 
    addNote, 
    deleteNote, 
    editNote,
    updateNote 
} = require('../controller/NoteController');
 
router.get('/',checkAuthentication,getNote );
router.post('/', createNote );
router.get('/add',checkAuthentication,addNote );
router.delete('/delete/:id',deleteNote);
router.get('/edit/:id',checkAuthentication,editNote);
router.put('/updated/:id', updateNote)

module.exports = router