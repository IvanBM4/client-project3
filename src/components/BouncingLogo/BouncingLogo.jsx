import React from 'react'
import './BouncingLogo.css'

const BouncingLogo = () => {
    const letters = "PLANNING TO GO"

    return (
        <div className="bounce">
            {letters.split('').map((letter, index) => (
                <span key={index} className="letter">
                    {letter}
                </span>
            ))}
        </div>
    )
}

export default BouncingLogo