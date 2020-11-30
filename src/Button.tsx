import * as React from 'react'
import styled from 'styled-components'

interface Props {
  onClick: () => void
  testId: string
}

const StyledButton = styled.button`
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
`

export const Button: React.FC<Props> = ({ children, onClick, testId }) => (
  <StyledButton
    data-testid={testId}
    onClick={onClick}
  >
    {children}
  </StyledButton>
)
