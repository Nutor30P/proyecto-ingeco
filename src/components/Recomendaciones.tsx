// src/components/Recomendaciones.tsx

import { Card, CardContent, Typography } from "@mui/material";

const Recomendaciones = ({
  ahorroPotencial,
  perdida,
  confianzaModelo,
}: {
  ahorroPotencial: number;
  perdida: number;
  confianzaModelo: number;
}) => {
  return (
    <Card style={{ marginTop: 20 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Recomendaciones Inteligentes
        </Typography>
        <Typography variant="body1" style={{ marginTop: 10 }}>
          {ahorroPotencial > 10
            ? "Reemplazo inmediato sugerido debido al ahorro significativo."
            : "Mantener el equipo si el ahorro no es considerable."}
        </Typography>
        <Typography variant="body1" style={{ marginTop: 10 }}>
          {perdida > 10
            ? "Pérdida significativa por retraso. Reemplazo urgente recomendado."
            : "Pérdida por retraso es moderada, pero recomendable considerar reemplazo en los próximos años."}
        </Typography>
        <Typography variant="body1" style={{ marginTop: 10 }}>
          {confianzaModelo > 75
            ? "Alta confianza en la decisión del modelo."
            : "La confianza del modelo es moderada, considere revisar los parámetros."}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Recomendaciones;
