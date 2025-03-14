import { createContext, useContext } from 'react';
import type { TPopoverContext } from './types.ts';

export const PopoverContext = createContext<TPopoverContext>({
  openPopover: () => {},
  closePopover: () => {},
  type: undefined,
});

export const usePopoverContext = () => {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error('usePopoverContext was used outside of its provider');
  }

  return context;
};
