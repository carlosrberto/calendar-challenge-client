# JavaScript Events Client

JavaScript client for iClinic Front-End Challenges.

This clients simulates **api calls**, and a every method returns a `Promise` that **resolves** or **reject** after some time.

## Get started

### Install
```
yarn add @iclinic/calendar-challenge-client
```

### How to use

```javascript
import events from '@iclinic/calendar-challenge-client';
```


#### `events.all()`

Returns a list with all events

```javascript
events.all().then(events => {
  console.log(events);
}).catch(error => {
  console.log(error);
});
```

#### `events.filter(<Function fn>)`

Returns a list with all events filtered by the provided function `fn`

```javascript
const fn = event => event.date === '10/05/2018';

events.filter(fn).then(events => {
  console.log(events);
}).catch(error => {
  console.log(error);
});
```

#### `events.get(<String id>)`

Return a specific event by id

```javascript
events.get('gh34g4').then(event => {
  console.log(event);
}).catch(error => {
  console.log(error);
});
```

#### `events.create(<Object payload>)`

Create a new event with the provided payload

```javascript
const payload = {
  title: 'Task 1',
  date: '10/05/2020',
  start_time: '10:00',
  end_time: '10:30',
};

events.create(payload).then(event => {
  console.log(event);
}).catch(error => {
  console.log(error);
});
```

#### `events.update(<Object payload>)`

Update a event, **id** is **required**

```javascript
const payload = {
  id: 'gh34g4',
  title: 'Task 1',
};

events.update(payload).then(event => {
  console.log(event);
}).catch(error => {
  console.log(error);
});
```

#### `events.remove(<String id>)`

Delete a event

```javascript
events.remove('gh34g4').then(event => {
  console.log(event);
}).catch(error => {
  console.log(error);
});
```
