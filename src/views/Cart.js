import React, { useContext, useEffect, useState } from 'react'
import { CartItem } from '../components/CartItem'
import { useAuth } from '../context/AuthProvider';
import { DataContext } from '../context/DataProvider';
import firebase from '../firebase';
import { Link } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'

export const Cart = () =>
{
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
    const params = new URLSearchParams(window.location.search)
    const clearCart = params.get('clear_cart')
    const db = firebase.firestore();
    const { currentUser } = useAuth();
    const { cart, getCart } = useContext(DataContext);
    const [newCart, setNewCart] = useState({});
    
    const handleUpdate = (infoObj) => {
        if (infoObj.id in newCart) {
            let newDict = {...newCart};
            newDict[infoObj.id] = infoObj.quantity;
            setNewCart(newDict);
        }
        else {
            let newDict = {};
            newDict[infoObj.id] = infoObj.quantity;
            setNewCart({...newCart, ...newDict })
        }
    }
    // console.log(Object.values(cart.items))
    
    // useEffect(() => {
    //     if (clearCart.get('clear_cart')=='1') {
    //         db.collection('users').doc(currentUser.id).collection('cart').get()
    //             .then((snapshot) => {
    //             snapshot.forEach(doc => {
    //                 doc.ref.delete()
    //             })
    //             getCart()
    //         })
    //     }
    // }, [clearCart])

    useEffect(() => {
        Object.keys(newCart).forEach(prod =>
        {
            db.collection('users').doc(currentUser.id).collection('cart').doc(prod).update({
                quantity: newCart[ prod ]
            }).catch(err => console.error(err))
        })
    }, [ newCart, currentUser.id, db])

    const handleCheckout = async (e) => {
        e.preventDefault();

        // console.log(cart)
        const stripe = await stripePromise
        fetch('/api/shop/checkout', {
            method: 'POST',
            mode: 'no-cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(cart)
        })
            .then(res => res.json())
            .then(checkout => {
                // console.log(checkout)
                stripe.redirectToCheckout({sessionId: checkout.session_id})
            })
            
    };

    return (
            <div className="card shopping-cart mb-4">
                <div className="card-header bg-secondary text-light">
                    <i className="fa fa-shopping-bag mr-1" aria-hidden="true"></i>
                    Shopping Bag
                    <Link to="/shop" className="btn btn-outline-light btn-sm pull-right">Continue Shopping</Link>
                    <div className="clearfix"></div>
                </div>
                <div className="card-body">
                    {/* <!-- PRODUCTS --> */}
                    {Object.values(cart.items).map(productInfo => <CartItem handleUpdate={handleUpdate} key={ productInfo.id } data={ productInfo } />) }
                    {/* <!-- END PRODUCTS --> */}
                    <div className="pull-right">
                        <button onClick={() => handleUpdate} className="btn btn-outline-secondary pull-right">
                            Update Shopping Bag
                        </button>
                    </div>
                </div>
                <div className="card-footer bg-secondary">
                    <div className="text-right text-light">
                        <div className="cart-totals">
                            Subtotal: <b>${cart.subtotal}</b>
                        </div>
                        <div className="cart-totals">
                            Tax: <b>${cart.taxes}</b>
                        </div>
                        <div className="cart-totals">
                            Grand total: <b>${cart.grandtotal}</b>
                        </div>
                    </div>
                    <div className="pull-right" style={{ margin: "10px" }}>
                        <form id="checkout-form" onSubmit={handleCheckout} method="POST">
                            <input type="submit" className="btn btn-success pull-right" value="Checkout" />
                        </form>
                    </div>
                </div>
            </div>
    )
}