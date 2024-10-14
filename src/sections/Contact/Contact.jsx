import "./Contact.css";
import { FaFolderPlus } from "react-icons/fa";


export default function Contact() {

  return (
    <>
      <div className="container mb-5" >


        <form method="POST" action="https://formsubmit.co/contact@sawagroup.jp" encType="multipart/form-data" id="Contact">
        <label>Name-form</label>
          <input type="text" name="user_name" required />
          <label>Email-form</label>
          <input type="email" name="user_email" required/>
          <label>Phone-form</label>
          <input type="number" name="user_number" required/>
          <label>Textarea-form</label>
          <textarea name="message"></ textarea>
          <label>File-form</label>
          <label className="btnfolder" htmlFor="btnfolder"><FaFolderPlus /></label>
          <input type="file" className="visb" id="btnfolder" name="attachment" accept="image/png, image/jpeg ,image/jpg ,.xlsx , .pdf ,.docx , .doc "  />
          <input type="submit" value="Send-form" />
          <input type="hidden" name="_captcha" value="false" />
</form>
      </div>
    </>
  );
}
