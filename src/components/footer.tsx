import { Github, Mail, MessageSquareHeart } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="hidden md:flex flex-row justify-evenly gap-4 border-t border-border/40 w-[80%] p-2 mx-auto select-none">
      <div className="flex flex-col justify-between">
        <div>
          <Link
            href="/"
            className="text-2xl font-semibold text-primary space-x-4 mr-4 lg:mr-6 flex items-center gap-2"
          >
            RateMyUSD
            <MessageSquareHeart size={25} />
          </Link>
          <div className="flex flex-row gap-2 text-foreground mt-1">
            <Link href="https://github.com/RateMyUSD/app" target="_blank">
              <Github size={20} />
            </Link>
            <Link href="mailto:twhalen@sandiego.edu">
              <Mail size={20} />
            </Link>
          </div>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} Tony Whalen
          <br />
          Not Directly Affiliated with USD
        </p>
      </div>
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold dark:text-primary/70">Platform</h1>
        <Link
          href="/about"
          className="transition-colors text-foreground hover:text-foreground/80"
        >
          About
        </Link>
        <Link
          href="/courses"
          className="transition-colors text-foreground hover:text-foreground/80"
        >
          Courses
        </Link>
        <Link
          href="/professors"
          className="transition-colors text-foreground hover:text-foreground/80"
        >
          Professors
        </Link>
        {/* <Link href="/food" className="transition-colors text-foreground hover:text-foreground/80">Food</Link> */}
      </div>
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold dark:text-primary/70">Legal</h1>
        <Link
          href="/legal/terms"
          className="transition-colors text-foreground hover:text-foreground/80"
        >
          Terms and Conditions
        </Link>
        <Link
          href="/legal/privacy"
          className="transition-colors text-foreground hover:text-foreground/80"
        >
          Privacy Policy
        </Link>
        <Link
          href="/legal/cookies"
          className="transition-colors text-foreground hover:text-foreground/80"
        >
          Cookie Policy
        </Link>
      </div>
    </footer>
  );
}
