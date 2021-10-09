import React from "react";
import PropTypes from "prop-types";
import iconPath from "../../icons/iconsLib";
import Svg, { Path } from 'react-native-svg';

const defaultStyles = { display: "inline-block", verticalAlign: "middle" };

const Icon = ({ size, color, icon, className, style, viewBox }) => {
  console.log(size, color, icon, className, style, viewBox);
  const styles = { ...defaultStyles, ...style };
  return (
    <Svg
      className={className}
      style={styles}
      viewBox={viewBox}
      width={`${size}px`}
      height={`${size}px`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <Path
        fill={color} 
        d={iconPath[icon]} 
        fillRule="evenodd" 
        clipRule="evenodd" 
      />
    </Svg>
  );
};

Icon.defaultProps = {
  size: 16,
  color: "#000000",
  viewBox: "0 0 24 24",
  style: {},
  className: "",
};

Icon.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  viewBox: PropTypes.string.isRequired,
  style: PropTypes.shape(PropTypes.object),
  className: PropTypes.string,
};

export default Icon;
