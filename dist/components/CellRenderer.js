var _jsxFileName = "/usr/share/nginx/html/react-template-editor/src/components/CellRenderer.js";
import React from 'react';
import { HeightHelper, CellWrap, RenderedCellWrap, RenderedCellImage, RenderedLabel, RenderedTextCellWrap, RenderedTextLine, TextColumn } from './Styled';
/** 
 * Cell Renderer Component  
 * 
 */

var CellRenderer = function CellRenderer(props) {
  var content; // set content 

  switch (props.cell.type) {
    case 'image':
      content = React.createElement(ImageCell, Object.assign({}, props.cell.params, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        },
        __self: this
      }));
      break;

    case 'video':
      content = React.createElement(VideoCell, Object.assign({}, props.cell.params, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        },
        __self: this
      }));
      break;

    case 'text':
    default:
      content = React.createElement(TextCell, Object.assign({}, props.cell.params, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        },
        __self: this
      }));
  }

  var openCell = props.openCell,
      modifyCell = props.modifyCell,
      ic = props.ic,
      ir = props.ir,
      is = props.is; // render

  return React.createElement(CellWrap, Object.assign({}, props.cell.params, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }), React.createElement("div", {
    onClick: function onClick(e) {
      return openCell(e, ic, ir, is, modifyCell);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, content));
};

export default CellRenderer;
/** 
 * [ Image ]  
 * 
 */

var ImageCell = function ImageCell(props) {
  var ratioParts = props.ratio.split(':'),
      height = 100 * ratioParts[1] / ratioParts[0],
      align = props.align === 'center' ? 'none' : props.align;
  return React.createElement(RenderedCellWrap, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: this
  }), React.createElement(HeightHelper, Object.assign({}, props, {
    height: height,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: this
  }), React.createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: this
  })), React.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: this
  }, React.createElement(RenderedCellImage, Object.assign({}, props, {
    align: align,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  }), React.createElement(RenderedLabel, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }, props.label || ''))));
};
/** 
 * [ Text ]  
 * 
 */


var TextCell = function TextCell(props) {
  var align = props.align === 'center' ? 'none' : props.align,
      columnSize = 100 / +props.columns;
  return React.createElement(RenderedTextCellWrap, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    },
    __self: this
  }), Array.from(Array(+props.columns)).map(function (c, j) {
    return React.createElement(TextColumn, {
      key: "column-".concat(j),
      width: columnSize,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 71
      },
      __self: this
    }, Array.from(Array(+props.lines)).map(function (l, i) {
      return React.createElement(RenderedTextLine, Object.assign({
        key: "column-".concat(j, "-line-").concat(i)
      }, props, {
        align: align,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        },
        __self: this
      }), React.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        },
        __self: this
      }));
    }));
  }));
};
/** 
 * [ Video ]  
 * 
 */


var VideoCell = function VideoCell(props) {
  var ratioParts = props.ratio.split(':'),
      height = 100 * ratioParts[1] / ratioParts[0],
      align = props.align === 'center' ? 'none' : props.align;
  return React.createElement(RenderedCellWrap, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94
    },
    __self: this
  }), React.createElement(HeightHelper, Object.assign({}, props, {
    height: height,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95
    },
    __self: this
  }), React.createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96
    },
    __self: this
  })), React.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98
    },
    __self: this
  }, React.createElement(RenderedCellImage, Object.assign({}, props, {
    align: align,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99
    },
    __self: this
  }), React.createElement(RenderedLabel, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100
    },
    __self: this
  }, "VIDEO"))));
};