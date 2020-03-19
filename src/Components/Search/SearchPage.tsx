import React, { useState, useEffect, ChangeEvent } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Card, TextField, InputAdornment, CardActionArea, CardMedia, CardContent, Typography, Grid } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import SearchIcon from '@material-ui/icons/Search'
import { Business } from '../../Stores/BusinessStore'
import { rootStore } from '../../Stores/Stores'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import PhotoIcon from '@material-ui/icons/Photo'
const useQuery = () => new URLSearchParams(useLocation().search)

export const StyledGrid = styled(Grid)`
  flex-grow: 1;
  margin-top: 10px;
`

export const StyledCard = styled(Card)`
  min-height: 282px;
  margin: 0 10px 10px 0;
  text-align: center;
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
        style={{ width: '100%', marginTop: 10, color: 'red' }}
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
          <Grid item key={b.id}>
            <StyledCard>
              <CardActionArea onClick={() => history.push(`/business/${b.id}`)}>
                {b.image_url ? (
                  <CardMedia image={b.image_url} title={b.name} style={{ height: 140 }} />
                ) : (
                  <PhotoIcon style={{ width: '140px', height: '100%' }} />
                )}
                <CardContent>
                  <Typography gutterBottom variant='h5' component='h2'>
                    {b.name}
                  </Typography>
                  <Typography variant='body2' color='textSecondary' component='p'>
                    {b.price && `price:${b.price} `}
                    {b.display_phone && `phone:${b.display_phone}`}
                  </Typography>
                  <Rating defaultValue={b.rating} precision={0.5} readOnly></Rating>
                  {b.review_count > 0 && (
                    <Typography variant='body2' color='textSecondary' component='p'>
                      {b.review_count} {b.review_count === 1 ? 'review' : 'reviews'}
                    </Typography>
                  )}
                </CardContent>
              </CardActionArea>
            </StyledCard>
          </Grid>
        ))}
        {businesses.length === 0 && !rootStore.isLoading && (
          <Typography variant='h5'>{!query ? 'Type to search for business' : 'No results found'}</Typography>
        )}
      </StyledGrid>
    </>
  )
})
