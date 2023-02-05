/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
import { SongCard, Loader, Error } from '../components';
import { useGetTopChartsQuery } from '../redux/Services/shazamcore';
import { useDispatch, useSelector } from 'react-redux';

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  // eslint-disable-next-line no-unused-vars
  const { data, isFetching, error } = useGetTopChartsQuery();
  // console.log(data);
  if (isFetching) return <Loader title="Loading Songs..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col ">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover Pop
        </h2>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data.tracks.map((song, i) => (
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

export default Discover;
