import React, { useState, useEffect } from 'react';
import { ref, onValue, push, remove, set } from 'firebase/database';
import { db } from './config';

const VerifyBlogUsers = () => {
  const [registerUsers, setRegisterUsers] = useState(null);
  const [verifiedUsers, setVerifiedUsers] = useState(null);

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

  const verifyUser = (user) => {
    const { email } = user;
  
    if (email) {
      // Remove the user from 'Blog-Register'
      remove(ref(db, `Blog-Register/${email}`))
        .then(() => {
          // Add the user's email to 'Blog-Verified'
          set(ref(db, `Blog-Verified/${email}`), true);
        })
        .catch((error) => {
          console.error('Failed to remove user from Blog-Register:', error);
        });
    }
  };

  const denyUser = (user) => {
    const { email } = user;

    // Remove the user from 'Blog-Register'
    remove(ref(db, `Blog-Register/${email}`));
  };

  return (
    <div className="border-b pb-10">
      <div>
        <h1 className="text-left text-3xl font-bold ml-10 mt-10">Verify Blog Users</h1>
        <h1 className="text-2xl font-bold my-4 mx-10">Requesting Access</h1>
        <div className="mt-5 mx-10">
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
                Object.values(registerUsers).map((user, index) => (
                  <tr key={user.email}>
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{user.firstName}</td>
                    <td className="py-2 px-4 border-b">{user.lastName}</td>
                    <td className="py-2 px-4 border-b">{user.Email}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 mr-2 rounded"
                        onClick={() => verifyUser(user)}
                      >
                        Verify
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                        onClick={() => denyUser(user)}
                      >
                        Deny
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <h1 className="text-2xl font-bold my-4 mx-10 mt-14">Verified Users</h1>
        {verifiedUsers ? (
          <div className="mt-5 mx-10">
            <table className="min-w-full bg-white border border-gray-300 ">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">No.</th>
                  <th className="py-2 px-4 border-b">Email</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(verifiedUsers).map((user, index) => (
                  <tr key={user.email}>
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Loading verified users...</p>
        )}
      </div>
    </div>
  );
};

export default VerifyBlogUsers;
