import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import slider1 from '../../assets/images/banner/1.jpg'
import slider2 from '../../assets/images/banner/2.jpg'
import slider3 from '../../assets/images/banner/3.jpg'
import slider4 from '../../assets/images/banner/4.jpg'
import { SwiperSlide, Swiper } from "swiper/react";
import { Parallax, Pagination, Navigation } from 'swiper/modules';

const Slider = () => {
    return (
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                speed={600}
                Parallax={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Parallax, Pagination, Navigation]}
                className="mySwiper homeBanner"
            >
                <SwiperSlide >
                    <div className='w-full md:w-8/12 mx-auto min-h-screen rounded-3xl p-10 py-28' style={{
                        background: `linear-gradient(90.00deg, rgb(21, 21, 21),rgba(21, 21, 21, 0) 100%), url(${slider1})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                                            }}>
                        <div className="w-1/2 pr-36">
                            <h1 className='text-white text-3xl md:text-6xl pb-5 md:pb-8  font-bold '>Affordable Price For Car Servicing</h1>
                            <p className='text-white pb-8 text-lg'>There are many variations of passages of  available, but the majority have suffered alteration in some form</p>
                            <div className="flex gap-3 items-center">
                                <button className='btn border-none bg-red-500 text-white px-10 text-xl'>Discover More</button>
                                <button className='btn btn-outline text-white px-10 text-xl'>Discover More</button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide >
                    <div className='w-full md:w-8/12 mx-auto min-h-screen rounded-3xl p-10 py-28' style={{
                        background: `linear-gradient(90.00deg, rgb(21, 21, 21),rgba(21, 21, 21, 0) 100%), url(${slider2})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                                            }}>
                        <div className="w-1/2 pr-36">
                            <h1 className='text-white text-3xl md:text-6xl pb-5 md:pb-8  font-bold '>Affordable Price For Car Servicing</h1>
                            <p className='text-white pb-8 text-lg'>There are many variations of passages of  available, but the majority have suffered alteration in some form</p>
                            <div className="flex gap-3 items-center">
                                <button className='btn border-none bg-red-500 text-white px-10 text-xl'>Discover More</button>
                                <button className='btn btn-outline text-white px-10 text-xl'>Discover More</button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper >
        </>
    );
};

export default Slider;