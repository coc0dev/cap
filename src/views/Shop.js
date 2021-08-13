import React, { useContext } from 'react'
import { DataContext } from '../context/DataProvider'
import { Products } from './Products'

export const Shop = () => {
    const { products } = useContext(DataContext);
    return (
        <React.Fragment>
            <h3 className="text-3xl flex mb-2">Shop</h3>
            <hr className="mb-2" />
            <div className="card-deck">
                { products.map(p => <Products key={p.id} product={p} />) }
            </div>
        </React.Fragment>
    )
}
