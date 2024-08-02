import React from 'react';

type Props = {
  className?: string;
}

const Loader: React.FC<Props> = ({className}) => <span className={`icon-[svg-spinners--6-dots-rotate] w-24 h-24 ${className}`}></span>;
export default Loader;