import React, { useState } from "react";
import { removeField, updateField } from "../../slices/formFieldsSlice";
import { useDispatch } from "react-redux";
import TextFieldEditor from "../fieldEditors/TextFieldEditor";

const TextField = ({ field }) => {
  const [textField, setTextField] = useState(field);

  const dispatch = useDispatch();

  const onChangeHandler = (value) => {
    setTextField({ ...textField, value: value });
    dispatch(
      updateField({ id: textField?.id, field: { ...textField, value: value } })
    );
  };

  const [isFieldEditorActive, setIsFieldEditorActive] = useState(false);

  return (
    <>
      {isFieldEditorActive ? (
        <>
          <TextFieldEditor
            field={textField}
            setIsFieldEditorActive={setIsFieldEditorActive}
            setField={setTextField}
          />
        </>
      ) : (
        <>
          <div className="text-field-container">
            <div className="text-field">
              <label htmlFor={textField.id}>{`${textField?.label}${
                textField?.required ? "*" : ""
              }: `}</label>
              <input
                className="text-field-input"
                id={textField.id}
                key={textField.id}
                type={textField.subType}
                placeholder={textField?.placeholder}
                value={textField.value}
                maxLength={textField?.maxLength}
                onChange={(e) => onChangeHandler(e.target.value)}
                required={textField?.isRequired}
                // oninvalid="this.setCustomValidity('This is not a valid phone number')" oninput="this.setCustomValidity('')"
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
                onClick={() => dispatch(removeField({ id: textField.id }))}
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

export default TextField;
