import Hero from "./components/Hero";
import ProductHighlights from "./components/ProductHighlights";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductHighlights />
      <Footer />
    </>
  );
}