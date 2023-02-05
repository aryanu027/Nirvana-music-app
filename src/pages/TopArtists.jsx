/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
import { ArtistCard, Loader, Error } from '../components';
import { useGetTopChartsQuery } from '../redux/Services/shazamcore';

const TopArtists = () => {
  // eslint-disable-next-line no-unused-vars
  const { data, isFetching, error } = useGetTopChartsQuery();
  if (isFetching) return <Loader title="Loading top Artists..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col ">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Top Artists</h2>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data.tracks.map((track) => (
          <ArtistCard key={track.key} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
