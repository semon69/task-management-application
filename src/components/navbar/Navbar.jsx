import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const handleLogout = () => {
        logOut()
    }
    return (
        <div>
            <div className="navbar bg-indigo-950 text-white">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-2xl font-bold">Task Management</a>
                </div>
                <div className="flex-none gap-2 mx-10">
                    <div className="flex gap-5">
                        <p><NavLink className={({ isActive }) => isActive? "text-orange-400": ""} to='/'>Home</NavLink> </p>
                        <p><NavLink className={({ isActive }) => isActive? "text-orange-400": ""} to='/login'>Login</NavLink> </p>
                    </div>
                    <div className="dropdown dropdown-end">
                        {
                            user ?
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user?.photoURL} />
                                    </div>
                                </label>
                                :
                                ''
                        }
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between" onClick={() => document.getElementById('my_modal_3').showModal()}>Profile</a>
                                <dialog id="my_modal_3" className="modal">
                                    <div className="modal-box">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        </form>
                                        <img src={user?.photoURL} alt="" />
                                        <h3 className="font-bold text-lg">Hello {user?.email}</h3>
                                        <p className="py-4">{user?.displayName}</p>
                                    </div>
                                </dialog>
                            </li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;