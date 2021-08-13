import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { WishlistItem } from '../components/WishlistItem'
import { DataContext } from '../context/DataProvider';


export const Wishlist = (props) => {

    const [newWishlist, setNewWishlist] = useState({});
    const { wishlist } = useContext(DataContext)
    
    const handleUpdate = (infoObj) => {
        if (infoObj.id in newWishlist) {
            let newDict = {...newWishlist};
            newDict[infoObj.id] = infoObj.quantity;
            setNewWishlist(newDict);
        }
        else {
            let newDict = {};
            newDict[infoObj.id] = infoObj.quantity;
            setNewWishlist({...newWishlist, ...newDict })
        }
    }

    return (
        <div>
            <div className="card shopping-cart mb-4">
                <div className="card-header bg-secondary text-light">
                    <i className="fa fa-heart-o mr-1" aria-hidden="true"></i>
                    Wishlist
                    <Link to="/shop" className="btn btn-outline-light btn-sm pull-right">Continue Shopping</Link>
                    <div className="clearfix"></div>
                </div>
                <div className="card-body">
                    {/* <!-- PRODUCTS --> */}
                    {Object.values(wishlist.items).map(productInfo => <WishlistItem handleUpdate={handleUpdate} key={ productInfo.id } data={ productInfo } />) }
                    {/* <!-- END PRODUCTS --> */}
                    <div className="pull-right">
                        <button onClick={() => handleUpdate} className="btn btn-outline-secondary pull-right">
                            Update Wishlist
                        </button>
                    </div>
                </div>
                <div className="card-footer bg-secondary">
                    <div className="text-right text-light">
                       
                    </div>
                    </div>
                </div>
            </div>
    )
}
