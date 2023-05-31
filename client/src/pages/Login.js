import React, { useEffect } from 'react';
import bgimage from '../assets/img/share-bg.jpeg';
import logo from '../assets/img/viperHut.png';
import { useGoogleLogin} from '@react-oauth/google';
import instance from '../utils/axios';
import {FcGoogle} from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
    
            const {access_token} = tokenResponse;
            const userInfo = await instance.post('auth/login',{access_token}).then(res => res.data)
            .catch(err => console.log(err))
            
            console.log(userInfo)

            const {name, picture,username, email, role, id} = userInfo.user;
            const doc = {
                name,
                picture,
                email,
              username,
                role,
                id
            }
            localStorage.setItem('user', JSON.stringify(doc))
            navigate('/',{replace:true})
          },
      });



    return (
        <div className='flex justify-start flex-col h-screen'>
            <div className='relative w-full h-full'>
                <img src={bgimage} alt="" className='w-full h-full object-cover'/>
                <div className='absolute flex flex-col justify-center items-center top-0 left-0 bottom-0 right-0 bg-blackOverlay'>
                    <div className='flex flex-col justify-center items-center p-5'>
                        <img src={logo} alt="sharehut" width='130px' />
                        <p className='text-white' >Quote Sutra</p>
                    </div>

                    <div className='shadow-2xl'>
                        
                
                                <button
                                 className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                                 onClick={() => login()}
                                >

                                    <FcGoogle className="mr-4"/> Sign in with Google
                                </button>  
                                  
                        
                    </div>
                </div>
            </div>
           
        </div>
    );
};

export default Login;