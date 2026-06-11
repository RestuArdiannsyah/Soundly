// import { Link } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import InfoPage from "../components/InfoPage";
import FormBrowse from "../fragments/FormBrowse";
import Footer from "../fragments/Footer";

const Browse = () => {
  return (
    <>
      <MainLayouts className="relative">
        <InfoPage
          title="Browse Moments"
          description="Search and explore shared moments to find songs, messages, and stories shared through music."
        />
        <FormBrowse />
      </MainLayouts>
      <Footer />
    </>
  );
};

export default Browse;
