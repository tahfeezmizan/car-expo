import { useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hook/UseAxiosSecure";
import ServicesCard from "./ServicesCard";

const Services = () => {
    const [service, setService] = useState([]);
    const [asc, setAsc] = useState(true)
    const axiosSecure = UseAxiosSecure();
    console.log(service);

    useEffect(() => {
        axiosSecure.get(`/services?sort=${asc ? 'asc' : "des"}`)
            .then(res => {
                setService(res.data.data)
                console.log(res.data);
            })
    }, [asc]);

    return (
        <div className="bg-gray-50">
            <div className="w-full md:w-8/12 mx-auto rounded-3xl py-20">
                <div className="title text-center">
                    <h4 className="text-xl font-bold pb-5 text-red-500">Service</h4>
                    <h2 className="text-5xl font-bold pb-5">Our Service Area</h2>
                    <p className="text-gray-400 pb-12 w-1/2 mx-auto">the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>

                    <button
                        onClick={ () => {setAsc(!asc)}}
                        className="btn bg-red-500 text-white">
                        {asc ? 'Price High to Low' : "Price Low to High"}
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        service?.map(services => <ServicesCard
                            data={services}
                            key={services._id}
                        ></ServicesCard>)
                    }
                </div>
                <div className="text-center pt-14">
                    <button className='btn btn-outline border-red-500 text-red-500 px-10 text-lg'>Discover More</button>
                </div>
            </div>
        </div>
    );
};

export default Services;