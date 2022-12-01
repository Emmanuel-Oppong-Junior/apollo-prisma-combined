//delete function returns the object parsed to it without the fields
//specified in the keys
function excludeFields(user, keys) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
module.exports = excludeFields;
