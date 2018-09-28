mutation{
  addUser(
    name: "Chris",
  email: "chris@gmail.com",
  age: 42,
  contactNumber: 12345678,
  admin: false,
  websiteId: ["5bae4977ed0083421cbfe911", "5bae4991ed0083421cbfe912" ]) {
    id,
    name,
    email,
    age,
    contactNumber,
    admin,
    websites {
      id,
      name
    }
  }
}



mutation{
  addWebsite(name: "MA Photography") {
    id,
    name
  }
}



{
  website(id: "5bae34b975931f2cd8563b64") {
    name,
    id
  }
}



{
  user(id: "5bae455267da882a6cde74a2") {
    name,
    id,
    email,
    age,
    contactNumber,
    admin,
    websites{
      name
      id
    }
  }
}



{
  users {
    name,
    id,
    email,
    age,
    contactNumber,
    admin,
    websites{
    name
  }
  }
}



{
  websites {
    name,
    id
  }
}