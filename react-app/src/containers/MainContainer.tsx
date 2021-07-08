import header from '../components/header.tsx'
import Metrics from './Metrics.tsx'
import NavBarContainer from './NavBarContainer.tsx'
import counterBar from '../components/CounterBar.tsx'

const MainContainer = props => {
  return(
    <div>
    <header/>
    <Metrics/>
    <NavBarContainer/>
    <counterBar/>
    </div>
  )
}



export default MainContainer;