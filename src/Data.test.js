import propertiesData from './data/properties.json';

// Test 1: Does the data file load correctly?
test('properties data should load', () => {
  expect(propertiesData).toBeDefined();
});

// Test 2: Do we have exactly 7 properties?
test('should have 7 properties', () => {
  expect(propertiesData.properties.length).toBe(7);
});

// Test 3: Does the first property have all the required fields?
test('first property should have id, price, and location', () => {
  const firstProp = propertiesData.properties[0];
  expect(firstProp).toHaveProperty('id');
  expect(firstProp).toHaveProperty('price');
  expect(firstProp).toHaveProperty('location');
});

// Test 4: Is the first property located in the right place?
test('first property should be in Petts Wood', () => {
  const firstProp = propertiesData.properties[0];
  // Checks if the text "Petts Wood" is inside the location string
  expect(firstProp.location).toContain('Petts Wood');
});

// Test 5: Does every single property have a postcode? (Crucial for search)
test('all properties must have a postcode', () => {
  // Loops through all properties to check for 'postcode'
  const allHavePostcode = propertiesData.properties.every(p => p.postcode);
  expect(allHavePostcode).toBe(true);
});