import { BrainCircuit, Users, PenIcon, Shapes } from "lucide-react"
import { MagicCard } from "@/components/magicui/magic-card";
const features = [
  {
    name: "Rich Text Editor",
    description: "Write with our distraction-free editor that supports rich formatting, images, and code blocks.",
    icon: PenIcon,
  },
  {
    name: "Build Community",
    description: "Connect with readers through comments, subscriptions, and social sharing features.",
    icon: Users,
  },
  {
    name: "AI Integration",
    description: "Take the adavantage of latest AI features to enhance your creativity and ideas , and thus the experience.",
    icon: BrainCircuit,
  },
  {
    name: "Real-Time Collaboration",
    description: "Co-write with other creators in real time—edit posts together, leave comments, and build something awesome, even from across the globe.",
    icon: Shapes,
  },
]

export default function Features() {
  return (
    <section className=" space-y-16 py-24 md:py-32 px-24">
      <div className="w-full text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl ">Everything you need to Blog</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Powerful features designed to help you focus on what matters most - your content.
        </p>
      </div>
      <div className="grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-4">
        {features.map((feature) => (
          <MagicCard
            gradientColorLight="#ffc8dd"
            key={feature.name}
            className="relative overflow-hidden rounded-lg border bg-background p-8">
            <div className="flex items-center gap-4">
              <feature.icon className="h-10 w-10 border-2 p-2  rounded" />
              <h3 className="font-bold">{feature.name}</h3>
            </div>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </MagicCard>
        ))}
      </div>
    </section>
  )
}
