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

    const handleDelete = (id) => {
        const proceed = confirm('Are you Sure?');

        if (proceed) {
            console.log(id);
            fetch(`http://localhost:5000/bookings/${id}`, {
                method: 'DELETE',
                headers: {"content-type": "application/json"},
                body: JSON.stringify(id)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
        }
    }


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
                                    <th>
                                        <button className="btn rounded-full" onClick={() => handleDelete(data._id)}><RxCross2 /></button>
                                    </th>
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