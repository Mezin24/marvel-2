import { useHttp } from '../components/hooks/http.hook';

const useMarvelService = () => {
  const { loading, error, request, clearError } = useHttp();

  const _apiKey = 'apikey=70b306b1048a409e977894c03637b4a3';
  const _baseUrl = 'https://gateway.marvel.com:443/v1/public/';
  const _baseOffset = '210';

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_baseUrl}characters?limit=9&offset=${offset}&${_apiKey}`
    );

    return res.data.results.map(_transformData);
  };

  const getChatacterById = async (id) => {
    const res = await request(`${_baseUrl}characters/${id}?${_apiKey}`);

    return _transformData(res.data.results[0]);
  };

  const getComicsById = async (id) => {
    const res = await request(`${_baseUrl}comics/${id}?${_apiKey}`);

    return _transformComicsData(res.data.results[0]);
  };

  const getAllComicses = async (offset = 0) => {
    const res = await request(
      `${_baseUrl}comics?limit=8&offset=${offset}&${_apiKey}`
    );

    return res.data.results.map(_transformComicsData);
  };

  const _transformData = (char) => {
    return {
      name: char.name,
      description: char.description.length
        ? char.description.slice(0, 200) + '...'
        : 'Sorry, no information about this character yet...',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      id: char.id,
      comics: char.comics.items,
    };
  };

  const _transformComicsData = (comics) => {
    return {
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      title: comics.title,
      price:
        comics.prices[0].price !== 0
          ? `${comics.prices[0].price}$`
          : 'NOT AVAILABLE',
      id: comics.id,
      url: comics.urls[0].url,
      description: comics.description || 'There is no description',
      pageCount: comics.pageCount
        ? `${comics.pageCount} p.`
        : 'No information about the number of pages',
      language: comics.textObjects.language || 'en-us',
    };
  };

  return {
    getAllCharacters,
    getAllComicses,
    getChatacterById,
    getComicsById,
    error,
    loading,
    clearError,
  };
};

export default useMarvelService;
