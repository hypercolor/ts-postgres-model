export function Column(target: any, key: string) {

  // property value
  // let obj: any = this as any;
  // var _val = target[key];

  // property getter
  let getter = function() {
    console.log(`Get: ${key} => ${target.get(key)}`);
    return target.get(key);
  };

  // property setter
  let setter = function(newVal: any) {
    console.log(`Set: ${key} => ${newVal}`);
    target.set(key, newVal);
  };

  // Delete property.
  if (delete target[key]) {

    console.log('Defining new property');

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
