import { createSelector, createStructuredSelector } from 'reselect';
import parseDate from '../../services/dateParse/dateParse';

const tempArray = [
  {
    id: '3fa85f64-5717-b3fc-2c9',
    text: 'string',
    username: 'string',
    account_Id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    avatarLink: 'https://avatars.dicebear.com/api/human/put-id-here.png',
    time: '2021-05-25T15:14:28.453Z'
  },
  {
    id: '3fa85f64-b3fc-2c9',
    text: 'string',
    username: 'string',
    account_Id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    avatarLink: 'https://avatars.dicebear.com/api/human/put-id-here.png',
    time: '2021-05-25T15:14:28.453Z'
  },
  {
    id: '3fa85f64-5717-c9',
    text: 'string',
    username: 'string',
    account_Id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    avatarLink: 'https://avatars.dicebear.com/api/human/put-id-here.png',
    time: '2021-05-25T15:14:28.453Z'
  },
  {
    id: '3fa85f64-5717-42c9',
    text: 'string',
    username: 'string',
    account_Id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    avatarLink: 'https://avatars.dicebear.com/api/human/put-id-here.png',
    time: '2021-05-25T15:14:28.453Z'
  },
  {
    id: '3fa8-5717-4f66afa6',
    text: 'string',
    username: 'string',
    account_Id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    avatarLink: 'https://avatars.dicebear.com/api/human/put-id-here.png',
    time: '2021-04-25T15:14:28.453Z'
  }
];

const dataSelector = (state) => state.chat;

const isLoadingSelector = createSelector(
  dataSelector,
  ({ isLoading }) => isLoading
);

const messagesSelector = createSelector(dataSelector, ({ messages }) =>
  tempArray
    .sort((a, b) => Date.parse(a.time) - Date.parse(b.time))
    .map(({ id, time, text, username, avatarLink }) => ({
      key: id,
      date: parseDate(time),
      message: text,
      userName: username,
      avatarImg: avatarLink
    }))
);

const chatSelector = createStructuredSelector({
  isLoading: isLoadingSelector,
  messages: messagesSelector
});

export default chatSelector;
