"use strict";

import React from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";

class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
    background: "#00BCD5",
  };

  handleClick = () => {
    const { background } = this.state;
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
    this.props.handleChange(background, -1);
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    const { background } = this.state;
    this.setState({ background: color.hex }, () => {
      this.props.handleChange(background, -1);
    });
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: "28px",
          height: "20px",
          borderRadius: "100px",
          background: this.state.background,
        },
        swatch: {
          padding: "3px",
          background: "#fff",
          borderRadius: "100px",
          boxShadow: "0 0 0 0.4px grey",
          display: "inline-block",
          cursor: "pointer",
        },
        popover: {
          position: "absolute",
          zIndex: "2",
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
      },
    });

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker
              color={this.state.background}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default ColorPicker;
