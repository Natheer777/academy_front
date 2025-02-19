import { useEffect, useState } from "react";
import { Dash_Teacher, Student_Card, Footer, Navbar, VideoCall } from "../../sections";

export default function Dash_Teachers() {
  const [select, setSelect] = useState("");

  const levels = [
    'level_one',
    'level_two',
    'level_three',
    'level_four',
    'level_five',
    'level_six',
    'level_seven',
    'level_eight',
    'level_nine',
    'level_ten',
    'level_eleven',
    'level_twelve',
    'level_thirteen',
    'level_fourteen',
    'level_fifteen',
    'level_sixteen'
  ];

  useEffect(() =>{
    const saveLevel = localStorage.getItem('showVideoCall')
    if(saveLevel){
      setSelect(saveLevel)
    }
  },[])

  const handleLevelChange = (event) => {
    const selectedValue = event.target.value;
    setSelect(selectedValue);
    localStorage.setItem('showVideoCall' ,selectedValue)
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <label htmlFor="level-select">اختر المستوى: </label>
        <select
          id="level-select"
          value={select}
          onChange={handleLevelChange}
        >
          <option value="">-- اختر مستوى --</option> {/* إضافة خيار افتراضي */}
          {levels.map((level, index) => (
            <option key={index} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* عرض VideoCall فقط إذا تم اختيار مستوى */}
      {select && <VideoCall select={select} />}

      <Dash_Teacher />
      <Student_Card />
      <Footer />
    </>
  );
}