import React from 'react'
import { HeightHelper, CellWrap, RenderedCellWrap, RenderedCellImage, 
         RenderedLabel, RenderedTextCellWrap, RenderedTextLine, TextColumn } from './Styled'

/** 
 * Cell Renderer Component  
 * 
 */
const CellRenderer = (props) => {
    let content;
    // set content 
    switch (props.cell.type) 
    {
        case 'image': 
            content = <ImageCell {...props.cell.params} />; 
            break;

        case 'video': 
            content = <VideoCell {...props.cell.params} />; 
            break; 
        
        case 'text': 
        default: 
            content = <TextCell {...props.cell.params} />; 
    }
    const { openCell, modifyCell, ic, ir, is } = props;
    // render
    return (
        <CellWrap {...props.cell.params}>
            <div onClick={e => openCell(e, ic, ir, is, modifyCell)}>{content}</div>      
        </CellWrap>
    )
}
export default CellRenderer;


/** 
 * [ Image ]  
 * 
 */
const ImageCell = (props) => {
    let ratioParts = props.ratio.split(':'),
        height = 100 * ratioParts[1] / ratioParts[0],
        align = props.align === 'center' ? 'none' : props.align;

    return (
        <RenderedCellWrap {...props}>
            <HeightHelper {...props} height={height}>
                <span></span>
            </HeightHelper>
            <div>
                <RenderedCellImage {...props} align={align}>
                    <RenderedLabel>{props.label || ''}</RenderedLabel>
                </RenderedCellImage>
            </div>
        </RenderedCellWrap>
    )
}


/** 
 * [ Text ]  
 * 
 */
const TextCell = (props) => {
    let align = props.align === 'center' ? 'none' : props.align,
        columnSize = 100 / +props.columns;
        console.log('text pr', props)
    return (
        <RenderedTextCellWrap {...props}>
            {Array.from(Array(+props.columns)).map((c,j) => 
                <TextColumn key={`column-${j}`} width={columnSize}>
                    {Array.from(Array(+props.lines)).map((l,i) => 
                        <RenderedTextLine key={`column-${j}-line-${i}`} {...props} align={align}>
                            <div></div>
                        </RenderedTextLine>
                    )}
                </TextColumn> 
            )}
        </RenderedTextCellWrap>
    )
}


/** 
 * [ Video ]  
 * 
 */
const VideoCell = (props) => {
    let ratioParts = props.ratio.split(':'),
        height = 100 * ratioParts[1] / ratioParts[0],
        align = props.align === 'center' ? 'none' : props.align;

    return (
        <RenderedCellWrap {...props}>
            <HeightHelper {...props} height={height}>
                <span></span>
            </HeightHelper>
            <div>
                <RenderedCellImage {...props} align={align}>
                    <RenderedLabel>VIDEO</RenderedLabel>
                </RenderedCellImage>
            </div>
        </RenderedCellWrap>
    )
}