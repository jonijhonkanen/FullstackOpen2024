import { useState, useEffect } from 'react';
import numberService from './services/numberService';

import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);

  //Hooks
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const getData = () => {
    numberService
      .getAll()
      .then((initialNumbers) => {
        //console.log('promise fulfilled');
        setPersons(initialNumbers);
      })
      .catch((error) => {
        console.log('Error while loading initial data!');
        console.log(error);
        renderMessage({
          message: 'Error while loading initial data!',
          type: 'error',
        });
      });
  };

  useEffect(() => {
    //console.log('effect');
    getData();
  });

  //Handle input field
  const handleNameChange = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  };

  //Add new name to name list
  const addName = (event) => {
    event.preventDefault();

    //Create new object
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    //Adding a new name
    if (!persons.some((item) => item.name === newName)) {
      numberService
        .create(nameObject)
        .then((data) => {
          //console.log('Response from server', data);
          setPersons(persons.concat(data));
        })
        .then(() => {
          renderMessage({ message: `Added ${newName}`, type: 'success' });
          setNewName('');
          setNewNumber('');
        })
        .catch((error) => {
          renderMessage({
            message: 'Error while adding new number!',
            type: 'error',
          });
          console.log(error);
          setNewName('');
          setNewNumber('');
        });
    } else {
      //Ask confirmation for number change
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        //Update existing number
        numberService
          .update(persons.find((item) => item.name === newName).id, nameObject)
          .then((data) => {
            //Update message
            //console.log(data);
            //Update object's number (is the object's id match with the response id? if so, update object's number)
            //Set updated array for persons
            setPersons(
              persons.map((item) =>
                item.id !== data.id ? item : { ...item, number: newNumber }
              )
            );
            renderMessage({
              message: `Updated ${data.name}'s phone number!`,
              type: 'success',
            });
            setNewName('');
            setNewNumber('');
          })
          .catch(() => {
            renderMessage({
              message: `${newName}'s information was already removed from the server!`,
              type: 'error',
            });

            //Filter nonexistent item out
            setPersons(
              persons.filter(
                (item) =>
                  item.id !== persons.find((item) => item.name === newName).id
              )
            );
            setNewName('');
            setNewNumber('');
          });
      }
    }
  };

  const handleNumberChange = (event) => {
    //console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const handleNameDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      //window.open('exit.html', 'Thanks for Visiting!');
      numberService
        .remove(id)
        .then(() => {
          //Change error message
          //Form new array without the item with deleted id
          const deleteArray = persons.toSpliced(persons.indexOf(id), 1);
          //console.log(deleteArray);
          setPersons(deleteArray);
        })
        .then(() => {
          renderMessage({
            message: `${name}'s number removed!`,
            type: 'success',
          });
        })
        .catch((error) => {
          console.log(error);
          renderMessage({
            message: 'Error while deleting number!',
            type: 'error',
          });
        });
    }
  };

  //Conditional rendering
  const personsToShow =
    newFilter.length > 0
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(newFilter.toLowerCase())
        )
      : persons;

  //Message handling
  const renderMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  //Rendering
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        personsToShow={personsToShow}
        handleNameDelete={handleNameDelete}
      />
    </div>
  );
};

export default App;
