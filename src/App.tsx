import * as React from 'react'
import { Container } from './Container'
import { Content } from './Content'
import { Menu } from './Menu'
import { MenuStatus } from './MenuStatus'

export const App: React.FC = () => {
  const [menuStatus, setMenuStatus] = React.useState()

  return (
    <Container>
      <Menu setStatus={setMenuStatus} />
      <Content>
        <div>
          <span role="img" aria-label="arrow">
            👈
          </span>{' '}
          try out this state machine Menu component!
        </div>
        <div>Menu state:</div>
        <MenuStatus>{menuStatus}</MenuStatus>
      </Content>
    </Container>
  )
}
