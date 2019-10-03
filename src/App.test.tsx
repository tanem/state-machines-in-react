import { fireEvent, render, wait } from '@testing-library/react'
import * as React from 'react'
import { App } from './App'

test('clicking open/close button', async () => {
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

test('escape should close the menu', async () => {
  const { getByTestId } = render(<App />)

  const menuButton = getByTestId('menu-button')
  const menuStatus = getByTestId('menu-status')

  fireEvent.click(menuButton)

  await wait(() => [
    expect(menuStatus).toHaveTextContent('open'),
    expect(menuButton).toHaveTextContent('close')
  ])

  fireEvent.keyDown(document.body, { key: 'Escape', keyCode: 27, which: 27 })

  await wait(() => [
    expect(menuStatus).toHaveTextContent('closing'),
    expect(menuButton).toHaveTextContent('open')
  ])

  await wait(() => [
    expect(menuStatus).toHaveTextContent('closed'),
    expect(menuButton).toHaveTextContent('open')
  ])
})
