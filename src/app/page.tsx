import styles from "./page.module.css";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <div className={styles.container}>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </div>
  );
}
