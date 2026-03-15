import styles from './MenuButton.module.css'

type Props={
  text: string,
  onClick: () => void
}

export const MenuButton = ({text, onClick}: Props)=>{

  return (
    <button className={styles.button} onClick={onClick}>
        {text}
    </button>
  )
}
 export default MenuButton