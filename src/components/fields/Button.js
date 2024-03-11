import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeField } from "../../slices/formFieldsSlice";
import ButtonFieldEditor from "./../fieldEditors/ButtonFieldEditor";

const Button = ({ field }) => {
  const [buttonField, setButtonField] = useState(field);
  const [isFieldEditorActive, setIsFieldEditorActive] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      {isFieldEditorActive ? (
        <>
          <ButtonFieldEditor
            field={buttonField}
            setIsFieldEditorActive={setIsFieldEditorActive}
            setField={setButtonField}
          />
        </>
      ) : (
        <div className="button-field-container">
          <div className="button-field">
            <button
              className="button-field-btn"
              id={field?.id}
              type={field?.subType}
              onSubmit={(e) => e.preventDefault()}
            >
              {field?.label}
            </button>
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
              onClick={() => dispatch(removeField({ id: field?.id }))}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Button;
