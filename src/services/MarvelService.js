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

    return await res.data.results.map(_transformData);
  };

  const getChatacterById = async (id) => {
    const res = await request(`${_baseUrl}characters/${id}?${_apiKey}`);

    return _transformData(res.data.results[0]);
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

  return {
    getAllCharacters,
    getChatacterById,
    error,
    loading,
    clearError,
  };
};

export default useMarvelService;
