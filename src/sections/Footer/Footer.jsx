import "./Footer.css";

import logo from "../../assets/Logo/الشعار-2-png.png";
export default function Footer() {
  return (
    <>
      {/* <footer className="footer">
        <MDBFooter
          bgColor="bg-secondary"
          className="text-white text-center text-lg-left"
        >
          <MDBContainer className="p-4">
            <MDBRow>
              <MDBCol lg="3" md="4">
                <div className="text-uppercase">
                  <img className="Logo_Footer" src={logo} alt="" />
                </div>

                <p></p>
              </MDBCol>
              <MDBCol lg="9" md="8">
                <h5 className="text-uppercase adress"> Adress</h5>

                <ul className="list-unstyled">
                  <li>
                    <RiHomeOfficeLine /> Office
                  </li>
                  <li>
                    <FaMobileAlt />
                    Phone
                  </li>
                  <a href="https://wa.link/mr0gya">
                    <li>
                      <FaWhatsapp /> Whatsapp
                    </li>
                  </a>
                  <a href="https://line.me/ti/p/IuAqVt59QV">
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-line"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0c4.411 0 8 2.912 8 6.492 0 1.433-.555 2.723-1.715 3.994-1.678 1.932-5.431 4.285-6.285 4.645-.83.35-.734-.197-.696-.413l.003-.018.114-.685c.027-.204.055-.521-.026-.723-.09-.223-.444-.339-.704-.395C2.846 12.39 0 9.701 0 6.492 0 2.912 3.59 0 8 0M5.022 7.686H3.497V4.918a.156.156 0 0 0-.155-.156H2.78a.156.156 0 0 0-.156.156v3.486c0 .041.017.08.044.107v.001l.002.002.002.002a.15.15 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157m.791-2.924a.156.156 0 0 0-.156.156v3.486c0 .086.07.155.156.155h.562c.086 0 .155-.07.155-.155V4.918a.156.156 0 0 0-.155-.156zm3.863 0a.156.156 0 0 0-.156.156v2.07L7.923 4.832l-.013-.015v-.001l-.01-.01-.003-.003-.011-.009h-.001L7.88 4.79l-.003-.002-.005-.003-.008-.005h-.002l-.003-.002-.01-.004-.004-.002-.01-.003h-.002l-.003-.001-.009-.002h-.006l-.003-.001h-.004l-.002-.001h-.574a.156.156 0 0 0-.156.155v3.486c0 .086.07.155.156.155h.56c.087 0 .157-.07.157-.155v-2.07l1.6 2.16a.2.2 0 0 0 .039.038l.001.001.01.006.004.002.008.004.007.003.005.002.01.003h.003a.2.2 0 0 0 .04.006h.56c.087 0 .157-.07.157-.155V4.918a.156.156 0 0 0-.156-.156zm3.815.717v-.56a.156.156 0 0 0-.155-.157h-2.242a.16.16 0 0 0-.108.044h-.001l-.001.002-.002.003a.16.16 0 0 0-.044.107v3.486c0 .041.017.08.044.107l.002.003.002.002a.16.16 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156Z" />
                      </svg>{" "}
                      Line
                    </li>
                    </a>
                    <a href="mailto:contact@sawagroup.jp">
                      

                    <li>
                      <MdEmail />Email
                    </li>
                  </a>
                </ul>
              </MDBCol>
            </MDBRow>
          </MDBContainer>

          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            &copy; {new Date().getFullYear()}
            <a className="text-white">
              Copyright © 2022 SAWA GROUP LLC. All Rights Reserved.
            </a>
          </div>
        </MDBFooter>
      </footer> */}











<footer className="text-right pt-70 footer">
<div className="container">
<div className="row">
<div className="col-lg-6 col-md-6 col-sm-12 col-12 footerLogo justify-content-center d-flex">
<img src={logo} alt="Logo" className="d-inline-block align-text-top" />

</div>
<div className="col-lg-6 col-md-6 col-sm-12 col-12 justify-content-center align-items-center d-flex">
<h1 className=" left  fw-bold">أكاديمية اللغة اليابانية</h1>

</div>
</div>
</div>



</footer>


    </>
  );
}
