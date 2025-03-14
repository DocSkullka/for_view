import { useEffect, useRef, useState } from 'react'
import { Box } from '@ui';
import styled from 'styled-components';
import React from 'react'

const ContentWrapper = styled(Box)`
  overflow-y: scroll;
  overflow-x: hidden;
  height: ${({ height }) => height + 'px'};
`;

export const ContentWrapperScrollable: React.FC<any> = React.memo(({ minusBottom = 100, children }) => {
  const contentRef = useRef<any>();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      const { top } = contentRef.current.getBoundingClientRect();

      const height = document.body.offsetHeight - top - (minusBottom || 0);
      setHeight(height);
    }
  }, [contentRef]);

  return (
    <ContentWrapper height={height} ref={contentRef}>
      {children}
    </ContentWrapper>
  );
});
