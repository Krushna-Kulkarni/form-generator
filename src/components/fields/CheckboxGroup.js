import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeField, updateField } from "../../slices/formFieldsSlice";
import CheckboxGroupFieldEditor from "../fieldEditors/CheckboxGroupFieldEditor";

const CheckboxGroup = ({ field }) => {
  const [checkboxGroupField, setCheckboxGroupField] = useState(field);

  const [isFieldEditorActive, setIsFieldEditorActive] = useState(false);

  const dispatch = useDispatch();

  const checkboxSelectHandler = (e) => {
    const updatedCheckboxOptions = checkboxGroupField?.options?.map((option) =>
      option?.id === e.target.id
        ? { ...option, checked: !option?.checked }
        : option
    );
    setCheckboxGroupField({
      ...checkboxGroupField,
      options: updatedCheckboxOptions,
    });
    dispatch(
      updateField({
        id: checkboxGroupField?.id,
        field: { ...checkboxGroupField, options: updatedCheckboxOptions },
      })
    );
  };

  return (
    <>
      {isFieldEditorActive ? (
        <>
          <CheckboxGroupFieldEditor
            field={checkboxGroupField}
            setIsFieldEditorActive={setIsFieldEditorActive}
            setField={setCheckboxGroupField}
          />
        </>
      ) : (
        <div className="checkboxGroup-field-container">
          <div className="checkboxGroup-field">
            <label>{`${checkboxGroupField?.label}${
              checkboxGroupField?.required ? "*" : ""
            }: `}</label>
            {checkboxGroupField?.options?.map((option) => (
              <div
                className="checkboxGroup-field-input-container"
                key={option?.id}
              >
                <input
                  className="checkboxGroup-field-input"
                  type="checkbox"
                  id={option?.id}
                  name={option?.label}
                  checked={option?.checked}
                  onChange={checkboxSelectHandler}
                />
                <label
                  className="checkboxGroup-field-input-label"
                  htmlFor={option?.id}
                >
                  {option?.label}
                </label>
              </div>
            ))}
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
              onClick={() =>
                dispatch(removeField({ id: checkboxGroupField?.id }))
              }
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckboxGroup;
