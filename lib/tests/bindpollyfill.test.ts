import { bindpollyfill, bindWithProperty } from "../bindpollyfill";

const student = {
  name: "Madhusudhan",
  getName(greet: string, place: string) {
    return greet + " " + this.name + " to " + place;
  },
};

describe("Test the bind pollyfill", () => {
  test("Should work fine without binding", () => {
    expect(student.getName("Greetings", "Japan")).toBe(
      "Greetings Madhusudhan to Japan"
    );
  });

  test("Should throw error", () => {
    let getName = student.getName;

    expect(() => getName("Greetings", "Japan")).toThrowError(
      "Cannot read property 'name' of undefined"
    );
  });

  test("Should bind `this` the given object", () => {
    let ganesh = {
      name: "Ganesh",
    };

    let getName = bindWithProperty<typeof student["getName"]>(
      student.getName,
      ganesh,
      "Welcome"
    );

    expect(getName("Nepal")).toBe("Welcome Ganesh to Nepal");
  });
});
