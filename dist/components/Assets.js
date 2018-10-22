import _taggedTemplateLiteral from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral";
var _jsxFileName = "/usr/share/nginx/html/react-template-editor/src/components/Assets.js";

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    display: block;\n    margin: auto;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    cursor: pointer;\n    height: ", ";\n    width: ", ";\n    border-radius: 50%;\n    margin: ", ";\n    text-align: center;\n    ", "\n    ", "\n    display: flex;\n    align-items: center;\n    ", "\n    ", "    \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import React from 'react';
import styled from 'styled-components';
export var Icon = function Icon(props) {
  var child;

  switch (props.name) {
    case 'edit':
      child = React.createElement(Edit, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        },
        __self: this
      });
      break;

    case 'remove':
      child = React.createElement(Remove, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        },
        __self: this
      });
      break;

    case 'close':
      child = React.createElement(Close, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        },
        __self: this
      });
      break;

    case 'left':
      child = React.createElement(Left, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        },
        __self: this
      });
      break;

    case 'right':
      child = React.createElement(Right, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        },
        __self: this
      });
      break;

    case 'down':
      child = React.createElement(Down, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        },
        __self: this
      });
      break;

    case 'reorder':
      child = React.createElement(Reorder, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        },
        __self: this
      });
      break;

    case 'resize':
      child = React.createElement(Resize, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        },
        __self: this
      });
      break;
  }

  return React.createElement(Wrap, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }), child);
};
var Wrap = styled.div(_templateObject(), function (props) {
  return props.height ? props.height : '40px';
}, function (props) {
  return props.width ? props.width : '40px';
}, function (props) {
  return props.margin ? props.margin : 'auto';
}, function (props) {
  return props.selected ? 'background: #eee;' : null;
}, function (props) {
  return props.active ? "\n        background: #555 !important;\n        box-shadow: none;\n    " : null;
}, function (props) {
  return props.left ? 'float: left;' : null;
}, function (props) {
  return props.right ? 'float: right;' : null;
});
var SVG = styled.svg(_templateObject2());

var Edit = function Edit(props) {
  return React.createElement(SVG, {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: this
  }, React.createElement("path", {
    d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  }), React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }));
};

var Remove = function Remove(props) {
  return React.createElement(SVG, {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    },
    __self: this
  }, React.createElement("path", {
    d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: this
  }), React.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: this
  }));
};

var Close = function Close(props) {
  return React.createElement(SVG, {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    },
    __self: this
  }, React.createElement("path", {
    d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70
    },
    __self: this
  }), React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71
    },
    __self: this
  }));
};

var Right = function Right(props) {
  return React.createElement(SVG, {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79
    },
    __self: this
  }, React.createElement("path", {
    d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80
    },
    __self: this
  }), React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81
    },
    __self: this
  }));
};

var Left = function Left(props) {
  return React.createElement(SVG, {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88
    },
    __self: this
  }, React.createElement("path", {
    d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89
    },
    __self: this
  }), React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 90
    },
    __self: this
  }));
};

var Down = function Down(props) {
  return React.createElement(SVG, {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97
    },
    __self: this
  }, React.createElement("path", {
    d: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98
    },
    __self: this
  }), React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99
    },
    __self: this
  }));
};

var Reorder = function Reorder(props) {
  return React.createElement(SVG, {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106
    },
    __self: this
  }, React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107
    },
    __self: this
  }), React.createElement("path", {
    d: "M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108
    },
    __self: this
  }));
};

var Resize = function Resize(props) {
  return React.createElement(SVG, {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115
    },
    __self: this
  }, React.createElement("path", {
    d: "M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 116
    },
    __self: this
  }));
};