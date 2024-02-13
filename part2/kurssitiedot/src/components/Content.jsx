import Part from './Part';
//import Total from './Total';

const Content = ({ courses }) => {
  return (
    <div>
      {courses.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.parts} />
      ))}
    </div>
  );
};

export default Content;
