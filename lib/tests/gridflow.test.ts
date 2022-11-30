import { exposeSomething, layout } from "../gridflow";

test("Grid flow to work", () => {
  const data = [
    {
      id: 1,
      style: {
        gridColumnStart: "span 2",
      },
    },
    {
      id: 2,
      style: {
        gridColumnStart: "span 2",
      },
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
  ];

  const result = layout(3, 3, data);

  const something: any = exposeSomething("I'm");

  // expect(result).toMatchObject([
  //   [1, 1, 0],
  //   [2, 2, 3],
  //   [4, 5, 0],
  // ]);
});
