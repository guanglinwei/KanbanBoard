import React from 'react';

interface IconWithTextProps {
    icon: ((className: string) => React.ReactNode);
    text: string;
    smallIcon?: boolean;
    additionalIconStyles?: string;
    additionalTextStyles?: string;
}

function IconWithText({ icon, text, smallIcon, additionalIconStyles, additionalTextStyles }: IconWithTextProps) {
    const iconSize = smallIcon ? '4' : '8';
    return (
        <div className='flex items-center m-2'>
            {icon(`${additionalIconStyles} object-contain h-${iconSize} w-${iconSize}`)}
            <p className={`${additionalTextStyles} ml-2`}>{text}</p>
        </div>
    )
}

export default IconWithText