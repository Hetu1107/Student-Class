import React, { useEffect } from "react";
import "../../css/loader.css";
import img from '../../assets/Gif/loader.gif'
function Loader() {
  return (
    <div className="loader_body">
      <img src={img}></img>
    </div>
  );
}

export default Loader;
