import { useMachine } from '@xstate/react'
import { motion, Transition, useAnimation, Variants } from 'framer-motion'
import Mousetrap from 'mousetrap'
import * as React from 'react'
import styled from 'styled-components'
import { Machine } from 'xstate'
import { Button } from './Button'

interface Props {
  setStatus: React.Dispatch<any>
}

const transition: Transition = {
  damping: 20,
  stiffness: 300,
  type: 'spring'
}

const variants: Variants = {
  closed: {
    backdropFilter: 'blur(0px)',
    x: -290
  },
  open: {
    backdropFilter: 'blur(2px)',
    x: 0
  }
}

const stateMachine = Machine({
  initial: 'closed',
  states: {
    closed: {
      on: {
        OPEN: 'opening'
      }
    },
    opening: {
      invoke: {
        src: 'openMenu',
        onDone: { target: 'open' }
      },
      on: {
        CLOSE: 'closing'
      }
    },
    open: {
      on: {
        CLOSE: 'closing'
      }
    },
    closing: {
      invoke: {
        src: 'closeMenu',
        onDone: { target: 'closed' }
      },
      on: {
        OPEN: 'opening'
      }
    }
  }
})

const StyledContainer = styled(motion.div)`
  align-content: start;
  background-color: rgba(30, 27, 47, 0.8);
  bottom: 0;
  color: #fff;
  display: grid;
  grid-row-gap: 10px;
  grid-template-rows: 40px auto;
  justify-content: end;
  left: 0;
  padding: 10px;
  position: absolute;
  top: 0;
  transform: translateX(-290px);
  width: 380px;
  z-index: 9999;
`;

export const Menu: React.FC<Props> = ({ setStatus }) => {
  const controls = useAnimation()

  const openMenu = () => controls.start('open')
  const closeMenu = () => controls.start('closed')

  const [state, send] = useMachine(stateMachine, {
    services: {
      openMenu,
      closeMenu
    }
  })

  React.useEffect(() => {
    const key = 'esc'
    Mousetrap.bind(key, () => {
      send('CLOSE')
    })

    return () => {
      Mousetrap.unbind(key)
    }
  }, [send])

  React.useEffect(() => {
    setStatus(state.value)
  }, [setStatus, state.value])

  const nextMessage =
    state.value === 'open' || state.value === 'opening' ? 'CLOSE' : 'OPEN'

  let label = nextMessage === 'OPEN' ? 'open' : 'close'

  return (
    <StyledContainer
      animate={controls}
      initial="closed"
      transition={transition}
      variants={variants}
    >
      <Button
        onClick={() => {
          send(nextMessage)
        }}
        testId="menu-button"
      >
        {label}
      </Button>
    </StyledContainer>
  )
}
