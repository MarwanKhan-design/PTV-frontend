import React from 'react'
import CreatableSelect from 'react-select/creatable'

const customStyles = {
  // menu: (provided, state) => ({
  //   ...provided,
  //   width: state.selectProps.width,
  //   borderBottom: '1px dotted pink',
  //   color: state.selectProps.menuColor,
  //   padding: 20,
  //   backgroundColor: 'rgba(100, 100, 50, 0.8)',
  // }),

  control: (_, { selectProps: { width } }) => ({
    width: width,
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'

    return { ...provided, opacity, transition }
  },
}

const CustomSelect = ({
  style,
  label,
  options,
  onChangeInput,
  defaultValue,
  placeholder,
  isMulti = true,
}) => {
  return (
    <div style={style}>
      <h2>{label}</h2>
      <CreatableSelect
        options={options}
        styles={customStyles}
        onChange={onChangeInput}
        defaultValue={defaultValue}
        placeholder={placeholder}
        isMulti={isMulti}
      />
    </div>
  )
}

export default CustomSelect
