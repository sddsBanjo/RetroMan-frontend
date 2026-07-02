import Link from "next/link"
import { Button } from "./button"

export function TopbarMenu() {
    return (
        <header className="flex items-center gap-9 h-20">
            <Link href="/">
                <h1 className="text-5xl font-extrabold">
                    RetroMan
                </h1>
            </Link>
            <nav className="flex justify-between items-center w-full">
                <div className="flex gap-6 text-sm">
                    <Link href="/plans">Planos</Link>
                    <Link href="/resources">Recursos</Link>
                </div>
                <div className="flex gap-7.5">
                    <Button variant="outline">Login</Button>
                    <Button>Cadastre-se</Button>
                </div>
            </nav>
        </header>
    )
}