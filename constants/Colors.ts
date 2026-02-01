const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const bristol = {
  bristol1: '#8B4513',
  bristol2: '#A0522D',
  bristol3: '#D2691E',
  bristol4: '#C8A951',
  bristol5: '#BDB76B',
  bristol6: '#DAA520',
  bristol7: '#CD853F',
} as const;

export default {
  light: {
    text: '#000',
    textSecondary: '#666',
    background: '#fff',
    card: '#f5f5f5',
    border: '#e0e0e0',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    ...bristol,
  },
  dark: {
    text: '#fff',
    textSecondary: '#aaa',
    background: '#000',
    card: '#1c1c1e',
    border: '#333',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    ...bristol,
  },
};
