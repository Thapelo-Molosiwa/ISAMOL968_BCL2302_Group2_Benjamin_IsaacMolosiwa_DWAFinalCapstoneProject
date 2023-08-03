import React from "react";
import "../Direct/Buttons.css";
import {
  SlButton,
  SlButtonGroup,
  SlDropdown,
  SlMenu,
  SlMenuItem,
} from "@shoelace-style/shoelace/dist/react";

export default function Buttons() {
  return (
    <div className="Buttons">

      <div className="ButtonOne">
        <SlButtonGroup label="Example Button Group">
          <SlButton variant="primary">Sort</SlButton>
          <SlDropdown placement="bottom-end">
            <SlButton slot="trigger" variant="primary" caret></SlButton>
            <SlMenu>
              <SlMenuItem>A-Z</SlMenuItem>
              <SlMenuItem>Z-A</SlMenuItem>
             
            </SlMenu>
          </SlDropdown>
        </SlButtonGroup>
      </div>

      <div className="ButtonTwo">

      <SlButtonGroup label="Example Button Group">
          <SlButton variant="primary">Favourites</SlButton>
          <SlDropdown placement="bottom-end">
            <SlButton slot="trigger" variant="primary" caret></SlButton>
            <SlMenu>
              <SlMenuItem>Descending</SlMenuItem>
              <SlMenuItem>Asccending</SlMenuItem>
             
            </SlMenu>
          </SlDropdown>
        </SlButtonGroup>
      </div>

   
     

    </div>
  );
}
