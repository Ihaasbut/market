import { Stars } from "@/shared/ui/Stars";
import styles from "./ReviewForm.module.scss"

export function ReviewForm() {
  return (
    <form action="" className={styles["form"]}>
          <button className={styles["stars"]}><Stars rating={0}/></button>
          <input type="text" placeholder="Ваше Имя" />
          <input type="text" placeholder="Ваше Имя" />
          <textarea placeholder="Ваш комментарий" />
          <button>Отправить</button>
    </form>
  )
}

