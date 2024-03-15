function divideOnTwoGroups(array) {
  array.sort((a, b) => a - b);

  let firstGroupSum = 0;
  let secondGroupSum = 0;


  let firstGroup = [];
  let secondGroup = [];

  for (let i = array.length - 1; i >= 0; i--) {
    if (firstGroupSum <= secondGroupSum) {
      firstGroup.push(array[i]);
      firstGroupSum += array[i];
    } else {
      secondGroup.push(array[i]);
      secondGroupSum += array[i];
    }
  }

  return { firstGroup, secondGroup };
}

const weights = [70, 60, 55, 80, 45, 75];
const groups = divideOnTwoGroups(weights);
console.log(groups);
