import Link from 'next/link';
import style from './CharacterLink.module.css'

export default function CharacterLink({character,index}){
    const img_path = (character.unlocked)? `${character.name}/${character.name}.png` : "locked.png";
    return(
        // Check if character is unlocked
        (character.unlocked)?
        <li key={index}>
            <div className={style.characterLink}>
                <Link 
                    href={{
                        pathname:"/Story", 
                        query:{
                            name: character.name,
                            currentPage: character.currentPage,
                            index: index
                        }
                    }}
                >
                    <img  className={style.characterImage} src={img_path}></img>
                </Link>
            </div>
        </li>

        // If the character is not return the locked image
        :<li key={index}>
            <div className={style.characterLink}>
                <img className={style.characterImage} src={img_path}></img>
            </div>
        </li>
    );
}