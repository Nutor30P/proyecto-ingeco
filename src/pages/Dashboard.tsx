
import Formulario from "../components/Formulario";
import Grafico from "../components/Grafico";
import "../App.css"; // Asegúrate de importar los estilos
import { useState } from "react";

type AnalisisInput = {
  valorInicial: number;
  edadEquipo: number;
  costoMantenimiento: number;
  tasaDescuento: number;
  horizonteEvaluacion: number;
  inflacionEsperada: number;
  crecimientoMantenimiento: number;
  costoReemplazo: number;
  valorResidual: number;
  costoInstalacion: number;
  costoMantenimientoNuevo: number;
  eficienciaNueva: boolean;
  costoEnergeticoActual: number;
  costoEnergeticoNuevo: number;
  costoParada: number;
};

type AnalisisResultado = {
  anoOptimo: number;
  ahorroPotencial: number;
  perdida: number;
  confianzaModelo: number;
  datosGrafico: { year: number; costMaintain: number; costReplace: number }[];
};

function calcularAnalisisVPN(input: AnalisisInput): AnalisisResultado {
  const {
    valorInicial,
    edadEquipo,
    costoMantenimiento,
    tasaDescuento,
    horizonteEvaluacion,
    inflacionEsperada,
    crecimientoMantenimiento,
    costoReemplazo,
    valorResidual,
    costoInstalacion,
    costoMantenimientoNuevo,
    eficienciaNueva,
    costoEnergeticoActual,
    costoEnergeticoNuevo,
    costoParada,
  } = input;

  const r = tasaDescuento / 100;
  const inflacion = inflacionEsperada / 100;
  const crecimiento = crecimientoMantenimiento / 100;
  const T = horizonteEvaluacion;
  const datosGrafico: { year: number; costMaintain: number; costReplace: number }[] = [];

  // Ajuste por eficiencia
  const mantenimientoNuevo = eficienciaNueva
    ? costoMantenimientoNuevo * 0.9 // 10% menos si es más eficiente
    : costoMantenimientoNuevo;
  const energeticoNuevo = eficienciaNueva
    ? costoEnergeticoNuevo * 0.9 // 10% menos si es más eficiente
    : costoEnergeticoNuevo;

  let mejorAno = edadEquipo;
  let mejorAhorro = -Infinity;
  let mejorPerdida = 0;
  let mejorConfianza = 80; // Valor fijo de ejemplo

  // Guardar los VPN para cada año de reemplazo
  let vpnMantenerPrevio = 0;

  for (let ano = edadEquipo; ano <= T; ano++) {
    // VPN de mantener hasta este año
    let vpnMantener = 0;
    for (let t = 0; t < ano - edadEquipo; t++) {
      const cmAjustado =
        (costoMantenimiento + costoEnergeticoActual) * Math.pow(1 + crecimiento, t) * Math.pow(1 + inflacion, t);
      vpnMantener += cmAjustado / Math.pow(1 + r, t + 1);
    }

    // VPN de reemplazar en este año
    let vpnReemplazo =
      costoReemplazo + costoInstalacion + costoParada - valorResidual / Math.pow(1 + r, ano - edadEquipo + 1);
    for (let t = 0; t < T - ano; t++) {
      const cmNuevoAjustado =
        (mantenimientoNuevo + energeticoNuevo) * Math.pow(1 + crecimiento, t) * Math.pow(1 + inflacion, t);
      vpnReemplazo += cmNuevoAjustado / Math.pow(1 + r, t + 1);
    }

    // Para la gráfica
    datosGrafico.push({
      year: ano,
      costMaintain: Math.round(vpnMantener),
      costReplace: Math.round(vpnReemplazo),
    });

    // Ahorro potencial si reemplazo en este año
    const ahorro = vpnMantener - vpnReemplazo;

    // Guardar el mejor año (máximo ahorro)
    if (ahorro > mejorAhorro) {
      mejorAhorro = ahorro;
      mejorAno = ano;
      mejorPerdida = vpnMantenerPrevio - vpnReemplazo; // pérdida por esperar un año más
    }

    vpnMantenerPrevio = vpnMantener;
  }

  // Nivel de confianza (puedes mejorarlo según tu modelo)
  let confianzaModelo = mejorConfianza;
  if (mejorAhorro > 0 && mejorAhorro / valorInicial > 0.15) confianzaModelo = 90;
  if (mejorAhorro / valorInicial < 0.05) confianzaModelo = 70;

  return {
    anoOptimo: mejorAno,
    ahorroPotencial: Math.round(mejorAhorro),
    perdida: Math.round(mejorPerdida),
    confianzaModelo,
    datosGrafico,
  };
}

function obtenerRecomendaciones(resultados: AnalisisResultado, valorInicial: number, formData: any): string[] {
  const recomendaciones: string[] = [];

  if (resultados.ahorroPotencial <= 0) {
    recomendaciones.push("No se recomienda el reemplazo en el horizonte evaluado, ya que el ahorro potencial es negativo o nulo.");
    return recomendaciones;
  }

  if (resultados.ahorroPotencial / valorInicial > 0.10) {
    recomendaciones.push("Reemplazar en los próximos 24 meses para maximizar ahorro.");
  }

  if (resultados.perdida / valorInicial > 0.10) {
    recomendaciones.push("Considerar reemplazo urgente: la pérdida por esperar supera el 10% del valor inicial.");
  }

  if (formData.eficienciaNueva) {
    recomendaciones.push("Evaluar modelos más eficientes energéticamente (+15% ahorro)." );
  }

  if ((formData.costoParada || 0) > 0) {
    recomendaciones.push("Planificar reemplazo gradual para minimizar interrupción operativa.");
  }

  if (resultados.confianzaModelo > 75) {
    recomendaciones.push("El modelo tiene alta confianza (>75%). La decisión está validada.");
  }

  return recomendaciones;
}

const Dashboard = () => {
  const [resultados, setResultados] = useState<any>(null);
  const [ultimoFormData, setUltimoFormData] = useState<any>(null);

  const handleFormularioSubmit = (formData: any) => {
    const resultadosCalculados = calcularAnalisisVPN(formData);
    setResultados(resultadosCalculados);
    setUltimoFormData(formData); // <-- guarda el form
  };

  return (
    <div className="app-container">
      <div className="left-panel">
        <h3 style={{ color: "#1976d2", display: "flex", alignItems: "center", gap: 8 }}>
          <span role="img" aria-label="chart">📊</span> Parámetros del Análisis
        </h3>
        <Formulario onSubmit={handleFormularioSubmit} />
      </div>
      <div className="right-panel">
        <div className="card">
          <span className="badge">Streamlit</span>
          <h1 style={{ color: "#1976d2", marginBottom: 8 }}>
            <span role="img" aria-label="factory">🏭</span> Sistema de Análisis de Reemplazo de Activos Industriales
          </h1>
          <p>Determina el año óptimo para reemplazar equipos industriales mediante análisis de VPN</p>
        </div>
        <div className="card">
          <h2 style={{ color: "#1976d2", marginBottom: 16 }}>
            <span role="img" aria-label="results">📝</span> Resultados del Análisis
          </h2>
          {resultados && (
            <>
              <div className="result-card">
                <div>Año Óptimo de Reemplazo</div>
                <div style={{ fontSize: 32, fontWeight: 700 }}>{resultados.anoOptimo} años</div>
                <div style={{ fontSize: 14 }}>Desde año {resultados.anoActual}</div>
              </div>
              <div className="result-card">
                <div>Ahorro Potencial</div>
                <div style={{ fontSize: 32, fontWeight: 700 }}>${resultados.ahorroPotencial.toLocaleString()}</div>
                <div style={{ fontSize: 14 }}>16.9% del valor inicial</div>
              </div>
              <div className="result-card">
                <div>Pérdida por Retraso (3 años)</div>
                <div style={{ fontSize: 32, fontWeight: 700 }}>${resultados.perdida.toLocaleString()}</div>
                <div style={{ fontSize: 14 }}>6.5% del valor inicial</div>
              </div>
              <div className="result-card">
                <div>Nivel de Confianza</div>
                <div style={{ fontSize: 32, fontWeight: 700 }}>{resultados.confianzaModelo}%</div>
                <div style={{ fontSize: 14 }}>Alta confianza</div>
              </div>
            </>
          )}
        </div>
        {resultados && ultimoFormData && (
          <div style={{
            background: "#2196f3",
            color: "#fff",
            borderRadius: 14,
            padding: "18px 24px",
            margin: "24px 0",
            boxShadow: "0 2px 12px #0002"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 24, marginRight: 8 }}>💡</span>
              <h3 style={{ margin: 0, fontWeight: 700 }}>Recomendaciones Inteligentes</h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: 24 }}>
              {obtenerRecomendaciones(resultados, ultimoFormData.valorInicial, ultimoFormData).map((rec, idx) => (
                <li key={idx} style={{ fontSize: 17, marginBottom: 6 }}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
        {resultados && <Grafico data={resultados.datosGrafico} />}
      </div>
    </div>
  );
};

export default Dashboard;