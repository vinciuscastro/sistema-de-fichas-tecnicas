import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button,
  Paper,
  styled
} from '@mui/material';
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

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 240,
  '& .MuiInputLabel-root': {
    color: '#666',
  },
  '& .MuiOutlinedInput-root': {
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
}));

export default function FiltrosCarros() {
  const navigate = useNavigate();

  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [modeloFinal, setModeloFinal] = useState('');

  const modelosObj = carrosPorMarca.find(m => m.marca === marca)?.modelos || {};
  const arrModelos = Object.values(modelosObj);
  const modelosUnicos = [...new Set(arrModelos.map(m => m.MODELO))];
  const anosUnicos = [...new Set(arrModelos.filter(m => m.MODELO === modelo).map(m => m.ANO))];
  const opcoesFinais = arrModelos.filter(m => m.MODELO === modelo && m.ANO === ano);

  const handleFinalChange = (value) => {
    setModeloFinal(value);
    const selected = opcoesFinais.find(m => m.NOME === value);
    if (selected) navigate('/details', { state: selected });
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
            Selecione os filtros para encontrar seu veículo
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
          <StyledFormControl fullWidth>
            <InputLabel>Marca</InputLabel>
            <Select
              value={marca}
              label="Marca"
              onChange={e => {
                setMarca(e.target.value);
                setModelo('');
                setAno('');
                setModeloFinal('');
              }}
            >
              {carrosPorMarca.map(m => (
                <MenuItem key={m.marca} value={m.marca}>
                  {m.marca.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>

          <StyledFormControl fullWidth disabled={!marca}>
            <InputLabel>Modelo</InputLabel>
            <Select
              value={modelo}
              label="Modelo"
              onChange={e => {
                setModelo(e.target.value);
                setAno('');
                setModeloFinal('');
              }}
            >
              {modelosUnicos.map(m => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>

          <StyledFormControl fullWidth disabled={!modelo}>
            <InputLabel>Ano</InputLabel>
            <Select
              value={ano}
              label="Ano"
              onChange={e => {
                setAno(e.target.value);
                setModeloFinal('');
              }}
            >
              {anosUnicos.map(a => (
                <MenuItem key={a} value={a}>
                  {a}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>

          <StyledFormControl fullWidth disabled={!ano}>
            <InputLabel>Versão</InputLabel>
            <Select
              value={modeloFinal}
              label="Versão"
              onChange={e => handleFinalChange(e.target.value)}
            >
              {opcoesFinais.map(m => (
                <MenuItem key={m.NOME} value={m.NOME}>
                  {m.NOME}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>

          <Button
            variant="contained"
            disabled={!modeloFinal}
            onClick={() => handleFinalChange(modeloFinal)}
            sx={{
              bgcolor: '#c00',
              '&:hover': { bgcolor: '#a00' },
              py: 1.5,
              mt: 2,
              fontSize: '1rem'
            }}
          >
            Ver Ficha Técnica
          </Button>
        </Box>
      </Box>
    </Box>
  );
}