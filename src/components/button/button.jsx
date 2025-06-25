import { ArrowRight } from 'lucide-react'
import React from 'react'
import '../../styles/Butom.scss'

// To use this component, import it and use it like this:
// <Button text="Click Me" onClick={handleClick} isPrimary={true} />
const Button = ({ text, onClick, isPrimary = true }) => {
    return (
        <button
            onClick={onClick} // click event handler
            type='button' // button type
            className={isPrimary ? 'primary' : 'secondary'}> {/* button class */}
            {text} {/* button text */}
            <div className="button-icon">
                <ArrowRight /> {/* icon */}
            </div>
        </button>
    )
}

export default Button