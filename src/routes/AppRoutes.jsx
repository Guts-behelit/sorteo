import { BrowserRouter ,Routes ,Route} from 'react-router'
import MainLayout from '../layouts/MainLayout'
import RafflePage from '../pages/raffle/RafflePage'
import CreateRaffle from '../pages/createRaffle/CreateRaffle'
import RaffleDetail from '../pages/raffleDetail/RaffleDetail'
import Try from '../try/Try'
import HomePage from '../pages/home/HomePage'
function AppRoutes() {

  return (
    <>
      <BrowserRouter>
      <MainLayout>
        <Routes>
        <Route path={'/'} element={<HomePage/>}/>
        <Route path={'/raffles'} element={<RafflePage/>}/>
        <Route path={'/raffles/create'} element={<CreateRaffle/>}/>
        <Route path={'/raffles/:id'} element={<RaffleDetail/>}/>
        
      </Routes>
      </MainLayout>
      
      </BrowserRouter>
    </>
  )
}

export default AppRoutes