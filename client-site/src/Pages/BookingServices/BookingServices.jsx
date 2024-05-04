import { useEffect, useReducer, useState } from "react";
import UseAuth from "../../Hook/UseAuth";
import { RxCross2 } from "react-icons/rx";

const BookingServices = () => {
    const [item, setItem] = useState([]);
    const { user } = UseAuth();

    const url = `http://localhost:5000/bookings?email=${user?.email}`
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setItem(data)
                console.log(data);
            })
    }, []);

    return (
        <div className="w-full md:w-8/12 mx-auto rounded-3xl py-20">
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Service Name</th>
                            <th>Price</th>
                            <th>Data</th>
                            <th></th>
                        </tr>
                    </thead>
                    {
                        item.map(data => <>
                            <tbody>
                                <tr>
                                    <th><RxCross2 /></th>
                                    <th><img className="w-32 " src={data.img} alt="" /></th>
                                    <td>{data.service}</td>
                                    <td>{data.service_price}</td>
                                    <td>{data.date}</td>
                                    <td>
                                        <button className="btn">pending</button>
                                    </td>
                                </tr>
                            </tbody>
                        </>)
                    }
                </table>
            </div>
        </div>
    );
};

export default BookingServices;