import { useState } from "react";
import BrowseCard from "../components/browseBathroomsComp/browseCard";
import Header from "../components/browseBathroomsComp/headerBrowse";

export default function BrowseBathrooms() {
  const [bathroomCount, setBathroomCount] = useState(0);

  return (
    <div>
      <Header count={bathroomCount} />
      <BrowseCard setBathroomCount={setBathroomCount} />
    </div>
  );
}
