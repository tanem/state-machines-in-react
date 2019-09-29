/** @jsx jsx */

import { css, jsx } from '@emotion/core'
import * as React from 'react'

interface Props {
  children: React.ReactNode
}

export const MenuStatus: React.FC<Props> = ({ children }) => (
  <div
    css={css`
      border: 2px solid rebeccapurple;
      color: rebeccapurple;
      padding: 1rem;
    `}
  >
    {children}
  </div>
)
