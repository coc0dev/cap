import React from 'react'
import '../custom.css'
import ImageSlider from '../components/ImageSlider'
import { SliderData } from '../components/SliderData'

export const Home = () => {
    return (
        <div className="container">
            <h3 className="text-3xl flex mb-2">handmade leather goods</h3>
            <hr />
            <div className="col-md-10 offset-1">
            <ImageSlider slides={SliderData} />
            </div>
        </div>
    )
}
