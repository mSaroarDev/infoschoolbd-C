import { Helmet } from "react-helmet";
import Features from "./home-design/Features";
import Footer from "./home-design/Footer";
import Navbar from "./home-design/Navbar";
import Pricing from "./home-design/Pricing";
import Services from "./home-design/Services";
import Statistics from "./home-design/Statistics";
import Topbar from "./home-design/Topbar";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us || infoSchoolBD</title>
        <meta
          name="description"
          content="infoschoolbd || Modern School Management Software"
        />
        <link rel="canonical" href="https://infoschoolbd.com/about-us" />
      </Helmet>

      <Topbar />
      <Navbar />
      <Features />
      <Services />
      <Statistics />
      <Pricing />
      <Footer />
    </>
  );
}
