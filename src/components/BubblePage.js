//TECH IMPORTS 
import React, { useEffect, useState } from "react";
//COMPONENT IMPORTS
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axiosWithAuth from "../helpers/axiosWithAuth";


const BubblePage = () => {

  const [colorList, setColorList] = useState([]);


  useEffect(()=>{
    axiosWithAuth()
    .get("http://localhost:5000/api/colors")
    .then((res)=>{
      console.log("SUCCEEDED GETTING COLORS IN BUBBLE PAGE", res);
      setColorList(res.data);
    })
    .catch((err)=>{
      console.log("FAILED TO GET COLORS IN BUBBLE PAGE", err);
    })
  },[colorList])


  //BEGIN COMP RETURN 
  return (
    <div>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </div>
  );
};

export default BubblePage;

//Task List:
//1. Make an axios call to retrieve all color data and push to state on mounting.
