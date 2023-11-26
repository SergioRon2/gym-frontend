import React from 'react';
import StyleSpinner from '../styles/spinner.module.css'
import Image from 'next/image';

const LoadingSpinner = () => {
  return (
    <div className={StyleSpinner.container}>
      <Image src='/gym-ani-1.gif' className={StyleSpinner.img} width={400} height={400} alt='pollito corriendo' />
      <Image src='/puntos-suspensivos.gif' className={StyleSpinner.img} width={400} height={400} alt='puntos' />
    </div> 
  );
};

export default LoadingSpinner;
