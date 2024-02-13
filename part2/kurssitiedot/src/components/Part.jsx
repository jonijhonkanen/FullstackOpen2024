import Total from './Total';

const Part = ({ name, exercises }) => {
  //console.log('Part exercises', exercises);

  return (
    <div>
      <h2>{name}</h2>
      {exercises.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
      <Total exercises={exercises} />
    </div>
  );
};

export default Part;
