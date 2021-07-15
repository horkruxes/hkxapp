import Realm from "realm";
const Cat = {
  name: "Message",
  properties: {
    _id: "objectId",
    name: "string",
    age: "int",
    type: "string",
  },
};

const nothing = async () => {
  // open a local realm with the 'Cat' schema
  const realm = await Realm.open({
    schema: [Cat],
  });
};
