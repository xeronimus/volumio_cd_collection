/**
 *
 */

const favorites = [
  'albums://Celine%20Dion/D\'elles',
  'albums://Dire%20Straits/Brothers%20In%20Arms',
  'albums://Eros%20Ramazzotti/Ali%20e%20Radici',
  'albums://Eros%20Ramazzotti/Slow',
  'albums://James%20Blunt/Back%20to%20Bedlam',
  'albums://Madonna/True%20Blue',
  'albums://Melanie%20C/Beautiful%20Intentions',
  'albums://Robbie%20Williams/Intensive%20Care',
  'albums://Johnny%20Cash/Country%20Boy',
  'albums://Johnny%20Cash%20%26%20June%20Carter%20Cash/Duets',
  'albums://Mark%20Knopfler%20And%20Emmylou%20Harris/All%20The%20Roadrunning'
];

export default function filterForFavorites(volumioAlbumList) {
  return volumioAlbumList.filter((album) => favorites.includes(album.uri));
}
