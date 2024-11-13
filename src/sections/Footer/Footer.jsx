import "./Footer.css";
import { RiHomeOfficeLine } from "react-icons/ri";
import { FaMobileAlt } from "react-icons/fa";
import { FaWhatsapp, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import DesktopViewButton from "../../components/DesktopViewButton";
import logo from "../../assets/Logo/الشعار-2-png.png";
import { MdPrivacyTip } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { FaCashRegister } from "react-icons/fa6";
import { FaBook } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { GrMoreVertical } from "react-icons/gr";
import { FaMicrophoneLines } from "react-icons/fa6";
import { FaCommentAlt } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="text-white text-center text-lg-left">
          <div className="p-3 position-relative">
            <div className="rowFooter">
              <div className="Footer_all_list">
            
                
           <div className="list_footer">

   

                  <div className="Footer_ul">
                  {/* <h5 className=" adress">
                  العنوان: اليابان، طوكيو، هاتشيوجي، هيغاشي  <br />
                   ناكانو، تيراس K&K رقم المكتب 201، ص.ب: 0351-192{" "}
                </h5> */}

                  <ul className="list-unstyled">
                    <a href="tel:+81050-6866-1791">
                      <li>
                        <RiHomeOfficeLine /> رقم الهاتف: 1791-6866-050
                      </li>
                    </a>
                    <a href="tel:+81090-1840-9625">
                      <li>
                        <FaMobileAlt />
                        رقم المحمول: 819018409625+
                      </li>
                    </a>
                    <a href="https://wa.link/3zzbvj">
                      <li>
                        <FaWhatsapp /> واتساب: 819018409625+
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
                        لاين: 819018409625+
                      </li>
                    </a>
                    <a href="mailto:info@japaneseacademy.jp">
                      <li>
                        <MdEmail />
                        info@japaneseacademy.jp
                      </li>
                    </a>
                  </ul>
                  <div className="social_icons">
                    <a href=""><FaFacebook /></a>
                    <a href=""><FaWhatsapp /></a>
                    <a href=""><FaTwitter /></a>
                    <a href=""><FaInstagram /></a>
                  </div>
                </div>

                <div className="group_footer">
                    <div className="group_1_footer">
                      <li className=" active item1 hidden">
                        <Link className="nav-a" to="/">
                          <FaHome />
                          الصفحة الرئيسية
                          <span className="sr-only"></span>
                        </Link>
                      </li>
                      <li className=" item2 hidden">
                        <Link className="nav-a" to="/Level_division">
                          <MdLibraryBooks />
                          تقسيم المستويات
                        </Link>
                      </li>
                      <li className=" item3 hidden">
                        <Link className="nav-a" to="/Fees">
                          <BsCashCoin />
                          الرسوم
                        </Link>
                      </li>
                      <li className=" item4 hidden">
                        <Link to="/Teachers">
                          <FaUserGroup />
                          الهيئة التدريسية
                        </Link>
                      </li>
                      <li className=" item4 hidden">
                        <Link to="/Register">
                          <FaCashRegister />
                          طريقة التسجيل
                        </Link>
                      </li>
                    </div>
                    <div className="group_2_footer">
                      <li className=" item4 hidden">
                        <Link to="/Study_materials">
                          <FaBook />
                          المواد الدراسية
                        </Link>
                      </li>

                      <li className=" item4 hidden">
                        <Link to="/Questions">
                          <FaQuestionCircle />
                          الأسئلة الشائعة
                        </Link>
                      </li>

                      <li className=" item4 hidden">
                        <Link to="/Comments">
                          <FaCommentAlt />
                          آراء الطلاب
                        </Link>
                      </li>
                      <li className=" item4 hidden">
                        <Link to="/More_services">
                          <GrMoreVertical />
                          خدمات إضافية
                        </Link>
                      </li>
                      <li className=" item4 hidden">
                        <Link to="/Support">
                          <FaMicrophoneLines />
                          الدعم الفني
                        </Link>
                      </li>
                    </div>
                    <div className="group_3_footer">
                      <li className="item4 hidden">
                        <Link to="/Privacy">
                          <MdPrivacyTip />
                          سياسة الخصوصية
                        </Link>
                      </li>
                      <li className="item4 hidden">
                        <Link to="/Terms">
                          <FaHandshake />
                          شروط الاستخدام
                        </Link>
                      </li>
                    </div>
                  </div>

                  </div>
                <div className="footer-img">
                  <img className="Logo_Footer" src={logo} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div
            className="text-center p-3"
            style={{ backgroundColor: "darkslategrey" }}
          >
            {" "}
            <ul className="Ulfooter">
              <li>
                <a className="text-white fs-5">
                  Copyright © 2022 Japanese Academy. All Rights Reserved
                </a>
              </li>
              <li className="App">
                <DesktopViewButton />
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
