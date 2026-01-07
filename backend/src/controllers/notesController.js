import mongoose from "mongoose";
import Note from "../models/note.js";
export async function getAllNotes (_,res) {
    try {
        const notes = await Note.find().sort({createdAt: -1}); //-1 will sort in desc (newwest first)
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export async function getNoteById(req,res){
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message:"Note not found"});
        res.json(note);
    } catch (error) {
        console.error("Error in getNoteById controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function createNote (req,res) {
    try {
        const {title,content} = req.body;
        const note = new Note({title, content});

        const savedNote = await note.save();
        res.status(201).json(savedNote);
        
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export async function updateNote(req,res)  {
    try {
        const {title,content} = req.body;

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: "Note not found" });
        }        
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title,content},{
            new:true
        });         

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
};          

export async function deleteNote(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Note not found" });
    }

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
