import { Helmet } from "react-helmet";
import Features from "./home-design/Features";
import Footer from "./home-design/Footer";
import Navbar from "./home-design/Navbar";
import Pricing from "./home-design/Pricing";
import Topbar from "./home-design/Topbar";

export default function PricingPage() {
  return (
    <>
      <Helmet>
        <title>Pricing || infoSchoolBD</title>
        <meta
          name="description"
          content="infoschoolbd || Modern School Management Software"
        />
        <link rel="canonical" href="https://infoschoolbd.com/pricing" />
      </Helmet>

      <Topbar />
      <Navbar />
      <Pricing />
      <Features />
      <Footer />
    </>
  );
}
