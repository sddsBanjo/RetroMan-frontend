"use client"

import { useState, useEffect } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const statusOptions = [
  { value: "Backlog", label: "Backlog" },
  { value: "Playing", label: "Jogando" },
  { value: "Completed", label: "Completo" },
  { value: "Dropped", label: "Abandonado" },
  { value: "Wishlist", label: "Quero jogar" },
]

export function GameFormSheet({ open, onClose, game, onSuccess }) {
  const [title, setTitle] = useState(game?.game?.title ?? "")
  const [platformId, setPlatformId] = useState(game?.game?.platformId ?? "")
  const [status, setStatus] = useState(game?.status ?? "Backlog")
  const [publisher, setPublisher] = useState(game?.game?.publisher ?? "")
  const [developer, setDeveloper] = useState(game?.game?.developer ?? "")
  const [genre, setGenre] = useState(game?.game?.genre ?? "")
  const [coverUrl, setCoverUrl] = useState(game?.game?.coverUrl ?? "")
  const [platforms, setPlatforms] = useState([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/games/platforms")
      .then((r) => r.json())
      .then(setPlatforms)
      .catch(() => {})
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setSaving(true)

    try {
      const url = game ? `/api/games/${game.id}` : "/api/games"
      const method = game ? "PATCH" : "POST"
      const body = game
        ? { status }
        : { title, platformId, publisher, developer, genre, coverUrl, status }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Erro ao salvar")
      }

      onSuccess()
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const editing = !!game

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{editing ? "Editar jogo" : "Adicionar jogo"}</SheetTitle>
          <SheetDescription>
            {editing
              ? "Altere as informações do jogo no seu backlog."
              : "Adicione um novo jogo à sua coleção."}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4 p-4">
          <FieldGroup>
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <Field>
              <FieldLabel htmlFor="game-title">Título</FieldLabel>
              <Input
                id="game-title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={editing}
                placeholder="Ex: Mega Man X"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="game-platform">Plataforma</FieldLabel>
              <select
                id="game-platform"
                required
                value={platformId}
                onChange={(e) => setPlatformId(e.target.value)}
                disabled={editing}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Selecione...</option>
                {platforms.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field>
              <FieldLabel htmlFor="game-status">Status</FieldLabel>
              <select
                id="game-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field>
              <FieldLabel htmlFor="game-publisher">Publicadora</FieldLabel>
              <Input
                id="game-publisher"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                placeholder="Ex: Capcom"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="game-developer">Desenvolvedora</FieldLabel>
              <Input
                id="game-developer"
                value={developer}
                onChange={(e) => setDeveloper(e.target.value)}
                placeholder="Ex: Capcom"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="game-genre">Gênero</FieldLabel>
              <Input
                id="game-genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Ex: Ação, Plataforma"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="game-cover">URL da Capa</FieldLabel>
              <Input
                id="game-cover"
                type="url"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                placeholder="https://exemplo.com/capa.jpg"
              />
            </Field>
          </FieldGroup>

          <SheetFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Salvando..." : editing ? "Salvar" : "Adicionar"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
