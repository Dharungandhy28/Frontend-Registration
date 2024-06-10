import React from "react";

const DropContainer = ({ files, setFiles, disabled }) => {
  const handleClear = () => setFiles([]);

  return (
    <label className={`drop-container ${disabled ? "disabled" : ""}`}>
      <p>Drop files here</p>
      {files.length > 0 && <p>Select files: </p>}
      <div>
        {files.map((file, ind) => {
          return <span>{file.name}</span>;
        })}
      </div>
      {files.length > 0 && <button onClick={handleClear}>Clear</button>}
    </label>
  );
};

export default DropContainer;
