import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUserPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../components/Navbar/navbar';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { changeStateAdmin } from '../../redux/Slices/iconReducer';
import { VerifyUser } from '../../redux/Slices/AuthSlice';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' ,Role:'User'});
  const [searchValue,setsearch] = useState('')
  const userc = useSelector((state) => state.auth.user);
  const [submitType,setSubmitType] = useState('Edit-User')
 const dispatch = useDispatch()

  function GetUsers(){
    fetch('http://localhost:3000/admin/getUser', { method: 'GET' })
    .then((res) => res.json())
    .then((data) => {
      setUsers(data.Users);
    });
  }

  function AddUser(){
    dispatch((VerifyUser()))
    setSubmitType('Add-User')
    setFormData({
      name: '',
      email: '',
      Role:'User',
      password:''
    });
    setModalOpen(true);
  }

  function Searchhandle(e) {
    setsearch(e.target.value); // only update state
  }

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchValue.trim() !== '') {
        fetch(`http://localhost:3000/admin/users/serach?search=${searchValue}`)
          .then((res) => res.json())
          .then((data) => {
            setUsers(data.Users);
          })
          .catch((err) => console.log(err));
      } else {
        GetUsers()
      }
    }, 500); 
    return () => clearTimeout(delayDebounce);
  }, [searchValue]);

  useEffect(() => {
    GetUsers()
    dispatch(changeStateAdmin())
  }, []);

  const handleDelete = (id,isAdmin) => {
    dispatch((VerifyUser()))
    if(isAdmin === true){
      return toast.info("Cant Delete Admin")
    }
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;    
    fetch(`http://localhost:3000/admin/users/deleteUser/${id}`,{method:'POST'})
    .then((res)=>{
      return res.json()
    }).then((data)=>{
      if(data.success){
        GetUsers()
      }else{
        toast.error(data.message)
      }
    })
  };

  const openEditModal = (user) => {
    dispatch((VerifyUser()))
    setSubmitType('Edit-User')
    console.log(userc);
    setFormData({
      userId:user._id,
      name: user.name,
      email: user.email,
      Role:user.isAdmin?'Admin':'User',
      password:''
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({userId:'', name: '', email: '',Role:'',password:'' });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if(!formData.name){
      return toast.error("Name Feild Required")
    }
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
          return toast.error('Please enter a valid email');
        }
    if(submitType === 'Edit-User'){
      fetch('http://localhost:3000/admin/users/Edit-users',
        {method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(formData)}).then((response)=>{
          return response.json()
        }).then((data)=>{
          if(data.success){
            toast.success(data.message)
            setModalOpen(false);
            GetUsers()
          }else{
            toast.error(data.message)
          }
        }).catch((err)=>{
          console.log(err);      
        })
    }else{
      if(!formData.name){
        return toast.error("Name Feild Required")
      }
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!formData.email || !emailRegex.test(formData.email)) {
            return toast.error('Please enter a valid email');
          }
          if(!formData.password){
            return toast.error('Please enter a password');
          }
      fetch('http://localhost:3000/admin/users/Add-users',
        {method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(formData)}).then((response)=>{
          return response.json()
        }).then((data)=>{
          if(data.success){
            toast.success(data.message)
            setModalOpen(false);
            GetUsers()
          }else{
            toast.error(data.message)
          }
        }).catch((err)=>{
          console.log(err);      
        })
    }
   
  };

  return (
    <>
      <Navbar />
      <div className='w-full min-h-screen bg-gray-100 p-6'>
        <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-bold'>User Management</h2>
            <input
  type="text"
  placeholder="Search"
  value={searchValue}
  onChange={Searchhandle}
  className="border-2 rounded-[4px] px-4 py-2"
/>            <button onClick={AddUser} className='bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2'>
              <FontAwesomeIcon icon={faUserPlus} /> Add User
            </button>
          </div>
          <table className='w-full border-collapse border bg-white'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='p-3 border'>Profile</th>
                <th className='p-3 border'>Name</th>
                <th className='p-3 border'>Email</th>
                <th className='p-3 border'>Role</th>
                <th className='p-3 border'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className='text-center hover:bg-gray-100'>
                  <td className='p-3 border'>
                    <img className='w-[30px] h-[30px] rounded-full object-cover' src={user.Image} alt='' />
                  </td>
                  <td className='p-3 border'>{user.name}</td>
                  <td className='p-3 border'>{user.email}</td>
                  <td className='p-3 border'>{user.isAdmin ? 'Admin' : 'User'}</td>
                  <td className='p-4 border flex justify-center gap-3'>
                    <button
                      className='text-green-500 hover:text-green-700'
                      onClick={() => openEditModal(user)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className='text-red-500 hover:text-red-700'
                      onClick={() => handleDelete(user._id,user.isAdmin)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {modalOpen && (
          <div className='fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg relative'>
              <button
                className='absolute top-2 right-3 text-gray-600 hover:text-black'
                onClick={closeModal}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <h3 className='text-lg font-semibold mb-4'>Edit User</h3>
              <div className='flex flex-col gap-3'>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder='Name'
                  className='border p-2 rounded'
                />
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder='Email'
                  className='border p-2 rounded'
                />
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleFormChange}
                  placeholder='password'
                  className='border p-2 rounded'
                />
              <select 
              name="Role" 
              value={formData.Role} 
             onChange={handleFormChange}
            className='border p-2 rounded'
             >
             <option value="Admin">Admin</option>
             <option value="User">User</option>
             </select>  

                <button
                  onClick={handleSave}
                  className='bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition'
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
