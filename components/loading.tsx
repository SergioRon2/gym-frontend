import React from 'react';
import StyleSpinner from '../styles/spinner.module.css'
import Image from 'next/image';

const LoadingSpinner = () => {
  return (
    <div className={StyleSpinner.container}>
      <Image src='/gym-ani-1.gif' draggable={false} className={StyleSpinner.img} width={150} height={150} alt='pollito corriendo' />
    </div> 
  );
};

export default LoadingSpinner;
