import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function hashAuthor(author: string) {
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(author)).then((hash) => Buffer.from(hash).toString('hex'));
}
