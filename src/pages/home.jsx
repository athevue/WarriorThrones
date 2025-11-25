import Header from "../components/homeComp/header";
import Quick from "../components/homeComp/quickActions";
import TopRated from "../components/homeComp/topRated";
import RecentActivity from "../components/homeComp/recentActivity";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Quick />
      <TopRated />
      <RecentActivity />
    </div>
  );
}
