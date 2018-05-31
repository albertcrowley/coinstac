import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

class MultiSelectField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  removeFromArray(array, element) {
    return array.filter(e => e !== element);
  }

  handleSelectChange(value) {
    if( value === 'All' ){
      let options = this.props.options;
      let optionsArr = this.removeFromArray(options, "All");
      options = optionsArr.toString();
      this.setState({ value: optionsArr });
      this.props.change(options);
    }else{
      this.setState({ value });
      this.props.change(value);
    }
  }

  render() {
    const options = this.props.options.map((val) => {
      return { label: val, value: val };
    });
    return (
      <div className="section">
        <Select
          closeOnSelect={false}
          disabled={false}
          multi
          onChange={this.handleSelectChange}
          options={options}
          placeholder={this.props.placeholder}
          removeSelected
          simpleValue
          value={this.state.value}
        />
      </div>
    );
  }
}

MultiSelectField.propTypes = {
  change: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default MultiSelectField;
