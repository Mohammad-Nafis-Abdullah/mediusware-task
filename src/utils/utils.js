

export const getNamefromPath = (path='') => {
  const pathArr = path.split('/');
  return pathArr[pathArr.length-1];
};
