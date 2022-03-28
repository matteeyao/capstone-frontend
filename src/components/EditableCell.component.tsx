import React from "react";
import PropTypes, { InferProps } from "prop-types";

// Create an editable cell renderer
const EditableCell: any = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
    editableRowIndex // index of the row we requested for editing
}: InferProps<typeof EditableCell.propTypes>) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateMyData(index, id, value);
    };

    // If the initialValue is changed externall, sync it up with our state
    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return index === editableRowIndex ? (
        <input value={value} onChange={onChange} onBlur={onBlur} />
    ) : (
        <p>{value}</p>
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
        id: PropTypes.number.isRequired
    }),
    updateMyData: PropTypes.func.isRequired
};

export default EditableCell;
