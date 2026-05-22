import MainLayouts from "../layouts/MainLayouts";
import InfoPage from "../components/InfoPage";
import FormSend from "../fragments/FormSend";
import Footer from "../fragments/Footer";

const Send = () => {
  return (
    <>
      <MainLayouts>
        <InfoPage
          title="Message Deletion Not Available"
          description="Currently, we do not support message deletion. Once a message is posted, it cannot be removed. Please ensure your messages are appropriate before submitting.

We really value your privacy. Please make sure not to share sensitive personal information in your messages. Your security and privacy is our priority"
        />

        <FormSend />
      </MainLayouts>
      <Footer />
    </>
  );
};

export default Send;
