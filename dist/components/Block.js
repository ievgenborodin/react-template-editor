import _objectSpread from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _toConsumableArray from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
import _classCallCheck from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
var _jsxFileName = "/usr/share/nginx/html/react-template-editor/src/components/Block.js";
import React, { Component, Fragment } from 'react';
import ModalWrapper from './ModalWrapper';
import CellModal from './CellModal';
import CellRenderer from './CellRenderer';
import { BlockWrap, BlockInner, RemoveBlockButton, ResizerWrap, StyledReactSlider, Ruler, Button, Column, AddColumnButton, Row, AddRowWrap, RemoveRowButton, Cell, CreateCellWrap, AddCellWrap, AddCellButton, CellResizeButton, CellResizerWrap, CellRuler } from './Styled';

var Block =
/*#__PURE__*/
function (_Component) {
  _inherits(Block, _Component);

  function Block(props) {
    var _this;

    _classCallCheck(this, Block);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Block).call(this, props));
    _this.state = {
      isHover: false,
      resizePointers: [],
      id: props.blockId,
      columnSizes: props.defaults.columnSizes || [100],
      currentResizeColumn: null,
      currentResizeRow: null,
      cellResizePointers: [],
      isCellResizeMode: false,
      columns: props.defaults.columns || [_this.initColumn()]
    };
    _this.initColumn = _this.initColumn.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.addColumn = _this.addColumn.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.initRow = _this.initRow.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.addRow = _this.addRow.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.removeCell = _this.removeCell.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.addCell = _this.addCell.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.modifyCell = _this.modifyCell.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.openCell = _this.openCell.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.sync = _this.sync.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.isMouseDown = false;
    _this.updateColumnResizeBars = _this.updateColumnResizeBars.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.toggleCellsResize = _this.toggleCellsResize.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.updateCellResizeBars = _this.updateCellResizeBars.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Block, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.sync();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!this.props.isResizeMode && nextProps.isResizeMode) this.setState({
        isCellResizeMode: false,
        currentResizeColumn: null,
        currentResizeRow: null
      });
    }
  }, {
    key: "toggleCellsResize",
    value: function toggleCellsResize(columnId, rowId) {
      var _this$state = this.state,
          columns = _this$state.columns,
          isCellResizeMode = _this$state.isCellResizeMode,
          currentResizeColumn = _this$state.currentResizeColumn,
          currentResizeRow = _this$state.currentResizeRow;

      if (isCellResizeMode && currentResizeColumn && currentResizeRow && currentResizeColumn == columnId && currentResizeRow == rowId) {
        this.setState({
          isCellResizeMode: false,
          currentResizeColumn: null,
          currentResizeRow: null
        });
        return false;
      }

      var rows = columns[columnId].rows;
      var cellSizes = rows[rowId].cellSizes; // set cell bars

      var pointersCount = cellSizes.length - 1,
          pointers = [],
          summer = 0;

      if (pointersCount) {
        for (var i = 0; i < pointersCount; i++) {
          summer += cellSizes[i];
          pointers.push(summer);
        }
      }

      this.setState({
        currentResizeColumn: columnId,
        currentResizeRow: rowId,
        cellResizePointers: pointers,
        isCellResizeMode: !isCellResizeMode
      }, this.props.disableResizeMode);
    }
  }, {
    key: "updateCellResizeBars",
    value: function updateCellResizeBars(newVals) {
      var valsArr = Array.isArray(newVals) ? newVals : [newVals],
          newSizes = [],
          tempArr = [0].concat(_toConsumableArray(valsArr), [100]);

      for (var i = 1; i < tempArr.length; i++) {
        newSizes.push(tempArr[i] - tempArr[i - 1]);
      }

      var _this$state2 = this.state,
          columns = _this$state2.columns,
          currentResizeColumn = _this$state2.currentResizeColumn,
          currentResizeRow = _this$state2.currentResizeRow;
      if (Math.min.apply(Math, newSizes) <= 10) return false;

      var newColumns = _toConsumableArray(columns);

      newColumns[currentResizeColumn].rows[currentResizeRow].cellSizes = newSizes;
      this.setState({
        cellResizePointers: newVals,
        columns: newColumns
      }, this.sync);
    }
  }, {
    key: "updateColumnResizeBars",
    value: function updateColumnResizeBars(newVals) {
      var valsArr = Array.isArray(newVals) ? newVals : [newVals];
      if (Math.min.apply(Math, _toConsumableArray(valsArr)) <= 1) return false;
      var newSizes = [],
          tempArr = [0].concat(_toConsumableArray(valsArr), [100]);

      for (var i = 1; i < tempArr.length; i++) {
        newSizes.push(tempArr[i] - tempArr[i - 1]);
      }

      if (Math.min.apply(Math, newSizes) <= 1) return false;
      this.setState({
        resizePointers: newVals,
        columnSizes: newSizes
      }, this.sync);
    }
  }, {
    key: "initColumn",
    value: function initColumn() {
      return {
        rows: [this.initRow()]
      };
    }
  }, {
    key: "initRow",
    value: function initRow() {
      return {
        cells: [null],
        cellSizes: [100]
      };
    }
  }, {
    key: "sync",
    value: function sync() {
      var _this$state3 = this.state,
          id = _this$state3.id,
          columnSizes = _this$state3.columnSizes,
          columns = _this$state3.columns; // set column bars

      var pointersCount = columnSizes.length - 1,
          pointers = [],
          summer = 0;

      if (pointersCount) {
        for (var i = 0; i < pointersCount; i++) {
          summer += columnSizes[i];
          pointers.push(summer);
        }
      }

      this.setState({
        resizePointers: pointers
      });
      this.props.onSync(id, {
        id: id,
        columnSizes: columnSizes,
        columns: columns
      });
    }
    /** 
     * Add Column
     * 
     */

  }, {
    key: "addColumn",
    value: function addColumn() {
      var _this$state4 = this.state,
          columns = _this$state4.columns,
          columnSizes = _this$state4.columnSizes;
      var columnNumber = columnSizes.length + 1,
          newSize = 100 / columnNumber;
      this.setState({
        columns: _toConsumableArray(columns).concat([this.initColumn()]),
        columnSizes: Array.apply(null, Array(columnNumber)).map(function (c) {
          return newSize;
        })
      }, this.sync);
    }
    /** 
     * Add Row
     * 
     */

  }, {
    key: "addRow",
    value: function addRow(columnId) {
      var columns = this.state.columns;
      this.setState({
        columns: _toConsumableArray(columns.slice(0, columnId)).concat([_objectSpread({}, columns[columnId], {
          rows: columns[columnId].rows.concat([this.initRow()])
        })], _toConsumableArray(columns.slice(columnId + 1, columns.length)))
      }, this.sync);
    }
    /** 
     * Add Cell
     * 
     */

  }, {
    key: "addCell",
    value: function addCell(columnId, rowId, side) {
      var columns = this.state.columns;
      var rows = columns[columnId].rows;
      var _rows$rowId = rows[rowId],
          cells = _rows$rowId.cells,
          cellSizes = _rows$rowId.cellSizes;
      var cellNumber = cellSizes.length + 1,
          newSize = 100 / cellNumber;
      this.setState({
        columns: _toConsumableArray(columns.slice(0, columnId)).concat([_objectSpread({}, columns[columnId], {
          rows: _toConsumableArray(rows.slice(0, rowId)).concat([{
            cells: side == 'left' ? [null].concat(cells) : cells.concat([null]),
            cellSizes: Array.apply(null, Array(cellNumber)).map(function (c) {
              return newSize;
            })
          }], _toConsumableArray(rows.slice(rowId + 1, rows.length)))
        })], _toConsumableArray(columns.slice(columnId + 1, columns.length)))
      }, this.sync);
    }
    /** 
     * Remove Row
     * 
     */

  }, {
    key: "removeCell",
    value: function removeCell(columnId, rowId, cellId) {
      var _this$state5 = this.state,
          columns = _this$state5.columns,
          columnSizes = _this$state5.columnSizes;
      var rows = columns[columnId].rows;
      var _rows$rowId2 = rows[rowId],
          cells = _rows$rowId2.cells,
          cellSizes = _rows$rowId2.cellSizes;
      var newColumn = [],
          newColumnSizes,
          newColumnSize;

      if (cells.length > 1) {
        // recount column sizes on one column removal
        var newCellSize = 100 / (cellSizes.length - 1);
        var newCellSizes = Array.apply(null, Array(cellSizes.length - 1)).map(function (c) {
          return newCellSize;
        });
        newColumn.push(_objectSpread({}, columns[columnId], {
          rows: _toConsumableArray(rows.slice(0, rowId)).concat([_objectSpread({}, rows[rowId], {
            cells: _toConsumableArray(cells.slice(0, cellId)).concat(_toConsumableArray(cells.slice(cellId + 1, cells.length))),
            cellSizes: newCellSizes
          })], _toConsumableArray(rows.slice(rowId + 1, rows.length)))
        }));
      } // remove row if column has more than 1, otherwise remove column
      else if (rows.length > 1) newColumn.push(_objectSpread({}, columns[columnId], {
          rows: _toConsumableArray(rows.slice(0, rowId)).concat(_toConsumableArray(rows.slice(rowId + 1, rows.length)))
        }));else {
          // recount column sizes on one column removal
          newColumnSize = 100 / (columnSizes.length - 1);
          newColumnSizes = Array.apply(null, Array(columnSizes.length - 1)).map(function (c) {
            return newColumnSize;
          });
        }

      this.setState({
        columns: _toConsumableArray(columns.slice(0, columnId)).concat(newColumn, _toConsumableArray(columns.slice(columnId + 1, columns.length))),
        columnSizes: newColumnSizes || columnSizes
      }, this.sync);
    }
    /** 
     * Create Cell
     * 
     */

  }, {
    key: "openCell",
    value: function openCell(e, columnId, rowId, cellId, callback) {
      var _this2 = this;

      e.preventDefault();
      var _this$props = this.props,
          openModal = _this$props.openModal,
          closeModal = _this$props.closeModal,
          theme = _this$props.theme;
      var cell = this.state.columns[columnId].rows[rowId].cells[cellId];
      openModal({
        title: 'New Cell',
        content: React.createElement(CellModal, Object.assign({
          closeModal: closeModal,
          columnId: columnId,
          rowId: rowId,
          cellId: cellId,
          cell: cell,
          theme: theme
        }, {
          onDelete: function onDelete(e) {
            return _this2.modifyCell(columnId, rowId, cellId, null);
          },
          onSelect: callback,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 306
          },
          __self: this
        }))
      }, {
        contentStyle: {
          padding: '15px 0'
        }
      });
    }
    /** 
     * Modify Cell
     * 
     */

  }, {
    key: "modifyCell",
    value: function modifyCell(columnId, rowId, cellId, data) {
      var columns = this.state.columns;
      var rows = columns[columnId].rows;
      var cells = rows[rowId].cells;
      this.setState({
        columns: _toConsumableArray(columns.slice(0, columnId)).concat([_objectSpread({}, columns[columnId], {
          rows: _toConsumableArray(rows.slice(0, rowId)).concat([_objectSpread({}, rows[rowId], {
            cells: _toConsumableArray(cells.slice(0, cellId)).concat([data], _toConsumableArray(cells.slice(cellId + 1, cells.length)))
          })], _toConsumableArray(rows.slice(rowId + 1, rows.length)))
        })], _toConsumableArray(columns.slice(columnId + 1, columns.length)))
      }, this.sync);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state6 = this.state,
          columns = _this$state6.columns,
          columnSizes = _this$state6.columnSizes,
          isHover = _this$state6.isHover,
          cellResizePointers = _this$state6.cellResizePointers,
          resizePointers = _this$state6.resizePointers,
          isCellResizeMode = _this$state6.isCellResizeMode,
          currentResizeColumn = _this$state6.currentResizeColumn,
          currentResizeRow = _this$state6.currentResizeRow;
      var openCell = this.openCell,
          modifyCell = this.modifyCell,
          addColumn = this.addColumn,
          addRow = this.addRow,
          removeCell = this.removeCell,
          addCell = this.addCell;
      var _this$props2 = this.props,
          onDelete = _this$props2.onDelete,
          blockId = _this$props2.blockId,
          isOnlyBlock = _this$props2.isOnlyBlock,
          isResizeMode = _this$props2.isResizeMode,
          isReorderMode = _this$props2.isReorderMode;
      var isLastCell = columns.length > 1 || columns[0].rows.length > 1 || columns[0].rows[0].cells.length > 1 ? false : true,
          localPointers = Array.isArray(resizePointers) ? resizePointers : [resizePointers],
          cellLocalPointers = Array.isArray(cellResizePointers) ? cellResizePointers : [cellResizePointers];
      return React.createElement(BlockWrap, {
        isReorderMode: isReorderMode,
        onMouseEnter: isOnlyBlock ? null : function (e) {
          !isHover && _this3.setState({
            isHover: true
          });
        },
        onMouseLeave: isOnlyBlock ? null : function (e) {
          isHover && _this3.setState({
            isHover: false
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 356
        },
        __self: this
      }, React.createElement(BlockInner, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 359
        },
        __self: this
      }, React.createElement(Ruler, {
        active: isResizeMode,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 360
        },
        __self: this
      }), React.createElement(AddColumnButton, {
        onClick: function onClick(e) {
          return addColumn();
        },
        name: "right",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 361
        },
        __self: this
      }), React.createElement(RemoveBlockButton, {
        isVisible: isHover,
        onClick: function onClick(e) {
          return onDelete(blockId);
        },
        name: "remove",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 362
        },
        __self: this
      }), columns.map(function (col, ic) {
        var rows = col.rows;
        return React.createElement(Column, {
          key: "col-".concat(ic),
          size: columnSizes[ic],
          isResizeMode: isResizeMode,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 366
          },
          __self: this
        }, rows.map(function (row, ir) {
          var thisCellResize = isCellResizeMode && currentResizeColumn == ic && currentResizeRow == ir ? true : false,
              lastCellId = row.cells.length - 1;
          return React.createElement(Row, {
            key: "row-".concat(ir),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 371
            },
            __self: this
          }, row.cells.map(function (cell, is) {
            return React.createElement(Cell, {
              key: "row-".concat(ir, "-cell-").concat(is),
              size: row.cellSizes[is],
              isResizeMode: thisCellResize,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 374
              },
              __self: this
            }, cell ? React.createElement(CellRenderer, Object.assign({
              ic: ic,
              ir: ir,
              is: is,
              modifyCell: modifyCell,
              openCell: openCell
            }, {
              cell: cell,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 376
              },
              __self: this
            })) : React.createElement(CreateCellWrap, {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 378
              },
              __self: this
            }, !isLastCell && !thisCellResize ? React.createElement(RemoveRowButton, {
              isLast: is == lastCellId,
              className: "column-hover",
              onClick: function onClick(e) {
                return removeCell(ic, ir, is);
              },
              name: "remove",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 380
              },
              __self: this
            }) : null, thisCellResize ? null : React.createElement("span", {
              onClick: function onClick(e) {
                return openCell(e, ic, ir, is, modifyCell);
              },
              __source: {
                fileName: _jsxFileName,
                lineNumber: 383
              },
              __self: this
            }, React.createElement("span", {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 384
              },
              __self: this
            }, "+"))));
          }), thisCellResize && cellLocalPointers.length && cellLocalPointers[0] ? React.createElement(Fragment, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 392
            },
            __self: this
          }, React.createElement(CellRuler, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 393
            },
            __self: this
          }, React.createElement(Ruler, {
            active: thisCellResize,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 394
            },
            __self: this
          })), React.createElement(CellResizerWrap, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 396
            },
            __self: this
          }, React.createElement(StyledReactSlider, {
            min: 1,
            max: 99,
            value: cellResizePointers,
            onChange: function onChange(newVals) {
              return _this3.updateCellResizeBars(newVals);
            },
            withBars: true,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 397
            },
            __self: this
          }))) : null, row.cells.length > 1 ? React.createElement(CellResizeButton, {
            active: thisCellResize,
            name: "resize",
            onClick: function onClick(e) {
              _this3.toggleCellsResize(ic, ir);
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 403
            },
            __self: this
          }) : null, React.createElement(AddCell, Object.assign({
            side: "left"
          }, {
            ic: ic,
            ir: ir,
            addCell: addCell
          }, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 405
            },
            __self: this
          })), React.createElement(AddCell, Object.assign({
            side: "right"
          }, {
            ic: ic,
            ir: ir,
            addCell: addCell
          }, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 406
            },
            __self: this
          })));
        }), React.createElement(AddRow, Object.assign({
          ic: ic,
          addRow: addRow
        }, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 409
          },
          __self: this
        })));
      }), isResizeMode && localPointers.length && localPointers[0] ? React.createElement(ResizerWrap, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 414
        },
        __self: this
      }, React.createElement(StyledReactSlider, {
        min: 1,
        max: 99,
        value: resizePointers,
        onChange: function onChange(newVals) {
          return _this3.updateColumnResizeBars(newVals);
        },
        withBars: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 415
        },
        __self: this
      })) : null));
    }
  }]);

  return Block;
}(Component);

export default ModalWrapper(Block);

var AddRow = function AddRow(props) {
  return React.createElement(AddRowWrap, {
    className: "column-hover",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 429
    },
    __self: this
  }, React.createElement(Button, {
    onClick: function onClick(e) {
      props.addRow(props.ic);
    },
    title: "Add Row",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 430
    },
    __self: this
  }, React.createElement(AddCellButton, {
    name: "down",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 430
    },
    __self: this
  })));
};

var AddCell = function AddCell(props) {
  return React.createElement(AddCellWrap, {
    side: props.side,
    className: "column-hover",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 437
    },
    __self: this
  }, React.createElement(Button, {
    onClick: function onClick(e) {
      props.addCell(props.ic, props.ir, props.side);
    },
    title: "Add Cell",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 438
    },
    __self: this
  }, React.createElement(AddCellButton, {
    name: props.side,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 438
    },
    __self: this
  })));
};