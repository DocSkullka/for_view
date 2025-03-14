import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  AccordionContent,
  AccordionContentWrapper,
  AccordionHeader,
  AccordionWrapper,
  ArrowAnimation,
  ArrowBlock,
  DropdownArrow,
  Wrapper,
} from './styled';
import { useDispatch, useSelector } from 'react-redux';

export const Accordion: React.FC<any> = React.memo(
  ({ value, className, data, onOpen, ContentHeader, Content, z, disable, onHeight }) => {
    const refHeader = useRef<any>(null);
    const refContent = useRef<any>(null);
    const [height, setHeight] = useState(0);
    const [openAccordion, setOpenAccordion] = useState(false);
    const id = useId();
    const { dropdownId } = useSelector<any, any>(({ dropdown }) => dropdown) || {};
    const dispatch = useDispatch();
    const headerRef = useRef<any>(null);
    const contentRef = useRef<any>(null);

    useEffect(() => {
      if (refHeader.current && !height) {
        setHeight(refHeader.current.offsetHeight);
      }
    }, [refHeader]);

    useEffect(() => {
      if (dropdownId === id) {
        setOpenAccordion(true);
      }

      if (dropdownId !== id) {
        setOpenAccordion(false);
      }
    }, [dropdownId]);

    useEffect(() => {
      if (refContent.current && contentRef.current && openAccordion) {
        const clientRect = refContent.current.getBoundingClientRect();
        const rect2 = contentRef.current.getBoundingClientRect();

        setHeight(clientRect.height + rect2.height);
      } else {
        const clientRect = headerRef.current.getBoundingClientRect();
        setHeight(clientRect.height);
      }
    }, [refContent, contentRef, openAccordion]);

    const handleClose = useCallback(() => {
      setOpenAccordion(false);
      dispatch.dropdown.setDropdownId(null);
    }, []);

    const dropdownRef = useRef(null);

    useEffect(() => {
      onOpen && onOpen(openAccordion);
      onHeight && onHeight(height);
    }, [openAccordion, height, onOpen]);

    return (
      <Wrapper className={className} z={z} ref={dropdownRef} height={24}>
        <AccordionWrapper open={openAccordion} height={24} ref={headerRef}>
          <AccordionHeader
            onClick={() =>
              !disable && dispatch.dropdown.setDropdownId(dropdownId === id ? null : id)
            }
            open={openAccordion}
          >
            {ContentHeader({ close: handleClose, value })}
            {!disable && (
              <ArrowBlock>
                <ArrowAnimation open={openAccordion}>
                  <DropdownArrow />
                </ArrowAnimation>
              </ArrowBlock>
            )}
          </AccordionHeader>
          <AccordionContent open={openAccordion} height={200}>
            <AccordionContentWrapper ref={refContent} open={openAccordion}>
              {Content({ close: handleClose, data, withRef: contentRef })}
            </AccordionContentWrapper>
          </AccordionContent>
        </AccordionWrapper>
      </Wrapper>
    );
  }
);
