import React from 'react'
import styled from 'styled-components'


export const Icon = (props) => {
    let child;
    switch (props.name) {
        case 'edit': child = <Edit/>; break;
        case 'remove': child = <Remove/>; break;
        case 'close': child = <Close/>; break;
        case 'left': child = <Left/>; break;
        case 'right': child = <Right/>; break;
        case 'down': child = <Down/>; break;       
        case 'reorder': child = <Reorder/>; break;
        case 'resize': child = <Resize/>; break;        
    }

    return (
        <Wrap {...props}>
            {child}
        </Wrap>
    )
}

const Wrap = styled.div`
    cursor: pointer;
    height: ${props => props.height ? props.height : '40px'};
    width: ${props => props.width ? props.width : '40px'};
    border-radius: 50%;
    margin: ${props => props.margin ? props.margin : 'auto'};
    text-align: center;
    ${props => props.selected ? 'background: #eee;' : null}
    ${props => props.active ? `
        background: #555 !important;
        box-shadow: none;
    ` :null}
    display: flex;
    align-items: center;
    ${props => props.left ? 'float: left;' : null}
    ${props => props.right ? 'float: right;' : null}    
`

const SVG = styled.svg`
    display: block;
    margin: auto;
`


const Edit = (props) => {
    return (
        <SVG width="24" height="24" viewBox="0 0 24 24">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </SVG>
    )
}

const Remove = (props) => {
    return (
        <SVG width="24" height="24" viewBox="0 0 24 24">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
            <path fill="none" d="M0 0h24v24H0z"></path>
        </SVG>
    )
}

const Close = (props) => {
    return (
        <SVG width="24" height="24" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </SVG>
    )
}


const Right = (props) => {
    return (
        <SVG width="24" height="24" viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </SVG>
    )
}

const Left = (props) => {
    return (
        <SVG width="24" height="24" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </SVG>
    )
}

const Down = (props) => {
    return (
        <SVG width="24" height="24" viewBox="0 0 24 24">
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </SVG>
    )
}

const Reorder = (props) => {
    return (
        <SVG width="24" height="24" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
        </SVG>
    )
}

const Resize = (props) => {
    return (
        <SVG width="24" height="24" viewBox="0 0 24 24">
            <path d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z"/>
        </SVG>
    )
}


