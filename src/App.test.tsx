import { fireEvent, render, waitFor } from '@testing-library/react'
import { App } from './App'

test('clicking open/close button', async () => {
  const { getByTestId } = render(<App />)

  const menuButton = getByTestId('menu-button')
  const menuStatus = getByTestId('menu-status')

  expect(menuStatus).toHaveTextContent('closed')
  expect(menuButton).toHaveTextContent('open')

  fireEvent.click(menuButton)

  await waitFor(() => [
    expect(menuStatus).toHaveTextContent('opening'),
    expect(menuButton).toHaveTextContent('close'),
  ])

  await waitFor(() => [
    expect(menuStatus).toHaveTextContent('open'),
    expect(menuButton).toHaveTextContent('close'),
  ])

  fireEvent.click(menuButton)

  await waitFor(() => [
    expect(menuStatus).toHaveTextContent('closing'),
    expect(menuButton).toHaveTextContent('open'),
  ])

  await waitFor(() => [
    expect(menuStatus).toHaveTextContent('closed'),
    expect(menuButton).toHaveTextContent('open'),
  ])
})

test('escape should close the menu', async () => {
  const { getByTestId } = render(<App />)

  const menuButton = getByTestId('menu-button')
  const menuStatus = getByTestId('menu-status')

  fireEvent.click(menuButton)

  await waitFor(() => [
    expect(menuStatus).toHaveTextContent('open'),
    expect(menuButton).toHaveTextContent('close'),
  ])

  fireEvent.keyDown(document.body, { key: 'Escape', keyCode: 27, which: 27 })

  await waitFor(() => [
    expect(menuStatus).toHaveTextContent('closing'),
    expect(menuButton).toHaveTextContent('open'),
  ])

  await waitFor(
    () => [
      expect(menuStatus).toHaveTextContent('closed'),
      expect(menuButton).toHaveTextContent('open'),
    ],
    { timeout: 2000 }
  )
})

test('escape while already closed should have no effect', async () => {
  const { getByTestId } = render(<App />)

  const menuButton = getByTestId('menu-button')
  const menuStatus = getByTestId('menu-status')

  expect(menuStatus).toHaveTextContent('closed')

  fireEvent.keyDown(document.body, { key: 'Escape', keyCode: 27, which: 27 })

  expect(menuStatus).toHaveTextContent('closed')
  expect(menuButton).toHaveTextContent('open')
})

test('rapid open/close toggling should settle to closed', async () => {
  const { getByTestId } = render(<App />)

  const menuButton = getByTestId('menu-button')
  const menuStatus = getByTestId('menu-status')

  fireEvent.click(menuButton)
  fireEvent.click(menuButton)

  await waitFor(() =>
    expect(menuStatus).toHaveTextContent(/closing|closed/)
  )

  await waitFor(
    () => expect(menuStatus).toHaveTextContent('closed'),
    { timeout: 2000 }
  )
})
