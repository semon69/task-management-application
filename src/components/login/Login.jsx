import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useNavigate } from "react-router-dom";
const Login = () => {
    const { user, signIn } = useContext(AuthContext)
    console.log(user)
    const navigate = useNavigate()
    const handleLogin = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.userName.value;
        const password = form.password.value;
        signIn(email, password)
            .then(result => {
                console.log(result.user)
                navigate('/')
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div>
            <div>
                <div className="hero min-h-screen bg-base-200 my-10">
                    <div className="hero-content flex-col lg:flex-row">
                        <div className="w-1/2 mr-16">
                            {/* <img src={} alt="" /> */}
                        </div>
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <div className="card-body">
                                <h1 className="text-3xl font-bold text-center text-orange-500">Login</h1>
                                <form onSubmit={handleLogin}>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">User Name</span>
                                        </label>
                                        <input type="text" placeholder="userName" name='userName' className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input type="password" placeholder="password" name='password' className="input input-bordered" />
                                        <label className="label">
                                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                        </label>
                                    </div>
                                    <div className="form-control mt-6">
                                        <input className="btn btn-error" type="submit" value="Login" />
                                    </div>
                                </form>
                                <div>
                                    <p>Don't have an account? <Link className='text-orange-600' to='/registration'>Register</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;