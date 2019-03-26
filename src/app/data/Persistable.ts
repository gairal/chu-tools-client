interface IPersistable<T> {
  add(message: T): boolean;
  flush(): boolean;
  load(): T[];
}

export default class Persistable<T> implements IPersistable<T> {
  private static hasLocalStorage() {
    const test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.getItem(test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  private key = '';
  private hasLocalStorage = false;
  constructor(key: string) {
    this.hasLocalStorage = Persistable.hasLocalStorage();
    this.key = key;
  }

  get value() {
    try {
      const val = this.hasLocalStorage ? localStorage.getItem(this.key) : null;
      if (!val) return val;
      return JSON.parse(val);
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
      return null;
    }
  }

  set value(val) {
    if (this.hasLocalStorage) {
      try {
        const str = JSON.stringify(val);
        localStorage.setItem(this.key, str);
      } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        throw err;
      }
    }
  }

  public flush() {
    try {
      this.value = [];
      return true;
    } catch (error) {
      return false;
    }
  }

  public add(object: any) {
    const currData = this.value || [];
    currData.push(object);

    try {
      this.value = currData;
      return true;
    } catch (error) {
      return false;
    }
  }

  public load() {
    return this.value || [];
  }
}
