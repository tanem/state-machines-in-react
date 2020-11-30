import * as React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  border: 2px solid rebeccapurple;
  color: rebeccapurple;
  padding: 1rem;
`;

export const MenuStatus: React.FC = ({ children }) => (
  <StyledDiv data-testid="menu-status">
    {children}
  </StyledDiv>
)
