import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ operador, fn }) => {
  return (
    <button
      type="button"
      className="h-10 w-10 felx items-ceter justify-content-center font-bold bg-lime-500 rounded-full hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-line-lime-500 text-white text-2xl"
      onClick={fn}
    >
      {operador}
    </button>
  );
};

Button.propTypes = {
  operador: PropTypes.string.isRequired,
  fn: PropTypes.func.isRequired,
};

export default Button;