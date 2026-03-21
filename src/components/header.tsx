
// src/components/header.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Sprout, Sun, HeartPulse, ScrollText, MessageSquare, Satellite } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { Logo } from './logo';
import { useLanguage } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const menuItems = [
    { href: '/dashboard', label: t('dashboard'), icon: Sprout },
    { href: '/crop-suggestions', label: t('cropSuggestions'), icon: Sprout },
    { href: '/agronomic-tips', label: t('plantDiagnosis'), icon: HeartPulse },
    { href: '/weather', label: t('weather'), icon: Sun },
    { href: '/satellite-analysis', label: t('satelliteAnalysis'), icon: Satellite },
  ];

  return (
    <header className="sticky top-4 z-50">
      <nav className="glass-nav flex items-center justify-between px-6 py-3 mt-4 mx-auto w-[95%] max-w-7xl rounded-2xl shadow-lg">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo />
        </Link>
        <ul className="hidden md:flex gap-8 font-medium text-gray-800">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href}
                className={cn(
                  "nav-link relative",
                  pathname.startsWith(item.href) ? "text-primary font-semibold" : "text-foreground/80"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="overflow-hidden rounded-full hover:bg-primary/10"
              >
                <User className="h-5 w-5 text-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mt-2">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/support">Support</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
       <style jsx>{`
        .nav-link {
          transition: color 0.2s;
        }
        .nav-link:hover {
          color: hsl(var(--primary));
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          background-color: hsl(var(--accent));
          transition: width 0.3s ease-in-out;
        }
        .nav-link:hover::after,
        .nav-link.text-primary::after {
          width: 100%;
        }
      `}</style>
    </header>
  );
}
