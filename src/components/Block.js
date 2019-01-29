import React, { Component, Fragment } from 'react'
import ModalWrapper from './ModalWrapper'
import CellModal from './CellModal'
import CellRenderer from './CellRenderer'
import { BlockWrap, BlockInner, RemoveBlockButton,  ResizerWrap, StyledReactSlider, Ruler, Button,
         Column, AddColumnButton,
         Row, AddRowWrap,  RemoveRowButton, 
         Cell,  CreateCellWrap,  AddCellWrap, AddCellButton, CellResizeButton, CellResizerWrap, CellRuler } from './Styled'
import { getNextColumnId, getNextRowId } from '../helpers' 

class Block extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            isHover: false,
            resizePointers: [],
            columnSizes: props.defaults.columnSizes || [ 100 ],
            
            currentResizeColumn: null,
            currentResizeRow: null,
            cellResizePointers: [],
            isCellResizeMode: false,
            
            columns: props.defaults.columns || [ this.initColumn(props.blockId + '_0') ]
        }

        this.initColumn = this.initColumn.bind(this)
        this.addColumn = this.addColumn.bind(this)
        
        this.initRow = this.initRow.bind(this)
        this.addRow = this.addRow.bind(this)
        this.removeCell = this.removeCell.bind(this) 
        
        this.addCell = this.addCell.bind(this)
        this.modifyCell = this.modifyCell.bind(this)
        this.openCell = this.openCell.bind(this)
        
        this.sync = this.sync.bind(this)
        this.isMouseDown = false;
        this.updateColumnResizeBars = this.updateColumnResizeBars.bind(this)
        
        this.toggleCellsResize = this.toggleCellsResize.bind(this)
        this.updateCellResizeBars = this.updateCellResizeBars.bind(this)
    }


    componentWillReceiveProps(nextProps) {
        if (!this.props.isResizeMode && nextProps.isResizeMode)
            this.setState({                
                isCellResizeMode: false,
                currentResizeColumn: null,
                currentResizeRow: null
            });
    }


    toggleCellsResize(columnId, rowId) {
        const { columns, isCellResizeMode, currentResizeColumn, currentResizeRow } = this.state;

        if (isCellResizeMode && currentResizeColumn && currentResizeRow && currentResizeColumn==columnId && currentResizeRow==rowId) {
            this.setState({
                isCellResizeMode: false,
                currentResizeColumn: null,
                currentResizeRow: null
            });
            return false;    
        }

        const { rows } = columns[columnId];
        const { cellSizes } = rows[rowId];
        // set cell bars
        let pointersCount = cellSizes.length - 1,
        pointers = [], summer = 0;
        if (pointersCount) {
            for(var i=0; i<pointersCount; i++) {
                summer += cellSizes[i];
                pointers.push(summer);
            }
        }
        this.setState({
            currentResizeColumn: columnId,
            currentResizeRow: rowId,
            cellResizePointers: pointers, 
            isCellResizeMode: !isCellResizeMode
        }, this.props.disableResizeMode)
    }


    updateCellResizeBars(newVals) {
        let valsArr = Array.isArray(newVals) ? newVals : [newVals],
            newSizes = [],
            tempArr = [0, ...valsArr, 100];
        
        for(var i=1; i<tempArr.length; i++)
            newSizes.push(tempArr[i] - tempArr[i-1]);
        
        const { columns, currentResizeColumn, currentResizeRow } = this.state;

        if (Math.min(...newSizes) <= 10)
            return false;        

        let newColumns = [...columns];
        newColumns[currentResizeColumn].rows[currentResizeRow].cellSizes = newSizes;

        this.setState({
            cellResizePointers: newVals,
            columns: newColumns
        },this.sync)
    }


    updateColumnResizeBars(newVals) {
        let valsArr = Array.isArray(newVals) ? newVals : [newVals];
        if (Math.min(...valsArr) <= 1)
            return false;

        let newSizes = [],
            tempArr = [0, ...valsArr, 100];
        
        for(var i=1; i<tempArr.length; i++)
            newSizes.push(tempArr[i] - tempArr[i-1]);

        if (Math.min(...newSizes) <= 1)
            return false;        
            
        this.setState({
            resizePointers: newVals,
            columnSizes: newSizes 
        },this.sync)
    }



    initColumn(id) {
        let nextRowId = id + '_0';
        return {
            id: id,
            rows: [ this.initRow(nextRowId) ]
        }
    }

    initRow(id) {
        return {
            id: id,
            cells: [ 
                {
                    id: id + '_0'
                } 
            ],
            cellSizes: [ 100 ]
        }
    }

    sync() {
        const { columnSizes, columns } = this.state;
        const { blockId } = this.props;

        // set column bars
        let pointersCount = columnSizes.length - 1,
           pointers = [], summer = 0;
        if (pointersCount) {
            for(var i=0; i<pointersCount; i++) {
                summer += columnSizes[i];
                pointers.push(summer);
            }
        }
        this.setState({resizePointers: pointers})
        this.props.onSync(blockId, { blockId, columnSizes, columns })
    }

    /** 
     * Add Column
     * 
     */
    addColumn () {
        const { columns, columnSizes } = this.state;
        let columnNumber = columnSizes.length + 1,
            newSize = 100 / columnNumber;
        this.setState({
            columns: [
                ...columns, 
                this.initColumn(this.props.blockId + '_' + getNextColumnId(columns))
            ],
            columnSizes: Array.apply(null, Array(columnNumber)).map(c => newSize)
        },this.sync)
    }


    /** 
     * Add Row
     * 
     */
    addRow (columnId) {
        const { columns } = this.state;
        let columnIndex = columns.indexOf(columnId);
        let nextRowId = getNextRowId(columns[columnIndex].rows);
        this.setState({
            columns: [
                ...columns.slice(0, columnIndex),
                {
                    ...columns[columnIndex],
                    rows: columns[columnIndex].rows.concat([this.initRow(columnId + '_' + nextRowId)])
                },
                ...columns.slice(columnIndex+1, columns.length)
            ]
        },this.sync)
    }


    /** 
     * Add Cell
     * 
     */
    addCell (side, row) {
        let idParts = row.id.split('_'),
            columnId = [idParts[0], idParts[1], idParts[2]].join('_');

        const { columns } = this.state;
        let columnIndex = columns.indexOf(columnId);

        const { rows } = columns[columnIndex];
        let rowIndex = rows.indexOf(row.id);
        
        const { cells, cellSizes } = rows[rowIndex];
        let cellNumber = cellSizes.length + 1,
            newSize = 100 / cellNumber;
     
        // get next cell id
        let nextCellNumber = Math.max(...cells.map( item => item.id.split('_')[5] )) + 1,
            nextCellId = row.id + '_' + nextCellNumber;

        this.setState({
            columns: [
                ...columns.slice(0, columnIndex), 
                {
                    ...columns[columnIndex],
                    rows: [
                        ...rows.slice(0, rowIndex),
                        {
                            cells: side=='left'? [{id: nextCellId}].concat(cells) : cells.concat([{id: nextCellId}]),
                            cellSizes: Array.apply(null, Array(cellNumber)).map(c => newSize)
                        },
                        ...rows.slice(rowIndex+1, rows.length)
                    ]
                },
                ...columns.slice(columnIndex+1, columns.length)
            ]
        },this.sync)
    }


    /** 
     * Remove Row
     * 
     */
    removeCell (columnId, rowId, cellId) {
        const { columns, columnSizes } = this.state;
        const { rows } = columns[columnId];
        const { cells, cellSizes } = rows[rowId]; 
        
        let newColumn = [], 
            newColumnSizes, newColumnSize;

        if (cells.length > 1) {
            // recount column sizes on one column removal
            let newCellSize = 100 / (cellSizes.length-1);
            let newCellSizes = Array.apply(null, Array(cellSizes.length-1)).map(c => newCellSize);

            newColumn.push({
                ...columns[columnId], 
                rows: [
                    ...rows.slice(0, rowId),
                    {
                        ...rows[rowId],
                        cells: [
                            ...cells.slice(0,cellId),
                            ...cells.slice(cellId+1, cells.length)
                        ],
                        cellSizes: newCellSizes
                    },
                    ...rows.slice(rowId+1, rows.length)
                ]
            });
        }
        // remove row if column has more than 1, otherwise remove column
        else if (rows.length > 1)
            newColumn.push({
                ...columns[columnId], 
                rows: [
                    ...rows.slice(0, rowId),
                    ...rows.slice(rowId+1, rows.length)
                ]
            });
        else {
            // recount column sizes on one column removal
            newColumnSize = 100 / (columnSizes.length-1);
            newColumnSizes = Array.apply(null, Array(columnSizes.length-1)).map(c => newColumnSize);
        }
                 
        this.setState({
            columns: [
                ...columns.slice(0, columnId),
                ...newColumn,
                ...columns.slice(columnId+1, columns.length)
            ],
            columnSizes: newColumnSizes || columnSizes
        },this.sync)
    }
    

    /** 
     * Create Cell
     * 
     */
    openCell(e, columnId, rowId, cellId, callback) {
        e.preventDefault() 

        const { openModal, closeModal, theme } = this.props
        let cell = this.state.columns[columnId].rows[rowId].cells[cellId];

        openModal({ 
            title: 'New Cell',
            content: <CellModal {...{closeModal, columnId, rowId, cellId, cell, theme}} onDelete={e=> this.modifyCell(columnId, rowId, cellId, null)} onSelect={callback} />
        }, {
            contentStyle: {
                padding: '15px 0'           
            }
        })
    }

    /** 
     * Modify Cell
     * 
     */
    modifyCell (columnId, rowId, cellId, data) {
        const { columns } = this.state;
        const { rows } = columns[columnId];
        const { cells } = rows[rowId];
        this.setState({
            columns: [
                ...columns.slice(0, columnId),
                {
                    ...columns[columnId],
                    rows: [
                        ...rows.slice(0, rowId),
                        {
                            ...rows[rowId],
                            cells: [
                                ...cells.slice(0, cellId),
                                data,
                                ...cells.slice(cellId+1, cells.length),
                            ]
                        },
                        ...rows.slice(rowId+1, rows.length)
                    ]
                },
                ...columns.slice(columnId+1, columns.length)
            ]
        },this.sync)
    }


    render() {
        const { columns, columnSizes, isHover, cellResizePointers, resizePointers, isCellResizeMode, currentResizeColumn, currentResizeRow } = this.state;
        const { openCell, modifyCell, addColumn, addRow, removeCell, addCell } = this;
        const { onDelete, blockId, isOnlyBlock, isResizeMode, isReorderMode } = this.props;

        let isLastCell = (columns.length>1 || columns[0].rows.length > 1 || columns[0].rows[0].cells.length > 1) ? false : true,
            localPointers = Array.isArray(resizePointers) ? resizePointers : [resizePointers],
            cellLocalPointers = Array.isArray(cellResizePointers) ? cellResizePointers : [cellResizePointers];

        return (
            <BlockWrap isReorderMode={isReorderMode} 
                onMouseEnter={isOnlyBlock ? null : e=>{!isHover && this.setState({isHover: true})}} 
                onMouseLeave={isOnlyBlock ? null : e=>{isHover && this.setState({isHover: false})}}>
                <BlockInner>
                    <Ruler active={isResizeMode} />
                <AddColumnButton onClick={e=> addColumn()} name="right"/>
                <RemoveBlockButton isVisible={isHover} onClick={e=> onDelete(blockId)} name="remove"/>
                {columns.map((col, ic) => {
                    let rows = col.rows;
                    return (
                        <Column key={`col-${ic}`} size={columnSizes[ic]} isResizeMode={isResizeMode}>
                            {rows.map((row, ir) => {
                                let thisCellResize = (isCellResizeMode && currentResizeColumn==ic && currentResizeRow==ir) ? true : false,
                                    lastCellId = row.cells.length-1;
                                return (
                                <Row key={`row-${ir}`}> 
                                    {row.cells.map((cell, is) => 
                                        
                                        <Cell key={`row-${ir}-cell-${is}`} size={row.cellSizes[is]} isResizeMode={thisCellResize}>
                                            {cell.props ? 
                                                <CellRenderer {...{ic, ir, is, modifyCell, openCell}} cell={cell} /> 
                                                : 
                                                <CreateCellWrap>
                                                    {(!isLastCell && !thisCellResize)  ? 
                                                        <RemoveRowButton isLast={is==lastCellId} className="column-hover" onClick={e=> removeCell(ic, ir, is)} name="remove"/> : null}
                                                    
                                                    {thisCellResize ? null : (
                                                    <span onClick={e=>openCell(e, ic, ir, is, modifyCell)}>
                                                        <span>+</span>
                                                    </span> 
                                                    )}
                                                </CreateCellWrap>
                                            }
                                        </Cell>
                                    )}
                                    {(thisCellResize && cellLocalPointers.length && cellLocalPointers[0]) ? ( 
                                        <Fragment>
                                            <CellRuler>
                                                <Ruler active={thisCellResize} />
                                            </CellRuler>
                                            <CellResizerWrap>
                                                <StyledReactSlider min={1} max={99} value={cellResizePointers} onChange={newVals=> this.updateCellResizeBars(newVals)} withBars />
                                            </CellResizerWrap>
                                        </Fragment>
                                    ) :null}

                                    {row.cells.length>1 ? 
                                    <CellResizeButton active={thisCellResize} name="resize" onClick={e=>{this.toggleCellsResize(ic, ir)}}/>:null}

                                    <AddCell side="left" {...{addCell, row}} />
                                    <AddCell side="right" {...{addCell, row}} />
                                </Row>
                            )})}
                            <AddRow {...{addRow, id: col.id}} />
                        </Column>
                    )
                })}
                {(isResizeMode && localPointers.length && localPointers[0]) ? ( 
                    <ResizerWrap>
                        <StyledReactSlider min={1} max={99} value={resizePointers} onChange={newVals=> this.updateColumnResizeBars(newVals)} withBars />
                    </ResizerWrap>
                ) :null}
                </BlockInner>
            </BlockWrap>
        )
    }
}

export default ModalWrapper(Block)


const AddRow = (props) => {
    return (
        <AddRowWrap className="column-hover">
            <Button onClick={e => {props.addRow(props.id)}} title="Add Row"><AddCellButton name="down"/></Button>
        </AddRowWrap>
    )
}

const AddCell = (props) => {
    return (
        <AddCellWrap side={props.side} className="column-hover">
            <Button onClick={e => {props.addCell(props.side, props.row)}} title="Add Cell"><AddCellButton name={props.side}/></Button>
        </AddCellWrap>
    )
}