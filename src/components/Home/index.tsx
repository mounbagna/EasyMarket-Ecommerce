import Hero from "./Hero";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import Shops from "./Shops";

const Home = () => {
  return (
    <main>
      <Hero />
      <Shops />
      <Categories />
      <NewArrival />
    </main>
  );
};

export default Home;
