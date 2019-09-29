/** @jsx jsx */

import { css, jsx } from '@emotion/core'
import * as React from 'react'

interface Props {
  children: React.ReactNode
  onClick: () => void
}

export const Button: React.FC<Props> = ({ children, onClick }) => (
  <button
    css={css`
      background-color: #1f1d25;
      color: #fff;
      cursor: pointer;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 1px;
      outline: none;
      padding: 12px;
      text-align: center;
      text-transform: uppercase;
      &:hover {
        background-color: #8f6aff;
      }
    `}
    onClick={onClick}
  >
    {children}
  </button>
)
