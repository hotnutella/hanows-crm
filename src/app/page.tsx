'use client';

import WidgetCard from "@/components/WidgetCard";
import { useGetClientsQuery } from "../../store/clientsApi";
import { Button, Card, Container, Grid, Stack, Typography } from "@mui/material";
import ClientsWidget from "@/components/widgets/ClientsWidget";
import InvoicesWidget from "@/components/widgets/InvoicesWidget";

export default function Home() {

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <ClientsWidget />
      </Grid>
      <Grid item xs={12} md={6}>
        <InvoicesWidget />
      </Grid>
    </Grid>
  );
}
