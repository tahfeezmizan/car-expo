import About from "./About/About";
import Services from "./Services/Services";
import Slider from "./Slider";

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <About></About>
            <Services></Services>
        </div>
    );
};

export default Home;