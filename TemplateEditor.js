import React, { Component } from 'react'
import Block from './src/Block'
import Dragula from 'react-dragula';
import { EditorWrap, LocalContainer, AddBlockButton, ToolsWrap, Tool } from './src/Styled'

import { injectGlobal } from 'styled-components'
injectGlobal`
    .gu-mirror {
        position: fixed !important;
        margin: 0 !important;
        z-index: 9999 !important;
        opacity: 0.8;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
        filter: alpha(opacity=80);
    }
    .gu-hide {
        display: none !important;
    }
    .gu-unselectable {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
    }
    .gu-transit {
        opacity: 0.2;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)";
        filter: alpha(opacity=20);
    }
`


class TemplateEditor extends Component {
    constructor(props) {
        super(props)

        this.currId = props.structure ? Math.max(...props.structure.map(item => item.id)) : 0;        
        
        this.state = {
            isReorderMode: false,
            isResizeMode: false,
            blocks: props.structure || [{id: this.currId}]
        }

        this.addBlock = this.addBlock.bind(this)
        this.removeBlock = this.removeBlock.bind(this)
        this.saveBlock = this.saveBlock.bind(this)
        this.handleSync = this.handleSync.bind(this)
        this.toggleReorderMode = this.toggleReorderMode.bind(this)
        this.disableResizeMode = this.disableResizeMode.bind(this)
    }

    componentDidMount() {
        this.toggleReorderMode();
    }

    handleSync (blockId, data) {
        const { blocks } = this.state;
        // find index of current block 
        let bi = blocks.map(function(b) { return b.id; }).indexOf(blockId);
        let newBlocks = [
            ...blocks.slice(0, bi),
            data,
            ...blocks.slice(bi+1, blocks.length)
        ]
        this.setState({
            blocks: newBlocks
        })
        if (this.props.onChange)
            this.props.onChange([...newBlocks]);  
    }


    /** 
     * Add Block
     * 
     */
    addBlock (id) {
        this.setState({
            blocks: [...this.state.blocks, {id}]
        })
    }

    /** 
     * Remove Block
     * 
     */
    removeBlock (blockId) {
        const { blocks } = this.state;
        this.setState({
            blocks: blocks.filter(b => b.id != blockId)
        })
    }


    /** 
     * Save Block
     * 
     */
    saveBlock (blockId, json) {
        const { blocks } = this.state;
        this.setState({
            blocks: [
                ...blocks.slice(0, blockId),
                json,
                ...blocks.slice(blockId+1, blocks.length)
            ]
        })
    }    

    disableResizeMode () {
        if (this.state.isResizeMode)
            this.setState({
                isResizeMode: false
            })
    }

    toggleReorderMode () {
        if (this.state.isReorderMode) {
            // enable
            let self = this,
                parent = this.refs.dragulaWrap;
        
            this.drake = Dragula([parent], {});
            
            this.drake.on('dragend', function() {
                let newOrder = [], blockId, indexOne, indexTwo;
        
                let children = parent.childNodes;
                for (let i=0; i<children.length; i++) 
                    newOrder.push(+children[i].dataset.id);
                
                let blocks = self.state.blocks;

                let oldOrder = blocks.map(function(b) { return b.id; });

                if (oldOrder.join(',') != newOrder.join(',')) {                    
                    // find updated elements 
                    newOrder.some(id1 => {
                        let test = oldOrder.indexOf(id1) !== newOrder.indexOf(id1);
                        if (test) {
                            blockId = id1;
                            indexOne = oldOrder.indexOf(id1);
                            indexTwo = newOrder.indexOf(id1);
                        }  
                        // will break loop after first occurance 
                        return test;
                    })

                    let newBlocks = [...blocks];
                    newBlocks.splice(indexOne, 1);
                    newBlocks.splice(indexTwo, 0, blocks.find(b => b.id == blockId));

                    self.setState({ blocks: newBlocks});
                    if (self.props.onChange)
                        self.props.onChange([...newBlocks]);  
                }
            });
        } else {
            // disable 
            this.drake && 
                this.drake.destroy();
        }
    }    


    render() {
        const { blocks, isReorderMode, isResizeMode } = this.state;
        const { saveBlock, addBlock, removeBlock, handleSync, disableResizeMode } = this;
        const { theme } = this.props;

        return (
            <EditorWrap>
                <ToolsWrap>
                    <Tool 
                        name="reorder" active={isReorderMode}
                        onClick={e=> { this.setState({isReorderMode: !isReorderMode}, this.toggleReorderMode) }} 
                        />
                    <Tool 
                        name="resize" active={isResizeMode}
                        onClick={e=> { this.setState({isResizeMode: !isResizeMode}) }} 
                        />
                </ToolsWrap>
                
                <div ref="dragulaWrap">
                {blocks.map(block => 
                    <div key={`block-${block.id}`} data-id={block.id}>
                        <Block {...{isResizeMode, isReorderMode, disableResizeMode, theme}}
                            blockId={block.id} 
                            onDelete={removeBlock} 
                            onUpdate={saveBlock} 
                            isOnlyBlock={blocks.length > 1 ? false : true} 
                            defaults={block}
                            onSync={handleSync} 
                            />
                    </div>
                )}
                </div>

                <LocalContainer>
                    <AddBlockButton onClick={e=> addBlock(++this.currId)} name="down"/>                    
                </LocalContainer>
            </EditorWrap>
        )
    }
}

export default TemplateEditor
