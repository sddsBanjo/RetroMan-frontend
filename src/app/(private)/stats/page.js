"use client"

import { useState, useEffect } from "react"
import {
  Gamepad2,
  Inbox,
  Play,
  CheckCircle2,
  XCircle,
  Star,
} from "lucide-react"

const cards = [
  { key: "total", label: "Total de Jogos", icon: Gamepad2, color: "text-primary" },
  { key: "backlog", label: "Backlog", icon: Inbox, color: "text-muted-foreground" },
  { key: "playing", label: "Jogando", icon: Play, color: "text-blue-500" },
  { key: "completed", label: "Completos", icon: CheckCircle2, color: "text-green-500" },
  { key: "dropped", label: "Abandonados", icon: XCircle, color: "text-red-500" },
  { key: "wishlist", label: "Quero jogar", icon: Star, color: "text-amber-500" },
]

export default function StatsPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/stats", { credentials: "include" })
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    )
  }

  if (!stats || stats.total === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <Gamepad2 className="size-16 text-muted-foreground/40" />
        <p className="text-lg text-muted-foreground">
          Nenhum jogo adicionado ainda.
        </p>
        <p className="text-sm text-muted-foreground/60">
          Adicione jogos na página Games para ver estatísticas.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Estatísticas</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon
          const value = stats[card.key]

          return (
            <div
              key={card.key}
              className="flex items-center gap-4 rounded-xl border bg-card p-5"
            >
              <div className={`${card.color}`}>
                <Icon className="size-8" />
              </div>
              <div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-sm text-muted-foreground">{card.label}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
