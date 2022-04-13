const ColorCode = code => {
  switch (code) {
    case 'blue0':
      return '#4065F6';
    case 'blue1':
      return '#00B9FF';
    case 'purple':
      return '#485CC7';
    case 'amber':
      return '#FFB619';
    case 'red':
      return '#C95C54';
    case 'white':
      return '#DEDEDE';

    case 'dark0':
      return '#17171E';
    case 'dark1':
      return '#17171D';
    case 'dark2':
      return '#1A1920';
    case 'dark3':
      return '#7a7f81';

    case 'grey0':
      return '#262833';
    case 'grey1':
      return '#2C2C38';
    case 'grey2':
      return '#444658';
    case 'grey3':
      return '#80849E';
    case 'grey4':
      return '#9094AE';
    case 'grey5':
      return '#A0A4BF';

    case 'navy':
      return '#37517e';
    case 'navy-mid':
      return '#2e4369';
    case 'navy-dark':
      return '#253655';

    default:
      return 'pink';
  }
};

export default ColorCode;
