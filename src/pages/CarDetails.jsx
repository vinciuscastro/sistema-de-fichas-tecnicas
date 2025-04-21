import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Paper,
  styled
} from '@mui/material';

const RedHeader = styled(Paper)(({ theme }) => ({
  backgroundColor: '#800',
  color: 'white',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderBottom: '4px solid #c00',
  borderRadius: 0
}));

const SpecCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  borderLeft: '4px solid #c00',
  backgroundColor: 'white'
}));

const DetailRow = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
  borderBottom: '1px solid #eee',
  '&:nth-of-type(even)': {
    backgroundColor: '#f9f9f9'
  },
  '&:last-child': {
    borderBottom: 'none'
  }
}));

export default function CarDetails() {
  const { state: car } = useLocation();
  const navigate = useNavigate();

  if (!car) return <Typography variant="h6">Nenhum carro selecionado.</Typography>;

  return (
    <Box sx={{
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      py: 4
    }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
        <Button
          variant="contained"
          onClick={() => navigate(-1)}
          sx={{
            bgcolor: '#c00',
            '&:hover': { bgcolor: '#a00' },
            mb: 2
          }}
        >
          Voltar
        </Button>

        <RedHeader>
          <Typography variant="h3" sx={{ textTransform: 'uppercase', mb: 2 }}>
            {car.ESPECIFICACAO['Versão:']}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {[car.ESPECIFICACAO['Combustível:'], car.ESPECIFICACAO['Origem:'], car.ESPECIFICACAO['Categoria:']].map(
              (badge) => (
                <Chip
                  key={badge}
                  label={badge}
                  sx={{
                    bgcolor: '#c00',
                    color: 'white',
                    borderRadius: '20px'
                  }}
                />
              )
            )}
          </Box>
        </RedHeader>

        <Card sx={{ mb: 4, borderRadius: '8px', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="400"
            image={car.IMAGEM}
            alt={car.NOME}
            sx={{
              objectFit: 'cover',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
          />
        </Card>

        <Grid container spacing={3}>
          {Object.entries(car)
            .filter(([key]) => [
              'ESPECIFICACAO', 'MOTOR', 'TRANSMISSÃO', 'DESEMPENHO',
              'CONSUMO', 'SUSPENSÃO', 'FREIOS', 'DIREÇÃO', 'PNEUS',
              'AERODINÂMICA', 'DIMENSÕES', 'PESO E CAPACIDADES'
            ].includes(key))
            .map(([section, details]) => (
              <Grid item xs={12} md={6} lg={4} key={section}>
                <SpecCard>
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#c00',
                      borderBottom: '2px solid #c00',
                      pb: 1,
                      mb: 2
                    }}
                  >
                    {section}
                  </Typography>

                  <Grid container>
                    {Object.entries(details).map(([k, v], index) => (
                      <DetailRow item xs={12} key={k}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="body2">{k}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" sx={{ color: '#c00', fontWeight: 'bold' }}>
                              {v}
                            </Typography>
                          </Grid>
                        </Grid>
                      </DetailRow>
                    ))}
                  </Grid>
                </SpecCard>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}