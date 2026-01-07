import { NotebookIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const NotesNotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center py-16 space-y-6 mx-w-md mx-auto text-center'>
        <div className='bg-primary/10 rounded-full p-8'>
        <NotebookIcon className='size-10 text-amber-100' />
        </div>
        <h3 className='text-2xl font-bold'>No notes yet</h3>
        <p className='text-amber-100/60'>
            Ready to organize your thoughts? Create your first note to get started on your note-taking journey!
        </p>
        <Link to="/create" className='btn rounded-full btn-amber-100'>
            Create Your First Note
        </Link>

    </div>
  )
}

export default NotesNotFound