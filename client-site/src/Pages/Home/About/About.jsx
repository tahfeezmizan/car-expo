import person from '../../../assets/images/about_us/person.jpg'
import parts from '../../../assets/images/about_us/parts.jpg'


const About = () => {
    return (
        <div className="w-full md:w-8/12 mx-auto rounded-3xl py-20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-64 md:gap-12">
                <div className="flex-1 relative">
                    <img src={person} className='w-3/4 h-4/5 rounded-lg' alt="" />
                    <img src={parts} className='w-1/2 absolute right-0 top-2/3 border-8 rounded-lg border-white' alt="" />
                </div>
                <div className="flex-1">
                    <h4 className="text-xl font-bold pb-5 text-red-500">About Us</h4>
                    <h2 className="text-5xl font-bold pb-8">We are qualified & of experience in this field</h2>
                    <p className="text-gray-400 pb-5">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                    <p className="text-gray-400 pb-8">the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                    <button className='btn border-none bg-red-500 text-white px-10 text-xl'>Get More Info</button>
                </div>
            </div>
        </div>
    );
};

export default About;