import Hero from "./Hero";
import Categories from "../Categories";
import NewArrival from "./NewArrivals";
import Shops from "./Shops";
import Subscription from "../Subscription";
import SecondHand from "./SecondHand";

const Home = () => {
  return (
    <main>
      <Hero />
      <Shops />
      <Categories />
      <NewArrival />
      <Subscription />
      <SecondHand />
    </main>
  );
};

export default Home;
