type Grid = Array<Array<number>>;

type Item = {
  id: number;
  style?: {
    gridRowStart?: number | string;
    gridRowEnd?: number | string;
    gridColumnStart?: number | string;
    gridColumnEnd?: number | string;
  };
};

/**
 * @name rows
 *
 * @description
 *  Creates grid auto flow layout of css
 *
 * @param rows
 * @param columns
 * @param items
 * @returns the array of rows and columns of items
 */
export function layout(
  rows: number,
  columns: number,
  items: Array<Item>
): Grid {
  const arr: any = [];
  const arrCache: any = {};

  for (let i = 0; i < rows; i++) {
    arr[i] = [];
    arrCache[i] = [1, 1, 1];
    for (let j = 0; j < columns; j++) {
      arr[i][j] = 0;
    }
  }

  let rowStartIndex = 0;
  let rowEndIndex = 0;

  let colCount = 0;

  const results = items.map((item, index) => {
    const { gridColumnStart, gridColumnEnd, gridRowStart, gridRowEnd } =
      item.style || {};

    if (gridRowStart) {
      rowStartIndex = parseRow(gridRowStart) - 1;
    }

    const { colStartIndex, colEndIndex } = parseColumn(
      gridColumnStart,
      gridColumnEnd
    );

    const colLength = Math.abs(colEndIndex - colStartIndex) + 1;

    colCount += colLength;

    // if (colCount > rows * columns) {
    //   rowStartIndex += 1;
    // }

    for (let i = 0; i < rows; i++) {
      if (colCount > (index + 1) * columns) {
        rowStartIndex += 1;
        break;
      }
    }

    if (rowEndIndex + colLength <= rows) {
      rowEndIndex = rowStartIndex;
    }

    return {
      rowStartIndex,
      colStartIndex,
      colEndIndex,
      colLength,
      rowEndIndex,
    };
  });

  return arr;
}

const parseColumn = (colStart?: number | string, colEnd?: number | string) => {
  let colStartIndex = 0;
  let colEndIndex = 0;

  if (typeof colStart === "number") {
    colStartIndex = colStart - 1;
    colEndIndex = colStartIndex;
  }

  if (typeof colStart === "string") {
    // colStartIndex = splitColumn(colStart);
    colEndIndex = splitSpan(colStart) - 1;
  }

  if (typeof colEnd === "string") {
    colEndIndex = splitSpan(colEnd) + colStartIndex - 1;
  }

  if (typeof colEnd === "number") {
    colEndIndex = colEnd - 1;
  }

  return { colStartIndex, colEndIndex };
};

const parseRow = (row: string | number) => {
  if (typeof row === "string") {
    return splitSpan(row);
  }

  return row;
};

const splitSpan = (span: string) => {
  return parseInt(span.split(" ")[1]);
};

export const exposeSomething = (val: string) => {
  const value = val;

  return {
    getValue() {
      return value;
    },
    me() {
      const obj = Object.defineProperty({}, "getDate", {
        get() {
          return new Date();
        },
        configurable: false,
        enumerable: true,
      });

      const obj2 = Object.create(obj);

      console.log(obj2.hasOwnProperty("getDate"));

      return obj;
      return this.getValue() + " Me";
    },
  };
};
