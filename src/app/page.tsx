'use client';

import { useGetClientsQuery } from "../../store/clientsApi";
import { Button, Container } from "@mui/material";

export default function Home() {
  const { data: clients } = useGetClientsQuery({});

  return (
    <Container>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
      <div>
        {JSON.stringify(clients, null, 2)}
      </div>
    </Container>
  );
}
