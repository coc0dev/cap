import React, { useEffect, useState, createContext, useCallback } from 'react';
import firebase from '../firebase';
import { useAuth } from './AuthProvider'

export const DataContext = createContext();

export const DataProvider = (props) => {
    const [posts, setPosts] = useState([]);
    const [products, setProducts] = useState([]);
    const [checkout, setCheckout] = useState([]);
    const db = firebase.firestore();
    const { currentUser } = useAuth();
    const [cart, setCart] = useState({items: {}, quantity: 0, subtotal: 0, grandtotal: 0});
    const [wishlist, setWishlist] = useState({items: {}, quantity: 0, subtotal: 0, grandtotal: 0})

    function getCart() {
        let data = {};
        let quantity = 0;
        let subtotal = 0;
        let taxes = 0;
        let grandtotal = 0;
        
        db.collection('users').doc(currentUser.id).collection('cart').get()
            .then(snapshot => {
                snapshot.forEach(ref => {
                    let product = ref.data();
                    data[ref.id] = product
                    // update cart values
                    quantity += product.quantity
                    subtotal += parseFloat(product.price) * quantity;
                    taxes += parseFloat(product.tax) * quantity;
                    grandtotal += subtotal + taxes;
                })
                setCart({items: data, quantity,
                    subtotal: (subtotal/100).toFixed(2),
                    taxes: (taxes/100).toFixed(2),
                    grandtotal: (grandtotal/100).toFixed(2)});
            })
    }

    function getWishlist() {
        let data = {};
        let quantity = 0;
        let subtotal = 0;
        let taxes = 0;
        let grandtotal = 0;
        
        db.collection('users').doc(currentUser.id).collection('wishlist').get()
            .then(snapshot => {
                snapshot.forEach(ref => {
                    let product = ref.data();
                    data[ref.id] = product
                    // update cart values
                    quantity += product.quantity
                    subtotal += parseFloat(product.price) * quantity;
                    taxes += parseFloat(product.tax) * quantity;
                    grandtotal += subtotal + taxes;
                })
                setWishlist({items: data, quantity,
                    subtotal: (subtotal/100).toFixed(2),
                    taxes: (taxes/100).toFixed(2),
                    grandtotal: (grandtotal/100).toFixed(2)});
            })
    }

    useEffect(() => {
        if (currentUser.loggedIn) {
            // if the have items in their cart
            if (cart.hasOwnProperty('items')) {
                getCart()
            }
            getWishlist()
        }
    }, [db, currentUser.loggedIn])


    useEffect(() => {
        var newProducts = []
        fetch('api/shop/products')
        .then(res => res.json())
        .then(products => {
            // console.log(products.data)
            newProducts = [...products.data];
            // console.log(newProducts)
            let productList = []
            for (const p of newProducts) {
                let newP = {...p, price: parseInt(parseFloat(p.metadata.price) * 100),
                    tax: parseInt(parseFloat(p.metadata.tax) * 100)
                }
                productList.push(newP);
            }
            setProducts(productList)
        })
    }, [])

    const getPosts = useCallback(() => {
        let newPosts = []
        // connect to our posts collection
        db.collection('posts').orderBy('dateCreated', 'desc').get().then(ourPosts => {
            // loop over the posts in the collection
            ourPosts.forEach(post => {
            // add new document + the document's key into the list                
            newPosts.push({...post.data(), postId: post.id})
            // console.log(post.id)
            // console.log(post.data())
          })
          // set the state of the posts equal to newPosts
          setPosts(newPosts)
        })
      }, [db]); 

    useEffect(() => {
        // if (currentUser.loggedIn) {
            getPosts();
        // }
    }, [currentUser.loggedIn, getPosts]);

    return (
        <DataContext.Provider value={ { postList: [posts, setPosts], getPosts, products, getCart, getWishlist, wishlist, cart, checkout } }>
            { props.children }
        </DataContext.Provider>
    )
}
