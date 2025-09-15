import Header from "../components/header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto p-6">
        <p className="text-black">Welcome! Here will be the rest of the components.</p>
      </main>
    </div>
  );
}
