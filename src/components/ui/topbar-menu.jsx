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
                <div />
                <div className="flex gap-7.5">
                    <Button variant="outline" asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/register">Registre-se</Link>
                    </Button>
                </div>
            </nav>
        </header>
    )
}