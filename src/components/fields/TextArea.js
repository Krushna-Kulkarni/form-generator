import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeField, updateField } from "../../slices/formFieldsSlice";
import TextareaFieldEditor from "../fieldEditors/TextAreaFieldEditor";

const TextArea = ({ field }) => {
  const [textArea, setTextArea] = useState(field);
  const [isFieldEditorActive, setIsFieldEditorActive] = useState(false);

  const dispatch = useDispatch();

  const onChangeHandler = (value) => {
    setTextArea({ ...textArea, value: value });
    dispatch(
      updateField({ id: textArea?.id, field: { ...textArea, value: value } })
    );
  };

  return (
    <>
      {isFieldEditorActive ? (
        <>
          <TextareaFieldEditor
            field={textArea}
            setIsFieldEditorActive={setIsFieldEditorActive}
            setField={setTextArea}
          />
        </>
      ) : (
        <>
          <div className="textarea-field-container">
            <div className="textarea-field">
              <label htmlFor={textArea.id}>{`${textArea?.label}${
                textArea?.required ? "*" : ""
              }: `}</label>
              <textarea
                className="textarea-field-input"
                id={textArea.id}
                key={textArea.id}
                rows={textArea.rows}
                cols={textArea.cols}
                placeholder={textArea.placeholder}
                value={textArea.value}
                maxLength={textArea?.maxLength}
                required={textArea?.isRequired}
                onChange={(e) => onChangeHandler(e.target.value)}
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
                onClick={() => dispatch(removeField({ id: textArea.id }))}
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TextArea;
