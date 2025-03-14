import * as React from 'react';
import { Transition, TransitionProps } from 'notistack'
import { useForkRef, reflow, getTransitionProps, createTransition } from './shared';

function getScale(value) {
  return `scale(${value}, ${value ** 2})`;
}

const styles = {
  entering: {
    opacity: 1,
    transform: getScale(1),
  },
  entered: {
    opacity: 1,
    transform: 'none',
  },
};

const defaultTimeout = { enter: 400, exit: 700 };

const Grow: React.JSXElementConstructor<TransitionProps & { children: any }> = React.forwardRef((props, ref) => {
  const {
    children,
    in: inProp,
    style,
    // timeout,
    onEnter,
    onEntered,
    onExit,
    onExited,
    ...other
  } = props;

  const timeout = defaultTimeout;

  const nodeRef = React.useRef(null);
  const handleRefIntermediary: any = useForkRef(children.ref , nodeRef);
  const handleRef: any = useForkRef(handleRefIntermediary, ref);

  const handleEnter = (node, isAppearing) => {
    reflow(node);

    const { duration, delay, easing } = getTransitionProps({
      style,
      timeout,
      mode: 'enter',
    });

    node.style.transition = [
      createTransition(['opacity'], { duration, delay }),
      createTransition(['transform'], {
        delay,
        easing,
        duration: duration * 0.666,
      }),
    ].join(',');

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  };

  const handleExit = (node) => {
    const { duration, delay, easing } = getTransitionProps({
      style,
      timeout,
      mode: 'exit',
    });

    node.style.transition = [
      createTransition(['opacity'], {
        duration: duration * 0.666,
        easing,
        delay,
      }),
    ].join(',');

    node.style.opacity = '0';

    if (onExit) {
      onExit(node);
    }
  };

  return (
    <Transition
      appear
      in={inProp}
      nodeRef={nodeRef}
      onEnter={handleEnter}
      onEntered={onEntered}
      onExit={handleExit}
      onExited={onExited}
      timeout={timeout}
      {...other}
    >
      {(state, childProps) => {
        return React.cloneElement(children, {
          style: {
            opacity: 0,
            // transform: getScale(0.75),
            visibility: state === 'exited' && !inProp ? 'hidden' : undefined,
            ...styles[state],
            ...style,
            ...children.props.style,
          },
          ref: handleRef,
          ...childProps,
        });
      }}
    </Transition>
  );
});


export default Grow;
