import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateField } from "../../slices/formFieldsSlice";

const FileUploadFieldEditor = ({ field, setField, setIsFieldEditorActive }) => {
  const [fileUploadField, setFileUploadField] = useState(field);
  const dispatch = useDispatch();
  const fileTypes = [
    { type: "Images", formats: ".png, .jpg, .jpeg," },
    { type: "PDFs", formats: ".pdf," },
    {
      type: "Documents",
      formats:
        ".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,",
    },
  ];

  const handleFileUploadFieldLabel = (e) => {
    const updatedLabel = e.target.value;
    setFileUploadField({ ...fileUploadField, label: updatedLabel });
  };

  const checkboxHandler = (e) => {
    let updatedAcceptedFileTypes;

    if (
      fileUploadField?.acceptedFileTypes?.includes(e.target.value) &&
      fileUploadField?.acceptedFileTypes?.length !== 1
    ) {
      updatedAcceptedFileTypes = [...fileUploadField?.acceptedFileTypes].filter(
        (f) => f !== e.target.value
      );
    } else if (fileUploadField?.acceptedFileTypes?.includes(e.target.value)) {
      return;
    } else {
      updatedAcceptedFileTypes = [
        ...fileUploadField?.acceptedFileTypes,
        e.target.value,
      ];
    }
    setFileUploadField({
      ...fileUploadField,
      acceptedFileTypes: updatedAcceptedFileTypes,
    });
  };
  const requiredChangeHandler = () => {
    setFileUploadField({
      ...fileUploadField,
      required: !fileUploadField.required,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setField(fileUploadField);
    dispatch(
      updateField({
        id: fileUploadField?.id,
        field: fileUploadField,
      })
    );

    setIsFieldEditorActive(false);
  };

  return (
    <form className="fileUpload-field-editor-div" onSubmit={submitHandler}>
      <div className="fileUpload-field-attr-div">
        <label htmlFor={fileUploadField?.id}>Label:</label>
        <input
          className="fileUpload-field-attr-input"
          type="text"
          id={fileUploadField?.id}
          name={fileUploadField?.label}
          value={fileUploadField?.label}
          onChange={handleFileUploadFieldLabel}
        />
      </div>
      <div className="fileUpload-field-attr-div">
        <label>Types: </label>
      </div>
      {fileTypes?.map((ft, i) => (
        <div className="fileUpload-field-attr-div" key={i}>
          <input
            className="fileUpload-field-attr-input"
            type="checkbox"
            id={ft?.type}
            name={ft?.type}
            value={ft?.formats}
            checked={fileUploadField?.acceptedFileTypes?.includes(ft?.formats)}
            onChange={checkboxHandler}
          />
          <label htmlFor={ft?.type}>{ft?.type}</label>
        </div>
      ))}
      <div className="fileUpload-field-attr-div">
        <label
          className="fileUpload-field-attr-label"
          htmlFor="fileUploadFieldRequired"
        >
          Required:{" "}
        </label>
        <input
          type="checkbox"
          id="fileUploadFieldRequired"
          name="required"
          defaultChecked={fileUploadField?.required}
          onChange={requiredChangeHandler}
        />
      </div>
      <div className="edit-field-action-btns-container">
        <input className="edit-field-action-btn" type="submit" value="Save" />{" "}
        <input
          className="edit-field-action-btn"
          type="button"
          value="Cancel"
          onClick={() => setIsFieldEditorActive(false)}
        />
      </div>
    </form>
  );
};

export default FileUploadFieldEditor;
