import React, { useState } from "react";
import { removeField } from "../../slices/formFieldsSlice";
import { useDispatch } from "react-redux";
import FileUploadFieldEditor from "../fieldEditors/FileUploadFieldEditor";

const FileUpload = ({ field }) => {
  const [fileUploadField, setFileUploadField] = useState(field);
  const [isFieldEditorActive, setIsFieldEditorActive] = useState(false);
  const dispatch = useDispatch();

  const acceptedFileTypes = fileUploadField?.acceptedFileTypes.join(" ");

  return (
    <>
      {isFieldEditorActive ? (
        <>
          <FileUploadFieldEditor
            field={fileUploadField}
            setIsFieldEditorActive={setIsFieldEditorActive}
            setField={setFileUploadField}
          />
        </>
      ) : (
        <div className="fileUpload-field-container">
          <div className="fileUpload-field">
            <label htmlFor="fileUpload">{`${fileUploadField?.label}${
              fileUploadField?.required ? "*" : ""
            }: `}</label>
            <input
              className="fileUpload-field-btn"
              id="fileUpload"
              type="file"
              accept={acceptedFileTypes}
            />
          </div>
          <div className="field-action-btns-container">
            <button
              className="field-action-btn"
              onClick={() => setIsFieldEditorActive(true)}
            >
              Edit
            </button>
            <button
              className="field-action-btn"
              onClick={() => dispatch(removeField({ id: fileUploadField?.id }))}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FileUpload;
