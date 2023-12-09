import styles from "./button.module.css"

export default function Button({ onClick, label }) {
    return (
        <button className={styles.button} onClick={onClick}>{label}</button>
    )
}