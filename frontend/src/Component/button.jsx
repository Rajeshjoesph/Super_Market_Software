// src/components/Button.js

import React from "react";

const Button = ({ label, styleType }) => {
  const baseStyle = "px-4 py-2 font-semibold rounded";

  const styles = {
    primary: `${baseStyle} bg-blue-500 text-white hover:bg-blue-700 m-2`,
    secondary: `${baseStyle} bg-gray-500 text-white hover:bg-gray-700 m-2`,
  };

  return <button className={styles[styleType]}>{label}</button>;
};

export default Button;
