'use client';

import { LogOut, Menu, MessageSquareHeart } from 'lucide-react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent } from '@/components/ui/sheet';

import { ThemeToggle } from './theme-toggle';

const LINKS = [
  {
    href: '/',
    label: 'Home',
    mobileOnly: true,
  },
  {
    href: '/courses',
    label: 'Courses',
  },
  {
    href: '/professors',
    label: 'Professors',
  },
];

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full md:w-[80%] mx-auto border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent className="flex flex-col p-4 justify-between" side="left">
          <nav className="flex flex-col gap-4 pt-4">
            {LINKS.map(({ href, label }) => (
              <Link
                href={href}
                className="transition-colors text-foreground hover:text-foreground/80 text-3xl"
                key={href}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col">
            {session ? (
              <div className="flex flex-col gap-2">
                <Link
                  href="/profile"
                  className="transition-colors text-foreground hover:text-foreground/80 text-2xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Account
                </Link>
                <Separator />
                <div className="flex flex-row gap-2">
                  <ThemeToggle />
                  <Button
                    variant="secondary"
                    className="text-2xl gap-2 grow"
                    onClick={() => signOut()}
                  >
                    <LogOut />
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="transition-colors text-foreground hover:text-foreground/80 text-2xl"
              >
                Login
              </Link>
            )}
            <Separator className="my-2" />
            <div className="flex flex-row justify-evenly space-x-4 items-center pt-2 overflow-auto">
              <Link
                href="/about"
                className="transition-colors text-foreground hover:text-foreground/80"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Separator orientation="vertical" />
              <Link
                href="/legal/contact"
                className="transition-colors text-foreground hover:text-foreground/80"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Separator orientation="vertical" />
              <Link
                href="/legal/privacy"
                className="transition-colors text-foreground hover:text-foreground/80"
                onClick={() => setIsMenuOpen(false)}
              >
                Privacy
              </Link>
              <Separator orientation="vertical" />
              <Link
                href="/legal/terms"
                className="transition-colors text-foreground hover:text-foreground/80"
                onClick={() => setIsMenuOpen(false)}
              >
                T&C
              </Link>
            </div>
            <Separator className="my-2" />
            <p className="text-center">
              Not Directly Affiliated with USD
              <br />
              2024 © <Link href="https://tonydoes.dev/">Tony Whalen</Link>
            </p>
          </div>
        </SheetContent>
      </Sheet>
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link
            href="/"
            className="text-xl font-semibold text-primary space-x-4 mr-4 lg:mr-6 flex items-center gap-2"
          >
            RateMyUSD
            <MessageSquareHeart size={24} />
          </Link>
          <nav className="flex items-center gap-4 text-md lg:gap-6">
            {LINKS.map(
              ({ href, label, mobileOnly }) =>
                !mobileOnly && (
                  <Link
                    href={href}
                    className="transition-colors text-foreground hover:text-foreground/80"
                    key={href}
                  >
                    {label}
                  </Link>
                ),
            )}
          </nav>
        </div>
        <div className="md:hidden flex justify-between w-full">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </Button>
          <Link
            href="/"
            className="text-xl font-semibold text-primary space-x-4 mr-4 lg:mr-6 flex items-center gap-2"
          >
            RateMyUSD
            <MessageSquareHeart size={24} />
          </Link>
        </div>
        <div className="hidden md:flex flex-1 items-center justify-between space-x-2 md:justify-end gap-2">
          {session ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger>
                <Button className="gap-2 text-md">My Account</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link href="/profile" className="text-md">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-400 text-md"
                  onClick={() => signOut()}
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className="transition-colors text-foreground hover:text-foreground/80"
            >
              Login
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
