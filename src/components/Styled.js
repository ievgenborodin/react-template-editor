import styled  from 'styled-components'
import { Icon } from './Assets'
import ReactSlider from 'react-slider'


/** 
 *  Editor 
 * 
 */


export const EditorWrap = styled.div`
    width: 100%;
    position: relative;
`

export const LocalContainer = styled.div`
    width: ${props => props.screenSize ? props.screenSize+'px' : "85%"};
    position:relative;
    margin: auto;
`

export const AddBlockButton = styled(Icon)`
    background: #bbb;
    cursor: pointer;
    z-index: 11;
    margin: auto;
    position: absolute;
    left: -40px;
    &>svg { fill: #fff; }
`

export const Tool = styled(Icon)`
    background: #bbb;
    cursor: pointer;
    z-index: 11;
    margin: 0 0 0 20px;
    float: right;
    &>svg { fill: #fff; }
`

export const ToolsWrap = styled.div`
    width: 85%; 
    height: 40px;
    position: relative;
    margin: 20px auto;
`

export const AddCellWrap = styled.div`
    position: absolute;
    top: 0;
    ${props => props.side=='left' ? 'left: 0;' : 'right: 0;'}
    height: 100%;
    width: 28px;
    z-index: 10;
    background: rgba(63,43,79,.4);
    opacity: 1; transition: all .3s;
    &>button { background: none; height: 100%; cursor: pointer; }
`

export const AddCellButton = styled(Icon)`
    color: #fff;
    text-align: center;
    width: 28px; height: 28px;
    &>svg { fill: #fff; }
`

 export const ResizerWrap = styled.div`
    position: absolute;
    top: 20px;
    left: 0;
    width: 100%;
 `

export const StyledReactSlider = styled(ReactSlider)`
 clear:both;
 height: 20px;
 .bar { cursor: pointer; width: 4px; height: 20px; background: #666; }
 .bar-0 { display:none;}
`

export const CellResizerWrap = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 15;
    background: rgba(0,0,0,.2);
    &>div { 
        height: 100%;
        display: flex;
        align-items: center;
    }
`

export const Ruler = styled.div`
    width: 100%;
    height: 1px;
    margin: 30px 0 15px;
    position: relative;
    background: #999;
    &:before {
        content: " ";
        display: inline-block;
        position: absolute;
        left: 0;
        bottom: -5px;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background: #999;
    } 
    &:after {
        content: " ";
        display:inline-block;
        position: absolute;
        right: 0; 
        bottom: -5px;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background: #999;
    } 
    display: ${props => props.active ? 'block' : 'none'};
`

export const BlockWrap = styled.div`
    clear: both;
    display: flex;
    align-items: center;
    flex-direction: column;
    ${props => props.isReorderMode ? `
        &:hover { background: #e8e8e8; }
    `:null}
`

export const BlockInner = styled.div`
    width: ${props => props.screenSize ? props.screenSize+'px' : '85%'};
    position: relative;
    display:inline-block;
`

export const Column = styled.div`
    width: ${props => props.size ? props.size : 100}%;
    position: relative;
    float: left;    
    .column-hover.column-hover { opacity: 0; transition: all .3s; }
    &:hover { .column-hover.column-hover { opacity: 1; transition: all .3s; } }
    &:before{
        content: "${props => props.size ? ~~props.size : 100}%";
        display: ${props => props.isResizeMode ? 'inline-block' : 'none'};
        position: absolute;
        top: -35px;
        left: 0;
        width: 100%;
        text-align: center;
        font-size: 14px;
        color: #666;
    }
`

export const Cell = Column.extend`
    border-right: 1px solid #ddd;
    &:before {
        top: 28%;
        left: 0;
        width: 100%;
        text-align: center;
        font-size: 14px;
        color: #000;
        background: rgba(255,255,255,.8);
        padding: 5px;
    }
`

export const Row = styled.div`
    position: relative;
    float:none;
    width: calc(100% - 2px); 
    border: 1px solid #cacaca;
    background: #fff;

    &:after { 
        content: " ";
        clear: both;
        display: table; 
    }
`

export const AddColumnButton = styled(Icon)`
    position: absolute;
    top: 0;
    right: -45px;
    color: #fff;
    background: #bbb;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
    &>svg { fill: #fff; }
`

export const Button = styled.button`
    appearance: none;
    background: rgba(63,43,79,.4);
    border: none;
    color: #fff;
    width: 100%;
    padding: 0;
`

export const AddRowWrap = styled.div`
    position: absolute;
    bottom: 1px;
    left: 29px;
    width: calc(100% - 60px);
    z-index: 10;
    line-height: 0; 
    opacity: 1; transition: all .3s;
    &>button>div { width: 53px; }
`
export const CreateCellWrap = styled.div`
    width: 100%; 
    height: 100%;
    text-align:center;
    display: table;
    min-height: 120px;

    &>span { 
        display: table-cell; vertical-align:middle; 
        &>span { 
            display: inline-block;
            width: 30px;
            height: 30px;
            line-height: 30px;
            background: rgba(63, 43, 79, .7);
            border-radius: 50%;
            cursor: pointer;
            color: #fff;
        }
    }
`

export const RemoveRowButton = styled(Icon)`
    position: absolute;
    top: 0;
    right: ${props => props.isLast ? '28px' : '0'};
    z-index: 11;
    &>svg { fill: rgba(63,43,79,.7); }
`
export const RemoveBlockButton = styled(AddColumnButton)`
    top: 40%;
    display:none;
    ${props => props.isVisible ? `display: flex;` : null}
`

export const CellResizeButton = styled(Icon)`
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 16;
    height: 28px; 
    width: 28px;
    border-radius: 0;
    &>svg { fill: #fff; }
`

export const CellRuler = styled.div`
    display: flex;
    width: 100%;
    position: absolute;
    height: 100%;
    align-items: center;
    &>div { margin: 0; }
`


export const CloseModal = styled(Icon)`
    position: absolute;
    top: 0;
    right: 0;
`

export const TabsWrap = styled.div`
    clear: both;
    position: relative;
    width: 100%;
    margin-bottom: 15px;
`
export const Tab = styled.div`
    width: ${props => props.width ? props.width : 100}%;
    background: ${props => props.active ? '#3f2b4f' : 'rgba(63,43,79,.4)'};
    height: 80px;
    float: left;
    line-height: 80px;
    color: #fff;
    font-size: 16px;
    text-transform: uppercase;
    border: 1px solid #fff;
`

export const ErrorText = styled.p`
    text-align: inherit;
    font-family: 'Roboto',sans-serif;
    font-size: 1rem;
    margin: 0.2rem 0 0.3rem;
    color: #ef3846;
`



export const Form = styled.form`
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    &>div { width: 100%; margin-top: 15px; }
    ${props => props.fullSize ? `
        min-height: calc(100% - 50px); height: calc(100% - 50px);
    ` : `
        max-width: 900px;
    `}
    padding: 10px 30px;
    input { text-align: center; }
`


export const Spacer = styled.br`
    display: table;
    margin: ${props => props.size ? props.size : '30px'} auto 0;
    content: " ";
    width: 100%;
` 


export const FormButton = styled.button`
    width: 100%;
    display: inline-block;
    padding: .7rem 1.1rem;
    margin: 0;
    font-size: .9rem;
    line-height: 1rem;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    user-select: none;
    background: ${props => props.background ? props.background : props.theme.colors.secondary};  
    border: 1px solid ${props => props.background ? props.background : props.theme.colors.secondary};
    color: ${props => props.color ? props.color : '#fff'};
    ${props => (props.background && props.background=='none') ? `color: ${props.theme.colors.secondary}; border: 1px solid;` : null}  
    ${props => props.full ? `
        display: block; 
    ` : null}
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    ${props => props.capitalize ? `text-transform: capitalize;` : null}
`


/** 
 *  Renderer
 * 
 */
export const CellWrap = styled.div`
    width: 100%;
    position:relative;
`

export const RemoveImageButton = styled(Icon)`
    position: absolute;
    top: 0;
    left: calc(50% - 20px);
    background: rgba(255, 255, 255, .5);
    border-top-right-radius: 0;
    border-top-left-radius: 0;
`


export const RenderedTextCellWrap = styled.div`
    position: relative;
    width: 100%; 
    ${props => props.background ? `background: #bbb;` : null}
`

export const RenderedCellWrap = RenderedTextCellWrap.extend`
    &>div { position: absolute; top:0; left:0; width: 100%; height: 100%; margin: auto; text-align: center; }
`

export const HeightHelper = styled.span`
    display: block;
    position: relative;
    width: ${props => props.width}%;            
    &>span {display: inline-block; width: 100%; padding-top: ${props => props.height}%; }
`
export const RenderedLabel = styled.span`
    dispay: block; width: 100%; text-align: center; 
    color: #fff;
    font-weight: 900;
    font-size: 1.2rem;
`

export const RenderedCellImage = styled.div`
    margin-left: auto; 
    margin-right: auto;
    width: ${props => props.width}%;
    height: 100%;
    display:flex;
    align-items: center;
    background: #666;
    float: ${props => props.align};
    ${props => props.shape=='round' ? 'border-radius: 50%;' : null};
`

export const RenderedTextLine = styled.div`
    width: 100%;
    clear:both;
    padding: 5px 0;
    &>div { 
        margin-left: auto; 
        margin-right: auto;
        ${props => props.align=='none' ? `
            margin-top: 5px;
            margin-bottom: 5px;
        ` : null}
        width: ${props => props.width}%;
        height: ${props => props.type=='header' ? '3rem' : '1rem'};
        display:flex;
        align-items: center;
        background: #666;
        float: ${props => props.align};
    }
`
export const TextColumn = styled.div`
    width: ${props => props.width ? props.width : '100'}%;
    float:left;
    padding: 10px;
`