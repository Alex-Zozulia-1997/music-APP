export interface Song {
  id: number;
  name: string;
  artist: string;
  cover: string;
  duration?: string;
}

// export interface Song extends ApiSong {
//   isFavorite: boolean;
//   isCurrent: boolean;
// }
