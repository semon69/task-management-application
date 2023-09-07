import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';

const Registration = () => {
    const { createUser, updateUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleRegister = event => {
        event.preventDefault()
        const form = event.target;
        const userName = form.userName.value;
        const bio = form.bio.value;
        const image = form.image.value;
        const password = form.password.value;
        console.log(bio, userName, password)
        createUser(userName, password)
            .then(result => {
                console.log(result.user)
                updateUser(bio, image)
                Swal.fire('Registration Success')
                form.reset()
                navigate('/')
            })
            .catch(error => console.log(error))
    }
    return (
        <div>
            <div className="hero min-h-screen bg-indigo-950 my-10">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="w-1/2 mr-16">
                        {/* <img src={img} alt="" /> */}
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-white text-black">
                        <div className="card-body">
                            <h1 className="text-3xl font-bold text-center text-orange-400">Sign Up</h1>
                            <form onSubmit={handleRegister}>


                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">User Name or Email</span>
                                    </label>
                                    <input type="email" placeholder="userName or email" name='userName' className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Bio</span>
                                    </label>
                                    <input type="text" placeholder="bio" name='bio' className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Image</span>
                                    </label>
                                    <input type="text" placeholder="Image" name='image' className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="password" name='password' className="input input-bordered" />
                                    
                                </div>
                                <div className="form-control mt-6">
                                    <input className="btn bg-orange-400 font-bold" type="submit" value="Register" />
                                </div>
                            </form>
                            <div>
                                <p className='text-black'>Already have an account? <Link className='text-orange-400' to='/login'>Login</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;