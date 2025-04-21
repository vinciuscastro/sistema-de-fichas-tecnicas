// src/components/FiltrosCarros.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import carrosPorMarca from '../index.js';

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
    <Box p={4} sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom align="center">Catálogo de Carros</Typography>
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        <FormControl fullWidth sx={{ minWidth: 240 }}>
          <InputLabel>Marca</InputLabel>
          <Select value={marca} label="Marca" onChange={e => { setMarca(e.target.value); setModelo(''); setAno(''); setModeloFinal(''); }}>
            {carrosPorMarca.map(m => <MenuItem key={m.marca} value={m.marca}>{m.marca.toUpperCase()}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ minWidth: 240 }} disabled={!marca}>
          <InputLabel>Modelo</InputLabel>
          <Select value={modelo} label="Modelo" onChange={e => { setModelo(e.target.value); setAno(''); setModeloFinal(''); }}>
            {modelosUnicos.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ minWidth: 240 }} disabled={!modelo}>
          <InputLabel>Ano</InputLabel>
          <Select value={ano} label="Ano" onChange={e => { setAno(e.target.value); setModeloFinal(''); }}>
            {anosUnicos.map(a => <MenuItem key={a} value={a}>{a}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ minWidth: 240 }} disabled={!ano}>
          <InputLabel>Versão</InputLabel>
          <Select value={modeloFinal} label="Versão" onChange={e => handleFinalChange(e.target.value)}>
            {opcoesFinais.map(m => <MenuItem key={m.NOME} value={m.NOME}>{m.NOME}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}