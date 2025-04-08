import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser, faCog, faEdit, faCamera } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../context';
import Loading from '../../components/Loading/loading';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [bio, setBio] = useState('Passionate developer with experience in MERN stack and cloud technologies.');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/15');
  const {LoadingState,SetLoading} = useContext(AppContext)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  function ButtonClick(){
    SetLoading(true)
    setTimeout(()=>{
        SetLoading(false)
        setIsEditing(false)
    },2000)
  }


  return (
    <div className='relative'>
        {LoadingState && <div className='absolute z-1'>
        <Loading/>
        </div>}
      <Navbar />
      <div className='w-full flex items-center justify-center mt-20 px-5 md:px-30' >
      <div className="bg-gray-100 w-full md:h-[500px] rounded-[5px] shadow-lg flex flex-col md:flex-row ">
          <div className='border-r-1 border-gray-300 md:w-[30%] bg-white p-6 flex flex-col items-center'>
            <h2 className='text-xl font-semibold mb-6'>Menu</h2>
            <ul className='w-full'>
              <li className='py-3 px-4 w-full text-center hover:bg-gray-200 rounded cursor-pointer flex items-center gap-3'>
                <FontAwesomeIcon icon={faUser} className='text-blue-500' /> Profile
              </li>
              <li className='py-3 px-4 w-full text-center hover:bg-gray-200 rounded cursor-pointer flex items-center gap-3'>
                <FontAwesomeIcon icon={faCog} className='text-green-500' /> Settings
              </li>
              <li className='py-3 px-4 w-full text-center hover:bg-red-500 hover:text-white rounded cursor-pointer flex items-center gap-3 mt-8'>
                <FontAwesomeIcon icon={faSignOutAlt} className='text-red-500' /> Logout
              </li>
            </ul>
          </div>
          
          <div className=' md:w-[70%] bg-gray-50 p-8'>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-semibold mb-6'>Profile Information</h2>
              <button className='text-blue-500 hover:text-blue-700' onClick={() => setIsEditing(!isEditing)}>
                <FontAwesomeIcon icon={faEdit} /> Edit
              </button>
            </div>
            <div className='flex items-center gap-6'>
              <div className='relative'>
                <img
                  src={profileImage} 
                  alt='Profile'
                  className='w-28 h-28 rounded-full border-4 border-gray-300 object-cover'
                />
                {isEditing && (
                  <label className='absolute bottom-0 right-0 bg-gray-200 p-2 rounded-full cursor-pointer'>
                    <FontAwesomeIcon icon={faCamera} className='text-gray-600' />
                    <input type='file' accept='image/*' className='hidden' onChange={handleImageChange} />
                  </label>
                )}
              </div>
              <div>
                {isEditing ? (
                  <>
                    <input
                      type='text'
                      className='border p-2 rounded w-full mb-2 '
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type='email'
                      className='border p-2 rounded w-full mb-2'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <h3 className='text-xl font-medium'>{name}</h3>
                    <p className='text-gray-600 text-[10px] md:text-sm'>{email}</p>
                  </>
                )}
              </div>
            </div>
            <div className='mt-8'>
              <h3 className='text-lg font-medium'>Bio:</h3>
              {isEditing ? (
                <textarea
                  className='border p-2 rounded w-full'
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              ) : (
                <p className='text-gray-700 mt-2'>{bio}</p>
              )}
            </div>
            {isEditing && (
              <button className='mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600' onClick={ButtonClick}>
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
