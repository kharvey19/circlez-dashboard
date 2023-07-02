import React, { useState, useEffect } from 'react';
import { ref, onValue, remove, set, get } from 'firebase/database';
import { db } from './config';

const VerifyBlogUsers = () => {
  const [registerUsers, setRegisterUsers] = useState(null);
  const [verifiedUsers, setVerifiedUsers] = useState(null);
  const [selectedTab, setSelectedTab] = useState('register');

  useEffect(() => {
    const registerRef = ref(db, 'Blog-Register');
    const verifiedRef = ref(db, 'Blog-Verified');

    const unregisterUserListener = onValue(registerRef, (snapshot) => {
      const extractedData = snapshot.val();
      setRegisterUsers(extractedData);
    });

    const verifyUserListener = onValue(verifiedRef, (snapshot) => {
      const extractedData = snapshot.val();
      setVerifiedUsers(extractedData);
    });

    return () => {
      unregisterUserListener(); // Cleanup the listener when component unmounts
      verifyUserListener(); // Cleanup the listener when component unmounts
    };
  }, []);

  const verifyUser = async (user, userId) => {
    const { firstName, lastName, Email, Password, id } = user;

    if (Email) {
      try {
        // Fetch the user's email from 'Blog-Register'
        const registerRef = ref(db, `Blog-Register/${userId}`);
        const registerSnapshot = await get(registerRef);
        const registerData = registerSnapshot.val();

        console.log('registerData:', registerData);

        if (!registerData) {
          console.error('User data not found in Blog-Register.');
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
            firstName,
            lastName,
            Email,
            Password, 
            id
          }),
        };

        const res = fetch('https://circlez-8e1cb-default-rtdb.firebaseio.com/Blog-Verified.json', options);

        // Remove the user from 'Blog-Register'
        await remove(registerRef);

        console.log('User verified successfully.');
      } catch (error) {
        console.error('Failed to verify user:', error);
      }
    }
  };

  const denyUser = (userId) => {
    remove(ref(db, `Blog-Register/${userId}`));
  };

  const deleteUser = (userId) => {
    console.log('userId:', userId);
    remove(ref(db, `Blog-Verified/${userId}`));
  };

  return (
    <div className="border-b pb-10">
      <div>
        <div className="mt-5 mx-10">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Verify Blog Users</h1>
            <div className="flex">
              <button
                className={`mr-4 font-bold text-lg ${
                  selectedTab === 'register' ? 'text-blue-500' : 'text-gray-500'
                }`}
                onClick={() => setSelectedTab('register')}
              >
                Register
              </button>
              <button
                className={`text-lg font-bold ${
                  selectedTab === 'verified' ? 'text-blue-500' : 'text-gray-500'
                }`}
                onClick={() => setSelectedTab('verified')}
              >
                Verified
              </button>
            </div>
          </div>
          {selectedTab === 'register' && (
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">No.</th>
                  <th className="py-2 px-4 border-b">First Name</th>
                  <th className="py-2 px-4 border-b">Last Name</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {registerUsers &&
                  Object.entries(registerUsers).map(([userId, user], index) => {
                    if (user.firstName) {
                      return (
                        <tr key={userId}>
                          <td className="py-2 px-4 border-b">{index + 1}</td>
                          <td className="py-2 px-4 border-b">{user.firstName}</td>
                          <td className="py-2 px-4 border-b">{user.lastName}</td>
                          <td className="py-2 px-4 border-b">{user.Email}</td>
                          <td className="py-2 px-4 border-b">
                            <div className="flex justify-center">
                              <button
                                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 mr-2 rounded text-sm"
                                onClick={() => verifyUser(user, userId)}
                              >
                                Verify
                              </button>
                              <button
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded text-sm"
                                onClick={() => denyUser(userId)}
                              >
                                Deny
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
          )}
          {selectedTab === 'verified' && (
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">No.</th>
                  <th className="py-2 px-4 border-b">First Name</th>
                  <th className="py-2 px-4 border-b">Last Name</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {verifiedUsers &&
                  Object.entries(verifiedUsers).map(([userId, user], index) => {
                    if (user.firstName) {
                      return (
                        <tr key={userId}>
                          <td className="py-2 px-4 border-b">{index + 1}</td>
                          <td className="py-2 px-4 border-b">{user.firstName}</td>
                          <td className="py-2 px-4 border-b">{user.lastName}</td>
                          <td className="py-2 px-4 border-b">{user.Email}</td>
                          <td className="py-2 px-4 border-b">
                            <div className="flex justify-center">
                              <button
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded text-sm"
                                onClick={() => deleteUser(userId)}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyBlogUsers;
