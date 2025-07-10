// src/components/Grafico.tsx

import { Card, CardContent, Typography } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from "recharts";

const Grafico = ({ data }: { data: any }) => {
  // Convertir valores a millones para el eje Y
  const dataMillones = data.map((d: any) => ({
    ...d,
    costMaintain: d.costMaintain / 1_000_000,
    costReplace: d.costReplace / 1_000_000,
  }));

  return (
    <Card style={{ marginTop: 20, background: "#f8f9fa", borderRadius: 16 }}>
      <CardContent>
        <Typography variant="h6" align="center" style={{ fontWeight: 700, marginBottom: 10 }}>
          Análisis de Costos Totales - Compresor Industrial
        </Typography>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart
            data={dataMillones}
            margin={{ left: 60, right: 20, top: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              tickFormatter={v => `Año ${v}`}
              label={{ value: "Tiempo", position: "insideBottom", offset: -2 }}
            />
            <YAxis
              tickFormatter={v => `${v.toLocaleString("es-CO")}M`}
              label={{ value: "Costo Total (Millones COP)", angle: -90, position: "insideLeft", offset: 10 }}
              width={80}
            />
            <Tooltip
              formatter={(value: number) => `${value.toLocaleString("es-CO")}M`}
              labelFormatter={v => `Año ${v}`}
            />
            <Legend verticalAlign="top" />
            <Area
              type="monotone"
              dataKey="costMaintain"
              stroke="#e74c3c"
              fill="#e74c3c22"
              name="Costo Total Mantener (Millones COP)"
            />
            <Area
              type="monotone"
              dataKey="costReplace"
              stroke="#27ae60"
              fill="#27ae6022"
              name="Costo Total Reemplazar (Millones COP)"
            />
            <Line
              type="monotone"
              dataKey="costMaintain"
              stroke="#e74c3c"
              strokeWidth={3}
              dot={{ r: 4 }}
              name="Costo Total Mantener (Millones COP)"
            />
            <Line
              type="monotone"
              dataKey="costReplace"
              stroke="#27ae60"
              strokeWidth={3}
              dot={{ r: 4 }}
              name="Costo Total Reemplazar (Millones COP)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default Grafico;
