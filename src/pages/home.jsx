import Header from "../components/header";
import Quick from "../components/quickActions";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Quick />
    </div>
  );
}
