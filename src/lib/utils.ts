import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function hashAuthor(author: string) {
  return crypto.subtle
    .digest('SHA-256', new TextEncoder().encode(author))
    .then((hash) => Buffer.from(hash).toString('hex'));
}

export function getLastXYears(x: number): number[] {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < x; i++) {
    years.push(currentYear - i);
  }
  return years;
}