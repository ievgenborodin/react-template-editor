import React, { Component } from 'react'
import CellForm from './CellForm'
import { TabsWrap, Tab, CloseModal } from './Styled'


const fields = {
    image: [
        { type: "text",     label: 'Label',         name: 'label',                                          default: 'IMG'  },
        { type: "text",     label: 'Width (%)',     name: 'width',                                          default: '100'  },
        { type: "text",     label: 'Padding (css)', name: 'padding',                                        default: '0'    },
        { type: "text",     label: 'Ratio (w:h)',   name: 'ratio',                                          default: '3:2'  },
        { type: "select",   label: 'Align',         name: 'align',     options: ['left', 'center', 'right'],default: 'left' },
        { type: "select",   label: 'Shape',         name: 'shape',     options: ['rect', 'round'],          default: 'rect' },
        { type: "checkbox", label: 'Background',    name: 'background',                                     default: false   }
    ], 
    text: [
        { type: "text",     label: 'Width (%)',     name: 'width'                                         ,default: '100'   },
        { type: "text",     label: 'Padding (css)', name: 'padding',                                        default: '0'    },        
        { type: "select",   label: 'Align',         name: 'align',    options: ['left', 'center', 'right'],default: 'left'  },
        { type: "text",     label: 'Lines Number',  name: 'lines'                                         ,default: '3'     },
        { type: "select",   label: 'Columns Number',name: 'columns',  options: ['1','2','3','4','5']      ,default: '1'     },
        { type: "select",   label: 'Type',          name: 'type',     options: ['header', 'paragraph']    ,default: 'header'},
        { type: "checkbox", label: 'Background',    name: 'background'                                    ,default: false   }
    ], 
    video: [
        { type: "text",     label: 'Width (%)',    name: 'width'                                          ,default: '100'  },
        { type: "text",     label: 'Padding (css)',name: 'padding',                                        default: '0'    },        
        { type: "text",     label: 'Ratio (w:h)',  name: 'ratio'                                          ,default: '3:2', },
        { type: "select",   label: 'Align',        name: 'align',    options: ['left', 'center', 'right'] ,default: 'left' },
        { type: "checkbox", label: 'Background',   name: 'background'                                     ,default: false  }
    ]
}


class CellModal extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            tabs: Object.keys(fields),
            activeTab: props.cell ? props.cell.type : 'text',
            data: props.cell ? props.cell.params : {}
        }        

        this.handleSelect = this.handleSelect.bind(this)
        this.switchTab = this.switchTab.bind(this)
    }

    handleSelect(data) {
        const { columnId, rowId, cellId, onSelect, closeModal } = this.props;
        // push data
        onSelect(columnId, rowId, cellId, data);
        
        closeModal();
    }

    switchTab(value) {
        if (this.state.activeTab != value)
            this.setState({ activeTab: value });
    }


    render() {
        const { activeTab, tabs, data } = this.state;
        let tabSize = 100 / tabs.length;
        return (
            <div>
                <CloseModal onClick={e=>this.props.closeModal()} name="close"/>

                {/* Tabs */}
                <TabsWrap>
                    {tabs.map((name,i) => (
                        <Tab key={`tab-${i}`} active={activeTab==name} onClick={e=>this.switchTab(name)}width={tabSize}>
                            {name}
                        </Tab>
                    ))}
                </TabsWrap>


                {/* Form */}
                <CellForm {...this.props} {...{activeTab, data}} 
                    fields={fields[ activeTab ]} 
                    onSubmit={this.handleSelect}
                    />
            </div>
        )
    }
}

export default CellModal