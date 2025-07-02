import AppDownload from "../../components/appdownlaod/AppDownload";
import Banner from "../../components/banner/Banner";
import Food from "../../components/food/Food";


const Home: React.FC = () => {
  return (
    <div>
      <Banner />
      <Food />
      <AppDownload />
    </div>
  );
};

export default Home;