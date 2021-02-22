import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import MarkdownPreview from '@uiw/react-markdown-preview';
import css from './style.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/cjs/styles/prism';

function MarkdownEditor({ file, write }) {
  const [value, setValue] = useState('');

  console.log(file.name);

  var display =
    file.type === 'text/javascript' || file.type == 'application/json' ? (
      <SyntaxHighlighter language="javascript" style={coy}>
        {value}
      </SyntaxHighlighter>
    ) : (
      <MarkdownPreview source={value} />
    );

  useEffect(() => {
    (async () => {
      let fileText = await file.text();
      setValue(fileText);
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
        {display}
      </div>
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
