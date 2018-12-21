import _classCallCheck from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
var _jsxFileName = "/usr/share/nginx/html/react-template-editor/src/components/CellModal.js";
import React, { Component } from 'react';
import CellForm from './CellForm';
import { TabsWrap, Tab, CloseModal } from './Styled';
var fields = {
  image: [{
    type: "text",
    label: 'Label',
    name: 'label',
    default: 'IMG'
  }, {
    type: "text",
    label: 'Width (%)',
    name: 'width',
    default: '100'
  }, {
    type: "text",
    label: 'Padding (css)',
    name: 'padding',
    default: '0'
  }, {
    type: "text",
    label: 'Ratio (w:h)',
    name: 'ratio',
    default: '3:2'
  }, {
    type: "select",
    label: 'Align',
    name: 'align',
    options: ['left', 'center', 'right'],
    default: 'left'
  }, {
    type: "select",
    label: 'Shape',
    name: 'shape',
    options: ['rect', 'round'],
    default: 'rect'
  }, {
    type: "checkbox",
    label: 'Background',
    name: 'background',
    default: false
  }],
  text: [{
    type: "text",
    label: 'Width (%)',
    name: 'width',
    default: '100'
  }, {
    type: "text",
    label: 'Padding (css)',
    name: 'padding',
    default: '0'
  }, {
    type: "select",
    label: 'Align',
    name: 'align',
    options: ['left', 'center', 'right'],
    default: 'left'
  }, {
    type: "text",
    label: 'Lines Number',
    name: 'lines',
    default: '3'
  }, {
    type: "select",
    label: 'Columns Number',
    name: 'columns',
    options: ['1', '2', '3', '4', '5'],
    default: '1'
  }, {
    type: "select",
    label: 'Type',
    name: 'type',
    options: ['header', 'paragraph'],
    default: 'header'
  }, {
    type: "checkbox",
    label: 'Background',
    name: 'background',
    default: false
  }],
  video: [{
    type: "text",
    label: 'Width (%)',
    name: 'width',
    default: '100'
  }, {
    type: "text",
    label: 'Padding (css)',
    name: 'padding',
    default: '0'
  }, {
    type: "text",
    label: 'Ratio (w:h)',
    name: 'ratio',
    default: '3:2'
  }, {
    type: "select",
    label: 'Align',
    name: 'align',
    options: ['left', 'center', 'right'],
    default: 'left'
  }, {
    type: "checkbox",
    label: 'Background',
    name: 'background',
    default: false
  }]
};

var CellModal =
/*#__PURE__*/
function (_Component) {
  _inherits(CellModal, _Component);

  function CellModal(props) {
    var _this;

    _classCallCheck(this, CellModal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CellModal).call(this, props));
    _this.state = {
      tabs: Object.keys(fields),
      activeTab: props.cell ? props.cell.type : 'text',
      data: props.cell ? props.cell.params : {}
    };
    _this.handleSelect = _this.handleSelect.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.switchTab = _this.switchTab.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(CellModal, [{
    key: "handleSelect",
    value: function handleSelect(data) {
      var _this$props = this.props,
          columnId = _this$props.columnId,
          rowId = _this$props.rowId,
          cellId = _this$props.cellId,
          onSelect = _this$props.onSelect,
          closeModal = _this$props.closeModal; // push data

      onSelect(columnId, rowId, cellId, data);
      closeModal();
    }
  }, {
    key: "switchTab",
    value: function switchTab(value) {
      if (this.state.activeTab != value) this.setState({
        activeTab: value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          activeTab = _this$state.activeTab,
          tabs = _this$state.tabs,
          data = _this$state.data;
      var tabSize = 100 / tabs.length;
      return React.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        },
        __self: this
      }, React.createElement(CloseModal, {
        onClick: function onClick(e) {
          return _this2.props.closeModal();
        },
        name: "close",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 68
        },
        __self: this
      }), React.createElement(TabsWrap, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        },
        __self: this
      }, tabs.map(function (name, i) {
        return React.createElement(Tab, {
          key: "tab-".concat(i),
          active: activeTab == name,
          onClick: function onClick(e) {
            return _this2.switchTab(name);
          },
          width: tabSize,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 73
          },
          __self: this
        }, name);
      })), React.createElement(CellForm, Object.assign({}, this.props, {
        activeTab: activeTab,
        data: data
      }, {
        fields: fields[activeTab],
        onSubmit: this.handleSelect,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 81
        },
        __self: this
      })));
    }
  }]);

  return CellModal;
}(Component);

export default CellModal;