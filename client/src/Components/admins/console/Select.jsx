import React from 'react';

class Select extends React.Component {
    render() {

        const {values, selectedValue, handleSelect } = this.props;
        const displayValues = ['', ...values]
        return (
            <select
                value= {selectedValue}
                onChange={handleSelect}
            >
                {displayValues.map(val =>
                    <option key={val} value={val}> {val} </option>
                )}
            </select>
        )
    }

    
}

export default Select;