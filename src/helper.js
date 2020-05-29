var genNumArray = ( size ) => {
  return Array.from({ length: size }, (v, k) => k + 1);
};

var months = ["jan", "fev", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

export { genNumArray, months };
