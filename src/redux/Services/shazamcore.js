import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamcoreApi = createApi({
  reducer: 'shazamcoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set(
        'x-rapidapi-key',
        '43befdad59mshf223150510e13f1p194e2djsn282863c8822e'
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    GetTopCharts: builder.query({ query: () => '/charts/track' }),
    GetSongDetails: builder.query({
      query: ({ songid }) => `/songs/get-details?key=${songid}&locale=en-US`,
    }),
    GetSongsRelated: builder.query({
      query: ({ songid }) =>
        `/songs/list-recommendations?key=${songid}&locale=en-US`,
    }),
    GetArtistDetails: builder.query({
      query: ({ artistId }) => `/artists/get-details?id=${artistId}&l=en-US`,
    }),
    GetArtistTopSongs: builder.query({
      query: ({ artistId }) => `/artists/get-top-songs?id=${artistId}&l=en-US`,
    }),
    GetAroundyouDetails: builder.query({
      query: ({ country }) =>
        `/charts/track?locale=en-US&listId=ip-country-chart-${country}&pageSize=20&startFrom=0`,
    }),
    GetSongsbySearch: builder.query({
      query: ({ searchTerm }) =>
        `/search?term=${searchTerm}&locale=en-US&offset=0&limit=5'`,
    }),
  }),
});
export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongsRelatedQuery,
  useGetArtistDetailsQuery,
  useGetArtistTopSongsQuery,
  useGetAroundyouDetailsQuery,
  useGetSongsbySearchQuery,
} = shazamcoreApi;
