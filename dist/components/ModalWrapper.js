import _objectSpread from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
var _jsxFileName = "/usr/share/nginx/html/react-template-editor/src/components/ModalWrapper.js";
import React, { Component, Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grow from '@material-ui/core/Grow';
var styles = {
  title: {
    textAlign: 'center',
    paddingTop: '1.5rem',
    maxWidth: '24rem',
    margin: '0'
  },
  content: {
    textAlign: 'center',
    width: '100%',
    maxWidth: '24rem'
  },
  paperProps: {
    margin: '48px auto',
    maxWidth: '24rem'
  }
};

var ModalWrapper = function ModalWrapper(WrappedComponent) {
  return (
    /*#__PURE__*/
    function (_Component) {
      _inherits(_class, _Component);

      function _class(props) {
        var _this;

        _classCallCheck(this, _class);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this, props));
        _this.state = {
          modalActive: false,
          modalContent: '',
          customProps: {}
        };
        _this.openModal = _this.openModal.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.closeModal = _this.closeModal.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        return _this;
      }

      _createClass(_class, [{
        key: "openModal",
        value: function openModal(content, customProps) {
          this.setState({
            modalActive: true,
            modalContent: content,
            customProps: customProps || this.state.customProps
          });
        }
      }, {
        key: "closeModal",
        value: function closeModal() {
          this.setState({
            modalActive: false
          });
        }
      }, {
        key: "render",
        value: function render() {
          var _this$state = this.state,
              modalActive = _this$state.modalActive,
              modalContent = _this$state.modalContent,
              customProps = _this$state.customProps;
          return React.createElement(Fragment, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 59
            },
            __self: this
          }, React.createElement(Dialog, {
            PaperProps: {
              style: customProps.paperProps ? _objectSpread({}, styles.paperProps, customProps.paperProps) : _objectSpread({}, styles.paperProps)
            },
            style: customProps.rootStyle ? _objectSpread({}, customProps.rootStyle) : {},
            open: modalActive,
            onClose: this.closeModal,
            scroll: "body",
            "aria-labelledby": "scroll-dialog-title",
            TransitionComponent: Grow,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 60
            },
            __self: this
          }, modalContent.title ? React.createElement("h2", {
            style: styles.title,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 69
            },
            __self: this
          }, modalContent.title) : null, React.createElement(DialogContent, {
            style: customProps.contentStyle ? _objectSpread({}, styles.content, customProps.contentStyle) : styles.content,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 70
            },
            __self: this
          }, modalActive && modalContent.content)), React.createElement(WrappedComponent, Object.assign({
            isActive: modalActive,
            openModal: this.openModal,
            closeModal: this.closeModal,
            setModalContent: this.setModalContent
          }, this.props, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 74
            },
            __self: this
          })));
        }
      }]);

      return _class;
    }(Component)
  );
};

export default ModalWrapper;