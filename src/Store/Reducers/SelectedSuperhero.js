const description = 'Born with super-human senses and the power to heal from almost any wound, Wolverine was captured by a secret Canadian organization and given an unbreakable skeleton and claws. Treated like an animal, it took years for him to control himself. Now, he\'s a premiere member of Avengers.';
const initialState = {
  name: 'Wolverine',
  description,
  image: 'http://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf/standard_fantastic.jpg',
  urls: [{
    type: 'detail',
    url: 'http://marvel.com/comics/characters/1009718/wolverine?utm_campaign=apiRef&utm_source=001ac6c73378bbfff488a36141458af2',
  }, {
    type: 'wiki',
    url: 'http://marvel.com/universe/Wolverine_(James_Howlett)?utm_campaign=apiRef&utm_source=001ac6c73378bbfff488a36141458af2',
  }],
};

const selectedSuperhero = function selectedSuperhero(state = initialState, action) {
  return state;
};

export default selectedSuperhero;
