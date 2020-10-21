import React from 'react';

import { fetchQueryResultsFromURL } from '../api';

const Preview = ({ searchResults , setIsLoading, setSearchResults, setFeaturedResult}) => {

  const { info, records } = searchResults;

  
  async function fetchPage(pageUrl) {
    setIsLoading(true);

    try {
      const results = await fetchQueryResultsFromURL(pageUrl);
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return <aside id="preview">
    <header className="pagination">
      <button 
        disabled={!info.prev} 
        className="previous"
        onClick={()=>{
          fetchPage(info.prev)
          }}>Previous</button>
      <button
        disabled={!info.next}
        className="next"
        onClick={()=>{
          fetchPage(info.next)
          }}>Next</button>
    </header>
    <section className="results">
      {
        records.map((result, index) =>{
          return <div  
            key={ index }
            className="object-preview"
            onClick={() => {
              setFeaturedResult(result)
            }}>
            { 
              result.primaryimageurl? <img src={ result.primaryimageurl } alt={ result.description } /> : null
            }
            {
              result.title? <h3>{ result.title }</h3> : <h3>MISSING INFO</h3>
            }
          </div>
        })
      }
    </section>
  </aside>
}

export default Preview;