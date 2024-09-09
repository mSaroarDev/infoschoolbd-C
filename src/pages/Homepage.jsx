import { Helmet } from "react-helmet";
import Contact from "./home-design/Contact";
import Features from "./home-design/Features";
import Footer from "./home-design/Footer";
import Hero from "./home-design/Hero";
import Navbar from "./home-design/Navbar";
import PartnerSchools from "./home-design/PartnerSchools";
import Pricing from "./home-design/Pricing";
import RequestFreeDemo from "./home-design/RequestFreeDemo";
import Services from "./home-design/Services";
import Statistics from "./home-design/Statistics";
import Topbar from "./home-design/Topbar";

export default function Homepage() {
  return (
    <>
      <Helmet>
        <title>infoSchoolBD | Modern School Management Software</title>
        <meta
          name="description"
          content="infoschoolbd || Modern School Management Software"
        />
        <link rel="canonical" href="https://infoschoolbd.com" />
      </Helmet>

      <Topbar />
      <Navbar />
      <Hero />
      <PartnerSchools />
      <Services />
      <Statistics />
      <Features />
      <RequestFreeDemo />
      <Pricing />
      <Contact />
      <Footer />
    </>
  );
}
