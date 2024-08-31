import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const main = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default main;
