import { Outlet, useNavigate } from "react-router"
import { useEffect } from "react"
import { useSelector } from "react-redux";

const AdminLayout = () => {

  const { role } = useSelector((state) => state.auth);
  const navigate = useNavigate()

  useEffect(() => {
    if(role !== 'admin') {
      navigate('/', { replace: true})
    }
  }, [])
  
  return (
    <div>
      <Outlet />
    </div>
  )
}
export default AdminLayout