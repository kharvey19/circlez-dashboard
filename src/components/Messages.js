import React, { useEffect, useState } from 'react';
import { ref, onValue, remove, get } from 'firebase/database';
import { db } from './config.js';

const Messages = () => {
  const [users, setUsers] = useState({});
  const [archived, setArchived] = useState({});
  const [showArchived, setShowArchived] = useState(false);
  const [selectedTab, setSelectedTab] = useState('register');

  useEffect(() => {
    const dbRef = ref(db, 'Contact');
    const archiveRef = ref(db, 'Archived');

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
    const { Name, Email, Message } = user;

    if (Email) {
      try {
        // Fetch the user's email from 'Blog-Register'
        const registerRef = ref(db, `Contact/${userId}`);
        const registerSnapshot = await get(registerRef);
        const registerData = registerSnapshot.val();

        console.log('registerData:', registerData);

        if (!registerData) {
          console.error('User data not found in Contact.');
          return;
        }

        console.log('email:', Email);

        // Add the user to 'Blog-Verified'
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Name,
            Email,
            Message,
          }),
        };

        const res = fetch(
          'https://circlez-8e1cb-default-rtdb.firebaseio.com/Archived.json',
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
    remove(ref(db, `Archived/${userId}`));
  };

  return (
    <div className="border-b pb-10">
      <div>
        <div className="z-2">
          <div className="flex justify-between items-center mb-5 sticky top-0 pb-5 bg-white border-b">
            <h1 className="text-2xl font-bold ml-10">Messages</h1>
            <div className="flex mr-10">
              <button
                className={`mr-4 font-bold text-lg ${
                  selectedTab === 'register' ? 'text-blue-500' : 'text-gray-500'
                }`}
                onClick={() => setSelectedTab('register')}
              >
                Current
              </button>
              <button
                className={`text-lg font-bold ${
                  selectedTab === 'verified' ? 'text-blue-500' : 'text-gray-500'
                }`}
                onClick={() => setSelectedTab('verified')}
              >
                Archived
              </button>
            </div>
          </div>
          {selectedTab === 'register' && (
            <div className='mx-10'>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">No.</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Message</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(users).map(([userId, user], index) => {
                  if (user.Name) {
                    return (
                      <tr key={userId}>
                        <td className="py-2 px-4 border-b">{index + 1}</td>
                        <td className="py-2 px-4 border-b">{user.Name}</td>
                        <td className="py-2 px-4 border-b">{user.Email}</td>
                        <td className="py-2 px-4 border-b">{user.Message}</td>
                        <td className="py-2 px-4 border-b">
                          <div className="flex justify-center">
                            <button
                              className="bg-zinc-500 hover:bg-zinc-400 text-white py-2 px-4 rounded text-sm"
                              onClick={() => archive(user, userId)}
                            >
                              Archive
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
          )}
          {selectedTab === 'verified' && (
            <div className='mx-10'>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">No.</th>
                  <th className="py-2 px-4 border-b">First Name</th>
                  <th className="py-2 px-4 border-b">Last Name</th>
                  <th className="py-2 px-4 border-b">Message</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(archived).map(([userId, user], index) => {
                  if (user.Name) {
                    return (
                      <tr key={userId}>
                        <td className="py-2 px-4 border-b">{index + 1}</td>
                        <td className="py-2 px-4 border-b">{user.Name}</td>
                        <td className="py-2 px-4 border-b">{user.Email}</td>
                        <td className="py-2 px-4 border-b">{user.Message}</td>
                        <td className="py-2 px-4 border-b">
                          <div className="flex justify-center">
                            <button
                              className="bg-zinc-500 hover:bg-zinc-400 text-white py-2 px-4 rounded text-sm"
                              onClick={() => denyUser(userId)}

                            >
                              Delete
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
