import React, { useContext, useState } from 'react';
import '../Register/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthenticationData } from '../../inforProviders/AuthInfoProvider';
import { sendEmailVerification } from 'firebase/auth';

const Register = () => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { setUser, createNewUser, createUserWithGoogle, userInfoUndate } = useContext(AuthenticationData);

    // react-toastify
    const notify = (userName) => {

        toast.success(`well done ${userName}! Now, please verify your gmail to complete your sing Up, checking your gmail inbox.`, {

            position: "top-center"

        });
    }

    const handleSignUp = (event) => {

        event.preventDefault();

        const form = event.target;
        const userName = form.userName.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPasword = form.confirmPassword.value;

        const passWordValidation = /(?=(.*\d){1})(?=(.*[A-Z]){1})(?=(.*[~!@#$%^&*()]){1}).{6,}/.test(password);

        //    passwod length is checking
        if (password.length < 6) {

            toast.error('Password must be more than 5 characters.');
            return;
        }

        // password and comfirm password are being checked for confirming that both are the same psw.
        if (!(password === confirmPasword)) {

            toast.error(`${userName} your Password and Confirm-password must be the same.`, {
                position: "top-center"
            });
            return;
        }

        // password's characters validation and creating a user with password and eamil.

        if (passWordValidation) {

            createNewUser(email, password)
                .then(result => {

                    sendEmailVerification(result.user).then(() => {

                    }).catch(error => console.log(error.message));
                    userInfoUndate(userName);
                    setUser(result.user);
                    form.reset();
                    notify(userName);
                    navigate('/')

                }).catch(error => {

                    toast.error(`${error}`, {

                        position: 'top-center'
                    });

                })

        } else {

            toast.error(`${userName} Your password must contain at least one uppercase letter, one numeral number and one special character.`, {

                position: "top-center"

            });
        }
    }

    // create user with Google
    const signUpWithGoogle = () => {

        createUserWithGoogle()
            .then(result => {
                console.log(result.user);
                notify(result.user.displayName);
                setUser(result.user);
                navigate('/');
            }).catch(error => {

                console.log(error);
                toast.error(`${error.message}`, {

                    position: "top-center"
                })
            })
    }

    return (
        <div id='register-compo' className='md:m-8 mx-3 my-8'>

            <div style={{ boxShadow: '0px 0px 5px 1px black' }} className='lg:w-2/5 md:w-3/4 mx-auto text-center p-4 rounded-md'>
                <h2 style={{ textShadow: '2px 2px 1px blue', letterSpacing: '3px' }} className='font-semibold text-3xl font-serif pb-5 text-[#d10096]'>Sign Up</h2>
                <form onSubmit={handleSignUp}>

                    <div className="form-control mb-3">
                        <label htmlFor="userNameFiled">User Name : </label><br />
                        <input type="text" name="userName" id="userNameFiled" placeholder='Write your email' required />
                    </div>
                    <div className="form-control">
                        <label htmlFor="emailField">Email : </label><br />
                        <input type="email" name="email" id="emailField" placeholder='Write your email' required />
                    </div>

                    <div className="form-control mt-3">
                        <label htmlFor="passwordFiled">Password : </label><br />
                        {/* dfdfdfdf */}
                        <div className='password-field'>

                            <input className='border-0 outline-0' type={open ? 'text' : 'password'} name="email" id="passwordFiled" placeholder='Write your email' autoComplete='off' required />

                            {
                                open ?
                                    <FaEye onClick={() => setOpen(!open)} className='eye-icon text-red-500 text-3xl' />
                                              :
                                    <FaEyeSlash onClick={() => setOpen(!open)} className='eye-icon text-red-500 text-4xl' />
                            }
                        </div>
                    </div>

                    <div className="form-control mt-3">
                        <label htmlFor="confirmPaswFiled">Confirm Password : </label><br />
                        <input type={open ? 'text' : 'password'} name="confirmPassword" id="confirmPaswFiled" placeholder='Confirm your password' autoComplete='off' required />
                    </div>

                    <input className='bg-[red] mt-5 text-white fw-bold hover:cursor-pointer' type="submit" value="Sign Up" />
                    <h2>Already have an account?<Link className='text-blue-600 underline font-xl' to={'/login'}> Login</Link></h2>
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

export default Register;