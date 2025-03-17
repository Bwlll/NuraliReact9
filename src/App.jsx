import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://api.escuelajs.co/api/v1/users')
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  const handleTogglePassword = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index].showPassword = !updatedUsers[index].showPassword;
    setUsers(updatedUsers);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("users", users)
  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users?.map((user, index) => (
          <li key={user.id}>
            <div>
              <strong>Name:</strong> {user.name} <br />
              <strong>Email:</strong> {user.email} <br />
              {user.showPassword && (
                <div>
                  <strong>Password:</strong> {user.password} <br />
                </div>
              )}
              <button onClick={() => handleTogglePassword(index)}>
                {user.showPassword ? 'Hide Password' : 'Show Password'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
