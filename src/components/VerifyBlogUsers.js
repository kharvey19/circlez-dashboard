import React, { useState, useEffect } from 'react';
import { ref, onValue, remove, set, get } from 'firebase/database';
import { db } from './config';
import DeleteBlog from './DeleteBlog';

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

  const verifyUser = async (user, userId) => {
    const { firstName, lastName, Email, Password } = user;
  
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
            firstName, lastName, Email 
          })
        }

        const res = fetch(
          'https://circlez-8e1cb-default-rtdb.firebaseio.com/Blog-Verified.json',
          options
      )
  
        // Remove the user from 'Blog-Register'
        await remove(registerRef);
  
        console.log('User verified successfully.');
      } catch (error) {
        console.error('Failed to verify user:', error);
      }
    }
  };
  
  
  
  
  

  const denyUser = (user, userId) => {
    const { email } = user;

    // Remove the user from 'Blog-Register'
    remove(ref(db, `Blog-Register/${userId}`));
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
                Object.entries(registerUsers).map(([userId, user], index) => {
                  if (user.firstName) {
                    return (
                      <tr key={userId}>
                        <td className="py-2 px-4 border-b">{index + 1}</td>
                        <td className="py-2 px-4 border-b">{user.firstName}</td>
                        <td className="py-2 px-4 border-b">{user.lastName}</td>
                        <td className="py-2 px-4 border-b">{user.Email}</td>
                        <td className="py-2 px-4 border-b">
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 mr-2 rounded"
                            onClick={() => verifyUser(user, userId)}
                          >
                            Verify
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                            onClick={() => denyUser(user, userId)}
                          >
                            Deny
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

        <h1 className="text-2xl font-bold my-4 mx-10 mt-14">Verified Users</h1>
        {verifiedUsers ? (
          <div className="mt-5 mx-10">
            <table className="min-w-full bg-white border border-gray-300 ">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">No.</th>
                  <th className="py-2 px-4 border-b">First Name</th>
                  <th className="py-2 px-4 border-b">Last Name</th>
                  <th className="py-2 px-4 border-b">Email</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(verifiedUsers).map(([userId, user], index) => {
                  if (user.Email) {
                    return (
                      <tr key={userId}>
                        <td className="py-2 px-4 border-b">{index + 1}</td>
                        <td className="py-2 px-4 border-b">{user.firstName}</td>
                        <td className="py-2 px-4 border-b">{user.lastName}</td>
                        <td className="py-2 px-4 border-b">{user.Email}</td>
                      </tr>
                    );
                  }
                  return null;
                })}
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
