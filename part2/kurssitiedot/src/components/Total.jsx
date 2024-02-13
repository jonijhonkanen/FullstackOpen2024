const Total = ({ exercises }) => {
  const total = exercises.reduce((previous, currentValue) => {
    //console.log('Reducing', previous, currentValue.exercises);
    return previous + currentValue.exercises;
  }, 0);

  return <h4>Total of {total} exercises.</h4>;
};

export default Total;
