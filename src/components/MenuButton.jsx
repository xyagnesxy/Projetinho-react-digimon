import React from 'react'
import styles from './MenuButton.module.css'


export const MenuButton = ({text, onClick})=>{

  return (
    <button className={styles.button} onClick={onClick}>
        {text}
    </button>
  )
}
 export default MenuButton