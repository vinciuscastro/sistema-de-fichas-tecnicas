import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Card, CardMedia, CardContent, Typography, Button, Grid } from '@mui/material';

export default function CarDetails() {
  const { state: car } = useLocation();
  const navigate = useNavigate();
  if (!car) return <Typography variant="h6">Nenhum carro selecionado.</Typography>;

  return (
    <Box p={4} sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Button variant="contained" onClick={() => navigate(-1)}>Voltar</Button>
      <Card sx={{ mt: 2, maxWidth: 1000, mx: 'auto' }}>
        <CardMedia component="img" height="400" image={car.IMAGEM} alt={car.NOME} />
        <CardContent>
          <Typography variant="h4" gutterBottom>{car.ESPECIFICACAO['Versão:']}</Typography>
          <Typography variant="subtitle1" gutterBottom>
            {car.MARCA.toUpperCase()} - {car.MODELO} - {car.ANO}
          </Typography>

          {Object.entries(car).filter(([key]) => ['ESPECIFICACAO', 'MOTOR', 'TRANSMISSÃO', 'DESEMPENHO', 'CONSUMO', 'SUSPENSÃO', 'FREIOS', 'DIREÇÃO', 'PNEUS', 'AERODINÂMICA', 'DIMENSÕES', 'PESO E CAPACIDADES'].includes(key)).map(([section, details]) => (
            <Box key={section} mt={3}>
              <Typography variant="h5" gutterBottom>{section}</Typography>
              <Grid container spacing={2}>
                {Object.entries(details).map(([k, v]) => (
                  <Grid item xs={6} sm={4} key={k}>
                    <Typography variant="body2"><strong>{k}</strong> {v}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}
