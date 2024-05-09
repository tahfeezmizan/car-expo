import React, { useEffect, useState } from 'react';
import UseAuth from '../../Hook/UseAuth';
import { useParams } from 'react-router-dom';
import UseAxiosSecure from '../../Hook/UseAxiosSecure';

const BookServices = () => {
    const { user } = UseAuth();
    const [data, setData] = useState([]);
    const { id } = useParams();
    const axiosSecure = UseAxiosSecure();

    console.log('Services Booking Data', data);

    useEffect(() => {
        // fetch(`https://y-mauve-eight.vercel.app/services/${id}`)
        //     .then(res => res.json())
        //     .then(result => {
        //         setData(result);
        //     })
        axiosSecure.get(`/services/${id}`)
        .then(res => {
            setData(res.data.data)
        })
    }, [id]);

    const { _id, title, price, img } = data;

    const handleCheckOut = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const contactemail = form.contactemail.value;
        const date = form.date.value;
        const description = form.description.value;
        const email = user?.email;

        const order = {
            img,
            name,
            date,
            email,
            contactemail,
            description,
            service: title,
            service_price: price,
            service_id: _id,
        };

        fetch('https://y-mauve-eight.vercel.app/bookings', {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.insertedId) {
                    alert('order conform')
                    form.reset()
                }
            })
    }

    return (
        <div className="w-full md:w-8/12 mx-auto">

            <h1 className="text-5xl">Check Out Page</h1>
            <h1 className="text-5xl">Product Item {data?.title}</h1>

            <div className="max-w-screen-md mx-auto border rounded-lg p-12 my-10">
                <form onSubmit={handleCheckOut}>
                    <div className="flex flex-col md:flex-row gap-0 md:gap-8">
                        <div className="flex-1 space-y-2 mb-4">
                            <input
                                type="text" name="name"
                                placeholder="Your Name Name"
                                className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="flex-1 space-y-2 mb-4">
                            <input
                                type="Number" name="price"
                                placeholder="$"
                                defaultValue={price}
                                className="input input-bordered w-full max-w-xs"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-0 md:gap-8">
                        <div className="flex-1 space-y-2 mb-4">
                            <input
                                type="email" name="contactemail"
                                placeholder="Contact Email"
                                className="input input-bordered w-full max-w-xs"
                            />
                        </div>
                        <div className="flex-1 space-y-2 mb-4">
                            <input
                                type="date" name="date"
                                placeholder="date"
                                className="input input-bordered w-full max-w-xs"
                            />
                        </div>
                    </div>
                    <div className=" space-y-2 mb-4">
                        <textarea
                            name='description'
                            placeholder="Product Description"
                            className="textarea textarea-bordered  w-full"></textarea>
                    </div>
                    <input type="submit" value="Submit" className="w-full btn bg-[#d01818] hover:bg-[#0d1637] text-white text-xl font-bold" />
                </form>
            </div >
        </div >
    );
};

export default BookServices;