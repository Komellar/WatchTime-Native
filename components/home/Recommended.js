import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import SliderShows from '../SliderShows';

const Recommended = ({ shows, navigation, genres }) => {
  const followedShowsIds = useSelector((state) => state.shows.showsIdList);

  const parsedGenres = useMemo(
    () =>
      genres
        ? [...genres]
            ?.sort((a, b) => (a.count > b.count ? -1 : 1))
            ?.slice(0, 3)
            ?.map((genre) => genre.name)
        : [],
    [genres]
  );

  const allFittingShows = useMemo(
    () =>
      parsedGenres &&
      shows?.filter(
        (show) =>
          show.genres?.includes(...parsedGenres) &
          (show.popularity > 94) &
          (show.rating > 8)
      ),
    [parsedGenres, shows]
  );

  const recommendedShows = useMemo(() => {
    const showsArray = [];
    const chosenIndexes = new Set();

    for (let i = 0; i < 5; i++) {
      const randomIndex = () =>
        Math.floor(Math.random() * allFittingShows.length);
      let index = randomIndex();
      while (chosenIndexes.has(index) | followedShowsIds.includes(index)) {
        index = randomIndex();
      }
      chosenIndexes.add(index);
      showsArray.push(allFittingShows[index]);
    }
    return showsArray;
  }, [allFittingShows]);

  return (
    <SliderShows
      data={recommendedShows}
      title="Recommended for you"
      navigation={navigation}
    />
  );
};

export default Recommended;
