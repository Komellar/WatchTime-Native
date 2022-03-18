// import imageNotFound from '../assets/imgageNotFound.png';
const imageNotFound =
  'https://firebasestorage.googleapis.com/v0/b/borrowathing.appspot.com/o/images%2F2022-01-24%2011%3A05%3A10?alt=media&token=d4bb7b15-721b-4e45-b2de-826b72990e88';

export async function getAllShows() {
  const response = await fetch('https://api.tvmaze.com/shows?page=0');

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message || 'Could not get products.');
  }

  const loadedShows = data.map((show) => {
    return {
      id: show.id,
      title: show.name,
      image: show.image?.medium ?? imageNotFound,
      rating: show.rating.average,
      popularity: show.weight,
      genres: show.genres,
      averageRuntime: show.averageRuntime,
    };
  });

  // return loadedShows.slice(3, 20);
  // return loadedShows.slice(17, 20);
  return loadedShows;
}

export async function getSingleShow(requestData) {
  const response = await fetch(`https://api.tvmaze.com/shows/${requestData}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message || 'Could not get products.');
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

  const loadedImages = data.map((show) => {
    return {
      showId: requestData,
      imgId: show.id,
      type: show.type,
      url: show.resolutions.original.url,
    };
  });

  const backgroundImg = loadedImages.filter((show) => {
    return show.type === 'background';
  });

  const posterImg = loadedImages.filter((show) => {
    return show.type === 'poster';
  });

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
    throw new Error(data.error.message || 'Could not get products.');
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
      images: show.image ?? { original: imageNotFound },
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

  return allSeasons;
}

export async function getCast(requestData) {
  const response = await fetch(
    `https://api.tvmaze.com/shows/${requestData}/cast`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message || 'Could not get products.');
  }

  const loadedCast = data.map((result) => {
    return {
      id: result.person.id,
      idCharacter: result.character.id,
      actorName: result.person.name,
      actorImage: result.person.image?.original ?? imageNotFound,
      actorBirthday: result.person.birthday,
      characterName: result.character.name,
      characterImage: result.character.image?.original ?? imageNotFound,
    };
  });

  // const charactersIds = loadedCast.map((character) => {
  //   return character.idCharacter;
  // });

  // let uniqueCharactersIds = [];
  // charactersIds.forEach((id) => {
  //   if (!uniqueCharactersIds.includes(id)) {
  //     uniqueCharactersIds.push(id);
  //   }
  // });

  // const actorsIds = loadedCast.map((actor) => {
  //   return actor.id;
  // });

  // let uniqueActorsIds = [];
  // actorsIds.forEach((id) => {
  //   if (!uniqueActorsIds.includes(id)) {
  //     uniqueActorsIds.push(id);
  //   }
  // });

  // let convertedCast = [];

  // loadedCast.forEach((person) => {
  //   let repeated = false;
  //   if (
  //     uniqueCharactersIds.includes(person.idCharacter) &&
  //     uniqueActorsIds.includes(person.id)
  //   ) {
  //     const indexChar = uniqueCharactersIds.indexOf(person.idCharacter);
  //     uniqueCharactersIds.splice(indexChar, 1);
  //     const indexAct = uniqueCharactersIds.indexOf(person.id);
  //     uniqueCharactersIds.splice(indexAct, 1);
  //     convertedCast.push(person);
  //   }
  //   // else if (uniqueActorsIds.includes(person.id)) {
  //   //   const index = uniqueCharactersIds.indexOf(person.idCharacter);
  //   //   uniqueCharactersIds.splice(index, 1);
  //   //   convertedCast.push(person);
  //   // }
  // });

  // console.log(convertedCast);

  let convertedCast = [];

  loadedCast.forEach((person) => {
    let repeated = false;
    convertedCast.forEach((comparison) => {
      repeated = false;
      if (
        comparison.characterName === person.characterName
        // comparison.actorName === person.actorName
        // comparison.id === person.id
        // person.contains(comparison.id)
      ) {
        repeated = true;
      }
    });

    if (!repeated) {
      convertedCast.push(person);
    }
  });

  return convertedCast;
}
