import React from "react";
import banner from "../assets/banner.png"

export default function Dashboard(){
    return (
        <div className="ml-6 mt-3">
            <p className="text-5xl"> Dashboard </p>
            <p> por Mariana Borba </p>
            <img src={banner} alt='Banner GFP' className='w-300 h-120 rounded-4xl mt-5' />

        </div>
    )
}