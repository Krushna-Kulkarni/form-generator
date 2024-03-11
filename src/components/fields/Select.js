import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeField, updateField } from "../../slices/formFieldsSlice";
import SelectFieldEditor from "../fieldEditors/SelectFieldEditor";

const Select = ({ field }) => {
  const [selectField, setSelectField] = useState(field);

  const dispatch = useDispatch();

  const handleDropdownChange = (e) => {
    const selectedOption = selectField.options.find(
      (opt) => opt.value === e.target.value
    )?.id;

    setSelectField({
      ...selectField,
      selectedOption: selectedOption,
    });
    dispatch(
      updateField({
        id: selectField?.id,
        field: {
          ...selectField,
          selectedOption: selectedOption,
        },
      })
    );
  };

  const [isFieldEditorActive, setIsFieldEditorActive] = useState(false);
  return (
    <>
      {isFieldEditorActive ? (
        <>
          <SelectFieldEditor
            field={selectField}
            setIsFieldEditorActive={setIsFieldEditorActive}
            setField={setSelectField}
          />
        </>
      ) : (
        <>
          <div className="select-field-container">
            <div className="select-field">
              <label htmlFor={selectField?.id}>{`${selectField?.label}${
                selectField?.required ? "*" : ""
              }: `}</label>
              <select
                id={selectField?.id}
                defaultValue={
                  selectField.options.find(
                    (opt) => opt.id === selectField?.selectedOption
                  )?.value
                }
                onChange={handleDropdownChange}
              >
                <option value="">Select</option>
                {selectField?.options?.map((option) => (
                  <option
                    key={option?.id}
                    id={option?.id}
                    value={option?.value}
                  >
                    {option?.value}
                  </option>
                ))}
              </select>
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
                onClick={() => dispatch(removeField({ id: selectField?.id }))}
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

export default Select;
