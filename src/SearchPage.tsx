import React, { useState, useEffect, ChangeEvent } from 'react'
import { Card, Rate, Spin, Empty } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { useHistory, useLocation } from 'react-router-dom'
import { TextField, InputAdornment } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

type Business = {
  id: string
  name: string
  image_url: string
  price: string
  phone: string
  rating: number
}

const useQuery = () => new URLSearchParams(useLocation().search)

export const SearchPage = () => {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const query = useQuery().get('query')
  const [inputValue, setInputValue] = useState<string>(query!)
  const history = useHistory()

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const response = await (await fetch(`https://cz35iek.builtwithdark.com/api.yelp.com/v3/businesses/search?term=${query}`)).json()
      setBusinesses(response.body.businesses as Business[])
      setLoading(false)
    })()
  }, [query])

  return (
    <>
      <TextField
        id='standard-basic'
        label='input search query'
        onBlur={e => history.push(`/?query=${inputValue}`)}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)}
        onKeyPress={ev => {
          if (ev.key === 'Enter') {
            history.push(`/?query=${inputValue}`)
          }
        }}
        defaultValue={query}
        value={inputValue}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <SearchIcon />
            </InputAdornment>
          ),
          fullWidth: true,
        }}
        style={{ marginTop: 20 }}
      />
      <Spin spinning={loading}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 }}>
          {businesses.map((b: Business) => (
            <Card
              key={b.id}
              style={{ margin: 10, width: 300 }}
              cover={<img alt='example' src={b.image_url} />}
              onClick={e => history.push(`/business/${b.id}`)}
              hoverable
            >
              <Meta title={b.name} description={`price: ${b.price} phone: ${b.phone}`} />
              <Rate disabled allowHalf defaultValue={b.rating}></Rate>
            </Card>
          ))}
          {businesses.length === 0 && !loading && <Empty />}
        </div>
      </Spin>
    </>
  )
}
