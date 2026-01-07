import React, {useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../lib/axios.js';
import { ArrowLeftIcon, LoaderIcon, TrashIcon } from 'lucide-react';
import { Link } from 'react-router-dom';


const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(() =>{
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to load note. Please try again.");
      }finally{
        setLoading(false);
      }
    }

    fetchNote();
  },[id]);

  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("Error deleting note", error);
      toast.error("Failed to delete note. Please try again.");
      
    }
  };


  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please add all fields");
      return;
  };

  setSaving(true);

  try {
    await api.put(`/notes/${id}`, note);
    toast.success("Note updated successfully");
    navigate("/");
  } catch (error) {
    console.log("Error saving note", error);
    toast.error("Failed to update note. Please try again.");
  }finally{
    setSaving(false);
  }
};

  if(loading){
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center text-amber-100 py-10'>
      <LoaderIcon className='animate-spin size-10'/>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-base-200 '>
      <div className="container mx-auto px-4 py-8">
        <div className='max-w-2xl mx-auto'>
        <div className='flex items-center justify-between mb-6'>
          <Link to="/" className='btn btn-ghost rounded-full'>
            <ArrowLeftIcon className='h-5 w-5' />
            Back to Notes
          </Link>
          <button onClick={handleDelete} className='btn btn-error btn-outline rounded-full'>
            <TrashIcon className='h-5 w-5' />
            Delete Note
          </button>
          </div>
          <div className="card bg-base-100">
            <div className="cardbody">
             <div className="max-w-xl mx-auto bg-base-100 p-6 rounded-2xl shadow-md">
              <div className="form-control mb-4">
                <label className="label text-base-content">
                  <span className="label-text text-lg">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered w-full text-amber-100 bg-base-200 text-sm"
                  value={note.title}
                  onChange={(e) =>
                    setNote({ ...note, title: e.target.value })
                  }
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-lg">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered w-full min-h-[150px] text-amber-100 bg-base-200 text-sm"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>

              <div className="cardactions flex justify-end">
                <button className='btn rounded-full px-6' disabled={saving} onClick={handleSave}> 
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

              </div>

            </div>

              </div>
            </div>
          </div>
        </div>
     )
};


export default NoteDetailPage