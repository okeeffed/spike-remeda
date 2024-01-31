import * as R from "remeda";

interface User {
  givenName: string;
  familyName: string;
  id: number;
}

interface UserWithEmail extends User {
  email: string;
}

interface Subscriber extends UserWithEmail {
  subscribed: boolean;
}

interface Audience {
  name: string;
  id: number;
  subscribers: Subscriber[];
}

interface Organization {
  name: string;
  id: number;
  audiences: Audience[];
}

const subscribers: Subscriber[] = [
  {
    givenName: "John",
    familyName: "Doe",
    id: 1,
    email: "hello@test.com",
    subscribed: true,
  },
  {
    givenName: "Jane",
    familyName: "Doe",
    id: 2,
    email: "hello2@test.com",
    subscribed: false,
  },
  {
    givenName: "John",
    familyName: "Doe",
    id: 3,
    email: "hello3@test.com",
    subscribed: true,
  },
];

const audiences: Audience[] = [
  {
    name: "Audience 1",
    id: 1,
    subscribers: [subscribers[0], subscribers[1], subscribers[2]],
  },
  {
    name: "Audience 2",
    id: 2,
    subscribers: [subscribers[2]],
  },
];

const organizations: Organization[] = [
  {
    name: "Test Organization",
    id: 1,
    audiences: audiences,
  },
];

function createUser(): User {
  return {
    givenName: "John",
    familyName: "Doe",
    id: 1,
  };
}

function addEmail<T extends User>(user: T): UserWithEmail {
  return {
    ...user,
    email: "test@test.com",
  };
}

function getUserEmail<T extends UserWithEmail>(user: T): string {
  return user.email;
}

function getEmailPrefix(email: string): string {
  return email.split("@")[0];
}

function uppercaseLastLetter(str: string): string {
  return str.slice(0, -1) + str.slice(-1).toUpperCase();
}

function uppercaseFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function main() {
  const orgSubscriberEmailsWithoutSuffix = R.map(
    organizations,
    R.createPipe(
      R.prop("audiences"),
      R.map(
        R.createPipe(
          R.prop("subscribers"),
          R.filter(R.prop("subscribed")),
          R.map(
            R.createPipe(
              getUserEmail,
              getEmailPrefix,
              uppercaseLastLetter,
              uppercaseFirstLetter
            )
          )
        )
      )
    )
  );

  // Knows this can't pipe through
  // const newUser = R.pipe(createUser(), getUserGivenName, addEmail);

  console.log(orgSubscriberEmailsWithoutSuffix);
}

main();
