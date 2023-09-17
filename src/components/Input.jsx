import PropTypes from "prop-types";
const Input = ({
  type,
  value,
  step,
  min,
  max,
  onChange,
  onMouseDown,
  onMouseUp,
}) => {
  return (
    <input
      id="progress"
      className="progress"
      type={type}
      value={value}
      step={step}
      min={min}
      max={max}
      onChange={onChange}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.number,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number || PropTypes.string,
  onChange: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
};

export default Input;
