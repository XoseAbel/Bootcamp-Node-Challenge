function UserDocument(name, surname, email, password, phone, condition) {
  this.name = name;
  this.surname = surname;
  this.email = email;
  this.password = password;
  if (phone) {
    this.phone = phone;
  }
  this.condition = condition;
  this.lastUpdate = new Date();
}
export { UserDocument };
