export function Column(target: any, key: string) {

  // property getter
  const getter = function(this: any) {
    console.log(`Get: ${key} => ${target.get(key)}`);
    return this.get(key);
  };

  // property setter
  const setter = function(this: any, newVal: any) {
    console.log(`Set: ${key} => ${newVal}`);
    this.set(key, newVal);
  };

  // Delete property.
  if (delete target[key]) {

    // Create new property with getter and setter
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  } else {
    console.log('Warning, couldnt delete property: ' + key);
  }
}
