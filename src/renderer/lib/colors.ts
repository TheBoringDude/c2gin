/* eslint-disable import/prefer-default-export */

type Colors =
  | 'default'
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'gray'
  | 'teal'
  | 'amber'
  | 'purple'
  | string;

type GroupColorProps = {
  [key in Colors]: GroupColorColorsProps;
};

type GroupColorColorsProps = {
  key: Colors;
  bg: string;
  border: string;
};

const GroupColors: GroupColorProps = {
  default: {
    key: 'default',
    bg: 'bg-white text-black',
    border: '',
  },
  red: {
    key: 'red',
    bg: 'bg-red-500 border-red-500 text-white',
    border: 'border-red-300',
  },
  blue: {
    key: 'blue',
    bg: 'bg-blue-500 border-blue-500 text-white',
    border: 'border-blue-300',
  },
  green: {
    key: 'green',
    bg: 'bg-green-500 border-green-500 text-white',
    border: 'border-green-300',
  },
  yellow: {
    key: 'yellow',
    bg: 'bg-yellow-500 border-yellow-500 text-white',
    border: 'border-yellow-300',
  },
  orange: {
    key: 'orange',
    bg: 'bg-orange-500 border-orange-500 text-white',
    border: 'border-orange-300',
  },
  gray: {
    key: 'gray',
    bg: 'bg-coolGray-500 border-coolGray-500 text-white',
    border: 'border-coolGray-300',
  },
  teal: {
    key: 'teal',
    bg: 'bg-teal-500 border-teal-500 text-white',
    border: 'border-teal-300',
  },
  amber: {
    key: 'amber',
    bg: 'bg-amber-500 border-amber-500 text-white',
    border: 'border-amber-300',
  },
  purple: {
    key: 'purple',
    bg: 'bg-purple-500 border-purple-500 text-white',
    border: 'border-purple-300',
  },
};

export { GroupColorColorsProps, GroupColorProps, Colors };
export default GroupColors;
