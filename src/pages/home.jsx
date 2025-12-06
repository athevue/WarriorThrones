import Header from "../components/homeComp/header";
import Quick from "../components/homeComp/quickActions";
import TopRated from "../components/homeComp/topRated";
import RecentActivity from "../components/homeComp/recentActivity";


export default function Home() {
  return (
    <div className="home">
      <Header />
      <Quick />
      <TopRated />
      <RecentActivity />
    </div>
  );
}
