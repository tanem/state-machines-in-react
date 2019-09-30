import { fireEvent, render, wait } from '@testing-library/react'
import * as React from 'react'
import { App } from './App'

test('menu states', async () => {
  const { getByTestId } = render(<App />)

  const menuButton = getByTestId('menu-button')
  const menuStatus = getByTestId('menu-status')

  expect(menuStatus).toHaveTextContent('closed')
  expect(menuButton).toHaveTextContent('open')

  fireEvent.click(menuButton)

  await wait(() => [
    expect(menuStatus).toHaveTextContent('opening'),
    expect(menuButton).toHaveTextContent('close')
  ])

  await wait(() => [
    expect(menuStatus).toHaveTextContent('open'),
    expect(menuButton).toHaveTextContent('close')
  ])

  fireEvent.click(menuButton)

  await wait(() => [
    expect(menuStatus).toHaveTextContent('closing'),
    expect(menuButton).toHaveTextContent('open')
  ])

  await wait(() => [
    expect(menuStatus).toHaveTextContent('closed'),
    expect(menuButton).toHaveTextContent('open')
  ])
})
