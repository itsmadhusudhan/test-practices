let company = {
  // the same object, compressed for brevity
  sales: [
    { name: "John", salary: 1000 },
    { name: "Alice", salary: 1600 },
  ],
  development: {
    sites: [
      { name: "Peter", salary: 2000 },
      { name: "Alex", salary: 1800 },
    ],
    internals: [{ name: "Jack", salary: 1300 }],
  },
};

const calculateSalaries = (
  department: typeof company | typeof company["development"]
) => {
  if (Array.isArray(department)) {
    return department.reduce((a, v) => {
      a += v.salary;
      return a;
    }, 0);
  } else {
    let sum = 0;
    for (let key in department) {
      sum += calculateSalaries((department as any)[key]);
    }

    return sum;
  }
};

function angle(time: string) {
  const [hourx, minutex] = time.split(":");
  const [hour, minute] = [parseInt(hourx), parseInt(minutex)];

  let minAngle = minute * 6;
  let hourAngle = 0;

  let h = hour;

  if (hour >= 12) {
    h -= 12;
  }

  hourAngle = 0.5 * (h * 60 + minute);

  const diffAngle = Math.abs(hourAngle - minAngle);

  return Math.round(Math.min(diffAngle, 360 - diffAngle));
}

class LocalStorageMock {
  store: any = {};
  length = 0;
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  key(index: number) {
    return null;
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: any) {
    this.store[key] = String(value);
  }

  removeItem(key: any) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

const myLocalStorage = {
  getItem(key: string) {
    return localStorage.getItem(key);
  },

  setItem(key: string, value: string, maxAge?: number) {
    if (maxAge === 0) {
      return;
    }

    localStorage.setItem(key, value);

    if (maxAge) {
      setTimeout(() => {
        this.removeItem(key);
      }, maxAge);
    }
  },

  removeItem(key: string) {
    return localStorage.removeItem(key);
  },

  clear() {
    return localStorage.clear();
  },
};

describe("Check the scope", () => {
  test("Private method should not be exposed", () => {
    const result = calculateSalaries(company);

    expect(result).toBe(7700);
  });

  test("Angle between hour and minute hand", () => {
    expect(angle("12:15")).toBe(83);
    expect(angle("12:34")).toBe(173);
    expect(angle("09:05")).toBe(118);
    expect(angle("23:59")).toBe(6);
    expect(angle("23:23")).toBe(157);
  });

  test("Local storage wrapper", () => {
    myLocalStorage.clear();
    myLocalStorage.setItem("bfe", "dev");
    myLocalStorage.setItem("bfe1", "dev1", 1000);
    myLocalStorage.setItem("bfe2", "dev2", 2000);
    expect(myLocalStorage.getItem("bfe")).toBe("dev");
    expect(myLocalStorage.getItem("bfe1")).toBe("dev1");
    expect(myLocalStorage.getItem("bfe2")).toBe("dev2");

    setTimeout(() => {
      expect(myLocalStorage.getItem("bfe")).toBe("dev");
      expect(myLocalStorage.getItem("bfe1")).toBe("dev1");
      expect(myLocalStorage.getItem("bfe2")).toBe("dev2");
    }, 500);

    setTimeout(() => {
      expect(myLocalStorage.getItem("bfe")).toBe("dev");
      expect(myLocalStorage.getItem("bfe1")).toBe(null);
      expect(global.localStorage.getItem("bfe1")).toBe(null);
      expect(myLocalStorage.getItem("bfe2")).toBe("dev2");
    }, 1000);

    setTimeout(() => {
      expect(myLocalStorage.getItem("bfe")).toBe("dev");
      expect(myLocalStorage.getItem("bfe1")).toBe(null);
      expect(global.localStorage.getItem("bfe1")).toBe(null);
      expect(myLocalStorage.getItem("bfe2")).toBe("dev2");
    }, 1500);

    setTimeout(() => {
      expect(myLocalStorage.getItem("bfe")).toBe("dev");
      expect(myLocalStorage.getItem("bfe1")).toBe(null);
      expect(global.localStorage.getItem("bfe1")).toBe(null);
      expect(myLocalStorage.getItem("bfe2")).toBe(null);
      expect(global.localStorage.getItem("bfe2")).toBe(null);
    }, 2000);
  });
});
