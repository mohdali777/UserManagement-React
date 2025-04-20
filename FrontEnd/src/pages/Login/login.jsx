import React, { useState } from 'react';
import Loading from '../../components/Loading/loading';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SignupUser,loginUser} from '../../redux/Slices/AuthSlice';
import { toast } from 'react-toastify';
const Login = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [LoginType,SetType] = useState("Sign in")


  const dispatch = useDispatch()
  const { loading} = useSelector((state) => state.auth);

  const Navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
     if(LoginType == "Sign Up"){  
      if(!fullName){
        return toast.error('User Feild Is Empty')
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!email || !emailRegex.test(email)) {
            return toast.error('Please enter a valid email');
          }
         if(!password){
          return toast.error('Password Feild Is empty')
         } 
         if(!confirmPassword){
          return toast.error('Confirm Password Feild Is empty')
         }
      if(password !== confirmPassword){
        return toast.error('Password Not Same')
      }   
        dispatch(SignupUser({name:fullName,email,password}))
        .unwrap()
        .then(() => Navigate('/'))
        .catch((error) => {
          toast.error(error );
        });
     }else{    
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        return toast.error('Please enter a valid email');
      }
     if(!password){
      return toast.error('Password Feild Is empty')
     }     
        dispatch(loginUser({email,password}))
        .unwrap()
        .then(() => Navigate('/'))
        .catch((error) => {
          toast.error(error );
        });
     }
   
  };

  function SetClick(){
  SetType((prev)=> prev == "Sign Up" ? "Sign in" :"Sign Up")
  }


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center relative">
       {name}
        {loading &&<div className='absolute'>
        <Loading/>
        </div> }
        <div className="mx-auto w-full  max-w-md">
          <div className="bg-white py-8 px-12 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">Create your account</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
              {LoginType == 'Sign Up' ?<div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input

                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Enter Your Name"
                />
              </div>:<></>}
              

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Enter Your Email"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>
              
              {LoginType == "Sign Up" ? <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>:<></> }
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Create Account
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center text-sm">
              {LoginType == 'Sign Up' ?<><span className="text-gray-600">Already have an account?</span>
              <a href="#" onClick={SetClick} className="ml-1 text-blue-600 hover:text-blue-800 font-medium">
                Sign In
              </a> </>:<><span className="text-gray-600">Dont have an account?</span>
              <a href="#" onClick={SetClick} className="ml-1 text-blue-600 hover:text-blue-800 font-medium">
               Sign Up
              </a></>}
              
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              &copy; 2025 Your Company Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    
  );
};

export default Login;