import React, { useEffect, useState } from 'react';
import { ref, onValue, remove, set, get } from 'firebase/database';
import { db } from './config.js';



const Settings = () => {
    const [delBlogs, setDelBlogs] = useState([]);

  useEffect(() => {
    const delBlogRef = ref(db, 'Deleted-Blogs');

    onValue(delBlogRef, (snapshot) => {
      const usersData = [];
      snapshot.forEach((childSnapshot) => {
        usersData.push([childSnapshot.key, childSnapshot.val()]);
      });

      setDelBlogs(usersData);
    });
  }, []);

    return ( 
        <div className="border-b pb-10">
            <div>
                <p className="text-3xl text-left ml-10 font-bold"> Settings </p>
                <h1 className="text-left text-2xl font-bold ml-10 mt-10">Deleted Blogs</h1>
                <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">No.</th>
                  <th className="py-2 px-4 border-b">Author</th>
                  <th className="py-2 px-4 border-b">Title</th>
                  <th className="py-2 px-4 border-b">Description</th>
                  <th className="py-2 px-4 border-b">Message</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {delBlogs &&
                  Object.entries(delBlogs).map(([userId, user], index) => {
                    if (user.firstName) {
                      return (
                        <tr key={userId}>
                          <td className="py-2 px-4 border-b">{index + 1}</td>
                          <td className="py-2 px-4 border-b">{user.userFirst} {user.userLast}</td>
                          <td className="py-2 px-4 border-b">{user.Title}</td>
                          <td className="py-2 px-4 border-b">{user.Description}</td>
                          <td className="py-2 px-4 border-b">{user.Message}</td>
                          <td className="py-2 px-4 border-b">
                            <div className="flex justify-center">
                              <button
                                className="bg-zinc-500 hover:bg-zinc-600 text-white py-2 px-4 mr-2 rounded text-sm"
                              >
                                UnDelete
                              </button>

                            </div>
                          </td>
                        </tr>
                      );
                    }
                    return null;
                  })}
              </tbody>
            </table>
            </div>
        </div>
        );
};

export default Settings;