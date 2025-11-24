import React from "react";
import "./topRated.css";
import BathroomCard from "./bathroomCard";

export default function Header() {
    const bathrooms = [
        {
            name: "State Hall Bathroom",
            rating: 9.5,
            location: "Room 204",
            numReviews: 25
        },
        {
            name: "Student Center Bathroom",
            rating: 8.9,
            location: "Room 101",
            numReviews: 10
        },
        {
            name: "STEM Building Bathroom",
            rating: 6.7,
            location: "Room 002",
            numReviews: 17
        }
    ]
    
    return ( 
        <div>
             <h1>Top Rated Bathrooms</h1>
            <div style={{ }}>
                    {bathrooms.map((bathroom, index) => (
                        <BathroomCard
                            key={index}
                            name={bathroom.name}
                            rating={bathroom.rating}
                            location={bathroom.location}
                            numReviews={bathroom.numReviews}
                        />
                    ))}
                </div>
        </div>
    

    );
}