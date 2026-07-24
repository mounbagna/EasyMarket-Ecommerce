import Hero from "./Hero";
import Categories from "../Categories";
import NewArrival from "./NewArrivals";
import Shops from "./Shops";
import Subscription from "../Subscription";
import SecondHand from "./SecondHand";
import FeedbackForm from "../Feedback/Feedback";

const Home = () => {
  return (
    <main>
      <Hero />
      <Shops />
      <Categories />
      <NewArrival />
      <Subscription />
      <SecondHand />
      <FeedbackForm />
    </main>
  );
};

export default Home;
