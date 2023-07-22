import { useEffect } from 'react';

export function useHello(message: string) {
  useEffect(() => console.log(message), []);
}
