const imageNotFound =
  'https://firebasestorage.googleapis.com/v0/b/watchtime-native.appspot.com/o/simone-secci-49uySSA678U-unsplash.jpg?alt=media&token=6d3d3f47-2924-42b5-8cdb-877982a64bbe';

export async function getAllShows() {
  const promises = [0, 1, 2, 3, 4, 5, 6, 7].map((i) =>
    fetch(`https://api.tvmaze.com/shows?page=${i}`).then((resp) => resp.json())
  );

  const data = await Promise.all(promises);

  const loadedShows = [];
  for (page of data) {
    const showsList = page.map((show) => ({
      id: show.id,
      title: show.name,
      image: show.image?.medium ?? imageNotFound,
      rating: show.rating.average,
      popularity: show.weight,
      genres: show.genres,
      averageRuntime: show.averageRuntime,
    }));
    loadedShows.push(...showsList);
  }

  return loadedShows;
}

export async function getSingleShow(requestData) {
  const response = await fetch(`https://api.tvmaze.com/shows/${requestData}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message || 'Could not get show.');
  }

  const loadedShow = {
    id: data.id,
    title: data.name,
    description: data.summary,
    image: data.image?.medium ?? imageNotFound,
    language: data.language,
    status: data.status,
    averageRuntime: data.averageRuntime,
    premiered: data.premiered,
    ended: data.ended,
    rating: data.rating.average,
    popularity: data.weight,
    genres: data.genres,
  };

  return loadedShow;
}

export async function getShowImages(requestData) {
  const response = await fetch(
    `https://api.tvmaze.com/shows/${requestData}/images`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message || 'Could not get images.');
  }

  const loadedImages = data.map((show) => ({
    showId: requestData,
    imgId: show.id,
    type: show.type,
    url: show.resolutions.original.url,
  }));

  const backgroundImg = loadedImages.filter(
    (show) => show.type === 'background'
  );

  const posterImg = loadedImages.filter((show) => show.type === 'poster');

  return {
    backgroundImg:
      backgroundImg.length === 0
        ? {
            url: imageNotFound,
          }
        : backgroundImg[0],
    posterImg:
      posterImg.length === 0
        ? {
            url: imageNotFound,
          }
        : posterImg[0],
    allImages: loadedImages,
  };
}

export async function getSeasons(requestData) {
  const response = await fetch(
    `https://api.tvmaze.com/shows/${requestData}/episodes`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message || 'Could not get data.');
  }
  const loadedEpisodes = data.map((show) => {
    return {
      id: show.id,
      season: show.season,
      episode: show.number,
      title: show.name,
      runtime: show.runtime,
      desc: show.summary?.replace(/<[^>]+>/g, ''),
      premiered: show.airdate,
      images: show.image ?? { original: imageNotFound, medium: imageNotFound },
      rating: show.rating.average,
    };
  });

  const seasonsCount = loadedEpisodes[loadedEpisodes.length - 1].season;
  let allSeasons = [];

  for (let i = 1; i < seasonsCount + 1; i++) {
    const season = loadedEpisodes.filter((show) => {
      return show.season === i;
    });
    allSeasons.push(season);
  }

  return { seasons: allSeasons, episodesCount: loadedEpisodes?.length ?? 0 };
}

export async function getEpisodesCount(requestData) {
  const response = await fetch(
    `https://api.tvmaze.com/shows/${requestData}/episodes`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message || 'Could not get episodes.');
  }

  return data?.length ?? 0;
}

export async function getCast(requestData) {
  const response = await fetch(
    `https://api.tvmaze.com/shows/${requestData}/cast`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message || 'Could not get cast.');
  }

  const loadedData = data.map((result) => ({
    id: result.person.id,
    idCharacter: result.character.id,
    actorName: result.person.name,
    actorImage: result.person.image?.original ?? imageNotFound,
    characterName: result.character.name,
    characterImage: result.character.image?.original ?? imageNotFound,
  }));

  let characters = [];
  let actors = [];

  loadedData.forEach((character) => {
    let repeated = false;
    characters.forEach((comparison) => {
      if (comparison.idCharacter === character.idCharacter) {
        repeated = true;
      }
    });

    if (!repeated) {
      characters.push(character);
    }
  });

  loadedData.forEach((person) => {
    let repeated = false;
    actors.forEach((comparison) => {
      if (comparison.id === person.id) repeated = true;
    });

    if (!repeated) {
      actors.push(person);
    }
  });

  return { actors, characters };
}

export async function getSearchResult(requestData) {
  const response = await fetch(
    `https://api.tvmaze.com/search/shows?q=${requestData}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message || 'Could not find show.');
  }

  const loadedShows = data.map((result) => ({
    id: result.show.id,
    title: result.show.name,
    image: result.show.image?.medium ?? imageNotFound,
  }));

  return loadedShows;
}
