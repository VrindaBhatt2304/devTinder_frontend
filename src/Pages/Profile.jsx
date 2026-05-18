import ProfileEdit from '../components/ProfileEdit';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    user && (<div>
      <ProfileEdit user={user} />
    </div>)
  );
};

export default Profile;