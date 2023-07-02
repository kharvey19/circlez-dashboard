
import React, { useEffect, useState } from 'react';
import { ref, onValue, remove, set, get } from 'firebase/database';
import { db } from './config.js';

const ManageBlogs = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const dbRef = ref(db, 'Blogs');

    onValue(dbRef, (snapshot) => {
      const usersData = [];
      snapshot.forEach((childSnapshot) => {
        usersData.push([childSnapshot.key, childSnapshot.val()]);
      });

      setUsers(usersData);
    });
  }, []);

  const denyUser = (userId) => {
    console.log('userId:', userId);
    remove(ref(db, `Blogs/${userId}`));
  };

  return (
    <div className="border-b pb-10">
      <div>
        <h1 className="text-left text-2xl font-bold ml-10 mt-10">Manage Blogs</h1>

        <div className="mt-5 mx-10">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">No.</th>
                {/* <th className="py-2 px-4 border-b">Author</th> */}
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Message</th>
                <th className="py-2 px-4 border-b">Actions</th>

              </tr>
            </thead>
            <tbody>
            {users.map(([userId, user], index) => {
              if (user.Title) {
                return (
                  <tr key={userId}>
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    {/* <td className="py-2 px-4 border-b">{user.Author}</td> */}
                    <td className="py-2 px-4 border-b">{user.Title}</td>
                    <td className="py-2 px-4 border-b">{user.Description}</td>
                    <td className="py-2 px-4 border-b">{user.Message}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                        onClick={() => denyUser(userId)}
                      >
                        Delete
                      </button>
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
    </div>
  );
};

export default ManageBlogs;
