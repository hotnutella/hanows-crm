'use client';

import { useGetClientsQuery } from "../../store/clientsApi";
import styles from "./page.module.css";
import { Button } from "@mui/material";

export default function Home() {
  const { data: clients } = useGetClientsQuery({});

  return (
    <div className={styles.container}>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
      <div>
        {JSON.stringify(clients, null, 2)}
      </div>
    </div>
  );
}
