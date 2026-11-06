export type GameMode = 'solo' | 'team';

export type CharacterType = 'sheep' | 'goat' | 'cow' | 'camel' | 'shepherd';

export interface CharacterConfig {
  id: CharacterType;
  name: string;
  defaultCustomName: string;
  title: string;
  animalType: string;
  description: string;
  avatarSvg: string;
  specialTrait: string;
  jumpForce: number;
  speed: number;
  themeColor: string;
  accentColor: string;
}

export interface PlayerProfile {
  name: string;
  characterId: CharacterType;
  customCharacterName: string;
  accessoryColor: string;
  avatarEmoji?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  characterId: CharacterType;
  customCharacterName: string;
  accessoryColor: string;
  questionsAnswered: number;
  correctAnswers: number;
  pointsContributed: number;
}

export interface Question {
  id: number;
  category: 'qurban' | 'aqiqah' | 'perbandingan' | 'syarat_hewan' | 'tata_cara' | 'hikmah';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  quranHadithReference?: string;
  difficulty: 'mudah' | 'sedang' | 'sulit';
}

export interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'fence' | 'rock' | 'low_branch' | 'mud' | 'canyon';
  passed: boolean;
}

export interface Collectible {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'grass' | 'star' | 'water';
  value: number;
  collected: boolean;
}

export interface Gate {
  x: number;
  y: number;
  width: number;
  height: number;
  gateNumber: number;
  name: string;
  passed: boolean;
  question: Question;
}

export interface HighScoreEntry {
  id: string;
  mode: GameMode;
  playerNameOrTeam: string;
  members?: string[];
  characterName: string;
  score: number;
  correctCount: number;
  wrongCount: number;
  date: string;
  grade: string;
}
