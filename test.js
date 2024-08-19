const timeInterval = [0, 6, 18];

const getCloseIntervalIndex = function (time, intervalArray) {
  let index = 0;

  const hour = +time.split(":")[0];

  console.log("h:", hour);

  //02:23 [0,6,18]                       0<2 && 6>2

  index = intervalArray.find((interval, index, array) => {
    console.log("last:", array.length === index + 1 ? 24 : index + 1);

    if (array.length === index + 1) {
      //last index
      return index;
    }

    return interval <= hour && array[index + 1] > hour;
  });

  return index.toString().padStart(2, '0') + ":00";
};

// const timeIntervalInder = getCloseIntervalIndex("02:24", timeInterval);
const timeIntervalInder = getCloseIntervalIndex("5:24", timeInterval);

console.log("output:", timeIntervalInder, timeInterval.length);
