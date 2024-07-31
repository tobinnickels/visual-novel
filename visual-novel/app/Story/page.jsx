"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from "next/navigation";
import Link from 'next/link';
import style from "./MainContent.module.css"
import Cookies from 'universal-cookie';

function MainContent() {
  // Get values from query
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const index = searchParams.get("index");
  const cookies = new Cookies(null, { path: '/' });
  const [characters, setCharacters] = useState(cookies.get('visual-novel-characters'));
  const [page, setPage] = useState(Number(searchParams.get("currentPage")));
  // Read json file including images and text for current character
  const [images, setImages] = useState([]);
  const [texts, setTexts] = useState([]);
    // Switch to next page on click

  useEffect(() => {
    fetch(`/${name}/story.json`).then(response => response.json()).then(data => {
      const imageData = data.map((d) => d[0]);
      const textData = data.map((d) => d[1]);
      setImages(imageData);
      setTexts(textData)
    });
  }, []);

  const handleClick = () => {
    if(page < images.length - 1){
      setPage(page + 1);
      setCharacters(()=>{
        const updatedCharacters = characters.map((character)=>{
        if(name === character.name){
          return{...character, currentPage:page+1}
        } else if (character.name === "CharacterTwo" && name ==="CharacterOne" && characters[index].maxPage === page+1){
          return{...character,unlocked:true};
        } else{
          return {...character}
        }
      });
      cookies.set('visual-novel-characters',JSON.stringify(updatedCharacters),{path: '/',expires:new Date("07/2/2025"),sameSite:true})
      return updatedCharacters;
    });
    }
  };
  return (
    <>
      <div className={style.backButton}>
        <Link 
            href={{
                pathname:"/", 
                query:{
                  currentPage: page,
                  index: index
                }
            }}
        >
          <img src={"/back.webp"} className={style.backButtonImage}></img>
        </Link>
      </div>

      <div onClick={handleClick} className={style.MainContent}>
        {images.length > 0 && (
              <div 
                style={{
                  backgroundImage:`url(./${name}/${images[page]})`,  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  width: '100%',
                  height: '100%',
                  display: 'grid',
                  gridTemplateRows:'65% 5% 30%'
                }}  
                alt="Current Image">
                  <div></div>
                    <div style={{
                    backgroundImage:`url(./name_plate.png)`,  backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: 'fit-content',
                    height: 'auto',
                    paddingLeft: '1%',
                    paddingRight: '1%'
                  }}  >
                  <div className={style.textOverImage}>
                    <img src='leaf_1.png'></img>{name}<img src='leaf_2.png'></img>
                    </div>
                  </div>
                  <div className={style.bottomContainer}>
                    <div className={style.textBox}>{texts[page]}</div>                      
                    <div style={{    
                            width: "60vw",
                            height: "25vh",
                            backgroundImage: "url(border.png)",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            position: "absolute",
                            top: "0",
                            left: "0"
                      }}>
                    </div>
              </div>
        </div>
        )}
      </div>
    </>);
}

export default function wrapper(){
  return(
    <Suspense>
      <MainContent/>
    </Suspense>
  )
}