"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2, Gamepad2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GameFormSheet } from "@/components/game-form-sheet"

const statusColors = {
  Backlog: "bg-muted text-muted-foreground",
  Playing: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  Completed: "bg-green-500/15 text-green-600 dark:text-green-400",
  Dropped: "bg-red-500/15 text-red-600 dark:text-red-400",
  Wishlist: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
}

const statusLabels = {
  Backlog: "Backlog",
  Playing: "Jogando",
  Completed: "Completo",
  Dropped: "Abandonado",
  Wishlist: "Quero jogar",
}

export default function GamesPage() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editingGame, setEditingGame] = useState(null)

  useEffect(() => {
    fetch("/api/games", { credentials: "include" })
      .then((r) => {
        if (!r.ok) throw new Error("Erro ao carregar")
        return r.json()
      })
      .then((data) => setGames(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [refreshKey])

  function refresh() {
    setRefreshKey((k) => k + 1)
  }

  async function handleStatusChange(gameId, newStatus) {
    const res = await fetch(`/api/games/${gameId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status: newStatus }),
    })
    if (res.ok) refresh()
  }

  async function handleDelete(gameId) {
    if (!confirm("Tem certeza que deseja remover este jogo?")) return
    const res = await fetch(`/api/games/${gameId}`, {
      method: "DELETE",
      credentials: "include",
    })
    if (res.ok) refresh()
  }

  function handleEdit(game) {
    setEditingGame(game)
    setSheetOpen(true)
  }

  function handleAdd() {
    setEditingGame(null)
    setSheetOpen(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-500">Erro: {error}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Meus Jogos</h1>
        <Button onClick={handleAdd}>
          <Plus className="size-4 mr-2" />
          Adicionar Jogo
        </Button>
      </div>

      {games.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <Gamepad2 className="size-16 text-muted-foreground/40" />
          <p className="text-lg text-muted-foreground">
            Nenhum jogo no backlog ainda.
          </p>
          <p className="text-sm text-muted-foreground/60">
            Clique em &ldquo;Adicionar Jogo&rdquo; para começar!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((ug) => (
            <div
              key={ug.id}
              className="group relative flex flex-col rounded-xl border bg-card overflow-hidden hover:shadow-md transition-shadow"
            >
              {ug.game.coverUrl ? (
                <div
                  className="h-36 bg-cover bg-center"
                  style={{ backgroundImage: `url(${ug.game.coverUrl})` }}
                />
              ) : (
                <div className="h-36 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <Gamepad2 className="size-12 text-primary/30" />
                </div>
              )}

              <div className="flex flex-col gap-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold leading-tight truncate">
                    {ug.game.title}
                  </h3>
                  <span
                    className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[ug.status]}`}
                  >
                    {statusLabels[ug.status]}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground">
                  {ug.game.platform.name}
                  {ug.game.genre && ` · ${ug.game.genre}`}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                  {ug.personalRating != null && (
                    <span>Nota: {ug.personalRating}/10</span>
                  )}
                </div>

                <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        Status
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <DropdownMenuItem
                          key={value}
                          onSelect={() => handleStatusChange(ug.id, value)}
                          disabled={value === ug.status}
                        >
                          {label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="h-7 w-7"
                    onClick={() => handleEdit(ug)}
                  >
                    <Pencil className="size-3.5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(ug.id)}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <GameFormSheet
        key={editingGame ? editingGame.id : "new"}
        open={sheetOpen}
        onClose={() => {
          setSheetOpen(false)
          setEditingGame(null)
        }}
        game={editingGame}
        onSuccess={refresh}
      />
    </div>
  )
}
