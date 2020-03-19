import React from 'react'
import { render } from '@testing-library/react'
import { SearchPage } from './SearchPage'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

test('renders search element', () => {
  const history = createMemoryHistory()
  const { getByText } = render(
    <Router history={history}>
      <SearchPage />
    </Router>
  )
  const searchElement = getByText(/search/i)
  expect(searchElement).toBeInTheDocument()
})
