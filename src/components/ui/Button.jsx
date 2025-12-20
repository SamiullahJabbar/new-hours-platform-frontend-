import React from 'react';

const base = 'inline-block px-4 py-1 border-[2px] rounded-md font-medium transition-colors';

const sizes = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-lg',
  lg: 'px-6 py-2 text-2xl',
};

const variants = {
  default: 'border-gray-100 hover:bg-gray-100',
  yellow: 'bg-yellow-500 border-yellow-500 text-black hover:bg-yellow-400 hover:border-yellow-400',
  ghost: 'bg-transparent border-yellow-400 text-white hover:text-black hover:bg-yellow-500 hover:border-yellow-500',
  dark: 'bg-black border-black text-white hover:text-black hover:bg-transparent hover:border-black',
};

const Button = (props) => {

  const { children, variant = 'default', size = 'md', className = '', onClick, type = 'button' } = props;

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`.trim();

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
