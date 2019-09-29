/** @jsx jsx */

import { css, jsx } from '@emotion/core'
import * as React from 'react'

interface Props {
  children: React.ReactNode
}

export const Content: React.FC<Props> = ({ children }) => (
  <div
    css={css`
      align-content: center;
      display: grid;
      font-size: 22px;
      grid-column: 2;
      grid-row-gap: 1rem;
      justify-items: center;
      padding: 1rem;
    `}
  >
    {children}
  </div>
)
