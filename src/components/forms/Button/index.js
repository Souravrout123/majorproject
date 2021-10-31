import React from 'react'
import './styles.scss';


export const Button = ({children , ...otherProps}) => {
    return (
      <button className="btn" {...otherProps}>
            {children}
      </button>
    )
}


