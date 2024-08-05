const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the schema and model
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

// Create and save a new person
const createPerson = async () => {
  const person = new Person({
    name: 'John Doe',
    age: 30,
    favoriteFoods: ['Pizza', 'Pasta']
  });

  try {
    const savedPerson = await person.save();
    console.log('Person saved:', savedPerson);
  } catch (err) {
    console.error('Error saving person:', err);
  }
};

// Create multiple people
const createMultiplePeople = async () => {
  const arrayOfPeople = [
    { name: 'Jane Doe', age: 25, favoriteFoods: ['Sushi'] },
    { name: 'Mary Johnson', age: 28, favoriteFoods: ['Tacos'] }
  ];

  try {
    const savedPeople = await Person.create(arrayOfPeople);
    console.log('Multiple people saved:', savedPeople);
  } catch (err) {
    console.error('Error creating multiple people:', err);
  }
};

// Find people by name
const findPeopleByName = async (name) => {
  try {
    const people = await Person.find({ name });
    console.log('People found by name:', people);
  } catch (err) {
    console.error('Error finding people by name:', err);
  }
};

// Find one person by food
const findPersonByFood = async (food) => {
  try {
    const person = await Person.findOne({ favoriteFoods: food });
    console.log('Person found by food:', person);
  } catch (err) {
    console.error('Error finding person by food:', err);
  }
};

// Find a person by ID
const findPersonById = async (id) => {
  try {
    const person = await Person.findById(id);
    console.log('Person found by ID:', person);
  } catch (err) {
    console.error('Error finding person by ID:', err);
  }
};

// Update a person by ID
const updatePersonById = async (id) => {
  try {
    const person = await Person.findById(id);
    person.favoriteFoods.push('Hamburger');
    const updatedPerson = await person.save();
    console.log('Updated person:', updatedPerson);
  } catch (err) {
    console.error('Error updating person by ID:', err);
  }
};

// Update a person by name
const updatePersonByName = async (name) => {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name },
      { $set: { age: 20 } },
      { new: true }
    );
    console.log('Updated person with findOneAndUpdate:', updatedPerson);
  } catch (err) {
    console.error('Error updating person by name:', err);
  }
};

// Delete a person by ID
const deletePersonById = async (id) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(id);
    console.log('Deleted person:', deletedPerson);
  } catch (err) {
    console.error('Error deleting person by ID:', err);
  }
};

// Remove people by name
const removePeopleByName = async (name) => {
  try {
    const result = await Person.remove({ name });
    console.log('Delete result:', result);
  } catch (err) {
    console.error('Error removing people by name:', err);
  }
};

// Find and sort people who like a specific food
const findAndSortPeople = async (food) => {
  try {
    const people = await Person.find({ favoriteFoods: food })
      .sort({ name: 1 })
      .limit(2)
      .select('-age')
      .exec();
    console.log('Filtered and sorted people:', people);
  } catch (err) {
    console.error('Error finding and sorting people:', err);
  }
};

// Example usage
const run = async () => {
  await createPerson();
  await createMultiplePeople();
  await findPeopleByName('John Doe');
  await findPersonByFood('Pizza');
  const personId = 'your_person_id_here'; // Replace with a valid ID
  await findPersonById(personId);
  await updatePersonById(personId);
  await updatePersonByName('John Doe');
  await deletePersonById(personId);
  await removePeopleByName('Mary Johnson');
  await findAndSortPeople('Burritos');
};

run();
