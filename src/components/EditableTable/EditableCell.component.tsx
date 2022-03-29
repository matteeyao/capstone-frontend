import { ChangeEvent, useEffect, useState } from "react";
import PropTypes, { InferProps } from "prop-types";

// Create an editable cell renderer
const EditableCell: any = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // this is a custom function that we supplied to our table instance
    editableRowIndex // index of the row we requested for editing
}: InferProps<typeof EditableCell.propTypes>) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateMyData(index, id, value);
    };

    // If the initialValue is changed externall, sync it up with our state
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return index === editableRowIndex ? (
        <input className="min-w-full" value={value} onChange={onChange} onBlur={onBlur} />
    ) : (
        <p className="min-w-[156px] max-w-[156px] overflow-hidden text-center">{value}</p>
    );
};

EditableCell.propTypes = {
    cell: PropTypes.shape({
        value: PropTypes.any.isRequired
    }),
    row: PropTypes.shape({
        index: PropTypes.number.isRequired
    }),
    column: PropTypes.shape({
        id: PropTypes.string.isRequired
    }),
    updateMyData: PropTypes.func.isRequired
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell
};

export default defaultColumn;
