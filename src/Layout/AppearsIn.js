import Check from './Check';
import Cross from './Cross';

const AppearsIn = ({ event: appearsIn }) => (
  appearsIn ? Check : Cross
);

export default AppearsIn;
