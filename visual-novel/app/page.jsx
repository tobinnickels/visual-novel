"use client";
import CharacterLink from './CharacterLink.jsx';
import Character from './Character.js';
import Cookies from 'universal-cookie';
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, Suspense } from 'react';
import style from "./Home.module.css"

/**
 * 
 * @returns 
 *  Component 
 */
export default function Home() {
  
  const cookies = new Cookies(null, { path: '/' });
  const [characters, setCharacters] = useState([]);

  useEffect(() => {    
    fetch(`./DefaultCharacters.json`).then(response => response.json()).then(defaults => {
      if(cookies.get('visual-novel-characters') === undefined){
        cookies.set('visual-novel-characters',JSON.stringify(defaults),{path: '/',expires:new Date("07/2/2025"),sameSite:true});
      } else{
        setCharacters(() =>{
          const updatedCharacters = updateCharacters(cookies.get('visual-novel-characters'),defaults);
          cookies.set('visual-novel-characters',JSON.stringify(updatedCharacters),{path: '/',expires:new Date("07/2/2025"),sameSite:true});
          return updatedCharacters;
        });
      }
    });   
  },[]);

  let i = 0;
  const characterLinks = characters.map((c)=><CharacterLink key={i} character={c} index={i++}/>);
  
  return (<>
      <h1>Select Character</h1>
      {characters.length > 0 && (<ul className={style.characterList}>{characterLinks}</ul>)}
  </>);
}

function updateCharacters(local_characters,defaults){
  const updatedCharacters = [...local_characters];
  for (let index = 0; index < updatedCharacters.length; index++) {
    updatedCharacters[index].maxPage = defaults[index].maxPage;
  }
  if(updatedCharacters.length < defaults.length){
    for (let index = updatedCharacters.length; index < defaults.length; index++) {
      updatedCharacters.push(defaults[index]);
    }
  }
  return updatedCharacters;
};