import { useEffect } from "react";
import { Navbar, Header , Contact, Footer, Date_lisson_Header, Fees_material, Register_header, Our_Study_materials, Our_Teachers, More_Services, Supports } from "../../sections/index";

export default function Home() {
  useEffect(() => {
    document.title = "academy";
  }, []);
  return (
    <>
      <Navbar />
      <Header />
      <Date_lisson_Header />
      <Fees_material />
      <Register_header />
      <Our_Study_materials />
      <Our_Teachers />
      <More_Services />
      <Supports />
      {/* <Contact /> */}
      <Footer />
    </>
  );
}
