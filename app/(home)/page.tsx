import Navbar from "@/app/(home)/components/navbar"
import Hero from "./components/hero"
import Features from "./components/features"
import CTA from "./components/cta"
import Footer from "./components/footer"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute  inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute  -right-0 top-0 h-[100%] w-[50%] dark:bg-blue-500/10 blur-[80px] bg-blue-500/20" />
        <div className="absolute bottom-0 left-0 h-[100%] w-[50%] dark:bg-purple-500/10 blur-[80px] bg-purple-500/20" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <CTA />
        <Footer />
      </div>
    </div>
  )
}
