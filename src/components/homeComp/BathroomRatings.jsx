// import { useEffect, useState } from "react"
// import { supabase } from "../lib/supabase"

// export default function BathroomRatings() {
//   const [ratings, setRatings] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchRatings = async () => {
//       const { data, error } = await supabase
//         .from("BathroomRating")
//         .select("*")

//     console.log("DATA:", data)
//     console.log("ERROR:", error)

//       if (error) {
//         setError(error.message)
//       } else {
//         setRatings(data)
//       }

//       setLoading(false)
//     }

//     fetchRatings()
//   }, [])

//   if (loading) return <p>Loading...</p>
//   if (error) return <p>Error: {error}</p>

//   return (
//     <div>
//       <h2>Bathroom Ratings</h2>
//       <ul>
//         {ratings.map((item) => (
//           <li key={item.id}>
//             <strong>{item.building}</strong> — Floor: {item.floor} — {item.overallRating}/10  
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }
