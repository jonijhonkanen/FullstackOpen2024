const Person = ({ name, number, handleNameDelete }) => {
  return (
    <div>
      <p>
        {name} {number} <button onClick={handleNameDelete}>delete</button>
      </p>
    </div>
  );
};

export default Person;
/**
 *
 * <p>
        {name} {number}
        <button onClick={handleNameDelete}>delete</button>
      </p>
 *
 */
