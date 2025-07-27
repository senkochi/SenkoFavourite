import React from 'react'
import CharacterCard from "../components/CharacterCard";
import { Link } from "react-router-dom";

const CharacterDisplay = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto font-sans text-gray-800 mt-13">
        <h1 className='heading'>Characters</h1>
    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none fandom-content-wrapper">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 ">
            <Link to={`/characters/Senko`}>
                <CharacterCard title="Senko" brief="Senko (仙せん狐こ Senko) is the deuteragonist of Sewayaki Kitsune no Senko-san. Senko is a demigod fox who came from Kitsune heaven. Despite looking like a child, her age is over 800 years." imgurl={`/images/char-Senko.png`} />
            </Link>
             <Link to={`/characters/Kuroto_Nakano`}>
                <CharacterCard title="Kuroto Nakano" brief="Kuroto Nakano (中野なかの 玄人くろと Nakano Kuroto) is the protagonist of Sewayaki Kitsune no Senko-san series." imgurl={`/images/char-Kuroto.png`} />
            </Link>
             <Link to={`/characters/Shiro`}>
                <CharacterCard title="Shiro" brief="Shiro (シロ Shiro) is a supporting character of Sewayaki Kitsune no Senko-san series." imgurl={`/images/char-Shiro.png`} />
            </Link>
             <Link to={`/characters/Yasuko_Kōenji`}>
                <CharacterCard title="Yasuko Kōenji" brief="Yasuko Koenji (高こう円えん寺じ 安やす子こ Kōenji Yasuko) is the resident of the neighboring house to the Kuroto residence." imgurl={`/images/char-Koenji.png`} />
            </Link>
             <Link to={`/characters/Yozora`}>
                <CharacterCard title="Yozora" brief="Yozora (夜よ空ぞら Yozora) is a character in Sewayaki Kitsune no Senko-san." imgurl={`/images/char-Yozora.png`} />
            </Link>
                  </div>
    </div>
    </div>
  )
}

export default CharacterDisplay