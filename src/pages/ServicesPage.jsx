import { Helmet } from "react-helmet";
import Features from "./home-design/Features";
import Footer from "./home-design/Footer";
import Navbar from "./home-design/Navbar";
import Pricing from "./home-design/Pricing";
import Services from "./home-design/Services";
import Topbar from "./home-design/Topbar";

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Services || infoSchoolBD</title>
        <meta
          name="description"
          content="infoschoolbd || Modern School Management Software"
        />
        <link rel="canonical" href="https://infoschoolbd.com/services" />
      </Helmet>

      <Topbar />
      <Navbar />
      <Services />
      <Features />
      <Pricing />
      <Footer />
    </>
  );
}
