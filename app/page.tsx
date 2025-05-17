import Footer from "@/components/global/Footer";
import Hero from "@/components/global/Hero";
import Navbar from "@/components/global/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
