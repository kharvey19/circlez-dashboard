import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from './config.js';

const Premium = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const dbRef = ref(db, 'Premium');

    onValue(dbRef, (snapshot) => {
      const users = [];
      snapshot.forEach((childSnapshot) => {
        users.push(childSnapshot.val());
      });

      setUsers(users);
    });
  }, []);

  return (
    <div className="border-b pb-10 max-h-96 overflow-y-auto">
      <div>
      <div className="z-2 ">
        <div className="flex justify-between items-center mb-5 sticky top-0 py-5 pb-5 bg-white border-b ">
          <h1 className="text-left text-2xl font-bold ml-5 ">Premium</h1>
        </div>
        <div className="mx-5">
          <table className="min-w-full bg-white border border-gray-300 m">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">No.</th>
                <th className="py-2 px-4 border-b">First Name</th>
                <th className="py-2 px-4 border-b">Last Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Other Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                if (user.firstName) {
                  return (

                <tr key={index}>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{user.firstName}</td>
                  <td className="py-2 px-4 border-b">{user.lastName}</td>
                  <td className="py-2 px-4 border-b">{user.Email}</td>
                  <td className="py-2 px-4 border-b">{user.Role}</td>
                  <td className="py-2 px-4 border-b">{user.OtherRole}</td>
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
    </div>
  );
};

export default Premium;
