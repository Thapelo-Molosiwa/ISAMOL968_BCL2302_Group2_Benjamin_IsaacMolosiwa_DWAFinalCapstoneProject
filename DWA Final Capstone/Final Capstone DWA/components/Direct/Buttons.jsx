import React from "react";

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
              <SlMenuItem>Descending</SlMenuItem>
              <SlMenuItem>Asccending</SlMenuItem>
             
            </SlMenu>
          </SlDropdown>
        </SlButtonGroup>
      </div>

     

   
     

    </div>
  );
}
