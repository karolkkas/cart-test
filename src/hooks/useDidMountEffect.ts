import React, { EffectCallback, useEffect, useRef } from 'react';

export const useDidMountEffect = (
  func: EffectCallback,
  deps?: React.DependencyList | undefined,
): void => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};