import React, { useState } from 'react';
import { ref, remove } from 'firebase/database';
import { db } from './config';

const DeleteBlog = (props) => {
    const blogId = props.blogId;
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);

    // Remove the blog entry from the 'blogs' node in the database
    remove(ref(db, `Blog-Register/${blogId}`))
      .then(() => {
        // console.log('Blog deleted successfully');
        console.log('Blog ID:', blogId);
        
      })
      .catch((error) => {
        console.error('Failed to delete blog:', error);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <div>
      <button
        disabled={isDeleting}
        onClick={handleDelete}
      >
        Delete Blog
      </button>
    </div>
  );
};

export default DeleteBlog;
