// src/data/index.js

import lessonsCantalo from './lessons_Cántalo.json';
import lessonsVivirMiVida from './lessons_Vivir Mi Vida.json';
import lessonsTeQueroPaMi from './lessons_Te Quiero Pa Mi.json';
import lessonsChicleteComBanana from './lessons_Chiclete com Banana.json';
import lessonsDonaMaria from './lessons_Dona Maria.json';
import lessonsJaSeiNamorar from './lessons_Já Sei Namorar.json';
import lessonsLoveIsNotOver from './lessons_Love is Not Over.json';
import lessonsHurt from './lessons_Hurt.json';
import lessonsJeVeux from './lessons_Je Veux.json';
import lessonsPapaoutai from './lessons_Papaoutai.json';
import lessonsSeoul from './lessons_Seoul.json';
import lessonsLesChampsElysees from './lessons_Les Champs-Élysées.json';
import lessonsGhareebAlay from './lessons_Ghareeb Alay.json';
import lessonsYaTabtab from './lessons_Ya Tabtab.json';
import lessonsOuda from './lessons_Ouda.json';
// Import additional lessons JSON files here as needed
// Example:
// import lessonsAnotherSong from './lessons_Another Song.json';

const lessonsData = {
  "Cántalo": lessonsCantalo["Cántalo"],
  "Vivir Mi Vida": lessonsVivirMiVida["Vivir Mi Vida"],
  "Te Quiero Pa Mi": lessonsTeQueroPaMi["Te Quiero Pa Mi"],
  "Chiclete com Banana": lessonsChicleteComBanana["Chiclete com Banana"],
  "Dona Maria": lessonsDonaMaria["Dona Maria"],
  "Já Sei Namorar": lessonsJaSeiNamorar["Já Sei Namorar"],
  "Love is Not Over": lessonsLoveIsNotOver["Love is Not Over"],
  "Hurt": lessonsHurt["Hurt"],
  "Je Veux": lessonsJeVeux["Je Veux"],
  "Papaoutai": lessonsPapaoutai["Papaoutai"],
  "Seoul": lessonsSeoul["Seoul"],
  "Les Champs-Élysées": lessonsLesChampsElysees["Les Champs-Élysées"],
  "Ghareeb Alay": lessonsGhareebAlay["Ghareeb Alay"],
  "Ya Tabtab": lessonsYaTabtab["Ya Tabtab"],
  "Ouda": lessonsOuda["Ouda"],
  // Add more mappings here as you add more songs
  // "Another Song": lessonsAnotherSong["Another Song"],
};

export default lessonsData;
