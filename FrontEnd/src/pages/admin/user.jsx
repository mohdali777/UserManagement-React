import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../components/Navbar/navbar';
import { AppContext } from '../../context';



export default function UserManagement() {
  const [users, setUsers] = useState([]);

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const {IsAdmin,setAdmin} = useContext(AppContext)

  useEffect(()=>{
setAdmin(false)
fetch('http://localhost:3000/admin/getUser',{method:"GET"}).then((res)=>{
  return res.json()
}).then((data)=>{
setUsers(data.Users)
})
  },[])

  return (
    <>
    <Navbar/>
    <div className='w-full min-h-screen bg-gray-100 p-6'>
      <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold'>User Management</h2>
          <button className='bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2'>
            <FontAwesomeIcon icon={faUserPlus} /> Add User
          </button>
        </div>
        <table className='w-full border-collapse border bg-white'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='p-3 border'>Name</th>
              <th className='p-3 border'>Email</th>
              <th className='p-3 border'>Status</th>
              <th className='p-3 border'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className='text-center hover:bg-gray-100'>
                <td className='p-3 border'>{user.name}</td>
                <td className='p-3 border'>{user.email}</td>
                <td className='p-3 border'>{user.status}</td>
                <td className='p-3 border flex justify-center gap-3'>
                  <button className='text-blue-500 hover:text-blue-700'><FontAwesomeIcon icon={faEye} /></button>
                  <button className='text-green-500 hover:text-green-700'><FontAwesomeIcon icon={faEdit} /></button>
                  <button className='text-red-500 hover:text-red-700' onClick={() => handleDelete(user.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}
