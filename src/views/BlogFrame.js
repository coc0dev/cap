import React from 'react'
import bag_shadow from '../images/bag_shadow.JPG'

export const BlogFrame = () => {
    return (
        <div className="container">
            <h3>Post Title</h3>
            <hr />
            <div className="card mb-4 col-md-8 offset-2">
                <div className="card-body">
                    <img className="card-img-bottom mb-4" src={bag_shadow} alt="dulles bag" />
                    <p className="card-text">This is some text about the photo</p>
                </div>
            </div>
            <div className="card mb-4 col-md-8 offset-2">
                <div className="card-body">
                    <img className="card-img-bottom mb-4" src={bag_shadow} alt="dulles bag" />
                    <p className="card-text">This is some text about the photo</p>
                </div>
            </div>
        </div>

    )
}
