import {useEffect, useState} from 'react';

const parseJSON = (resp) => (resp.json? resp.json():resp);
const checkStatus = (resp) => {
  if(resp.status >= 200 && resp.status <300){
    return resp;
  }

  return parseJSON(resp).then(resp=> {
    throw resp;
  });
};

const headers = {'Content-type':'application/json'};


function App() {
    const [error, setError] = useState(null);
    const [restaurants, setRestaurants] = useState([]);

    useEffect(()=>{
      fetch('http://locallhost:1337/api/restaurants', {headers,method:'GET'})
      .then(checkStatus).then(parseJSON).then(({data}) => setRestaurants(data)).catch((error)=>setError(error))
    }, [])

    if(error) {
      return(
        <div>An error occured: {error.message}</div>
      );
    }

    return(
      <div className='App'>
        <ul>
          {restaurants.map(({id, name}) => <li key={id}>{name}</li>)}
        </ul>
      </div>
    )
}

export default App;
