import styles from './Header.module.css';

export function Header() {
  const imageAltText = "Logotipo do Projeto To-Do List, na imagem temos um foguete apantado para cima trasparente e com contornos azul. Tambem temos o nome 'ToDo' como o 'to' em azul claro e o 'do' em azul escuro"
  return(
    <header className={styles.header}>
      <img
        className={styles.logo} 
        src="/logo.svg" 
        alt={imageAltText} 
      />
    </header>
  )
}