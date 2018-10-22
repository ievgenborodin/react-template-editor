import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styledNormalize from 'styled-normalize'
import { injectGlobal } from 'styled-components'
import styled, { css } from 'styled-components'
import TemplateEditor from './index'

// material ui typography fix
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

/**
 * Media queries [wip]
 * 
 */ 
const sizes = {
    size16: 1600,
    size14: 1400,
    size13: 1300,
    giant: 1170,
    desktop: 992,
    tablet: 768,
    phonelet: 500,
    phone: 376
}  
const media = Object.keys(sizes).reduce((accumulator, label) => {
    const emSize = sizes[label] / 16
    accumulator[label] = (...args) => css`
      @media (min-width: ${emSize}em) {
        ${css(...args)}
      }
    `
    return accumulator
}, {})


// global styls inject
injectGlobal`
  ${styledNormalize}
  html {
    box-sizing: border-box;
    text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
    height: 100%;
    min-height: 100%;
    font-size:14px;
}
*,
*::before,
*::after {
    box-sizing: inherit;
}
body {
    height: 100%;
    min-height: 100%;
    margin: 0;
    font-family: sans-serif;
    background: rgb(238, 238, 238);
}
`

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  max-width: initial;
  max-width: auto;
  min-height: 300px;

  padding: 0 15px;

  ${media.desktop`
      max-width: 992px;
  `}

  ${media.size13`
      max-width: 1170px;
  `}
`


/**
 * Sample App for dev
 *  
 */
class ExampleApp extends Component {

    constructor(props) {
        super(props)
        this.syncEditor = this.syncEditor.bind(this)
    }

    // editor's changes callback
    syncEditor(data) {
        console.log('current structure:', data)
    }

    render() {
        return (
            <Container>
                <h4>Editor</h4>
                <TemplateEditor theme={theme} structure={null} onChange={this.syncEditor} />
            </Container>
        )
    }
}


/** 
 * Theme [wip] 
 * 
 */
const theme = {
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
}


/**
 * Render  
 *  
 */
ReactDOM.render(
    <ExampleApp />, 
    document.getElementById('root')
)

