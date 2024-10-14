import { useEffect } from "react";
import { Navbar, Header , Contact, Footer } from "../../sections/index";

export default function Home() {
  useEffect(() => {
    document.title = "academy";
  }, []);
  return (
    <>
      <Navbar />
      <Header />
      {/* <Contact /> */}
      <Footer />
    </>
  );
}
