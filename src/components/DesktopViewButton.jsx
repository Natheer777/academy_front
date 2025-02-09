// import  React,{ useState } from 'react';
// import { CgScreen } from "react-icons/cg";

// const DesktopViewButton = () => {
//   const [desktopView, setDesktopView] = useState(false);

//   const requestDesktopSite = () => {
//     const userAgent = navigator.userAgent.toLowerCase();
//     if (userAgent.match(/(iphone|ipod|ipad|android)/)) {
//       const viewport = document.querySelector("meta[name=viewport]");
//       if (viewport) {
//         viewport.setAttribute('content', 'width=1250');
//       }
//     }
//     setDesktopView(true);
//   };

//   return (
//     <div>
//       <button className='DesktopView m-1' onClick={requestDesktopSite}><h5>PC</h5> <CgScreen /></button>
//     </div>
//   );
// };

// export default DesktopViewButton;

import  { useState } from "react";
import { CgScreen } from "react-icons/cg";

export default function DesktopViewButton() {
  const [desktopView, setDesktopView] = useState(false);

  // Function to request desktop site view
  const requestDesktopSite = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.match(/(iphone|ipod|ipad|android)/)) {
      const viewport = document.querySelector("meta[name=viewport]");
      if (viewport) {
        // Modify the viewport content to simulate desktop view
        if (desktopView) {
          // Reset to default mobile viewport
          viewport.setAttribute(
            "content",
            "width=device-width, initial-scale=1"
          );
        } else {
          // Set to desktop viewport
          viewport.setAttribute("content", "width=1250");
        }
      }
    }
    setDesktopView(!desktopView); // Toggle the desktopView state
  };

  return (
    <>
      <div>
        <button className="DesktopView m-1" onClick={requestDesktopSite}>
          <h5>
            PC <br />
            VIEW
            </h5> <CgScreen />
        </button>
      </div>
    </>
  );
}
