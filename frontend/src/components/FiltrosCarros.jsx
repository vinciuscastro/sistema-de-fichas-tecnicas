import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  styled,
  TextField,
  Autocomplete,
  InputAdornment,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import carrosPorMarca from '../index.js';

const RedPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#800',
  color: 'white',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderBottom: '4px solid #c00',
  borderRadius: 0,
  textAlign: 'center'
}));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    paddingRight: '9px !important',
    backgroundColor: 'white',
    '& fieldset': {
      borderColor: '#ccc',
    },
    '&:hover fieldset': {
      borderColor: '#c00',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#c00',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#666',
  },
}));

export default function FiltrosCarros() {
  const formatarMarca = (str) => str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  const navigate = useNavigate();
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const [marca, setMarca] = useState(null);
  const [modelo, setModelo] = useState(null);
  const [ano, setAno] = useState(null);
  const [modeloFinal, setModeloFinal] = useState(null);

  const modelosObj = carrosPorMarca.find(m => m.marca === marca?.value)?.modelos || {};
  const arrModelos = Object.values(modelosObj);

  const modelosUnicos = Array.from(
    new Map(
      arrModelos.map(m => {
        const label = capitalize(m.MODELO);
        return [label, { label, value: m.MODELO }];
      })
    ).values()
  ).sort((a, b) => a.label.localeCompare(b.label)); // Ordenar por nome do modelo


  const anosUnicos = Array.from(
    new Map(
      arrModelos
        .filter(m => m.MODELO === modelo?.value)
        .map(m => [m.ANO, { label: m.ANO, value: m.ANO }])
    ).values()
  ).sort((a, b) => b.value - a.value); // Mais recente primeiro



  const opcoesFinais = Array.from(
    new Map(
      arrModelos
        .filter(m => m.MODELO === modelo?.value && m.ANO === ano?.value)
        .map(m => {
          const label = m.ESPECIFICACAO?.["Versão:"] || m.NOME;
          return [label, { label, value: m.NOME }];
        })
    ).values()
  );

  const handleFinalChange = (value) => {
    setModeloFinal(value);
  };

  const handleNavigate = () => {
    if (modeloFinal) {
      const selectedCar = arrModelos.find(m => m.NOME === modeloFinal.value);
      navigate('/details', { state: selectedCar });
    }
  };

  return (
    <Box sx={{
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      py: 4,
      px: 2
    }}>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <RedPaper>
          <Typography variant="h3" sx={{ textTransform: 'uppercase', mb: 2 }}>
            Catálogo de Carros
          </Typography>
          <Typography variant="subtitle1">
            Pesquise e encontre seu veículo
          </Typography>
        </RedPaper>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            backgroundColor: 'white',
            padding: 4,
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderLeft: '4px solid #c00'
          }}
        >
          <StyledAutocomplete
            options={carrosPorMarca.map(m => ({ label: formatarMarca(m.marca), value: m.marca }))}
            value={marca}
            onChange={(_, newValue) => {
              setMarca(newValue);
              setModelo(null);
              setAno(null);
              setModeloFinal(null);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Marca"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <StyledAutocomplete
            options={modelosUnicos}
            value={modelo}
            onChange={(_, newValue) => {
              setModelo(newValue);
              setAno(null);
              setModeloFinal(null);
            }}
            disabled={!marca}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Modelo"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <StyledAutocomplete
            options={anosUnicos}
            value={ano}
            onChange={(_, newValue) => {
              setAno(newValue);
              setModeloFinal(null);
            }}
            disabled={!modelo}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Ano"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <StyledAutocomplete
            options={opcoesFinais}
            value={modeloFinal}
            onChange={(_, newValue) => handleFinalChange(newValue)}
            disabled={!ano}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Versão"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Button
            variant="contained"
            disabled={!modeloFinal}
            onClick={() => handleNavigate()}
            sx={{
              bgcolor: '#c00',
              '&:hover': { bgcolor: '#a00' },
              py: 1.5,
              mt: 2,
              fontSize: '1rem'
            }}
            startIcon={<SearchIcon />}
          >
            Buscar Ficha Técnica
          </Button>
        </Box>
      </Box>
    </Box>
  );
}