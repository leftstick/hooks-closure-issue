import { useState, useMemo, useCallback } from "react";
import { createModel } from "hox";

function testHooks() {
  const [users, setUsers] = useState([
    {
      id: "a",
      name: "hello"
    }
  ]);

  const removeUser = useCallback(
    user => {
      return new Promise(resolve => {
        setTimeout(() => {
          // async work here
          setUsers(users.filter(u => u.name !== user.name));
          resolve();
        }, 10);
      });
    },
    [users]
  );

  const addUser = useCallback(
    user => {
      return new Promise(resolve => {
        setTimeout(() => {
          // async work here
          // users here is not up-to-date
          setUsers([...users, user]);
          resolve();
        }, 10);
      });
    },
    [users]
  );

  const modifyUser = useCallback(
    (oldUser, newUser) => {
      return new Promise((resolve, reject) => {
        removeUser(oldUser)
          .then(() => {
            // addUser relies on users, but not up-to-date
            // it refers to the original value before removeUser called
            return addUser(newUser);
          })
          .then(resolve, reject);
      });
    },
    [users]
  );

  return {
    users,
    modifyUser
  };
}

export default createModel(testHooks);
