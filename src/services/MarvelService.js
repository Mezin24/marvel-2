class MarvelService {
  _apiKey = 'apikey=70b306b1048a409e977894c03637b4a3';
  _baseUrl = 'https://gateway.marvel.com:443/v1/public/';

  getResourse = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could't fetch ${url}, status ${res.status}`);
    }

    return await res.json();
  };

  async getAllCharacters() {
    const res = await this.getResourse(
      `${this._baseUrl}characters?limit=9&offset=210&${this._apiKey}`
    );

    return await res.data.results.map(this._transformData);
  }

  async getChatacterById(id) {
    const res = await this.getResourse(
      `${this._baseUrl}characters/${id}?${this._apiKey}`
    );
    return await this._transformData(res.data.results[0]);
  }

  _transformData = (char) => {
    return {
      name: char.name,
      description: char.description.length
        ? char.description.slice(0, 200) + '...'
        : 'Sorry, no information about this character yet...',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
    };
  };
}

export default MarvelService;
