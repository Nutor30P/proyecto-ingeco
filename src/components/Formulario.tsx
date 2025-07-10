// src/components/Formulario.tsx
import React, { useState } from "react";
import { TextField, Slider, InputLabel, MenuItem, FormControl, Select, Button } from "@mui/material";

const Formulario = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    tipoMaquina: "",
    valorInicial: 0,
    edadEquipo: 5,
    costoMantenimiento: 0,
    tasaDescuento: 12,
    sectorIndustrial: "",
    horizonteEvaluacion: 10,
    inflacionEsperada: 5,
    crecimientoMantenimiento: 8,
    costoReemplazo: 0,
    valorResidual: 0,
    costoInstalacion: 0,
    costoMantenimientoNuevo: 0,
    frecuenciaMantenimiento: "Anual",
    eficienciaNueva: false,
    costoEnergeticoActual: 0,
    costoEnergeticoNuevo: 0,
    costoParada: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };


  const handleSliderChange = (name: string, value: number) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div style={{ padding: 20 }}>
      <h3 style={{ fontSize: '2rem', color: '#1a237e', fontWeight: 700, marginBottom: 24 }}>Parámetros del Análisis</h3>
      <TextField
        label={<span style={{ fontSize: '1.1rem', color: '#1a237e', fontWeight: 600 }}>Valor inicial (COP)</span>}
        type="text"
        name="valorInicial"
        value={formData.valorInicial.toLocaleString("es-CO")}
        onChange={e => {
          // Elimina comas y otros caracteres no numéricos antes de guardar
          const raw = e.target.value.replace(/[^0-9]/g, "");
          setFormData(prev => ({ ...prev, valorInicial: Number(raw) }));
        }}
        fullWidth
        required
      />
      <br /><br />
      <TextField
        label={<span style={{ fontSize: '1.1rem', color: '#1a237e', fontWeight: 600 }}>Tipo de máquina</span>}
        type="text"
        name="tipoMaquina"
        value={formData.tipoMaquina}
        onChange={handleChange}
        fullWidth
        required
      />
      <br /><br />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontWeight: 500 }}>Años:</span>
        <span style={{ fontWeight: 700 }}>{formData.edadEquipo}</span>
      </div>
      <Slider
        value={formData.edadEquipo}
        onChange={(e, newValue) => handleSliderChange("edadEquipo", newValue as number)}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value} años`}
        min={0}
        max={50}
      />
      <br /><br />
      <TextField
        label={<span style={{ fontSize: '1.1rem', color: '#1a237e', fontWeight: 600 }}>Costo de mantenimiento anual actual (COP)</span>}
        type="text"
        name="costoMantenimiento"
        value={formData.costoMantenimiento.toLocaleString("es-CO")}
        onChange={e => {
          const raw = e.target.value.replace(/[^0-9]/g, "");
          setFormData(prev => ({ ...prev, costoMantenimiento: Number(raw) }));
        }}
        fullWidth
        required
      />
      <br /><br />
      <TextField
        label={<span style={{ fontSize: '1.1rem', color: '#1a237e', fontWeight: 600 }}>Costo de mantenimiento anual del nuevo equipo (COP)</span>}
        type="text"
        name="costoMantenimientoNuevo"
        value={formData.costoMantenimientoNuevo.toLocaleString("es-CO")}
        onChange={e => {
          const raw = e.target.value.replace(/[^0-9]/g, "");
          setFormData(prev => ({ ...prev, costoMantenimientoNuevo: Number(raw) }));
        }}
        fullWidth
        required
      />
      <br /><br />
      <TextField
        label={<span style={{ fontSize: '1.1rem', color: '#1a237e', fontWeight: 600 }}>Costo energético anual del equipo actual (COP)</span>}
        type="text"
        name="costoEnergeticoActual"
        value={formData.costoEnergeticoActual.toLocaleString("es-CO")}
        onChange={e => {
          const raw = e.target.value.replace(/[^0-9]/g, "");
          setFormData(prev => ({ ...prev, costoEnergeticoActual: Number(raw) }));
        }}
        fullWidth
        required
      />
      <br /><br />
      <TextField
        label={<span style={{ fontSize: '1.1rem', color: '#1a237e', fontWeight: 600 }}>Costo energético anual del nuevo equipo (COP)</span>}
        type="text"
        name="costoEnergeticoNuevo"
        value={formData.costoEnergeticoNuevo.toLocaleString("es-CO")}
        onChange={e => {
          const raw = e.target.value.replace(/[^0-9]/g, "");
          setFormData(prev => ({ ...prev, costoEnergeticoNuevo: Number(raw) }));
        }}
        fullWidth
        required
      />
      <br /><br />
      <TextField
        label={<span style={{ fontSize: '1.1rem', color: '#1a237e', fontWeight: 600 }}>Costo de parada/instalación adicional (COP)</span>}
        type="text"
        name="costoParada"
        value={formData.costoParada.toLocaleString("es-CO")}
        onChange={e => {
          const raw = e.target.value.replace(/[^0-9]/g, "");
          setFormData(prev => ({ ...prev, costoParada: Number(raw) }));
        }}
        fullWidth
        required
      />
      <br /><br />
      <TextField
        label={<span style={{ fontSize: '1.1rem', color: '#1a237e', fontWeight: 600 }}>Costo de reemplazo (COP)</span>}
        type="text"
        name="costoReemplazo"
        value={formData.costoReemplazo.toLocaleString("es-CO")}
        onChange={e => {
          const raw = e.target.value.replace(/[^0-9]/g, "");
          setFormData(prev => ({ ...prev, costoReemplazo: Number(raw) }));
        }}
        fullWidth
        required
      />
      <br /><br />
      <TextField
        label={<span style={{ fontSize: '1.1rem', color: '#1a237e', fontWeight: 600 }}>Valor residual estimado (COP)</span>}
        type="text"
        name="valorResidual"
        value={formData.valorResidual.toLocaleString("es-CO")}
        onChange={e => {
          const raw = e.target.value.replace(/[^0-9]/g, "");
          setFormData(prev => ({ ...prev, valorResidual: Number(raw) }));
        }}
        fullWidth
        required
      />
      <br /><br />
      <TextField
        label={<span style={{ fontSize: '1.1rem', color: '#1a237e', fontWeight: 600 }}>Costo de instalación/cambio (COP)</span>}
        type="text"
        name="costoInstalacion"
        value={formData.costoInstalacion.toLocaleString("es-CO")}
        onChange={e => {
          const raw = e.target.value.replace(/[^0-9]/g, "");
          setFormData(prev => ({ ...prev, costoInstalacion: Number(raw) }));
        }}
        fullWidth
        required
      />
      <br /><br />
      <TextField
        label="Frecuencia de mantenimiento"
        name="frecuenciaMantenimiento"
        value={formData.frecuenciaMantenimiento}
        fullWidth
        InputProps={{ readOnly: true }}
      />
      <br /><br />
      <FormControl fullWidth>
        <InputLabel id="eficienciaNueva-label" style={{ fontSize: '1.1rem', color: '#1a237e', fontWeight: 600 }}>¿El nuevo equipo es más eficiente?</InputLabel>
        <Select
          labelId="eficienciaNueva-label"
          id="eficienciaNueva"
          name="eficienciaNueva"
          value={formData.eficienciaNueva ? "Sí" : "No"}
          onChange={e => setFormData(prev => ({ ...prev, eficienciaNueva: e.target.value === "Sí" }))}
          required
        >
          <MenuItem value={"Sí"}>Sí</MenuItem>
          <MenuItem value={"No"}>No</MenuItem>
        </Select>
      </FormControl>
      <br /><br />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontWeight: 500 }}>Inflación esperada (%):</span>
        <span style={{ fontWeight: 700 }}>{formData.inflacionEsperada}</span>
      </div>
      <Slider
        value={formData.inflacionEsperada}
        onChange={(e, newValue) => handleSliderChange("inflacionEsperada", newValue as number)}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value} %`}
        min={0}
        max={20}
        step={0.1}
      />
      <br /><br />
      <Button variant="contained" onClick={handleSubmit}>
        Realizar Análisis
      </Button>
    </div>
  );
};

export default Formulario;
