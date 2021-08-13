import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../firebase'
import { Popup } from './Popup'
import emailjs from 'email-js'

export const Footer = () => {

    const [buttonPopup, setButtonPopup] = useState(false)

    const handleClick = (event) => {
        event.preventDefault();
        
        const subscribeData = {
            name: event.target.name.value,
            email: event.target.email.value,
        }
        
        // if (subscribeData.name > 5) {
            firebase.firestore().collection('subscribers').add(subscribeData)
                .then((docRef) => {
                    // console.log('new subscriber.');
                    // console.log(docRef.text)
                })
                .catch(err => console.error(err))
                event.target.reset()
                // console.log(subscribeData)
            // }


    };
    return (
        <div>
            <div>
                <form className="footer-form" onSubmit={handleClick} method="POST">
                    <p className="text-center">Sign up to receive updates.</p>
                    <div className="form-row mt-3 mb-4">
                        <div className="col">
                            <input minLength="5" type="text" id="name" name="name" className="form-control" placeholder="Name" />
                        </div>
                        <div className="col">
                            <input type="email" id="email" name="email" className="form-control" placeholder="Email" />
                        </div>
                        <button onClick={() => setButtonPopup(true)} className="btn btn-secondary" type="submit">Subscribe</button>
                        {/* <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                        </Popup> */}
                    </div>
                </form>
            </div>
            <hr />
            <ul className="text-center row list-unstyled">
                <li className="list-item col">
                    <Link className="text-dark nav-link" to="/">Home</Link>
                </li>
                <li className="list-item col">
                    <Link className="text-dark nav-link" to="Blog">Blog</Link>
                </li>
                <li className="list-item col">
                    <Link className="text-dark nav-link" to="Contact">Contact</Link>
                </li>
            </ul>
            <div>
                <p className="text-center"><i className="fa fa-copyright" aria-hidden="true"></i>2021 Evan Colondres</p>
            </div>
        </div>
    )
}
