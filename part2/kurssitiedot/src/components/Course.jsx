import Header from './Header';
import Content from './Content';
//import Total from './Total';

const Course = ({ title, course }) => {
  //console.log();

  return (
    <div>
      <Header name={title} />
      <Content courses={course} />
    </div>
  );
};

export default Course;
