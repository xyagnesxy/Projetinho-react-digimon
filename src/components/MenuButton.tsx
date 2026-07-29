import styles from './MenuButton.module.css'

type Props={
  text: string,
  onClick: () => void
  disabled?: boolean
}

export const MenuButton = ({text, onClick, disabled=false}: Props)=>{

  return (
    <button disabled={disabled} className={styles.button} onClick={onClick}>
        {text}
    </button>
  )
}
 export default MenuButton