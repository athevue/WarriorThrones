import Header from "../components/homeComp/header";
import Quick from "../components/homeComp/quickActions";
import BathroomOfWeek from "../components/homeComp/bathroomOfWeek";
import RecentActivity from "../components/homeComp/recentActivity";


export default function Home() {
  return (
    <div className="home">
      <Header />
      <Quick />
      <BathroomOfWeek />
      <RecentActivity />
    </div>
  );
}
