import Person from './Person';

const Persons = ({ personsToShow, handleNameDelete }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          handleNameDelete={() => handleNameDelete(person.id, person.name)}
        />
      ))}
    </div>
  );
};

export default Persons;
/**
 *
 * {personsToShow.map((person) => (
            <Person key={person.name} name={person.name} number={person.number}/>)


            key={person.name}
          name={person.name}
          number={person.number}
          handleNameDelete={() => handleNameDelete(person.id, person.name)}
 */
