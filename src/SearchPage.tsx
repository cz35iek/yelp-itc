import React, { useState, useEffect } from 'react'
import { Card, Rate, Spin, Empty } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { useHistory, useLocation } from 'react-router-dom'
import { TextField } from '@material-ui/core'

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
  const history = useHistory()

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const response = await (await fetch(`https://cz35iek.builtwithdark.com/api.yelp.com/v3/businesses/search?term=${query}`)).json()
      setBusinesses(response.body.businesses as Business[])
      setLoading(false)
    })()
  }, [query])

  const onSearch = async (val: string) => {
    history.push(`/?query=${val}`)
  }

  return (
    <>
      <TextField
        id='standard-basic'
        label='input search text'
        onBlur={e => onSearch(e.currentTarget.value)}
        defaultValue={query}
        style={{ marginTop: 20, width: '98vw' }}
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
