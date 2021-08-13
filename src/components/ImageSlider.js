
import React, { useState, useEffect } from 'react';
import { SliderData } from './SliderData';

const ImageSlider = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    //   const [timedCurrent, setTimedCurrent] = useState(0)

    //   useEffect(() => {
    //     setTimeout(() => {
    //         setTimedCurrent(true);
    //     }, 6000)
    //   }, [])

    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
        // setTimedCurrent(timedCurrent === length - 1 ? 0 : current +1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    return (
        <section className='slider'>
            <i onClick={prevSlide} className="fa fa-arrow-circle-left left-arrow" aria-hidden="true"></i>
            <i onClick={nextSlide} className="fa fa-arrow-circle-right right-arrow" aria-hidden="true"></i>
            {SliderData.map((slide, index) => {
                return (
                    <div
                        className={index === current ? 'slide active' : 'slide'}
                        key={index}
                    >
                        {index === current && (
                            <img src={slide.image} alt='travel image' className='image' />
                        )}
                    </div>
                );
            })}
        </section>
    );
};

export default ImageSlider;