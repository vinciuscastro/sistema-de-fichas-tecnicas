import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Button,
  Chip,
  Paper,
  styled,
  Divider
} from '@mui/material';

const RedHeader = styled(Paper)(({ theme }) => ({
  backgroundColor: '#800',
  color: 'white',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderBottom: '4px solid #c00',
  borderRadius: 0,
  textAlign: 'center',
  maxWidth: 800,
  margin: '0 auto'
}));

const SpecCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  borderLeft: '4px solid #c00',
  backgroundColor: 'white',
  maxWidth: 800,
  margin: '20px auto',
  width: '100%'
}));

const SpecRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1.5, 0),
  borderBottom: '1px solid #eee',
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
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
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

        <Card sx={{
          mb: 4,
          borderRadius: 0,
          boxShadow: 'none',
          maxWidth: 800,
          mx: 'auto'
        }}>
          <CardMedia
            component="img"
            height="300"
            image={car.IMAGEM}
            alt={car.NOME}
            sx={{
              objectFit: 'contain',
              mx: 'auto',
              display: 'block',
              width: '80%'
            }}
          />
        </Card>

        <Box>
          {Object.entries(car)
            .filter(([key]) => [
              'ESPECIFICACAO', 'MOTOR', 'TRANSMISSÃO', 'DESEMPENHO',
              'CONSUMO', 'SUSPENSÃO', 'FREIOS', 'DIREÇÃO', 'PNEUS',
              'AERODINÂMICA', 'DIMENSÕES', 'PESO E CAPACIDADES'
            ].includes(key))
            .map(([section, details]) => (
              <SpecCard key={section}>
                <Typography
                  variant="h5"
                  sx={{
                    color: '#c00',
                    borderBottom: '2px solid #c00',
                    pb: 1,
                    mb: 3,
                    textAlign: 'center'
                  }}
                >
                  {section}
                </Typography>

                <Box>
                  {Object.entries(details).map(([k, v]) => (
                    <SpecRow key={k}>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 'bold' }}
                        textAlign="left"
                        maxWidth="45%"

                      >
                        {k.replace(':', '')}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: '#c00',
                          fontWeight: 'bold'
                        }}
                        textAlign="right"
                        maxWidth="45%"
                      >
                        {v}
                      </Typography>
                    </SpecRow>
                  ))}
                </Box>
              </SpecCard>
            ))}
        </Box>
      </Box>
    </Box>
  );
}