import React, { useEffect, useState } from 'react';

import { 
  fetchAllCenturies,
  fetchAllClassifications,
  fetchQueryResults
} from '../api';

const Search = ({setIsLoading, setSearchResults}) => {

   const [centuryList, setCenturyList] = useState([]);
   const [classificationList, setClassificationList] = useState([]);
   const [queryString, setQueryString] = useState('');
   const [century, setCentury] = useState('any');
   const [classification, setClassification] = useState('any');

  useEffect( () => {
    const centuriesPromise = fetchAllCenturies()
    const classificationsPromise = fetchAllClassifications()

    Promise.all([centuriesPromise, classificationsPromise])
                .then(([centuries, classifications])=>{
                  console.log("response", centuries, classifications);
                  setCenturyList(centuries.map(century =>{
                    return century.name;
                  }))
                  setClassificationList(classifications.map(classif =>{
                    return classif.name;
                  }));
                })
                .catch(console.error)

                console.log("centuries", centuryList);
                console.log("classifications", classificationList);
  }, []);

  function onTextChange(event){
    setQueryString(event.target.value);
  }
  function onClassifChange(event){
    setClassification(event.target.value);
  }
  function onCenturyChange(event){
    setCentury(event.target.value);
  }

  return ( <form id="search" onSubmit={async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const results = await fetchQueryResults({century, classification, queryString});
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }}>
    <fieldset>
      <label htmlFor="keywords">Query</label>
      <input 
        id="keywords" 
        type="text" 
        placeholder="enter keywords..." 
        value={queryString} 
        onChange={onTextChange}/>
    </fieldset>
    <fieldset>
      <label htmlFor="select-classification">Classification <span className="classification-count">({ classificationList.length })</span></label>
      <select 
        name="classification"
        id="select-classification"
        value={classification} 
        onChange={onClassifChange}>
        <option value="any">Any</option>
        {classificationList.map((cl, index )=>{
          return <option key={index}>{cl}</option>
        })}
      </select>
    </fieldset>
    <fieldset>
      <label htmlFor="select-century">Century <span className="century-count">({ centuryList.length })</span></label>
      <select 
        name="century" 
        id="select-century"
        value={century} 
        onChange={onCenturyChange}>
        <option value="any">Any</option>
        {centuryList.map((century, index)=>{
          return <option value={index}>{century}</option>
        })}
      </select>
     </fieldset>
    <button>SEARCH</button>
  </form>
  )}

export default Search;