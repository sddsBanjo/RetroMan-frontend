import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Gamepad2, ListChecks, BarChart3 } from "lucide-react"

const features = [
  {
    icon: Gamepad2,
    title: "Gerencie seus jogos",
    description:
      "Adicione jogos da sua coleção, organize por plataforma e mantenha tudo atualizado.",
  },
  {
    icon: ListChecks,
    title: "Acompanhe seu progresso",
    description:
      "Marque o status de cada jogo: na lista, jogando, completo ou abandonado.",
  },
  {
    icon: BarChart3,
    title: "Estatísticas da jornada",
    description:
      "Veja quantos jogos você já completou, quantos está jogando e muito mais.",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-16 py-16">
      <section className="flex flex-col items-center gap-4 text-center max-w-2xl">
        <div className="flex items-center gap-3">
          <Gamepad2 className="size-10 text-primary" />
          <h1 className="text-5xl font-extrabold tracking-tight">
            RetroMan
          </h1>
        </div>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Organize seu backlog de jogos como nunca antes. Acompanhe o que está
          jogando, o que já zerou e descubra estatísticas da sua jornada gamer.
        </p>
        <p className="text-sm text-muted-foreground italic">
          Inspirado no legado do MegaMan.
        </p>
        <div className="flex gap-4 mt-4">
          <Button size="lg" asChild>
            <Link href="/register">Começar agora</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/login">Fazer login</Link>
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col items-center text-center gap-3 p-6 rounded-xl border bg-card"
          >
            <feature.icon className="size-8 text-primary" />
            <h2 className="text-lg font-semibold">{feature.title}</h2>
            <p className="text-sm text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </section>
    </div>
  )
}
