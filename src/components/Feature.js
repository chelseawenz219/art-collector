import React from 'react';
import { fetchQueryResultsFromTermAndValue } from '../api';

const Searchable = ({contentTitle, searchTerm, searchValue, setIsLoading, setSearchResults}) => {
  
    return (
        <div className="content">
            <p className="contentTitle">{contentTitle}:</p>
            <a href="#" onClick={async (event) => {
                setIsLoading(true);
                try {
                    const results = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue);
                    setSearchResults(results);
                } catch (error) {
                    console.error(error);
                }finally {
                    setIsLoading(false);
                }
            }}>{searchTerm}</a>
        </div>
    )
}

const Feature = ({featuredResult, setIsLoading, setSearchResults}) => {
    return (
        <main id='feature'>
            { 
                featuredResult?  <div className="object-feature">
                      <header>
                        <h3>({featuredResult.title})</h3>
                        <h4>({featuredResult.dated})</h4>
                      </header>
                      <section className="facts">
                       <Searchable contentTitle={"Culture"} searchTerm={featuredResult.culture} searchValue={featuredResult.culture} setIsLoading={setIsLoading} setSearchResults={setSearchResults}/>
                       <Searchable contentTitle={"Medium(s)"} searchTerm={featuredResult.medium} searchValue={featuredResult.medium.toLowerCase()} setIsLoading={setIsLoading} setSearchResults={setSearchResults}/>
            {
                        featuredResult.technique? <Searchable contentTitle={"Technique(s)"} searchTerm={featuredResult.technique} searchValue={featuredResult.technique} setIsLoading={setIsLoading} setSearchResults={setSearchResults}/> : null
            }           
                       
            {
                           featuredResult.people? featuredResult.people.forEach(person=>{
                           return <Searchable contentTitle={"People"} searchTerm={"people"} searchValue={person.displayname} setIsLoading={setIsLoading} setSearchResults={setSearchResults}/>
                           })
                           : null
            }
                           </section>
                     <section className="photos">
            {
                    featuredResult.images? featuredResult.images.map(image=>{
                        return <img src={image.baseimageurl} />
                    })
                    : null
            }       
                     </section>
                   </div>
                : null 
            }
        </main>
    )
}

export default Feature;