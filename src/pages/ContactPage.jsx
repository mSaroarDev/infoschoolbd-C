import { Helmet } from "react-helmet";
import Contact from "./home-design/Contact";
import Footer from "./home-design/Footer";
import Navbar from "./home-design/Navbar";
import RequestFreeDemo from "./home-design/RequestFreeDemo";
import Topbar from "./home-design/Topbar";

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact US || infoSchoolBD</title>
        <meta
          name="description"
          content="infoschoolbd || Modern School Management Software"
        />
        <link rel="canonical" href="https://infoschoolbd.com/contact" />
      </Helmet>

      <Topbar />
      <Navbar />
      <RequestFreeDemo />
      <Contact />
      <Footer />
    </>
  );
}
