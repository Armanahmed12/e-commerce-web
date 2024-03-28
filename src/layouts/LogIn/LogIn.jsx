import React, { useContext, useRef, useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthenticationData } from '../../inforProviders/AuthInfoProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../LogIn/LogIn.css'

const LogIn = () => {

    const [open, setOpen] = useState(false);
     const emailRef = useRef('eamil-ref');
     const location = useLocation();
     let navigate = useNavigate();
     const {navBarIconCliked,user,setUser,userLogIn,resetPassword,createUserWithGoogle} = useContext(AuthenticationData);
 
     let from = location.state?.from?.pathname || "/";

    const handleUserLogIn = (event) =>{

        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        userLogIn(email,password)
        .then(userCredential =>{
             
              if(userCredential.user.emailVerified){
                 
                toast.success(`${userCredential.user.displayName} has logged in successfully.`, {
            
                    position: "top-center"
       
                 });
                      form.reset();
                      setUser(userCredential.user);
                      navigate(from, { replace: true });
                      console.log(user);
              }else{

                toast.error(`Sorry! This email was not verified in the past. So, please check your gamil inbox and confirm the verification of eamil.`, {
            
                    position: "top-center"
       
                 });
              }

        }).catch(error =>{

            toast.error(`${error.message}`, {
            
                 position: "top-center"
   
             });
        })

    }

    // handle log In with your google account
    const signUpWithGoogle = () => {

        createUserWithGoogle()
            .then(result => {
                console.log(result.user);
                toast.success(`${result.user?.displayName || "User"} has has logged in perfectly.`);
                setUser(result.user);
                navigate(from, { replace: true });
            }).catch(error => {

                console.log(error);
                toast.error(`${error.message}`)
            })
    }


    // Reset your account password with the email address
    const resetUserPassword = () =>{

          const email = emailRef.current.value;
          if(email.includes('@')){
             
                resetPassword(email)
                .then(()=>{
                    toast.success("We have sent you a email to change your password.")
                }).catch((error)=>{
                       
                       toast.error(`${error.message}`);
                })
          }
    }

    return (
        <div id='register-compo' className='md:m-8 mx-3 my-8'>
            <div style={{ boxShadow: '0px 0px 5px 1px black' }} className='lg:w-2/5 md:w-3/4 mx-auto text-center p-4 rounded-md'>
                <h2 style={{textShadow:'2px 2px 1px blue',letterSpacing:'3px'}} className='font-semibold text-3xl font-serif pb-5 text-[#d10096]'>Log in</h2>
                <form onSubmit={handleUserLogIn}>
                   <ToastContainer/>
                    <div className="form-control">
                        <label htmlFor="emailField">Email : </label><br />
                        <input type="email" ref={emailRef} name="email" id="emailField" placeholder='Write your email' required/>
                    </div>
                   
                    <div className="form-control mt-3">
                        <label htmlFor="passwordFiled">Password : </label><br />
                        {/* dfdfdfdf */}
                     <div className='password-field'>

                            <input className='border-0 outline-0' type={open ? 'text' : 'password'} name="email" id="passwordFiled" placeholder='Write your email' autoComplete='off' required />

                            {
                                 open ?
                                 
                                 <FaEye onClick={()=>setOpen(!open)} className='eye-icon text-red-500 text-3xl' /> 
                                 
                                 
                                 :  
                                 
                                 <FaEyeSlash onClick={()=>setOpen(!open)} className='eye-icon text-red-500 text-4xl' /> 
                                 
                              
                            }

                </div>
                        <h2 onClick={resetUserPassword} className='text-base text-right underline font-semibold text-blue-700 hover:cursor-pointer'>Forgot passwod?</h2>
                    </div>  

                    <input className='bg-[red] mt-5 text-white fw-bold hover:cursor-pointer' type="submit" value="Log in" />
                    <h2>New to Ema-john? <Link className='text-blue-600 underline font-xl' to={'/register'}>Create New Account</Link></h2>
                </form>

                <div className='flex items-center justify-center mt-5'>
                    <hr className=' border-1 w-full border-gray-500' />
                       <span className='font-bold px-2'>Or</span>
                    <hr className='border-1 w-full border-gray-500' />
                </div>

                <button onClick={signUpWithGoogle} className='lg:w-fit md:2/4 w-fultext-white fw-bold mt-3 p-2 rounded flex items-center gap-2 mx-auto hover:cursor-pointer'> <FaGoogle /> Continue with Google</button>

            </div>
        </div>
    );
};

export default LogIn;