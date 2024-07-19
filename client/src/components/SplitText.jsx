/* eslint-disable react/prop-types */

import React from 'react';

const SplitText = ({ text }) => {
  const lines = text.split('/enter');

  return (
    <p>
      {lines.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </p>
  );
};

export default SplitText;
