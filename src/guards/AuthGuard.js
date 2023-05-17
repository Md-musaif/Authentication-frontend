import PropTypes from 'prop-types';
import useAuth from '../hook/useAuth';
import Login from '../scenes/login/Login';
import ClipLoader from "react-spinners/ClipLoader";


AuthGuard.propTypes={
  children:PropTypes.node
}
function AuthGuard({ children }) {
  const { user ,loading   } = useAuth()

  
  if (loading) {
    return <ClipLoader
    color={'#89e7d4'}
    loading={loading}
    size={150}
    margin={400}
    aria-label="Loading Spinner"
    data-testid="loader"
  /> 
  }
  if (!user) {
    return <Login />
  }
  return (children)
}

export default AuthGuard