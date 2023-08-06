import React from "react";
import "../Header/header.css"
import { SlIcon } from '@shoelace-style/shoelace/dist/react';




export default function Header(){

  const App = () => <SlAvatar label="User avatar" />;
  return(

    <div className="Header">
      <div className="LogoPic">
       <SlIcon src="https://shoelace.style/assets/images/shoe.svg" style={{ fontSize: '7rem' }}></SlIcon>
      </div>
      <div className="Headddd">
        <h1>
      kick  Budd Podcast
        </h1>

      </div>
    </div>
  )
}