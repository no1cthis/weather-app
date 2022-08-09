
import Cities from '../cities/Cities'
import Input from '../UI/input/Input'
import LocalDate from '../UI/localDate/LocalDate'
import InfoNow from '../infoNow/InfoNow'
import { useGetCityByLocation } from '../../hooks/useGeoLocation'


import cl from './app.module.scss'



function App() {

  useGetCityByLocation()

 

  return (
    <div className={cl.bg}>
        <div className={cl.container}>
            <Cities/>
            <Input placeholder={'Enter location'}/>
            <LocalDate/>
            <InfoNow/>
        </div>
    </div>
  );
}


export default App;
