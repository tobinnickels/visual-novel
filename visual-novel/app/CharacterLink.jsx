import Link from 'next/link';
import style from './CharacterLink.module.css'
import Image from 'next/image';

export default function CharacterLink({character,index}){
    const img_path = (character.unlocked)? `/${character.name}/${character.name}.png` : "/locked.png";
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
                    <Image  className={style.characterImage} src={img_path} width={100} height={100}/>
                </Link>
            </div>
        </li>

        // If the character is not return the locked image
        :<li key={index}>
            <div className={style.characterLink}>
                <Image className={style.characterImage} src={img_path} width={100} height={100}/>
            </div>
        </li>
    );
}