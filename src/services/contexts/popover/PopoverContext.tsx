import { useCallback, useMemo, type ReactNode } from 'react';
import { useImmerReducer } from 'use-immer';

import { Popover } from '@/components/popover/Popover.tsx';
import { Claim } from '@/pages/Start/components/Claim/Claim.tsx';
import { ClaimedReward } from '@/pages/Start/components/Reward/Reward.tsx';

import { createSetRewardAction, createSetTypeAction } from './actions.ts';
import { reducer } from './reducer.ts';
import { initialState, POPOVER_TYPES } from './constants.ts';
import { PopoverContext } from './context.ts';
import type { OpenPopoverParams, PopoverState, PopoverAction } from './types';

type Props = {
  children: ReactNode;
};

export function PopoverContextProvider({ children }: Props) {
  const [state, dispatch] = useImmerReducer<PopoverState, PopoverAction>(reducer, initialState);

  const { type, reward } = state;

  const openPopover = useCallback(
    ({ type: popoverType, reward }: OpenPopoverParams) => {
      dispatch(createSetTypeAction(popoverType));

      if (reward) dispatch(createSetRewardAction(reward));
    },
    [dispatch]
  );

  const closePopover = useCallback(() => {
    dispatch(createSetTypeAction(undefined));
    dispatch(createSetRewardAction(undefined));
  }, [dispatch]);

  const popoverContextProviderValue = useMemo(
    () => ({ openPopover, closePopover, type }),
    [openPopover, closePopover, type]
  );

  const popoverContent = useMemo(() => {
    if (type === POPOVER_TYPES.CLAIM) return <Claim />;
    if (type === POPOVER_TYPES.REWARD) return <ClaimedReward reward={reward} />;

    return null;
  }, [type, reward]);

  return (
    <PopoverContext.Provider value={popoverContextProviderValue}>
      <Popover type={type}><ClaimedReward reward={reward} /></Popover>
      {/* {children}
      {popoverContent && <Popover type={type}>{popoverContent}</Popover>} */}
    </PopoverContext.Provider>
  );
}
