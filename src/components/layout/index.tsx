import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { selectCurrent, selectIsAuthenticated } from '../../features/authSlice'
import { useLazyGetCurrentUserQuery } from '../../app/services/userAPI'

export const Layout = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [triggerGetCurrentPlayer] = useLazyGetCurrentUserQuery();
  const current = useSelector(selectCurrent);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth")
    }
    else if (!current) {
      triggerGetCurrentPlayer();
    }
  }, [isAuthenticated, current, navigate])
  return (
    <Outlet />
  )
}
