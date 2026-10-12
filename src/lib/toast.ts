import { useSyncExternalStore } from 'react';

export interface Toast {
  id: number;
  message: string;
}

/** One toast at a time: a new message replaces the current one. */
let current: Toast | null = null;
let nextId = 1;
let timer: number | undefined;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function showToast(message: string, duration = 2600) {
  current = { id: nextId++, message };
  window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    current = null;
    emit();
  }, duration);
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useToast(): Toast | null {
  return useSyncExternalStore(subscribe, () => current, () => null);
}
