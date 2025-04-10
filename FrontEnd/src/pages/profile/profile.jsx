import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser, faCog, faEdit, faCamera } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../context';
import Loading from '../../components/Loading/loading';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/Slices/AuthSlice';
import { useSelector } from 'react-redux';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('Add Bio');
  const [profileImage, setProfileImage] = useState('');
  const {LoadingState,SetLoading} = useContext(AppContext)
  const [newImageFile, setNewImageFile] = useState(null);

  const dispatch = useDispatch()

  const handleImageChange = async (e) => {
     const file = e.target.files[0];
  if (!file) return;
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (!validTypes.includes(file.type)) {
    alert('Invalid file type. Please upload a JPG, JPEG, PNG, or WEBP image.');
    return;
  }


  setNewImageFile(file); 
  const previewUrl = URL.createObjectURL(file);
  setProfileImage(previewUrl); 
  };

  useEffect(()=>{
    const token = localStorage.getItem('token')
     fetch('http://localhost:3000/profile/GetuserData',{method:'GET',headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
     }}).then((response)=>{
      return response.json()
     }).then((data)=>{
       if(data.success){
       setName(data.user.name)
       setEmail(data.user.email)
       setBio(data.user.bio)
       setProfileImage(data.user.Image)
       }else{
        alert(data.message)
        dispatch(logout())
       }
     })
  },[])

  async function ButtonClick() {
    SetLoading(true);
    let uploadedImageUrl = profileImage; 
    if (newImageFile) {
      const formData = new FormData();
      formData.append('file', newImageFile);
      formData.append('upload_preset', 'User-Profiles');
      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/dy5xp5ai5/image/upload`, {
          method: 'POST',
          body: formData,
        });
  
        const data = await res.json();
        if (data.secure_url) {
          uploadedImageUrl = data.secure_url;
          setProfileImage(data.secure_url);
          setNewImageFile(null)
        } else {
          alert('Image upload failed.');
          SetLoading(false);
          return;
        }
      } catch (err) {
        console.error('Upload Error:', err);
        alert('Image upload failed');
        SetLoading(false);
        return;
      }
    }
  
    const payload = {
      name,
      email,
      bio,
      profileImage: uploadedImageUrl
    };
  
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/profile/Edit-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTimeout(() => {
            SetLoading(false);
            setIsEditing(false);
            setNewImageFile(null); 
          }, 2000);
        } else {
          alert(`Error: ${data.message}`);
          SetLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error:', err);
        alert('Something went wrong!');
        SetLoading(false);
      });
  }
  
  


  return (
    <div className='relative'>
        {LoadingState && <div className='absolute z-1'>
        <Loading/>
        </div>}
      <Navbar />
      <div className='w-full flex items-center justify-center mt-6 md:mt-20 px-5 md:px-30' >
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
                <FontAwesomeIcon onClick={()=> dispatch(logout())} icon={faSignOutAlt} className='text-red-500' /> Logout
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
