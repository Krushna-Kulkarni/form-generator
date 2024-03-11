import React, { useState } from "react";
import ReactJson from "react-json-view";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";

const FormJsonPreview = () => {
  const formFields = useSelector((state) => state?.formFields);
  const [JSONFields, setJSONFields] = useState(formFields);
  const showJsonData = () => {
    const jsonFields = formFields?.map(({ id, ...keepAttrs }) => keepAttrs);
    setJSONFields(jsonFields);
  };
  return (
    <div className="form-preview">
      <div className="form-preview-title">
        <h2>Form JSON Preview</h2>
        <button className="field-btn" onClick={showJsonData}>
          Generate JSON
        </button>
      </div>
      <div className="preview-form-container">
        {<ReactJson src={JSONFields} />}
      </div>
    </div>
  );
};

export default FormJsonPreview;
