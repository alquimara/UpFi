/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { Button, Box } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useQuery } from "react-query"
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';



interface Image {
  title: string,
  description: string,
  url: string,
  ts: number,
  id: string
}
interface pageData {
  data: Image[],
  after: string
}

export default function Home(): JSX.Element {
  async function fechtImages({ pageParam = null }): Promise<pageData> {
    const res = await api.get('/api/images', {
      params: {
        after: pageParam
      }
    })
    return res.data
  }
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images', fechtImages, {
    getNextPageParam: lastPage => lastPage.after || null
  }
  );

  const formattedData = useMemo(() => {
    const dataPage = data?.pages.map((pa) => {
      return pa.data
    })
    return dataPage?.flat(2)
  }, [data]);

  if (isLoading) return <Loading />
  if (isError) return <Error />
  return (
    <>
      <Header />
      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && <Button onClick={() => fetchNextPage()} mt='40px'
        >{isFetchingNextPage ? 'Carregando' : 'Carregar Mais'}</Button>}
      </Box>
    </>
  )
}
