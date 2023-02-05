import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { useGetAroundyouDetailsQuery } from '../redux/Services/shazamcore';
import { Countries } from '../assets/constants';

const AroundYou = () => {
  const [country, setcountry] = useState('');
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  //
  useEffect(() => {
    axios
      .get(
        'https://geo.ipify.org/api/v2/country?apiKey=at_DWT9qPrWOL7rzbPvOdSTBZZg7VmhQ'
      )
      .then((response) => {
        if (country === response?.data?.location?.country)
          setcountry(response?.data?.location?.country);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [country]);
  //
  const { data, isFetching, error } = useGetAroundyouDetailsQuery({ country });
  if (isFetching && loading) return <Loader title="Loading songs around you" />;
  if (error) return <Error />;
  //
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-left mt-4 text-white mb-10">
          Around your country
        </h2>
        <select
          onChange={(e) => {
            setcountry(e.target.value);
          }}
          value={country}
          className="bg-black text-gray-500 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {Countries.map((CN) => (
            <option value={CN.code}>{CN.name}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data &&
          data?.tracks?.map((song, i) => (
            <SongCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
            />
          ))}
      </div>
    </div>
  );
};

export default AroundYou;
