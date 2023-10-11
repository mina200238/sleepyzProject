import React from 'react';
export default function image() {
  const click = () => {
    console.log('hello');
  };

  return <div onClick={click}>{1 + 1}</div>;
}
