import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import UseAuth from "../../Hook/UseAuth";
import UseAxiosSecure from "../../Hook/UseAxiosSecure";
import { apiURL } from "../../constant";

const BookingServices = () => {
    const { user } = UseAuth();
    const [item, setItem] = useState([]);
    const axiosSecure = UseAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/bookings?email=${user?.email}`)
            .then(res => {
                setItem(res.data)
            })
    }, []);

    // bookings item delete 
    const handleDelete = (id) => {
        const proceed = confirm('Are you Sure?');

        if (proceed) {
            // console.log(id);
            fetch(`${apiURL}/bookings/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.deletedCount > 0) {
                        alert('deleted sucessfully');
                        const remaning = item.filter(data => data._id !== id);
                        setItem(remaning);
                    }
                })
        }
    }


    const handleApprove = id => {
        fetch(`${apiURL}/bookings/${id}`, {
            method: 'PATCH',
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ status: "Confirm" })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.modifiedCount > 0) {
                    alert('Documnet update');
                    const remaning = item.filter(data => data._id !== id);
                    const updated = item.find(data => data._id === id);
                    updated.status = "Confirm";
                    const newUpdate = [updated, ...remaning];
                    setItem(newUpdate);
                }
            })
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
                        item?.map(data => <>
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
                                        {
                                            data.status === 'Confirm' ? <span className="font-bold text-green-500">Confirm</span> :
                                                <button onClick={() => handleApprove(data._id)} className="btn">Confirm</button>
                                        }
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