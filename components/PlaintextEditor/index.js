import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import css from './style.css';

function PlaintextEditor({ file, write }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    (async () => {
      setValue(await file.text());
    })();
  });

  const handleChange = e => {
    // build new file
    const newFile = new File([e.target.textContent], file.name, {
      type: file.type,
      lastModified: Date.now()
    });
    write(newFile);
  };

  return (
    <div className={css.preview}>
      <div className={css.title}>{path.basename(file.name)}</div>
      <div
        className={css.content}
        onBlur={e => handleChange(e)}
        contentEditable="true"
      >
        {value}
      </div>
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
