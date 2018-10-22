import _defineProperty from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
var _jsxFileName = "/usr/share/nginx/html/react-template-editor/src/components/CellForm.js";
import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Form, Spacer, FormButton, ErrorText } from './Styled';
import { capitalize } from '../helpers';

var CellForm =
/*#__PURE__*/
function (_Component) {
  _inherits(CellForm, _Component);

  function CellForm(props) {
    var _this;

    _classCallCheck(this, CellForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CellForm).call(this, props));
    var data = {};
    props.fields.map(function (item) {
      data[item.name] = props.data && item.name in props.data ? props.data[item.name] : item.default;
      return null;
    });
    _this.state = {
      isNew: Object.keys(props.data).length ? false : true,
      fields: props.fields,
      data: data,
      errorKeys: [],
      errors: null
    };
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.validate = _this.validate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.filterErrors = _this.filterErrors.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(CellForm, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.activeTab !== this.props.activeTab) {
        var data = {};
        nextProps.fields.map(function (item) {
          data[item.name] = nextProps.data && item.name in nextProps.data ? nextProps.data[item.name] : item.default;
        });
        this.setState({
          fields: nextProps.fields,
          errors: null,
          errorKeys: [],
          data: data
        });
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(key, value) {
      var data = this.state.data;
      if (!data.key || data.key != value) this.setState({
        data: _objectSpread({}, data, _defineProperty({}, key, value))
      });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var data = this.state.data;
      if (this.validate(e.currentTarget.dataset.keys.split(','), data)) return false;
      this.props.onSubmit({
        type: this.props.activeTab,
        params: data
      });
    }
  }, {
    key: "validate",
    value: function validate(keys, values) {
      var errors = {}; // width 

      if (!values.width) errors.width = 'Please enter cell\'s width';else if (!(values.width > 0)) errors.width = 'Width has to be a positive number'; // ratio    

      if (!values.ratio) errors.ratio = 'Please enter cell\'s ratio';else if (!/^\d+:\d+$/i.test(values.ratio)) errors.ratio = 'Invalid ratio [D:D]'; // alignment

      if (!values.align) errors.aling = 'Please enter cell\'s alignment'; // shape

      if (!values.shape) errors.shape = 'Please specify element shape'; // lines 

      if (!values.lines) errors.lines = 'Please enter number of lines';else if (!(values.lines > 0)) errors.lines = 'Line number has to be a positive number'; // columns

      if (!values.columns) errors.columns = 'Please enter number of columns';else if (!(values.columns > 0)) errors.columns = 'Column number has to be a positive number'; // text type

      if (!values.type) errors.type = 'Please specify text type';
      return this.filterErrors(errors, Object.keys(values).concat(keys));
    }
  }, {
    key: "filterErrors",
    value: function filterErrors(errorsRaw, keys) {
      var errors = Object.keys(errorsRaw).filter(function (key) {
        return keys.includes(key);
      }).reduce(function (obj, key) {
        return _objectSpread({}, obj, _defineProperty({}, key, errorsRaw[key]));
      }, {}); // return results

      var hasErrors = Object.keys(errors).length ? true : false;

      if (hasErrors) {
        var firstKey = Object.keys(errors)[0];
        errors = _defineProperty({}, firstKey, errors[firstKey]);
      } else errors = null;

      this.setState({
        errors: errors
      });
      return hasErrors;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var theme = this.props.theme;
      var _this$state = this.state,
          data = _this$state.data,
          fields = _this$state.fields,
          errors = _this$state.errors,
          isNew = _this$state.isNew;
      var errorKeys = errors ? Object.keys(errors) : [];
      return React.createElement(Form, {
        onSubmit: function onSubmit(e) {
          return _this2.handleSubmit(e);
        },
        "data-keys": fields.map(function (k) {
          return k.name;
        }).join(','),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 120
        },
        __self: this
      }, fields.map(function (item, f) {
        var key = _this2.props.activeTab + '-' + item.name;
        return item.type == 'checkbox' ? React.createElement(FormControlLabel, {
          key: key,
          control: React.createElement(Checkbox, {
            checked: data[item.name],
            onChange: function onChange(e) {
              return _this2.handleChange(item.name, e.currentTarget.checked);
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 127
            },
            __self: this
          }),
          label: item.label,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 124
          },
          __self: this
        }) : item.type == 'select' ? React.createElement(FormControl, {
          key: key,
          error: errorKeys.includes(item.name),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 135
          },
          __self: this
        }, React.createElement(InputLabel, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 136
          },
          __self: this
        }, item.label), React.createElement(Select, {
          value: data[item.name],
          onChange: function onChange(e) {
            return _this2.handleChange(item.name, e.currentTarget.dataset.value);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 137
          },
          __self: this
        }, item.options.map(function (option, o) {
          return React.createElement(MenuItem, {
            key: "option-".concat(f, "-").concat(o),
            value: option,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 142
            },
            __self: this
          }, capitalize(option));
        }))) : React.createElement(TextField, {
          key: key,
          label: item.label,
          defaultValue: data[item.name],
          type: item.type,
          onChange: function onChange(e) {
            return _this2.handleChange(item.name, e.currentTarget.value);
          },
          error: errorKeys.includes(item.name),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 146
          },
          __self: this
        });
      }), React.createElement(Spacer, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 157
        },
        __self: this
      }), errors ? React.createElement(ErrorText, {
        theme: theme,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 160
        },
        __self: this
      }, Object.values(errors)[0], React.createElement(Spacer, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 160
        },
        __self: this
      })) : null, React.createElement(Spacer, {
        size: "15px",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 162
        },
        __self: this
      }), React.createElement(FormButton, {
        theme: theme,
        capitalize: true,
        full: true,
        type: "submit",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 164
        },
        __self: this
      }, "Save"), isNew ? null : React.createElement(FormButton, {
        theme: theme,
        full: true,
        onClick: function onClick(e) {
          e.preventDefault();

          _this2.props.onSubmit(null);
        },
        background: "none",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 167
        },
        __self: this
      }, "Delete"));
    }
  }]);

  return CellForm;
}(Component);

export default CellForm;