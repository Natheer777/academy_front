import "./Questions_details.css";
import {
  FaFacebook,
  FaInstagram,
  FaSnapchat,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
export default function Questions_details() {
  return (
    <>
      <div className="container">
        <div className="row pt-5 pb-5">
          <div className="col-xl-6 col-lg-6">
            <div className="icons">
              <p>
                <FaSnapchat />
              </p>
              <p>
                <FaInstagram />
              </p>
              <p>
                <FaTelegram />
              </p>
              <p>
                <FaWhatsapp />
              </p>
              <p>
                <FaYoutube />
              </p>
              <p>
                <FaTwitter />
              </p>
              <p>
                <FaFacebook />
              </p>
            </div>
            <p className="textIcon text-center m-auto">
              مع أكاديمية اللغة العربية ستكون اللغة العربية هي المادة الأفضل عند
              أبنائك
            </p>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="category">
              <h1>اكاديمية اللغة العربية</h1>
              <h3>الإتقان في تعليم لغة القران</h3>
              <p>
                امنح أبناءك فرصة الاستمتاع بتجربة فريدة ومميزة في تعليم اللغة
                العربية والحفاظ على هويتهم الأصيلة
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
