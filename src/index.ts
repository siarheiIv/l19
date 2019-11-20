import axios from 'axios';

import slider from './slider';

const a = 10;

const c = a + 20;
console.log(c)

type User = {
  id?: number, // условное, те оно может быть, а может отсутствовать
  email: string,
  username: string,
  phone: string
}

const apiUrl = 'https://jsonplaceholder.typicode.com';
const bodyForUsers: HTMLElement | null = document.querySelector('.users');
const form: HTMLFormElement = document.querySelector('.form') || document.createElement('form');
let users: User[] = [];

async function getUsers() {
  // чтобы получить юзеров, делаем GET запрос по адресу: ${apiUrl}/users
  const { data: users } = await axios(`${apiUrl}/users`);

  // вернуть массив пользователей
  return users;
}

async function deleteUser(userId: number) {
  // DELETE: ${apiUrl}/users/${userId}
  await axios.delete(`${apiUrl}/users/${userId}`);

  // из users удалить объект с id === userId
  users = users.filter(user => user.id !== userId);

  // const foundedIndex = users.findIndex((user) => user.id === userId);
  // users.splice(foundedIndex, 1);

  renderUsers(users);
}

async function saveUser(user: User) {
  // по апи POST: apiUrl/users

  // const response = await axios.post(`${apiUrl}/users`, user);
  // const newUser = response.data;
  // или
  const { data: newUser } = await axios.post(`${apiUrl}/users`, user);

  users.push(newUser);

  renderUsers(users);
}

async function editUser(id: number, user: User) {
  // PUT - полное обновление
  // PATCH - частичное обновление

  // PATCH: ${apiUrl}/users/${userId}
  const { data: updatedUser } = await axios.patch(`${apiUrl}/users/${id}`, user);

  users = users.map(user => {
    if (user.id !== id) {
      return user;
    }

    // код достигнут если user.id === id
    return updatedUser;
  });

  renderUsers(users);
}


async function initApp() {
  // получить пользователей и отправить их на отрисовку

  users = await getUsers();

  renderUsers(users);
}

function renderUsers(users: User[]) {
  if (bodyForUsers) {
    bodyForUsers.innerHTML = '';
  }

  users.forEach(user => {
    const createdMarkup = createUser(user, deleteUser);
      bodyForUsers && bodyForUsers.appendChild(createdMarkup);
  });

  // или
  // const markups = users.map(user => createUser(user, deleteUser));
  // bodyForUsers.append(...markups);
}

function createUser(user: User, handleClick: any) {
  const { id, email, username, phone } = user;

  const li = document.createElement('li');
  li.textContent = `${email} (${username}): ${phone}`;

  const btnForEdit = document.createElement('button');
  btnForEdit.textContent = 'Редактировать';
  btnForEdit.onclick = () => fillForm(user);
  li.appendChild(btnForEdit);
  
  const btnForDelete = document.createElement('button');
  btnForDelete.textContent = 'Удалить';
  btnForDelete.onclick = () => handleClick(id);
  li.appendChild(btnForDelete);

  return li;
}

form.onsubmit = function (e: Event) {
  e.preventDefault();

  const { type } = form.dataset;
  const id = Number(form.dataset.id);

  const emailField: HTMLInputElement | null = form.querySelector('[name="email"]');
  const usernameField: HTMLInputElement | null = form.querySelector('[name="nick"]');
  const phoneField: HTMLInputElement | null = form.querySelector('[name="phone"]');
  
  const email = emailField && emailField.value || '';
  const username = usernameField && usernameField.value || '';
  const phone = phoneField && phoneField.value || '';

  const user = { email, username, phone };

  form.reset();

  if (type && id) {
    editUser(id, user);
  } else {
    saveUser(user);
  }
  
  form.dataset.type = '';
  form.dataset.id = '';
};

function fillForm(user: User) {
  const { username, email, phone } = user;

  const emailField: HTMLInputElement | null = form.querySelector('[name="email"]');
  const usernameField: HTMLInputElement | null = form.querySelector('[name="nick"]');
  const phoneField: HTMLInputElement | null = form.querySelector('[name="phone"]');

  if (emailField) {
    emailField.value = email;
  }
  if (usernameField) {
    usernameField.value = username;
  }
  if (phoneField) {
    phoneField.value = phone;
  }

  form.dataset.type = 'edit';
  form.dataset.id = String(user.id);
}

initApp();

/*
type Student = { name: string, course: number }
// interface Student {
//   name: string,
//   course: number
// }

const num: number = 5;
const str: string = 'строка';
const bool: boolean = true;
const student: Student = { name: 'Женя', course: 2 };

const numbers: number[] = [2, 4, 6, 8, 10];
const strings: string[] = ['a', 'b', 'c'];
const students: Student[] = [{ name: 'Женя', course: 2 }, { name: 'Таня', course: 3 }]
*/

function summa(a: number, b: number) : number {
  return a + b;
}

summa(2, 4);
summa(2, 4);

// const sum = (a: number, b: number) : number => a + b;


// var a = 5;
// var b = 10;

// if (a > 2 && b > 8) {}

// &&
// ||


const user = {};

// const n = user.name ? user.name : '';
// const name = user.name || '';


// const div = document.querySelector('div') || document.createElement('div');


// if (summa) {
//   summa();
// }

// summa && summa();