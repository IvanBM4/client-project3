import React from 'react'
import './BouncingLogo.css'

const BouncingLogo = () => {
    const letters = "Planning To Go ".split('')
    const colors = [
        '#FF5733', '#33FF57', '#3357FF', '#FF33A1',
        '#FFC300', '#DAF7A6', '#581845', '#900C3F',
        '#C70039', '#FFC300', '#FF5733', '#33FF57',
        '#3357FF', '#FF33A1'
    ]

    return (
        <div className="bouncing-logo">
            {letters.map((letter, index) => (
                <span
                    key={index}
                    className="bouncing-letter"
                    style={{
                        animationDelay: `${index * 0.1}s`,
                        color: letter === ' ' ? 'transparent' : colors[index % colors.length]
                    }}
                >
                    {letter}
                    <span className="letter-shadow"></span>
                </span>
            ))}
        </div>
    )
}

export default BouncingLogo