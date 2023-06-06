import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import { calcularTotalPagar } from '../utils/function';
import swal from 'sweetalert';

const MIN = 0;
const MAX = 20000;
const STEP = 100;

const IndexPage = () => {
  const [cantidad, setCantidad] = useState(0);
  const [meses, setMeses] = useState(6);
  const [total, setTotal] = useState(calcularTotalPagar(cantidad, meses));

  const formatearDinero = (valor) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return formatter.format(valor);
  };

  useEffect(() => {
    const nuevoTotal = calcularTotalPagar(cantidad, meses);
    setTotal(nuevoTotal);
  }, [cantidad, meses]);

  const pagoMensual = total / meses;

  const handleChangeDecremento = () => {
    const valor = cantidad - STEP;
    if (valor < MIN) {
      swal({
        title: "ERROR",
        text: "Cantidad no valida!",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
      return;
    }
    setCantidad(valor);
  };

  const handleChangeIncremento = () => {
    const valor = cantidad + STEP;
    if (valor > MAX) {
      swal({
        title: "ERROR",
        text: "Cantidad no valida!",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
      return;
    }
    setCantidad(valor);
  };

  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
      <Header/>
      <div className="flex justify-between mt-10">
        <Button operador="-" fn={handleChangeDecremento} />
        <Button operador="+" fn={handleChangeIncremento} />
      </div>
      <div className="my-5">
        <input
          type="range"
          className="w-full bg-gray-200 accent-lime-500 hover:accent-lime-600"
          min={MIN}
          max={MAX}
          step={STEP}
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
        />
        <p className="text-center my-10 text-5xl font-extrabold text-indigo-600">
          {formatearDinero(cantidad)}
        </p>
        <h2 className="text-2xl font-extrabold text-gray-500 text-center">
          Elige un <span className="text-indigo-600">plazo</span> a pagar
        </h2>
        <select
          className="w-full p-2 bg-white border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500 mt-3"
          value={meses}
          onChange={(e) => setMeses(Number(e.target.value))}
        >
          <option value="6">6 Meses</option>
          <option value="12">12 Meses</option>
          <option value="24">24 Meses</option>
        </select>
      </div>
      {total > 0 ? (
        <div className="my-5 space-y-3 bg-gray-50 p-5">
          <h2 className="text-2xl font-extrabold text-gray-500 text-center">
            Resumen <span className="text-indigo-600">de pagos</span>
          </h2>
          <p className="text-xl text-gray-500 text-center font-bold">
            Meses: {meses}
          </p>
          <p className="text-xl text-gray-500 text-center font-bold">
            Total a pagar: {formatearDinero(total)}
          </p>
          <p className="text-xl text-gray-500 text-center font-bold">
            Mensualidad: {formatearDinero(pagoMensual)}
          </p>
        </div>
      ) : (
        <p className="text-xl text-purple-500 text-center font-bold">
          Añade un monto y un plazo a pagar
        </p>
      )}
    </div>
  );
};

export default IndexPage
