/** @jsx jsx */

import { css, jsx } from '@emotion/core'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import { Menu } from './Menu'
import './styles.css'

function App() {
  const [menuStatus, setMenuStatus] = useState()

  const containerStyles = css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: grid;
    grid-template-columns: 90px 1fr;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%239e72e5' fill-opacity='0.10' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  `

  const contentStyles = css`
    grid-column: 2;
    font-size: 22px;
    padding: 1rem;
    display: grid;
    justify-items: center;
    align-content: center;
    grid-row-gap: 1rem;
    /* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%239e72e5' fill-opacity='0.03' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); */
  `

  return (
    <div css={containerStyles}>
      <Menu setStatus={setMenuStatus} />
      <div css={contentStyles}>
        <div>
          <span role="img" aria-label="arrow">
            👈
          </span>{' '}
          try out this state machine Menu component!
        </div>
        <div>Menu state:</div>
        <div
          css={css`
            padding: 1rem;
            border: 2px solid rebeccapurple;
            color: rebeccapurple;
          `}
        >
          {menuStatus}
        </div>
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
