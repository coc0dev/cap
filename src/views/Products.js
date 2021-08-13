import React, { useContext, useEffect, useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import { DataContext } from '../context/DataProvider';
import firebase from '../firebase'

export const Products = (props) => {
    const {currentUser} = useAuth();
    const { getCart } = useContext(DataContext)
    const { wishlist, getWishlist } = useContext(DataContext)
    const [heart, setHeart] = useState('LOADING')
    
    const db = firebase.firestore();
    let buttonState = currentUser.loggedIn ? 'READY' : 'LOGGEDOUT';
    
    useEffect(() => {
        if (wishlist.hasOwnProperty('items')) {
            setHeart(wishlist.items.hasOwnProperty(props.product.id) ? 'REMOVE' : 'ADD')
        }
    }, [wishlist])

    const heartAdd = (obj) => {
        db.collection('users').doc(currentUser.id).collection('wishlist').doc(props.product.id).get()
            .then(ref => {
                let data;
                if (ref.exists) {
                    data = ref.data();
                    data.quantity+=1;
                }
                else {
                    data = obj;
                    data.quantity = 1;
                }
                db.collection('users').doc(currentUser.id).collection('wishlist').doc(props.product.id).set(data);
                getWishlist();
            })
    }

    const heartDelete = (obj) => {
        db.collection('users').doc(currentUser.id).collection('wishlist').doc(obj.id).delete()
            .then(() => {
                getWishlist();
            })
    }

    const handleClick = (obj) => {

        buttonState = 'LOADING';
        
        db.collection('users').doc(currentUser.id).collection('cart').doc(props.product.id).get()
            .then(ref => {
                // create data variable, because we need to make sure it exists
                let data;
                // if the product.id in the currentUser's cart already exists
                if (ref.exists) {
                    // the quantity attribute should already be set by default, so we can increment its total
                    data = ref.data();
                    data.quantity+=1;
                    // console.log('add new item')
                }
                // otherwise if the product.id has not beenfound in the currentUser's cart
                else {
                    // the quantity attribute does not yet exist, so we will create it and set its value to 1
                    data = obj;
                    data.quantity = 1;
                    // console.log('added item')
                }

                db.collection('users').doc(currentUser.id).collection('cart').doc(props.product.id).set(data);
                // update the state of our cart
                getCart();
                // buttonState = 'READY';
            })
    }
    
    return (
                <div className="col-4">
                    <div className="card mb-3">
                        <div className="card-header">
                            <h6>
                                {props.product.name}
                                <span className="float-right">${ props.product.metadata.price }</span>
                            </h6>
                        </div>
                        <div className="card-body">
                            <img className="card-img-top" src={props.product.images[0]} alt={props.product.name} />
                            {
                                buttonState === 'READY'
                                ?
                                <button onClick={() => handleClick(props.product)} className="btn btn-secondary btn-block fa fa-shopping-bag" style={{marginTop: '10px'}} href="."><span className="ml-2">Add to Cart</span></button>
                                :
                                <button disabled={true} className="btn btn-success btn-block" style={{marginTop: '10px'}} href=".">Please Login</button>
                            }
                            <p className="card-text" style={{marginTop: '10px' }}>{props.product.description}</p>
                            {
                                heart === 'ADD'
                                ?
                                <i onClick={() => heartAdd(props.product)} className="fa fa-heart-o" aria-hidden="true"></i>
                                :
                                <i onClick={() => heartDelete(props.product)} className="fa fa-heart" aria-hidden="true"></i>
                            }
                        </div>
                    </div>
                </div>
            
    )
}
