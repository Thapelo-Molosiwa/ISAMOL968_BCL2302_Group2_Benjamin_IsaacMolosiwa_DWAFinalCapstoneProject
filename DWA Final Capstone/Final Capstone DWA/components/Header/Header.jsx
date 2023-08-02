import React from "react";
import "../Header/header.css"
import { SlButton } from '@shoelace-style/shoelace/dist/react';

export default function Header(){


  return(

    <div className="Header">
      <div>
        <img src="../Images/logo_200x200 (1).pngS"/>
        <SlButton variant="warning">Warning</SlButton>
      </div>
    </div>
  )
}