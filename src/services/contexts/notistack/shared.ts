import React from 'react';

function setRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

export function useForkRef(refA, refB) {
  return React.useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (refValue) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}

export function getTransitionProps(props) {
  const { timeout, style = {}, mode } = props;

  return {
    duration: typeof timeout === 'object' ? timeout[mode] || 0 : timeout,
    easing: style.transitionTimingFunction,
    delay: style.transitionDelay,
  };
}

export const reflow = (node) => {
  node.scrollTop = node.scrollTop;
};

const defaultEasing = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
};

const formatMs = (milliseconds) => `${Math.round(milliseconds)}ms`;

export function createTransition(props = ['all'], options) {
  const { duration = 300, easing = defaultEasing.easeInOut, delay = 0 } = options || {};

  const properties = Array.isArray(props) ? props : [props];

  return properties
    .map((animatedProp) => {
      const formattedDuration = typeof duration === 'string' ? duration : formatMs(duration);
      const formattedDelay = typeof delay === 'string' ? delay : formatMs(delay);
      return `${animatedProp} ${formattedDuration} ${easing} ${formattedDelay}`;
    })
    .join(',');
}
