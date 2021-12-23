import React, { useEffect, useState } from 'react'
import { Camera, SliderData } from '../../../../constants/Image'
import { Image, Slider, SliderItem } from './Style'
const AuthSlider = () => {
    const [current, setCurrent] = useState(0)
    const length = SliderData.length
    useEffect(() => {
        const Slider = setInterval(() => {
            setCurrent(current === length - 1 ? 0 : current + 1) 
        },2500);
        return () => {
           clearInterval(Slider)
        }
    }, [current, length])
    return (
        <Slider>
            <SliderItem>
                <img src={Camera} alt="" />
                {SliderData.map((item, index) => (
                    index === current && (
                        <Image key={index} src={item.image} alt="" />
                    )
                ))} 
             </SliderItem>
        </Slider>
    )
}

export default AuthSlider
