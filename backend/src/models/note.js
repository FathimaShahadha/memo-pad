import mongoose from "mongoose";

//1st step = must create a schema
//2nd step = mus create a model based on that schema

const noteSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    content: {
        type:String,
        required: true
    },
},
{timestamps: true}  //createdAt,updatedAt
);

const Note = mongoose.model("Note", noteSchema);

export default Note;