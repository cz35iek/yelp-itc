import React, { useState, useEffect, ChangeEvent } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { TextField, InputAdornment, Typography, Grid } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { Business } from '../../Stores/BusinessStore'
import { rootStore } from '../../Stores/Stores'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { GridItem } from './GridItem'
const useQuery = () => new URLSearchParams(useLocation().search)

export const StyledGrid = styled(Grid)`
  flex-grow: 1;
  margin-top: 10px;
  justify-content: space-evenly;
`

export const SearchPage = observer(() => {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const query = useQuery().get('query')
  const [inputValue, setInputValue] = useState<string>(query || '')
  const [error, setError] = useState<boolean>(false)
  const history = useHistory()

  useEffect(() => {
    ;(async () => {
      setBusinesses(await rootStore.businessStore.searchBusinesses(query!))
    })()
  }, [query])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(!isInputValid(e.currentTarget.value))
    setInputValue(e.currentTarget.value)
  }

  const isInputValid = (val: string) => {
    return /^[a-z0-9\s]+$/i.test(val)
  }

  const search = () => {
    if (inputValue && !error) history.push(`/?query=${inputValue}`)
  }

  return (
    <>
      <TextField
        style={{ width: '100%', marginTop: 10 }}
        label='search'
        onBlur={search}
        onChange={onChange}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            search()
          }
        }}
        value={inputValue}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        error={error}
        helperText={error ? 'Incorrect entry.' : ''}
      />
      <StyledGrid container>
        {businesses.map((b: Business) => (
          <GridItem {...b} />
        ))}
        {businesses.length === 0 && !rootStore.isLoading && (
          <Typography variant='h5'>{!query ? 'Type to search for business' : 'No results found'}</Typography>
        )}
      </StyledGrid>
    </>
  )
})
