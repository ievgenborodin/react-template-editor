import _toConsumableArray from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
import _classCallCheck from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _taggedTemplateLiteral from "/usr/share/nginx/html/react-template-editor/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral";
var _jsxFileName = "/usr/share/nginx/html/react-template-editor/src/TemplateEditor.js";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    .gu-mirror {\n        position: fixed !important;\n        margin: 0 !important;\n        z-index: 9999 !important;\n        opacity: 0.8;\n        -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=80)\";\n        filter: alpha(opacity=80);\n    }\n    .gu-hide {\n        display: none !important;\n    }\n    .gu-unselectable {\n        -webkit-user-select: none !important;\n        -moz-user-select: none !important;\n        -ms-user-select: none !important;\n        user-select: none !important;\n    }\n    .gu-transit {\n        opacity: 0.2;\n        -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=20)\";\n        filter: alpha(opacity=20);\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import React, { Component } from 'react';
import Block from './components/Block';
import Dragula from 'react-dragula';
import { EditorWrap, LocalContainer, AddBlockButton, ToolsWrap, Tool } from './components/Styled';
import { injectGlobal } from 'styled-components';
injectGlobal(_templateObject());

var TemplateEditor =
/*#__PURE__*/
function (_Component) {
  _inherits(TemplateEditor, _Component);

  function TemplateEditor(props) {
    var _this;

    _classCallCheck(this, TemplateEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TemplateEditor).call(this, props));
    _this.currId = props.structure ? Math.max.apply(Math, _toConsumableArray(props.structure.map(function (item) {
      return item.id.split('_')[1];
    }))) : 0;
    _this.state = {
      isReorderMode: false,
      isResizeMode: false,
      blocks: props.structure || [{
        id: '_' + _this.currId
      }]
    };
    console.log('block', props.structure || [{
      id: '_' + _this.currId
    }]);
    _this.addBlock = _this.addBlock.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.removeBlock = _this.removeBlock.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleSync = _this.handleSync.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.toggleReorderMode = _this.toggleReorderMode.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.disableResizeMode = _this.disableResizeMode.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(TemplateEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {//        this.toggleReorderMode();
    }
  }, {
    key: "handleSync",
    value: function handleSync(blockId, data) {
      var blocks = this.state.blocks; // find index of current block 

      var bi = blocks.map(function (b) {
        return b.id;
      }).indexOf(blockId);

      var newBlocks = _toConsumableArray(blocks.slice(0, bi)).concat([data], _toConsumableArray(blocks.slice(bi + 1, blocks.length)));

      this.setState({
        blocks: newBlocks
      });
      console.log('new blocks', newBlocks);
      if (this.props.onChange) this.props.onChange(_toConsumableArray(newBlocks));
    }
    /** 
     * Add Block
     * 
     */

  }, {
    key: "addBlock",
    value: function addBlock(id) {
      this.setState({
        blocks: _toConsumableArray(this.state.blocks).concat([{
          id: id
        }])
      });
    }
    /** 
     * Remove Block
     * 
     */

  }, {
    key: "removeBlock",
    value: function removeBlock(blockId) {
      var blocks = this.state.blocks;
      this.setState({
        blocks: blocks.filter(function (b) {
          return b.id != blockId;
        })
      });
    }
  }, {
    key: "disableResizeMode",
    value: function disableResizeMode() {
      if (this.state.isResizeMode) this.setState({
        isResizeMode: false
      });
    }
  }, {
    key: "toggleReorderMode",
    value: function toggleReorderMode() {
      if (this.state.isReorderMode) {
        // enable
        var self = this,
            parent = this.refs.dragulaWrap;
        this.drake = Dragula([parent], {});
        this.drake.on('dragend', function () {
          var newOrder = [],
              blockId,
              indexOne,
              indexTwo;
          var children = parent.childNodes;

          for (var i = 0; i < children.length; i++) {
            newOrder.push(children[i].dataset.id);
          }

          var blocks = self.state.blocks;
          var oldOrder = blocks.map(function (b) {
            return b.id;
          });

          if (oldOrder.join(',') != newOrder.join(',')) {
            // find updated elements 
            newOrder.some(function (id1) {
              var test = oldOrder.indexOf(id1) !== newOrder.indexOf(id1);

              if (test) {
                blockId = id1;
                indexOne = oldOrder.indexOf(id1);
                indexTwo = newOrder.indexOf(id1);
              } // will break loop after first occurance 


              return test;
            });

            var newBlocks = _toConsumableArray(blocks);

            newBlocks.splice(indexOne, 1);
            newBlocks.splice(indexTwo, 0, blocks.find(function (b) {
              return b.id == blockId;
            }));
            self.setState({
              blocks: newBlocks
            });
            if (self.props.onChange) self.props.onChange(_toConsumableArray(newBlocks));
          }
        });
      } else {
        // disable 
        this.drake && this.drake.destroy();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          blocks = _this$state.blocks,
          isReorderMode = _this$state.isReorderMode,
          isResizeMode = _this$state.isResizeMode;
      var addBlock = this.addBlock,
          removeBlock = this.removeBlock,
          handleSync = this.handleSync,
          disableResizeMode = this.disableResizeMode;
      var theme = this.props.theme;
      return React.createElement(EditorWrap, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 158
        },
        __self: this
      }, React.createElement(ToolsWrap, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 159
        },
        __self: this
      }, React.createElement(Tool, {
        name: "reorder",
        active: isReorderMode,
        onClick: function onClick(e) {
          _this2.setState({
            isReorderMode: !isReorderMode
          }, _this2.toggleReorderMode);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 160
        },
        __self: this
      }), React.createElement(Tool, {
        name: "resize",
        active: isResizeMode,
        onClick: function onClick(e) {
          _this2.setState({
            isResizeMode: !isResizeMode
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 164
        },
        __self: this
      })), React.createElement("div", {
        ref: "dragulaWrap",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 170
        },
        __self: this
      }, blocks.map(function (block) {
        return React.createElement("div", {
          key: "block-".concat(block.id),
          "data-id": block.id,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 172
          },
          __self: this
        }, React.createElement(Block, Object.assign({
          isResizeMode: isResizeMode,
          isReorderMode: isReorderMode,
          disableResizeMode: disableResizeMode,
          theme: theme
        }, {
          blockId: block.id,
          onDelete: removeBlock,
          isOnlyBlock: blocks.length > 1 ? false : true,
          defaults: block,
          onSync: handleSync,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 173
          },
          __self: this
        })));
      })), React.createElement(LocalContainer, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 184
        },
        __self: this
      }, React.createElement(AddBlockButton, {
        onClick: function onClick(e) {
          return addBlock('_' + ++_this2.currId);
        },
        name: "down",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 185
        },
        __self: this
      })));
    }
  }]);

  return TemplateEditor;
}(Component);

TemplateEditor.defaultProps = {
  theme: {
    colors: {
      primary: '#3f2b4f',
      secondary: '#b40766',
      textDark: '#333',
      textLight: '#eee',
      textSuccess: '#137913',
      textError: '#ef3846'
    },
    fonts: {
      h1Family: 'Roboto',
      h2Family: 'Roboto',
      h3Family: 'Roboto',
      h4Family: 'Roboto',
      h5Family: 'Roboto',
      h6Family: 'Roboto',
      pFamily: 'Roboto'
    }
  },
  structure: null,
  onChange: function onChange(data) {
    console.log('structure data: ', data);
  }
};
export default TemplateEditor;