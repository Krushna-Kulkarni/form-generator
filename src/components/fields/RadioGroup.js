import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeField, updateField } from "../../slices/formFieldsSlice";
import RadioGroupFieldEditor from "../fieldEditors/RadioGroupFieldEditor";

const RadioGroup = ({ field }) => {
  const [radioGroupField, setRadioGroupField] = useState(field);
  const [isFieldEditorActive, setIsFieldEditorActive] = useState(false);

  const dispatch = useDispatch();

  const handleRadioSelectionChange = (e) => {
    setRadioGroupField({
      ...radioGroupField,
      selectedOption: e.target.id,
    });
    dispatch(
      updateField({
        id: radioGroupField?.id,
        field: {
          ...radioGroupField,
          selectedOption: e.target.id,
        },
      })
    );
  };

  return (
    <>
      {isFieldEditorActive ? (
        <>
          <RadioGroupFieldEditor
            field={radioGroupField}
            setIsFieldEditorActive={setIsFieldEditorActive}
            setField={setRadioGroupField}
          />
        </>
      ) : (
        <>
          <div className="radioGroup-field-container">
            <div className="radioGroup-field">
              <label>{`${radioGroupField?.label}${
                radioGroupField?.required ? "*" : ""
              }: `}</label>

              {radioGroupField?.options?.map((option, i) => (
                <div className="radioGroup-field-input-container" key={i}>
                  <input
                    className="radioGroup-field-input"
                    type="radio"
                    id={option?.id}
                    name={option?.label}
                    defaultValue={option?.value}
                    onChange={handleRadioSelectionChange}
                    checked={radioGroupField?.selectedOption === option?.id}
                  />
                  <label
                    className="radioGroup-field-input-label"
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
                  dispatch(removeField({ id: radioGroupField?.id }))
                }
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

export default RadioGroup;
