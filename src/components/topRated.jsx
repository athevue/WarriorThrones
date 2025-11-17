import React from "react";
import "./topRated.css";
import BathroomCard from "./bathroomCard";

export default function Header() {
    const bathrooms = [
        {
            name: "Central Park Restroom",
            rating: 4.8,
            location: "Central Park, NYC",
            numReviews: 120
        },
        {
            name: "Downtown Public Bathroom",
            rating: 4.7,
            location: "5th Avenue, NYC",
            numReviews: 95
        },
        {
            name: "Riverside Restroom",
            rating: 4.9,
            location: "Riverside Drive, NYC",
            numReviews: 150
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
                            description={bathroom.location}
                            numReviews={bathroom.numReviews}
                        />
                    ))}
                </div>
        </div>
    

    );
}