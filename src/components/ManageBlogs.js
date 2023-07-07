
import React, { useEffect, useState } from 'react';
import { ref, onValue, remove, set, get } from 'firebase/database';
import { db } from './config.js';

const ManageBlogs = () => {
  const [users, setUsers] = useState([]);
  const [archived, setArchived] = useState({});
  const [selectedTab, setSelectedTab] = useState('current');

  useEffect(() => {
    const dbRef = ref(db, 'Blogs');
    const archiveRef = ref(db, 'Archived-Blogs');

    onValue(dbRef, (snapshot) => {
      const usersData = {};
      snapshot.forEach((childSnapshot) => {
        usersData[childSnapshot.key] = childSnapshot.val();
      });

      console.log(usersData); // Add this console log statement to inspect the users data

      setUsers(usersData);
    });

    onValue(archiveRef, (snapshot) => {
      const archivedData = {};
      snapshot.forEach((childSnapshot) => {
        archivedData[childSnapshot.key] = childSnapshot.val();
      });

      console.log(archivedData); // Add this console log statement to inspect the users data

      setArchived(archivedData);
    });
  }, []);

  const archive = async (user, userId) => {
    const { AuthorId, userFirst, userLast, Title, Description, Message } = user;

    if (AuthorId) {
      try {
        // Fetch the user's email from 'Blog-Register'
        const registerRef = ref(db, `Blogs/${userId}`);
        const registerSnapshot = await get(registerRef);
        const registerData = registerSnapshot.val();

        console.log('registerData:', registerData);

        if (!registerData) {
          console.error('User data not found in Contact.');
          return;
        }

        console.log('email:', AuthorId);

        // Add the user to 'Blog-Verified'
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            AuthorId, 
            userFirst, 
            userLast, 
            Title, 
            Description, 
            Message
          }),
        };

        const res = fetch(
          'https://circlez-8e1cb-default-rtdb.firebaseio.com/Archived-Blogs.json',
          options
        );

        // Remove the user from 'Blog-Register'
        await remove(registerRef);

        console.log('User verified successfully.');
      } catch (error) {
        console.error('Failed to verify user:', error);
      }
    }
  };

  const denyUser = (userId) => {
    console.log('userId:', userId);
    remove(ref(db, `Archived-Blogs/${userId}`));
  };


  return (
    <div className="border-b pb-10 h-80 overflow-y-auto">
      <div>
      {/* <div className="sticky top-0 bg-white py-2 pt-5 pb-5 border-b  ">
        <h1 className="text-left text-2xl font-bold ml-10">Manage Blogs</h1>
      </div> */}
      <div className=" z-2 ">
        <div className="flex justify-between items-center mb-10 sticky top-0 py-5 pb-5 bg-white border-b">
          <h1 className="text-left text-2xl font-bold ml-10">Manage Blogs</h1>
            <div className="flex mr-10">
              <button
                className={`mr-4 font-bold text-lg ${
                  selectedTab === 'current' ? 'text-blue-500' : 'text-gray-500'
                }`}
                onClick={() => setSelectedTab('current')}
              >
                Current
              </button>
              <button
                className={`text-lg font-bold ${
                  selectedTab === 'archive' ? 'text-blue-500' : 'text-gray-500'
                }`}
                onClick={() => setSelectedTab('archive')}
              >
                Archived
              </button>
            </div>
          </div>
      {selectedTab === 'current' && (
        <div className='mx-10'>
          <table className="min-w-full bg-white border border-gray-200">
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
            {Object.entries(users).map(([userId, user], index) => {
              if (user.Title) {
                return (
                  <tr key={userId}>
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{user.userFirst} {user.userLast}</td>
                    <td className="py-2 px-4 border-b">{user.Title}</td>
                    <td className="py-2 px-4 border-b">{user.Description}</td>
                    <td className="py-2 px-4 border-b">{user.Message}</td>
                    <td className="py-2 px-4 border-b">
                    <button onClick={() => archive(user, userId)}
                    className='bg-zinc-500 hover:bg-zinc-600 text-white py-2 px-4 rounded text-sm mr-3'> Archive </button>
                    </td>
                  </tr>
                );
              }
              return null;
            })}
            </tbody>
          </table>
        </div>
      )}

      {selectedTab === 'archive' && (
        <div className='mx-10'>
        <table className="min-w-full bg-white border border-gray-200">
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
            {Object.entries(archived).map(([userId, user], index) => {
              if (user.Title) {
                return (
                  <tr key={userId}>
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{user.userFirst} {user.userLast}</td>
                    <td className="py-2 px-4 border-b">{user.Title}</td>
                    <td className="py-2 px-4 border-b">{user.Description}</td>
                    <td className="py-2 px-4 border-b">{user.Message}</td>
                    <td className="py-2 px-4 border-b">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded text-sm"
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBlogs;
