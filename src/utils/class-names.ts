import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}
