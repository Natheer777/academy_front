import { useState } from 'react';
import { CgScreen } from "react-icons/cg";

const DesktopViewButton = () => {
  const [desktopView, setDesktopView] = useState(false);

  const requestDesktopSite = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.match(/(iphone|ipod|ipad|android)/)) {
      const viewport = document.querySelector("meta[name=viewport]");
      if (viewport) {
        viewport.setAttribute('content', 'width=1250');
      }
    }
    setDesktopView(true);
  };

  return (
    <div>
      <button className='DesktopView m-1' onClick={requestDesktopSite}><h5>PC</h5> <CgScreen /></button>
    </div>
  );
};

export default DesktopViewButton;
