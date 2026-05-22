import { Link } from "react-router-dom";
import Navbar from "../fragments/Navbar";
import LeftSection from "../fragments/home/LeftSection";
import RightSection from "../fragments/home/RightSection";
import HowSection from "../fragments/home/HowSection";
import ExploreSection from "../fragments/home/ExploreSection";
import Footer from "../fragments/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      {/* main section */}
      <section className="flex flex-col items-center justify-center min-h-screen gap-8 px-6 py-24 lg:flex-row lg:gap-16 lg:py-20 lg:px-32 dark:bg-zinc-800">
        <div className="flex items-center justify-center flex-1 w-full">
          <LeftSection />
        </div>

        <div className="flex items-center flex-1 w-full">
          <RightSection />
        </div>
      </section>

      <div className="w-full p-3 -mt-16 text-center border-b lg:rotate-1 bg-zinc-950 text-zinc-100 border-zinc-950 dark:bg-zinc-950 dark:border-zinc-800">
        <p className="text-sm font-normal tracking-wide md:text-base text-zinc-300 dark:text-zinc-400">
          We'd love to hear your feedback and suggestions to help us improve
          Soundly.
          <Link
            to="/"
            className="mx-1.5 font-medium underline text-white dark:text-zinc-200 underline-offset-4 decoration-zinc-500 hover:decoration-white transition-colors"
          >
            Click here
          </Link>
          to share your thoughts with us!
        </p>
      </div>

      {/* how it works section */}
      <section className="dark:bg-zinc-800">
        <HowSection />
      </section>

      {/* explore section */}
      <section>
        <ExploreSection />
      </section>

      {/* footer */}
      <Footer />
    </>
  );
};

export default Home;
