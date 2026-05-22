// import { Link } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import InfoPage from "../components/InfoPage";
import FormBrowse from "../fragments/FormBrowse";
import Footer from "../fragments/Footer";
// import DesignGridWrapper from "../components/DesignGridWrapper";

const Browse = () => {
  return (
    <>
      <MainLayouts className="relative">
        <InfoPage
          title="Message Deletion Not Available"
          description="Currently, we do not support message deletion. Once a message is posted, it cannot be removed. Please ensure your messages are appropriate before submitting."
        />
        <FormBrowse />
      </MainLayouts>
      <Footer />
    </>
  );
};

export default Browse;
