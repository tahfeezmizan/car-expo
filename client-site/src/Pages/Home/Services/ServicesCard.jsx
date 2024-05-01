import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';

const ServicesCard = ({ data }) => {
    const { title, img, price } = data;

    return (
        <div className='p-6 rounded-2xl bg-white'>
            <div className="rounded-2xl overflow-hidden">
                <img src={img} className='w-96 h-72 rounded-2xl object-cover  pb-5' alt="" />
            </div>
            <h2 className="text-2xl font-bold pb-6">{title}</h2>
            <div className="flex justify-between items-center text-red-500">
                <button className='text-xl font-semibold'>Price: ${price}</button>
                <span className='text-xl'><FaArrowRight /></span>
            </div>
        </div>
    );
};

export default ServicesCard;