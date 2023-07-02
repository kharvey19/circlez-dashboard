// const ManageBlogs = () => {
//     return (
//     <div style={{ borderBottom: '1px solid gray'}} className="pb-10">
//         <div>
//         <h1 className="text-left text-3xl font-bold ml-10 mt-10">Manage Blogs</h1>

//         </div>
//       </div>
//     );
//   };

// export default ManageBlogs;

import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from './config.js';

const ManageBlogs = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const dbRef = ref(db, 'Blogs');

    onValue(dbRef, (snapshot) => {
      const users = [];
      snapshot.forEach((childSnapshot) => {
        users.push(childSnapshot.val());
      });

      setUsers(users);
    });
  }, []);

  return (
    <div className="border-b pb-10">
      <div>
        <h1 className="text-left text-3xl font-bold ml-10 mt-10">Manage Blogs</h1>

        <div className="mt-5 mx-10">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">No.</th>
                {/* <th className="py-2 px-4 border-b">Author</th> */}
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Message</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {

                if (user.Title) {
                    return (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  {/* <td className="py-2 px-4 border-b">{user.Author}</td> */}
                  <td className="py-2 px-4 border-b">{user.Title}</td>
                  <td className="py-2 px-4 border-b">{user.Description}</td>
                  <td className="py-2 px-4 border-b">{user.Message}</td>
                </tr>
              );
                }
                return null;
                })
                }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBlogs;
