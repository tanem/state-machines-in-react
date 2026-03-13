import { useActor } from '@xstate/react'
import { motion, Transition, useAnimation, Variants } from 'framer-motion'
import * as React from 'react'
import styled from 'styled-components'
import { fromPromise, setup } from 'xstate'
import { Button } from './Button'

interface Props {
  setStatus: React.Dispatch<React.SetStateAction<string | undefined>>
}

const transition: Transition = {
  damping: 20,
  stiffness: 300,
  type: 'spring',
}

const variants: Variants = {
  closed: {
    backdropFilter: 'blur(0px)',
    x: -290,
  },
  open: {
    backdropFilter: 'blur(2px)',
    x: 0,
  },
}

const stateMachine = setup({
  actors: {
    openMenu: fromPromise(async () => {}),
    closeMenu: fromPromise(async () => {}),
  },
}).createMachine({
  initial: 'closed',
  states: {
    closed: {
      on: {
        OPEN: 'opening',
      },
    },
    opening: {
      invoke: {
        src: 'openMenu',
        onDone: { target: 'open' },
      },
      on: {
        CLOSE: 'closing',
      },
    },
    open: {
      on: {
        CLOSE: 'closing',
      },
    },
    closing: {
      invoke: {
        src: 'closeMenu',
        onDone: { target: 'closed' },
      },
      on: {
        OPEN: 'opening',
      },
    },
  },
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
`

export const Menu: React.FC<Props> = ({ setStatus }) => {
  const controls = useAnimation()

  const machine = React.useMemo(
    () =>
      stateMachine.provide({
        actors: {
          openMenu: fromPromise(() => controls.start('open')),
          closeMenu: fromPromise(() => controls.start('closed')),
        },
      }),
    [controls]
  )

  const [state, send] = useActor(machine)

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        send({ type: 'CLOSE' })
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [send])

  React.useEffect(() => {
    setStatus(state.value)
  }, [setStatus, state.value])

  const nextEvent =
    state.value === 'open' || state.value === 'opening' ? 'CLOSE' : 'OPEN'

  const label = nextEvent === 'OPEN' ? 'open' : 'close'

  return (
    <StyledContainer
      animate={controls}
      initial="closed"
      transition={transition}
      variants={variants}
    >
      <Button
        onClick={() => {
          send({ type: nextEvent })
        }}
        testId="menu-button"
      >
        {label}
      </Button>
    </StyledContainer>
  )
}
