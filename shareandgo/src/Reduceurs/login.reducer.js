export default function(isLoggedIn = false, action) {
  if(action.type == 'login') {
    return action.isLoggedIn
  }
  else if(action.type == 'logout') {
    action.isLoggedIn = false;
    console.log(action.isLoggedIn,"@@##@@@#@@");
    return action.isLoggedIn
  }
  else {
    return isLoggedIn
  }
}
