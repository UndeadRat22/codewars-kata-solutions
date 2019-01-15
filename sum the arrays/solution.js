function sum() {
    let args = [].slice.call(arguments).map((elem) => get_type(elem) != "number" ? elem : [elem]);
    let func = get_function(args);
    if (func == null){
      return default_action(args);
    }
    let len = get_long_length(args);
    let partial = [];
    for (let i = 0; i < len; i++){
      let fargs = []
      for (let j = 0; j < args.length; j++){
        fargs.push(args[j][i] == undefined ? 0 : args[j][i]);
      }
      partial.push(func( ...fargs ));
    }
    return sum_single(partial);
  }
  
  function get_long_length(args){
    return args.map(elem => elem.length).reduce((prevl, l) => prevl > l ? prevl : l );
  }
  
  function default_action(args){
      let partial_sums = [];
      for (let i = 0; i < args.length; i++){
        if (get_type(args[i]) == "array"){
          partial_sums.push(sum_single(args[i]));
        }
        else{
          partial_sums.push(args[i]);
        }
      }
      return sum_single(partial_sums);
  }
  
  function get_function(arr) {
    for (let i = 0; i < arr.length; i++){
      if (get_type(arr[i]) == "function"){
        let func = arr[i];
        arr.splice(i, 1);
        return func;
      }
    }
    return null;
  }
  
  function sum_single(arr) { 
    return arr.reduce((prev, curr)=>prev + curr, 0) 
  }
  
  function get_type(value) {
    return Object.prototype.toString.call(value)
      .replace(/^\[object |\]$/g, '').toLowerCase();
  }