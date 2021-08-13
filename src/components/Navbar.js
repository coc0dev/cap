import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import { DataContext } from '../context/DataProvider'
import '../custom.css'

export const Navbar = (props) => {
    const { currentUser, logout } = useAuth();
    const { cart } = useContext(DataContext)
    // console.log(currentUser)

    const handleLogin = (e) => {
        e.preventDefault();
        props.signIn();
        // console.log('logged in successfully');
    }

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        // console.log('register works')
    }
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link className="navbar-brand" to="/">Evan Colondres Leather</Link>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/blog">Blog</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <p className="nav-link dropdown-toggle mb-0" to="." id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Shop</p>
                        <div className="dropdown-menu" aria-labelledby="dropdownId">
                            <Link className="dropdown-item" to="/shop">Products</Link>
                        </div>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                        {
                        !currentUser.loggedIn
                        ?
                        <li className="nav-item-active">
                            <Link onClick={(e) => handleLogin(e)} className="nav-link" to="">Login</Link>
                        </li>

                        :
                        <li className="nav-item">
                            <Link onClick={(e) => handleLogout(e)} className="nav-link" to="">Logout</Link>
                        </li>
                        }
                </ul>
                <div>
                    {
                        currentUser.loggedIn
                        ?
                        <Link to="/profile" className="text-secondary nav-link fa fa-user"></Link>
                        :
                        <></>
                    }
                </div>
                <div className="nav-item">
                    {
                        currentUser.loggedIn
                        ?
                        <Link to="/wishlist" className="text-secondary nav-link fa fa-heart-o"></Link>
                        :
                        <></>
                    }
                </div>
                <div className="nav-item-active">
                <Link to="/cart" className="text-secondary nav-link fa fa-shopping-bag">{cart.quantity}</Link>
                </div>
            </div>
        </nav >
    )
}
