import React from "react";
import "./bathroomOfWeek.css";
import BathroomCard from "./bathroomCard";

export default function Header() {
    
    
    return ( 
        <div>
             <h1>Bathroom of the Week!</h1>
                {/* You can adjut Bathroom Card to show bathroom of the week! */}
                <BathroomCard />
        </div>
    

    );
}