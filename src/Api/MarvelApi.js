const BaseMarvelUrl = 'https://gateway.marvel.com:443/v1/public';
// TODO DO NOT COMMIT
const apiKeys = '<API-KEY-HERE>';

const getDetailsUrl = ({ id }) => `${BaseMarvelUrl}/characters/${id}?${apiKeys}`;

const parseDetails = ({ data }) => {
  const [firstResult] = data.results;
  return {
    id: firstResult.id,
    name: firstResult.name,
    urls: firstResult.urls,
    description: firstResult.description,
    image: `${firstResult.thumbnail.path}.${firstResult.thumbnail.extension}`,
  };
};

// disable this rule, as for future requirements there will be other exported components
// eslint-disable-next-line import/prefer-default-export
export const fetchSuperheroDetails = async function fetchSuperheroDetails(superhero) {
  const response = await fetch(getDetailsUrl(superhero));
  const jsonResponse = await response.json();
  return parseDetails(jsonResponse);
};
