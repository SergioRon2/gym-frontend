import React from 'react'
import { Metadata } from '@/config/metadata'

function HeadLinks(){
    return <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
        <link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet" />
        <link rel="shortcut icon" href='../public/images/favicon.png' type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Rubik&display=swap" rel="stylesheet" />
        <title>GymSoftware</title>
        <title>{Metadata.title}</title>
        <meta name="description" content={Metadata.description} />
    </>
}

export default HeadLinks