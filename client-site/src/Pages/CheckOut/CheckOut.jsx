import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CheckOut = () => {
    const [data, setData] = useState([]);
    const id = useParams();
    console.log(id);

    useEffect(() => {
        fetch(`http://localhost:5000/services/${id}`)
        .then(res => res.json())
        .then(result => {
            console.log(result)
        })
    }, [])

    return (
        <div>
            <h1 className="text-5xl">Check Out Page</h1>
        </div>
    );
};

export default CheckOut;