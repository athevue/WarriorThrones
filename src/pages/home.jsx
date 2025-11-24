import Header from "../components/homeComponents/header";
import Quick from "../components/homeComponents/quickActions";
import TopRated from "../components/homeComponents/topRated";
import RecentActivity from "../components/homeComponents/recentActivity";


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
