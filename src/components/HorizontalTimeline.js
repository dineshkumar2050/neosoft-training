import React,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './HorizontalTimeline.css';

function HorizontalTimeline({ timeline, ...props }) {
    let [elementWidth, setElementWidth] = useState();
    const elem = document.getElementsByClassName('horizontal-timeline')[0];
    const [screenSize, setScreenSize] = useState();
    useEffect(() => {
        setElementWidth(elem && elem.offsetWidth);
        setScreenSize(window.innerWidth);
    },[elem]);
    const arrLength = timeline.length;
    let lengthOfAllMiddleLine = elementWidth-arrLength*25;
    let lengthOfSingleMiddleLine = lengthOfAllMiddleLine/(arrLength-1);
    useEffect(() => {
        const resizeEvent = () => {
            setElementWidth(elem && elem.offsetWidth);
            setScreenSize(window.innerWidth);
        }
        window.addEventListener('resize', resizeEvent);
        resizeEvent();
        return () => window.removeEventListener('resize', resizeEvent);
    },[window.innerWidth])
    const getLeftPosition = (index,arrLength) => {
        const isFirst = index === 0;
        const isLast = index === arrLength-1;
        const style = {
            transform:  isFirst || isLast ? 'unset' : 'translateX(calc(-50% + 12.5px))',
            left: isFirst ? '5px' : isLast ? 'unset' : '0',
            right: isLast ? '5px' : 'unset'
        }
        return style;
    };
    return (
        <div className={'horizontal-timeline'}>
            {
                timeline && timeline.length > 0 && timeline.map((item,index,arr) => {
                    const leftValue = index*(lengthOfSingleMiddleLine);
                    const textStyle = getLeftPosition(index,arr.length);
                    const leftText = (index+1)*25+(index)*lengthOfSingleMiddleLine;
                    return(
                        <div key={index} className={'timeline-item d-inline-block'}>
                            <div style={{ left: `${leftValue}px` }} className={'circle d-flex align-items-center justify-content-center'}>
                                {index+1}
                                <div style={{...textStyle, textAlign: 'center'}} className={'bottom-text'}>
                                    {item}
                                </div>
                            </div>
                            {
                                index !== arrLength-1 &&
                                <span style={{ width: `${lengthOfSingleMiddleLine}px`,height: '2px', left: leftText }} className={'middle-line'}></span>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

HorizontalTimeline.propTypes = {
    timeline: PropTypes.array
}

export default HorizontalTimeline;
